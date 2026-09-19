import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { guidesByRecency, getCategoryForTsGuide } from "@/i18n/guides";
import type { Locale } from "@/i18n/guides/types";
import { SITE_URL } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getAllGuides } from "@/lib/guides";

// /guides blog indeksi. Sayfa üzerinde dinamik segment yok; locale yalnızca
// üstteki [locale]/layout.tsx generateStaticParams'ından gelir (SSG).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
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
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides" });

  // TS formatlı rehberleri haritala
  const tsGuides = guidesByRecency.map((guide) => {
    const doc = guide.content[locale as Locale] ?? guide.content.en;
    return {
      slug: guide.slug,
      category: getCategoryForTsGuide(guide.slug),
      eyebrow: doc.meta.eyebrow,
      title: doc.meta.title,
      excerpt: doc.meta.excerpt,
      readingTime: doc.meta.readingTime,
      updatedDate: doc.meta.updatedDate,
      dateValue: new Date(doc.meta.updatedDate).getTime() || 0,
    };
  });

  // MD formatlı rehberleri haritala
  const mdGuides = getAllGuides(locale).map((g) => ({
    slug: g.slug,
    category: g.category,
    eyebrow: g.tags && g.tags.length > 0 ? g.tags[0] : "Guide",
    title: g.title,
    excerpt: g.description,
    readingTime: g.readingTime ? `${g.readingTime} min read` : "5 min read",
    updatedDate: g.date,
    dateValue: new Date(g.date).getTime() || 0,
  }));

  // Hepsini birleştir ve tarihe göre yeniden eskiye sırala
  const allGuides = [...tsGuides, ...mdGuides].sort((a, b) => b.dateValue - a.dateValue);

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
          {allGuides.map((doc, index) => {
            return (
              <Link
                key={doc.slug}
                href={`/guides/${doc.category}/${doc.slug}`}
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
                    {doc.eyebrow}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                    {doc.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {doc.excerpt}
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
                  <span>{doc.readingTime}</span>
                  <span>{doc.updatedDate}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
