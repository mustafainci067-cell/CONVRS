import type { Block, LegalDocument, Rich } from "@/i18n/legal/types";
import { Link } from "@/i18n/navigation";

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
              className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800"
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
            <span key={key} className="font-medium text-zinc-800 dark:text-zinc-200">
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
    <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
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

function BlockRenderer({ block, index }: { block: Block; index: number }) {
  switch (block.type) {
    case "p": {
      // İlk paragraf bölüm başlığına daha yakın, sonrakiler hafif aralıklı
      const cls =
        index === 0
          ? "mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
          : "mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400";
      return (
        <p className={cls}>
          <RichText parts={block.content} />
        </p>
      );
    }
    case "h4":
      return (
        <h4 className="mt-5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          <RichText parts={block.content} />
        </h4>
      );
    case "list":
      return (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText parts={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return <TableBlock block={block} />;
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
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {block.title}
            </h2>
          ) : null}
          <p className={`mt-3 text-base font-medium leading-relaxed ${textStyles}`}>
            <RichText parts={block.content} />
          </p>
        </div>
      );
    }
    case "contact":
      return (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="font-medium text-zinc-800 dark:text-zinc-200">{block.title}</p>
          {block.lines.map((line, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "mt-2 text-zinc-600 dark:text-zinc-400"
                  : "mt-1 text-zinc-600 dark:text-zinc-400"
              }
            >
              <RichText parts={line} />
            </p>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function LegalRenderer({ doc }: { doc: LegalDocument }) {
  return (
    <main className="flex flex-1 flex-col items-center p-8 font-sans">
      <div className="w-full max-w-3xl animate-fade-in">
        <header className="border-b border-zinc-200 pt-6 pb-8 dark:border-zinc-800/60">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
            {doc.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {doc.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {doc.updatedLabel} {doc.updatedDate}
          </p>
          {doc.scope ? (
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{doc.scope}</p>
          ) : null}
        </header>

        {doc.note ? <BlockRenderer block={doc.note} index={0} /> : null}

        {doc.intro?.map((para, i) => (
          <p
            key={i}
            className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            <RichText parts={para} />
          </p>
        ))}

        {doc.sections.map((section, i) => (
          <section key={i} className={section.divider ? "mt-8 border-t border-zinc-200 pb-4 pt-8 dark:border-zinc-800/60" : "mt-8"}>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              <RichText parts={section.heading} />
            </h3>
            {section.blocks.map((block, j) => (
              <BlockRenderer key={j} block={block} index={j} />
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}