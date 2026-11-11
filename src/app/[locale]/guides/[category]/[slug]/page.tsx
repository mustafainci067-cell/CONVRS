import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getGuideBySlug as getTsGuideBySlug, guideSlugs, getCategoryForTsGuide } from "@/i18n/guides";
import type { GuideDefinition, Locale } from "@/i18n/guides/types";
import { routing, getCanonicalUrl } from "@/i18n/routing";
import GuideRenderer from "@/components/guides/GuideRenderer";
import GuideJsonLd from "@/components/guides/GuideJsonLd";
import MarkdownGuideRenderer from "@/components/guides/MarkdownGuideRenderer";
import {
  getGuideBySlug as getMdGuideBySlug,
  getAllGuideSlugs,
  getGuideLanguageAlternates,
} from "@/lib/guides";

// Yalnızca generateStaticParams içinde üretilen rehber yolları geçerlidir;
// bilinmeyen bir slug/kategori kombinasyonu doğrudan 404 döner (sunucu tarafı
// dinamik çalışma zamanı hatasını ve 5xx riskini tamamen engeller).
export const dynamicParams = false;

// [locale]/guides/[category]/[slug] — tüm (locale × category × slug) kombinasyonları build'de SSG olur.
export function generateStaticParams() {
  const entries: { locale: string; category: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    // TS Slugs
    for (const slug of guideSlugs) {
      entries.push({ locale, category: getCategoryForTsGuide(slug), slug });
    }
    // MD Slugs
    const mdSlugs = getAllGuideSlugs(locale);
    for (const { slug, category } of mdSlugs) {
      // Sadece MD'de varsa ekle (çakışmaları önlemek için)
      if (!guideSlugs.includes(slug)) {
        entries.push({ locale, category, slug });
      }
    }
  }
  return entries;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;

  // Önce TS rehberlerinde ara
  const tsGuide = getTsGuideBySlug(slug);
  if (tsGuide) {
    if (getCategoryForTsGuide(slug) !== category) {
      return { robots: { index: false, follow: false } };
    }
    const doc = tsGuide.content[locale as Locale] ?? tsGuide.content.en;
    const url = getCanonicalUrl(locale, `/guides/${category}/${slug}`);
    const languages = getGuideLanguageAlternates(slug, category);
    return {
      title: doc.meta.title,
      description: doc.meta.description,
      alternates: {
        canonical: url,
        languages,
      },
      openGraph: {
        title: doc.meta.title,
        description: doc.meta.description,
        url,
        type: "article",
        locale,
      },
    };
  }

  // Sonra MD rehberlerinde ara
  const mdGuide = await getMdGuideBySlug(slug, locale);
  if (mdGuide) {
    // Kategori eşleşmezse
    if (mdGuide.category !== category) {
      return { robots: { index: false, follow: false } };
    }

    const url = getCanonicalUrl(locale, `/guides/${category}/${slug}`);
    const languages = getGuideLanguageAlternates(slug, category);
    const hasAlternates = Object.keys(languages).length > 1;

    return {
      title: mdGuide.title,
      description: mdGuide.description,
      alternates: {
        canonical: url,
        ...(hasAlternates ? { languages } : {}),
      },
      openGraph: {
        title: mdGuide.title,
        description: mdGuide.description,
        url,
        type: "article",
        locale,
      },
    };
  }

  return { robots: { index: false, follow: false } };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  // Önce TS rehberlerinde ara
  const tsGuide: GuideDefinition | undefined = getTsGuideBySlug(slug);
  if (tsGuide) {
    if (getCategoryForTsGuide(slug) !== category) notFound();
    const doc = tsGuide.content[locale as Locale] ?? tsGuide.content.en;
    return (
      <>
        <GuideJsonLd
          slug={slug}
          category={category}
          title={doc.meta.title}
          description={doc.meta.description}
          datePublished={doc.meta.updatedDate}
          dateModified={doc.meta.updatedDate}
        />
        <GuideRenderer doc={doc} />
      </>
    );
  }

  // Sonra MD rehberlerinde ara
  const mdGuide = await getMdGuideBySlug(slug, locale);
  if (mdGuide) {
    if (mdGuide.category !== category) notFound();
    return (
      <>
        <GuideJsonLd
          slug={slug}
          category={category}
          title={mdGuide.title}
          description={mdGuide.description}
          datePublished={mdGuide.date}
          dateModified={mdGuide.date}
        />
        <MarkdownGuideRenderer doc={mdGuide} />
      </>
    );
  }

  // Hiçbiri yoksa 404
  notFound();
}
