import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { GuideData } from "@/lib/guides";
import AdSlot from "@/components/AdSlot";

export default async function MarkdownGuideRenderer({ doc }: { doc: GuideData }) {
  const locale = await getRouteLocale();
  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const tSidebar = await getTranslations({ locale, namespace: "Sidebar" });
  const tA11y = await getTranslations({ locale, namespace: "A11y" });

  const eyebrow = doc.tags && doc.tags.length > 0 ? doc.tags[0] : "Guide";
  const readingTimeText = doc.readingTime ? `${doc.readingTime} min read` : "5 min read";

  // Makale icerigini ortadan ikiye bolup araya AdSlot yerlestirmek icin
  const html = doc.contentHtml;
  const middleIndex = Math.floor(html.length / 2);
  const splitIndex = html.indexOf('</p>', middleIndex);

  let part1 = html;
  let part2 = "";
  if (splitIndex !== -1 && html.length > 1500) {
    part1 = html.slice(0, splitIndex + 4);
    part2 = html.slice(splitIndex + 4);
  }

  return (
    <main className="flex flex-1 flex-col items-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-3xl">
        <Breadcrumbs
          label={tA11y("breadcrumb")}
          items={[
            { label: tSeo("home"), href: "/" },
            { label: tSidebar("guides"), href: "/guides" },
            { label: doc.title },
          ]}
        />
      </div>
      <article className="w-full max-w-3xl animate-fade-in">
        {/* Başlık bölgesi */}
        <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800/60">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{readingTimeText}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <time>{doc.date}</time>
          </p>
        </header>

        {/* Gövde - Markdown HTML */}
        <div className="pb-12 pt-8 prose prose-zinc dark:prose-invert max-w-none prose-a:text-emerald-600 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-500 prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-p:text-[15px] prose-p:leading-[1.8] prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-li:text-[15px] prose-li:text-zinc-600 dark:prose-li:text-zinc-400">
          <div dangerouslySetInnerHTML={{ __html: part1 }} />
          
          {part2 && (
            <>
              <div className="not-prose my-10">
                <AdSlot format="horizontal" />
              </div>
              <div dangerouslySetInnerHTML={{ __html: part2 }} />
            </>
          )}
        </div>
      </article>
    </main>
  );
}
