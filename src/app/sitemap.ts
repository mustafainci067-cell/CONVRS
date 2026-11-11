import type { MetadataRoute } from "next";
import { activeToolPaths } from "@/config/nav";
import { guidesByRecency, getCategoryForTsGuide } from "@/i18n/guides";
import { getAllGuideSlugs, getGuideLanguageAlternates } from "@/lib/guides";
import { routing, getCanonicalUrl, getLanguagesFor } from "@/i18n/routing";

const LOCALES = routing.locales;

// Her istekte degisen `new Date()` yerine deterministik icerik guncelleme tarihi
// kullanilir; boylece Googlebot tarama butcesini (crawl budget) sahte lastmod
// sinyalleriyle harcamaz.
const STATIC_LAST_MODIFIED = "2026-03-01";

// Aktif arac yollari
const TOOL_PATHS: string[] = activeToolPaths;

// Yasal / bilgilendirme sayfalari (308 yonlendirme alan /about-us ve /terms HARIC)
const INFO_PATHS: string[] = [
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Ana sayfa (4 dil)
  for (const locale of LOCALES) {
    entries.push({
      url: getCanonicalUrl(locale, ""),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: getLanguagesFor("") },
    });
  }

  // 2. Tum aktif araclar (64 arac × 4 dil = 256 URL)
  for (const path of TOOL_PATHS) {
    const languages = getLanguagesFor(path);
    for (const locale of LOCALES) {
      entries.push({
        url: getCanonicalUrl(locale, path),
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: { languages },
      });
    }
  }

  // 3. Yasal / bilgilendirme sayfalari (5 sayfa × 4 dil = 20 URL)
  for (const path of INFO_PATHS) {
    const languages = getLanguagesFor(path);
    for (const locale of LOCALES) {
      entries.push({
        url: getCanonicalUrl(locale, path),
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages },
      });
    }
  }

  // 4. /guides (Rehberler Indeksi — 4 dil)
  const guidesIndexLanguages = getLanguagesFor("/guides");
  for (const locale of LOCALES) {
    entries.push({
      url: getCanonicalUrl(locale, "/guides"),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: guidesIndexLanguages },
    });
  }

  // 5. TS Rehberleri (12 rehber × 4 dil = 48 URL)
  for (const guide of guidesByRecency) {
    const category = getCategoryForTsGuide(guide.slug);
    const path = `/guides/${category}/${guide.slug}`;
    const languages = getGuideLanguageAlternates(guide.slug, category);
    const lastModified = guide.content.en.meta.updatedDate || STATIC_LAST_MODIFIED;

    for (const locale of LOCALES) {
      entries.push({
        url: getCanonicalUrl(locale, path),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  // 6. MD Rehberleri: Her dilin yalnizca gercekten var olan (category, slug)
  // dosyalari eklenir; LOCALIZED_GUIDE_GROUPS sayesinde dile ozel slug'a sahip
  // 10 rehber grubu da 4 dildeki karsiliklarina tam hreflang ile baglanir.
  for (const locale of LOCALES) {
    const mdGuides = getAllGuideSlugs(locale);
    for (const { slug, category, date } of mdGuides) {
      const path = `/guides/${category}/${slug}`;
      const languages = getGuideLanguageAlternates(slug, category);
      const hasAlternates = Object.keys(languages).length > 1;

      entries.push({
        url: getCanonicalUrl(locale, path),
        lastModified: date || STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
        ...(hasAlternates ? { alternates: { languages } } : {}),
      });
    }
  }

  return entries;
}
