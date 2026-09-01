'use client';

import { useMemo, useState } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
}

/** Okunabilir bir Unix deger satiri: etiket + deger + kopyala */
function OutputRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-sky-200/70 bg-white px-4 py-3 dark:border-sky-900/40 dark:bg-zinc-900/60">
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">{label}</p>
        <p className="mt-1 break-all font-mono text-sm text-zinc-800 dark:text-zinc-100">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export default function UnixTimestamp() {
  // Panel 1: Unix zaman damgasi -> tarih
  const [ts, setTs] = useState('');
  const tsMs = useMemo(() => {
    const n = Number(ts.trim());
    if (!ts.trim() || Number.isNaN(n) || n <= 0) return null;
    // 1e11 ve uzeri milisaniye (10 basamak = saniye), alti saniye kabul edilir.
    return n > 1e11 ? n : Math.round(n * 1000);
  }, [ts]);

  const localDate = tsMs ? new Date(tsMs).toLocaleString() : '';
  const utcDate = tsMs ? new Date(tsMs).toUTCString() : '';
  const isoDate = tsMs ? new Date(tsMs).toISOString() : '';

  // Panel 2: tarih -> Unix zaman damgasi
  const [dateStr, setDateStr] = useState('');
  const dateMs = useMemo(() => {
    if (!dateStr) return null;
    const t = new Date(dateStr).getTime();
    return Number.isNaN(t) ? null : t;
  }, [dateStr]);

  const unixSeconds = dateMs == null ? '' : String(Math.floor(dateMs / 1000));
  const unixMillis = dateMs == null ? '' : String(dateMs);

  return (
    <ConverterShell from="Timestamp" to="Date">
      <ConverterHeading
        title="Unix Timestamp Converter"
        description="Convert Unix epoch timestamps to human-readable dates, and dates back to Unix timestamps — instantly, in your browser."
      />

      <div className="flex w-full flex-col gap-8">
        {/* Timestamp -> Date */}
        <section className="flex w-full flex-col gap-3">
          <label className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Unix Timestamp <span className="text-zinc-400 dark:text-zinc-600">(sec or ms)</span>
            </span>
            <CopyButton value={ts} />
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={ts}
            onChange={(e) => setTs(e.target.value)}
            placeholder="1779377600"
            spellCheck={false}
            className="w-full rounded-2xl border border-sky-200 bg-sky-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-sky-400 dark:border-sky-900/50 dark:bg-sky-950/10 dark:text-zinc-100 dark:focus:border-sky-700/50"
          />
          <div className="flex flex-col gap-2">
            <OutputRow label="Local Time" value={localDate} />
            <OutputRow label="UTC Time" value={utcDate} />
            <OutputRow label="ISO 8601" value={isoDate} />
          </div>
        </section>

        {/* Date -> Timestamp */}
        <section className="flex w-full flex-col gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800/60">
          <label className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Date &amp; Time
            </span>
          </label>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full rounded-2xl border border-sky-200 bg-sky-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none focus:border-sky-400 dark:border-sky-900/50 dark:bg-sky-950/10 dark:text-zinc-100 dark:focus:border-sky-700/50 [color-scheme:dark]"
          />
          <div className="flex flex-col gap-2">
            <OutputRow label="Seconds" value={unixSeconds} />
            <OutputRow label="Milliseconds" value={unixMillis} />
          </div>
        </section>
      </div>
    </ConverterShell>
  );
}
