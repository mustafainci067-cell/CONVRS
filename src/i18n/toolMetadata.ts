// Faz 1 — Merkezi, locale-aware SEO metadata ureticisi.
//
// Tum arac sayfalari icin title/description/OG/Twitter/canonical/hreflang'i
// TEK noktadan uretir. Sayfalarin kendisi yalnizca soyle cagirir:
//
//   export const generateMetadata = generateToolMetadata('/webp-to-png');
//
// Arac adi ve aciklamasi src/messages/{locale}.json'daki Home.tools.* anahtarlarina
// (zaten 4 dilde cevrilmis) dayanir; nav.ts'teki path -> nameKey eslesmesi buradan
// turetilir, boylece yeni arac eklendiginde metadata otomatik calisir.

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { categoryConfigs } from "@/config/nav";
import { routing, SITE_URL } from "@/i18n/routing";

const BRAND = "Convrs";

type ActiveTool = { nameKey: string; path: string };

// nav.ts'teki aktif araclar — tek kaynak (single source of truth).
export const activeTools: ActiveTool[] = categoryConfigs
  .flatMap((category) => category.items)
  .filter((item) => item.status === "active")
  .map((item) => ({ nameKey: item.nameKey, path: item.path }));

const pathToNameKey = new Map(activeTools.map((t) => [t.path, t.nameKey]));

function isLocale(value: string): value is "en" | "tr" | "de" | "es" {
  return (routing.locales as readonly string[]).includes(value);
}

function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  return languages;
}

/**
 * Bir arac yolunun meta verisini ureten generateMetadata ureticisi/factory'si.
 * Next.js, her dildeki ({locale}) sayfayi render ederken params'tan dile gore
 * uygun title/description'i secer.
 */
export function generateToolMetadata(path: string) {
  const nameKey = pathToNameKey.get(path);

  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const lang = isLocale(locale) ? locale : routing.defaultLocale;

    const tTools = await getTranslations({ locale: lang, namespace: "Home.tools" });

    // Cevrilis arac adi (ornek: "WebP to PNG"); yoksa slug'den acil durum basligi.
    const rawTitle = nameKey ? tTools.raw(`${nameKey}.title`) : "";
    const title = typeof rawTitle === "string" && rawTitle.trim()
      ? rawTitle
      : path.slice(1).replace(/-/g, " ");
    const description = nameKey ? tTools(`${nameKey}.description`) : "";

    const url = `${SITE_URL}/${lang}${path}`;
    const fullTitle = `${title} — ${BRAND}`;

    return {
      // Sayfa title'i yalnizca arac adidir; marka son eki layout'taki
      // title.template ("%s — Convrs") tarafindan eklenir.
      title,
      description,
      alternates: {
        canonical: url,
        languages: languagesFor(path),
      },
      openGraph: {
        title: fullTitle,
        description,
        url,
        siteName: BRAND,
        locale: lang,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description,
      },
    };
  };
}