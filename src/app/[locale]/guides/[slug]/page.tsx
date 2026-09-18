import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getGuideBySlug, guideSlugs } from "@/i18n/guides";
import type { GuideDefinition, Locale } from "@/i18n/guides/types";
import { routing, SITE_URL } from "@/i18n/routing";
import GuideRenderer from "@/components/guides/GuideRenderer";
import GuideJsonLd from "@/components/guides/GuideJsonLd";

// [locale]/guides/[slug] — tüm (locale × slug) kombinasyonları build'de SSG olur.
// Locale üstteki layout generateStaticParams'ından, slug buradan gelir.
export function generateStaticParams() {
  const entries: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of guideSlugs) {
      entries.push({ locale, slug });
    }
  }
  return entries;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const doc = guide.content[locale as Locale] ?? guide.content.en;
  const url = `${SITE_URL}/${locale}/guides/${slug}`;

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

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const guide: GuideDefinition | undefined = getGuideBySlug(slug);
  if (!guide) notFound();

  const doc = guide.content[locale as Locale] ?? guide.content.en;
  setRequestLocale(locale);

  return (
    <>
      <GuideJsonLd slug={slug} title={doc.meta.title} description={doc.meta.description} />
      <GuideRenderer doc={doc} />
    </>
  );
}
