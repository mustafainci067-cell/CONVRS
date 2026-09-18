<<<<<<< HEAD
import type { MetadataRoute } from 'next';
import { activeToolPaths } from '@/config/nav';
import { getAllGuideSlugs } from '@/lib/guides';

const BASE_URL = 'https://convrs.org';

// next-intl routing.ts ile senkron tutulmali
const LOCALES = ['en', 'tr', 'de', 'es'] as const;

// Aktif arac yollari artik Sidebar'in da kullandigi merkezi liste olan
// src/config/nav.ts'ten gelir. Yeni bir arac eklerken yalnizca oraya ekle;
// bu liste otomatik olarak guncellenir.
// NOT: Bu site localePrefix:'always' kullandigi icin her sayfa
// /{locale}/... altinda sunulur; kok URL'de sayfa yoktur.
const TOOL_PATHS: string[] = activeToolPaths;

const SITEMAP_DATE = new Date('2026-09-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITEMAP_DATE;

  // Ayni sayfanin tum dil surumlerini hreflang alternates olarak ekler
  const alternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = `${BASE_URL}/${locale}${path}`;
    }
    return { languages };
  };

  const entries: MetadataRoute.Sitemap = [];

  // Ana sayfa (her dil icin; priority 1)
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: alternates(''),
    });
  }

  // Tum araclar (her dil × her arac; priority 0.8)
  for (const path of TOOL_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: alternates(path),
      });
    }
  }

  // Rehber listesi (her dil; priority 0.7)
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/guides`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: alternates('/guides'),
    });
  }

  // Tekil rehberler (her dil × her slug; priority 0.7)
  const guideSlugs = getAllGuideSlugs('en');
  for (const slug of guideSlugs) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/guides/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: alternates(`/guides/${slug}`),
      });
    }
  }

  return entries;
}
=======
import type { MetadataRoute } from 'next';
import { activeToolPaths } from '@/config/nav';
import { guideSlugs } from '@/i18n/guides';

const BASE_URL = 'https://convrs.org';

// next-intl routing.ts ile senkron tutulmali
const LOCALES = ['en', 'tr', 'de', 'es'] as const;

// Aktif arac yollari artik Sidebar'in da kullandigi merkezi liste olan
// src/config/nav.ts'ten gelir. Yeni bir arac eklerken yalnizca oraya ekle;
// bu liste otomatik olarak guncellenir.
// NOT: Bu site localePrefix:'always' kullandigi icin her sayfa
// /{locale}/... altinda sunulur; kok URL'de sayfa yoktur.
const TOOL_PATHS: string[] = activeToolPaths;

// Yasal / bilgilendirme sayfalari (tum dillerde). AdSense incelemesi ve SEO icin gerekli.
const INFO_PATHS: string[] = [
  '/about',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/contact',
];

// /guides blog sayfalari — indeks + rehber slug'lari (slug tum dillerde ayni).
const GUIDE_PATHS: string[] = ['/guides', ...guideSlugs.map((slug) => `/guides/${slug}`)];

const SITEMAP_DATE = new Date('2026-09-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITEMAP_DATE;

  // Ayni sayfanin tum dil surumlerini hreflang alternates olarak ekler
  const alternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = `${BASE_URL}/${locale}${path}`;
    }
    return { languages };
  };

  const entries: MetadataRoute.Sitemap = [];

  // Ana sayfa (her dil icin; priority 1)
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: alternates(''),
    });
  }

  // Tum araclar (her dil × her arac; priority 0.8)
  for (const path of TOOL_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: alternates(path),
      });
    }
  }

  // Bilgilendirme sayfalari (her dil × her sayfa; priority 0.6)
  for (const path of INFO_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: alternates(path),
      });
    }
  }

  // Rehber/blog sayfalari (her dil × her slug; priority 0.7)
  for (const path of GUIDE_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
