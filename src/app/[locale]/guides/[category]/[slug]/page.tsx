import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getGuideBySlug as getTsGuideBySlug, guideSlugs, getCategoryForTsGuide } from "@/i18n/guides";
import type { GuideDefinition, Locale } from "@/i18n/guides/types";
import { routing, SITE_URL } from "@/i18n/routing";
import GuideRenderer from "@/components/guides/GuideRenderer";
import GuideJsonLd from "@/components/guides/GuideJsonLd";
import MarkdownGuideRenderer from "@/components/guides/MarkdownGuideRenderer";
import { getGuideBySlug as getMdGuideBySlug, getAllGuideSlugs } from "@/lib/guides";

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
    const doc = tsGuide.content[locale as Locale] ?? tsGuide.content.en;
    const url = `${SITE_URL}/${locale}/guides/${category}/${slug}`;
    return {
      title: doc.meta.title,
      description: doc.meta.description,
      alternates: { canonical: url },
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
    if (mdGuide.category !== category) return {};

    const url = `${SITE_URL}/${locale}/guides/${category}/${slug}`;
    return {
      title: mdGuide.title,
      description: mdGuide.description,
      alternates: { canonical: url },
      openGraph: {
        title: mdGuide.title,
        description: mdGuide.description,
        url,
        type: "article",
        locale,
      },
    };
  }

  return {};
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
        <GuideJsonLd slug={slug} category={category} title={doc.meta.title} description={doc.meta.description} />
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
        <GuideJsonLd slug={slug} category={category} title={mdGuide.title} description={mdGuide.description} />
        <MarkdownGuideRenderer doc={mdGuide} />
      </>
    );
  }

  // Hiçbiri yoksa 404
  notFound();
}
