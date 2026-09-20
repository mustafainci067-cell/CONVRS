import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Desteklenen diller; ilki varsayilan (ingilizce).
  locales: ['en', 'tr', 'de', 'es'],
  defaultLocale: 'en',
  // SEO: varsayilan dil dahil her locale URL'de golunur -> /en/pdf-to-jpg
  localePrefix: 'always',
});

// Kanonik URL'ler, robots/sitemap ve OpenGraph verisi icin site kok adresi.
export const SITE_URL = 'https://www.convrs.org';

export function getCanonicalUrl(locale: string, path: string): string {
  const prefix = locale === "tr" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export function getLanguagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getCanonicalUrl(loc, path);
  }
  languages["x-default"] = getCanonicalUrl("tr", path);
  return languages;
}
