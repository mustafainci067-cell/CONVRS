import type { MetadataRoute } from 'next';
import { activeToolPaths } from '@/config/nav';
import { guideSlugs, getCategoryForTsGuide } from '@/i18n/guides';
import { getAllGuideSlugs } from '@/lib/guides';

const BASE_URL = 'https://convrs.org';

// next-intl routing.ts ile senkron tutulmali
const LOCALES = ['en', 'tr', 'de', 'es'] as const;

// Aktif arac yollari
const TOOL_PATHS: string[] = activeToolPaths;

// Yasal / bilgilendirme sayfalari
const INFO_PATHS: string[] = [
  '/about',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/contact',
];

const SITEMAP_DATE = new Date('2026-09-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITEMAP_DATE;

  const alternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = `${BASE_URL}/${locale}${path}`;
    }
    return { languages };
  };

  const entries: MetadataRoute.Sitemap = [];

  // Ana sayfa
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: alternates(''),
    });
  }

  // Tum araclar
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

  // Bilgilendirme sayfalari
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

  // /guides (Index)
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/guides`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: alternates('/guides'),
    });
  }

  // Rehberler
  const allSlugMap = new Map<string, string>(); // slug -> category

  // 1. TS Guides
  for (const slug of guideSlugs) {
    allSlugMap.set(slug, getCategoryForTsGuide(slug));
  }

  // 2. MD Guides (assuming same slugs exist in all locales, we scan all to be safe)
  for (const locale of LOCALES) {
    const mdSlugs = getAllGuideSlugs(locale);
    for (const { slug, category } of mdSlugs) {
      if (!allSlugMap.has(slug)) {
        allSlugMap.set(slug, category);
      }
    }
  }

  // Her dil × her rehber slug'i
  for (const [slug, category] of allSlugMap.entries()) {
    const path = `/guides/${category}/${slug}`;
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

