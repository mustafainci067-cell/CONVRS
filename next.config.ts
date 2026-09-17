import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Content-Security-Policy: FFmpeg.wasm (unpkg), img.ly arka plan kaldirma
// modeli (staticimgly), Google Analytics ve AdSense'in ihtiyac duydugu hostlari
// barni kapsamlı bir allowlist. Next.js'in RSC/next/font inline script ve
// style'ları dogrudan calisabilmesi icin "unsafe-inline" bilinçli korunur.
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

const nextConfig: NextConfig = {
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