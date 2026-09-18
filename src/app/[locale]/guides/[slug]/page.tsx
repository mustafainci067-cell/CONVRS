<<<<<<< HEAD
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllGuideSlugs, getGuideBySlug } from '@/lib/guides';

// SSG: build zamanında tüm slug'ları statik olarak üret
export async function generateStaticParams() {
  const locales = ['en', 'tr', 'de', 'es'];
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    const slugs = getAllGuideSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  
  return params;
=======
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
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
<<<<<<< HEAD
  const { slug, locale } = await params;
  const guide = await getGuideBySlug(slug, locale);
  if (!guide) return {};

  const BASE_URL = 'https://convrs.org';
  const canonicalUrl = `${BASE_URL}/${locale}/guides/${slug}`;

  const locales = ['en', 'tr', 'de', 'es'] as const;
  const alternates: Record<string, string> = {};
  for (const loc of locales) {
    alternates[loc] = `${BASE_URL}/${loc}/guides/${slug}`;
  }
  alternates['x-default'] = `${BASE_URL}/en/guides/${slug}`;

  return {
    title: `${guide.title} — Convrs`,
    description: guide.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${guide.title} — Convrs`,
      description: guide.description,
      url: canonicalUrl,
      siteName: 'Convrs',
      type: 'article',
      publishedTime: guide.date,
      tags: guide.tags,
      images: [
        {
          url: `${BASE_URL}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: `${guide.title} — Convrs`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} — Convrs`,
      description: guide.description,
      images: [`${BASE_URL}/images/og-default.jpg`],
=======
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
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
    },
  };
}

<<<<<<< HEAD
export default async function GuidePage({
=======
export default async function GuideArticlePage({
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
<<<<<<< HEAD
  const { slug, locale } = await params;
  const guide = await getGuideBySlug(slug, locale);

  if (!guide) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
          <li>
            <Link
              href={`/${locale}`}
              className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={`/${locale}/guides`}
              className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              Guides
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="truncate text-zinc-600 dark:text-zinc-300" aria-current="page">
            {guide.title}
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-8 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        {/* Tags */}
        {guide.tags && guide.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {guide.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {guide.description}
        </p>

        {/* Meta */}
        <div className="mt-5 flex items-center gap-4 text-sm text-zinc-400 dark:text-zinc-500">
          <time dateTime={guide.date}>
            {new Date(guide.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {guide.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{guide.readingTime} min read</span>
            </>
          )}
        </div>
      </header>

      {/* Markdown Content */}
      <article
        className="prose prose-zinc max-w-none dark:prose-invert
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-relaxed prose-p:text-zinc-700 dark:prose-p:text-zinc-300
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-emerald-400
          prose-blockquote:border-emerald-500 prose-blockquote:bg-zinc-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 dark:prose-blockquote:bg-zinc-900
          prose-code:text-emerald-700 prose-code:bg-zinc-100 prose-code:rounded prose-code:px-1 prose-code:py-0.5 dark:prose-code:text-emerald-300 dark:prose-code:bg-zinc-800
          prose-pre:bg-zinc-900 prose-pre:rounded-xl dark:prose-pre:bg-zinc-800/60
          prose-table:text-sm prose-th:bg-zinc-100 dark:prose-th:bg-zinc-800
          prose-img:rounded-xl prose-img:shadow-md
          prose-li:text-zinc-700 dark:prose-li:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
      />

      {/* Back link */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Link
          href={`/${locale}/guides`}
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all guides
        </Link>
      </div>
    </main>
  );
}
=======
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
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
