<<<<<<< HEAD
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';
import { generateConverterMetadata } from '@/lib/seo';

=======
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { guidesByRecency } from "@/i18n/guides";
import type { Locale } from "@/i18n/guides/types";
import { SITE_URL } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// /guides blog indeksi. Sayfa üzerinde dinamik segment yok; locale yalnızca
// üstteki [locale]/layout.tsx generateStaticParams'ından gelir (SSG).
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
<<<<<<< HEAD
  return generateConverterMetadata({
    locale,
    title: 'Guides & Tutorials',
    description:
      'Step-by-step guides and tutorials for file conversion, image editing, video processing and developer tools. All tools run 100% in your browser.',
    path: '/guides',
  });
}

export default async function GuidesPage({
=======
  const t = await getTranslations({ locale, namespace: "Guides" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${SITE_URL}/${locale}/guides` },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/${locale}/guides`,
      type: "website",
      locale,
    },
  };
}

export default async function GuidesIndexPage({
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
<<<<<<< HEAD
  const guides = getAllGuides(locale);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Guides & Tutorials
        </h1>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
          Step-by-step tutorials for getting the most out of Convrs tools.
          All processing is done locally in your browser — no upload required.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-zinc-400">No guides yet. Check back soon!</p>
      ) : (
        <ol className="space-y-6" role="list">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
                {/* Tags */}
                {guide.tags && guide.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
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

                <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  <Link href={`/${locale}/guides/${guide.slug}`} className="focus:outline-none">
                    {/* Make the whole card clickable via stretched-link pattern */}
                    <span className="before:absolute before:inset-0" />
                    {guide.title}
                  </Link>
                </h2>

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {guide.description}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
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
              </article>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
=======
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides" });

  return (
    <main className="flex flex-1 flex-col items-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-4xl animate-fade-in">
        {/* Sayfa başlığı */}
        <header className="border-b border-zinc-200 pb-10 text-center dark:border-zinc-800/60">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("description")}
          </p>
        </header>

        {/* Rehber kartları — en güncel en üstte */}
        <div className="flex flex-col gap-6 py-10">
          {guidesByRecency.map((guide, index) => {
            const doc = guide.content[locale as Locale] ?? guide.content.en;
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-zinc-200 p-6 transition-colors",
                  "hover:border-emerald-400/60 dark:border-zinc-800 dark:hover:border-emerald-500/40",
                  "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
                )}
              >
                <div className="flex-1">
                  <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {doc.meta.eyebrow}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                    {doc.meta.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {doc.meta.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {t("readMore")}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5-5 5M6 12h12"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex shrink-0 flex-row gap-3 text-xs text-zinc-500 dark:text-zinc-400 sm:flex-col sm:items-end">
                  <span>{doc.meta.readingTime}</span>
                  <span>{doc.meta.updatedDate}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
