'use client';

import { useMemo, useState } from 'react';
import { ConverterHeading, ConverterShell, ErrorBanner } from './ConverterShell';

const EXAMPLE =
  'https://user:pass@shop.example.com:8443/products/page/2?sort=price&order=asc&category=Shoes%20%26%20Boots#reviews';

function Row({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-zinc-200/80 px-4 py-2.5 last:border-0 dark:border-zinc-800/60">
      <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
        {label}
      </span>
      <span className="break-all font-mono text-sm text-zinc-800 dark:text-zinc-200">
        {value === null ? '—' : value}
      </span>
    </div>
  );
}

export default function UrlParser() {
  const [input, setInput] = useState(EXAMPLE);

  const parsed = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { url: null, query: null as [string, string][] | null, error: null };
    try {
      const url = new URL(trimmed);
      const query: [string, string][] = [];
      url.searchParams.forEach((value, key) => query.push([key, value]));
      return { url, query, error: null };
    } catch {
      return { url: null, query: null, error: 'Invalid URL. Make sure it includes a scheme (e.g. https://...).' };
    }
  }, [input]);

  return (
    <ConverterShell from="URL" to="Params">
      <ConverterHeading
        title="URL Parameter Parser"
        description="Paste any URL and instantly break it into its parts — protocol, host, path and every query parameter — as a readable table, all in your browser."
      />

      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            rows={3}
            placeholder={EXAMPLE}
            className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-3 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-100 dark:focus:border-zinc-600"
          />
          <button
            type="button"
            onClick={() => setInput(EXAMPLE)}
            className="self-end rounded-lg border border-zinc-200 bg-white px-3 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            Load example
          </button>
        </div>

        {parsed.error ? (
          <ErrorBanner message={parsed.error} />
        ) : (
          parsed.url && (
            <>
              <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <Row label="Protocol" value={parsed.url.protocol.replace(':', '')} />
                <Row label="Host" value={parsed.url.host} />
                <Row label="Hostname" value={parsed.url.hostname} />
                <Row
                  label="Port"
                  value={parsed.url.port ? `:${parsed.url.port}` : null}
                />
                <Row label="Path" value={parsed.url.pathname || null} />
                <Row label="Search" value={parsed.url.search || null} />
                <Row label="Hash" value={parsed.url.hash || null} />
                <Row label="Username" value={parsed.url.username || null} />
                <Row label="Password" value={parsed.url.password ? '••••' : null} />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  Query Parameters ({parsed.query?.length ?? 0})
                </p>
                {parsed.query && parsed.query.length > 0 ? (
                  <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    {parsed.query.map(([key, value]) => (
                      <Row key={key} label={key} value={decodeURIComponent(value)} />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-zinc-200 p-4 text-center font-mono text-sm text-zinc-400 dark:border-zinc-800">
                    No query parameters
                  </p>
                )}
              </div>
            </>
          )
        )}
      </div>
    </ConverterShell>
  );
}
