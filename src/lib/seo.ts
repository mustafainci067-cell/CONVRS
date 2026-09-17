import type { Metadata } from "next";

const BASE_URL = "https://convrs.org";

// OG görsel henüz yoksa bu path'e geçici bir görsel eklenir.
// Üretim için: public/images/og-default.jpg (1200x630 px önerilir)
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`;

/** Her sayfanın sahip olacağı temel Open Graph meta etiketleri */
const SITE_NAME = "Convrs";

/**
 * Converter sayfaları için locale-aware dinamik metadata üretir.
 * Open Graph + Twitter Card etiketlerini içerir.
 *
 * @example
 * // page.tsx içinde:
 * export async function generateMetadata({ params }) {
 *   const { locale } = await params;
 *   return generateConverterMetadata({
 *     locale,
 *     title: "PNG to JPG Converter",
 *     description: "Convert PNG images to JPG in your browser.",
 *     path: "/png-to-jpg",
 *   });
 * }
 */
export function generateConverterMetadata({
  locale,
  title,
  description,
  path,
  ogImage,
}: {
  locale: string;
  title: string;
  description: string;
  /** URL yolu, ör: "/png-to-jpg" */
  path: string;
  /** Sayfaya özel OG görseli; yoksa varsayılan kullanılır */
  ogImage?: string;
}): Metadata {
  const canonicalUrl = `${BASE_URL}/${locale}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  // hreflang alternates: tüm dil versiyonları
  const locales = ["en", "tr", "de", "es"] as const;
  const alternates: Record<string, string> = {};
  for (const loc of locales) {
    alternates[loc] = `${BASE_URL}/${loc}${path}`;
  }
  alternates["x-default"] = `${BASE_URL}/en${path}`;

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: locale === "tr" ? "tr_TR" : locale === "de" ? "de_DE" : locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
