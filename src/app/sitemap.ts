import type { MetadataRoute } from 'next';
import { activeToolPaths } from '@/config/nav';
import { guideSlugs, getCategoryForTsGuide } from '@/i18n/guides';
import { getAllGuideSlugs } from '@/lib/guides';

const BASE_URL = 'https://www.convrs.org';

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
    languages['x-default'] = `${BASE_URL}/en${path}`;
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
  // slug -> { category, locales }: MD rehberlerde slug'lar dile ozeldir; bu yuzden
  // yalnizca GERCEKTEN var olan (locale, slug) ciftleri sitemap'e girer.
  // Aksi halde var olmayan URL'ler (404) sitemap'te ve hreflang'de yer alir.
  const guideMap = new Map<string, { category: string; locales: Set<string> }>();

  // 1. TS Guides: tum dillerde mevcut (eksik dil icin EN'ye dusuyor)
  for (const slug of guideSlugs) {
    guideMap.set(slug, {
      category: getCategoryForTsGuide(slug),
      locales: new Set<string>(LOCALES),
    });
  }

  // 2. MD Guides: her dilin kendi klasoru taranir
  for (const locale of LOCALES) {
    for (const { slug, category } of getAllGuideSlugs(locale)) {
      if (guideSlugs.includes(slug)) continue;
      const existing = guideMap.get(slug);
      if (existing) {
        existing.locales.add(locale);
      } else {
        guideMap.set(slug, { category, locales: new Set([locale]) });
      }
    }
  }

  for (const [slug, { category, locales }] of guideMap.entries()) {
    const path = `/guides/${category}/${slug}`;
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      if (locales.has(locale)) languages[locale] = `${BASE_URL}/${locale}${path}`;
    }
    // x-default: EN varsa EN, yoksa ilk mevcut dil
    const defaultLocale = locales.has('en') ? 'en' : [...locales][0];
    languages['x-default'] = `${BASE_URL}/${defaultLocale}${path}`;
    const hasTranslations = locales.size > 1;

    for (const locale of LOCALES) {
      if (!locales.has(locale)) continue;
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        ...(hasTranslations ? { alternates: { languages } } : {}),
      });
    }
  }

  return entries;
}

