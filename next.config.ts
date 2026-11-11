import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { LOCALIZED_GUIDE_GROUPS, type GuideLocaleCode } from "./src/i18n/guideTranslations";

const withNextIntl = createNextIntlPlugin();

// Content-Security-Policy: FFmpeg.wasm (unpkg), img.ly arka plan kaldirma
// modeli (staticimgly), Google Analytics ve AdSense'in ihtiyac duydugu hostlari
// barindiran kapsamli bir allowlist. Next.js'in RSC/next/font inline script ve
// style'lari dogrudan calisabilmesi icin "unsafe-inline" bilincli korunur.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
  "worker-src 'self' blob: https://unpkg.com https://staticimgly.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://staticimgly.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://*.gstatic.com https://*.googlesyndication.com https://www.google.com",
  "script-src-attr 'none'",
  "child-src blob:",
  "connect-src 'self' blob: https://unpkg.com https://staticimgly.com https://www.google-analytics.com https://analytics.google.com https://*.googlesyndication.com https://*.doubleclick.net https://*.gstatic.com https://www.googleadservices.com https://www.google.com",
  "img-src 'self' data: blob: https:",
  "frame-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.gstatic.com",
  "media-src 'self' blob: data:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
].join("; ");

const LOCALES: GuideLocaleCode[] = ["en", "tr", "de", "es"];

// Dile ozel MD rehberlerinde (10 grup) baska bir dilin slug'i ile gelen eski
// istekleri (orn. /en/guides/developer/veri-gizliligi-ve-bulut-donusturuculer)
// dogrudan hedef dilin kanonik (category, slug) URL'sine 308 ile yonlendirir.
const crossLocaleGuideRedirects = LOCALIZED_GUIDE_GROUPS.flatMap((group) =>
  LOCALES.map((locale) => {
    const target = group[locale];
    const otherSlugs = LOCALES.filter((l) => l !== locale).map((l) => group[l].slug);
    return {
      source: `/${locale}/guides/:cat(image|document|developer|media)/:slug(${otherSlugs.join("|")})`,
      destination: `/${locale}/guides/${target.category}/${target.slug}`,
      permanent: true,
    };
  })
);

const nextConfig: NextConfig = {
  // Kopya yasal URL'ler ve eski/capraz rehber yollari -> tek adimli kalici (308) yonlendirme
  redirects: async () => [
    // 1. Kopya yasal yollar: Zincirleme yonlendirme (2 hop) olusmamasi icin
    //    genel locale yakalayicidan ONCE tanimlanir.
    {
      source: "/about-us",
      destination: "/en/about",
      permanent: true,
    },
    {
      source: "/terms",
      destination: "/en/terms-of-service",
      permanent: true,
    },
    {
      source: "/:locale(en|tr|de|es)/about-us",
      destination: "/:locale/about",
      permanent: true,
    },
    {
      source: "/:locale(en|tr|de|es)/terms",
      destination: "/:locale/terms-of-service",
      permanent: true,
    },
    // 2. Capraz dil MD rehber slug'lari -> ilgili dilin kanonik rehber URL'si
    ...crossLocaleGuideRedirects,
    // 3. Eski veya yanlis kategorili video-optimization-mp4-gif (EN'de media, digerlerinde image)
    {
      source: "/en/guides/image/video-optimization-mp4-gif",
      destination: "/en/guides/media/video-optimization-mp4-gif",
      permanent: true,
    },
    // 4. localePrefix 'always': locale'siz yollar (/guides, /image-to-base64 ...)
    //    gecerli URL degildir. next-intl bunlari 307 (gecici) ile /en/...'a
    //    yonlendirir; Google gecici yonlendirmede kaynak URL'yi kanonik secebilir
    //    (GSC: "Google chose different canonical"). 308 ile sinyaller /en/...'da
    //    birlesir. Kok '/' bilerek disarida: tarayici diline gore yonlendirme
    //    (proxy.ts) calismaya devam eder. Dosya uzantili yollar ve ic yollar
    //    (api, _next, _vercel) haric tutulur.
    {
      source:
        "/:path((?!(?:en|tr|de|es)(?:/|$)|api(?:/|$)|trpc(?:/|$)|_next(?:/|$)|_vercel(?:/|$))(?!.*\\.).+)",
      destination: "/en/:path",
      permanent: true,
    },
  ],
  // Required for FFmpeg.wasm SharedArrayBuffer support
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "require-corp",
        },
        // ── Eklenen guvenlik basliklari ──────────────────────────────
        {
          key: "Content-Security-Policy",
          value: contentSecurityPolicy,
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(self), microphone=(self), geolocation=(), payment=(), usb=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Origin-Agent-Cluster",
          value: "?1",
        },
        {
          key: "Cross-Origin-Resource-Policy",
          value: "same-origin",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
