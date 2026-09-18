import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Desteklenen diller; ilki varsayilan (ingilizce).
  locales: ['en', 'tr', 'de', 'es'],
  defaultLocale: 'en',
  // SEO: varsayilan dil dahil her locale URL'de golunur -> /en/pdf-to-jpg
  localePrefix: 'always',
});

// Kanonik URL'ler, robots/sitemap ve OpenGraph verisi icin site kok adresi.
export const SITE_URL = 'https://convrs.org';
