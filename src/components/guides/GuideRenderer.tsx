// GuideRenderer — /guides makalelerinin tek paylaşılan sunucusudur.
// Yalnızca TS içerik modülündeki (src/i18n/guides) GuideDocument'ı okur;
// tarayıcı JavaScript'i yüklemez (Core Web Vitals korunur) ve force-static SSG'de
// sayfaya gömülür. Tipografi: koyu tema, zinc/emerald.
//
// Güncelleme: yeni blok türü eklerken bu dosyadaki BlockRenderer switch'ine de
// render eklemeyi unutma (types.ts ile senkron).
import type { Block, GuideDocument, Rich } from "@/i18n/guides/types";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";
import Breadcrumbs from "@/components/Breadcrumbs";

function RichText({ parts, base }: { parts: Rich[]; base?: string }) {
  return (
    <>
      {parts.map((part, i) => {
        const key = `${i}-${typeof part === "string" ? part.slice(0, 16) : part.text.slice(0, 16)}`;
        if (typeof part === "string") {
          return <span key={key}>{part}</span>;
        }
        if (part.code) {
          return (
            <code
              key={key}
              className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {part.text}
            </code>
          );
        }
        if (part.url) {
          if (part.internal) {
            return (
              <Link
                key={key}
                href={part.url}
                className="font-medium text-zinc-800 underline underline-offset-2 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
              >
                {part.text}
              </Link>
            );
          }
          return (
            <a
              key={key}
              href={part.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-800 underline underline-offset-2 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
            >
              {part.text}
            </a>
          );
        }
        if (part.underline) {
          return (
            <span key={key} className="underline">
              {part.text}
            </span>
          );
        }
        if (part.bold) {
          return (
            <span key={key} className="font-medium text-zinc-800 dark:text-zinc-100">
              {part.text}
            </span>
          );
        }
        return <span key={key}>{part.text}</span>;
      })}
      {base ? <span className="sr-only">{base}</span> : null}
    </>
  );
}

function TableBlock({ block }: { block: Extract<Block, { type: "table" }> }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <tr>
            {block.columns.map((col, i) => (
              <th key={i} className="px-4 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-600 dark:divide-zinc-800 dark:text-zinc-400">
          {block.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 text-[15px] leading-[1.8] text-zinc-600 first:mt-0 dark:text-zinc-400">
          <RichText parts={block.content} />
        </p>
      );
    case "h2":
      return (
        <h2 className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-zinc-900 first:mt-0 dark:text-zinc-100">
          <RichText parts={block.content} />
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <RichText parts={block.content} />
        </h3>
      );
    case "list": {
      const cls =
        "mt-4 space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400";
      if (block.ordered) {
        return (
          <ol className={`${cls} list-decimal`}>
            {block.items.map((item, i) => (
              <li key={i}>
                <RichText parts={item} />
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className={`${cls} list-disc`}>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText parts={item} />
            </li>
          ))}
        </ul>
      );
    }
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-[12.5px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
          <code>{block.content}</code>
        </pre>
      );
    case "note": {
      const styles =
        block.tone === "warning"
          ? "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/30"
          : "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/30";
      const textStyles =
        block.tone === "warning"
          ? "text-amber-800 dark:text-amber-300"
          : "text-emerald-800 dark:text-emerald-300";
      return (
        <div className={`mt-8 rounded-2xl border p-6 ${styles}`}>
          {block.title ? (
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {block.title}
            </p>
          ) : null}
          <p className={`mt-2 text-sm font-medium leading-relaxed ${textStyles}`}>
            <RichText parts={block.content} />
          </p>
        </div>
      );
    }
    case "table":
      return <TableBlock block={block} />;
    default:
      return null;
  }
}

export default async function GuideRenderer({ doc }: { doc: GuideDocument }) {
  const locale = await getRouteLocale();
  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const tSidebar = await getTranslations({ locale, namespace: "Sidebar" });
  const tA11y = await getTranslations({ locale, namespace: "A11y" });

  const { meta, blocks } = doc;
  return (
    <main className="flex flex-1 flex-col items-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-3xl">
        <Breadcrumbs
          label={tA11y("breadcrumb")}
          items={[
            { label: tSeo("home"), href: "/" },
            { label: tSidebar("guides"), href: "/guides" },
            { label: meta.title },
          ]}
        />
      </div>
      <article className="w-full max-w-3xl animate-fade-in">
        {/* Başlık bölgesi */}
        <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800/60">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            {meta.eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{meta.readingTime}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <time>{meta.updatedDate}</time>
          </p>
        </header>

        {/* Gövde */}
        <div className="pb-12 pt-2">
          {blocks.map((block, index) => (
            <div key={index}>
              <BlockRenderer block={block} />
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}