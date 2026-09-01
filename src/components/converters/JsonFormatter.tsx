'use client';

import { useState } from 'react';
import { ConverterHeading, ConverterShell, ErrorBanner } from './ConverterShell';

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

type Notice = { kind: 'ok' | 'error'; message: string } | null;

/** Girilen metni parse eder; basariliysa ciktiyi uretir, degilse hata dondurur. */
function parse(fn: (parsed: unknown) => string, input: string) {
  try {
    return { ok: true as const, output: fn(JSON.parse(input)) };
  } catch (err) {
    return {
      ok: false as const,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [notice, setNotice] = useState<Notice>(null);

  const format = () => {
    const res = parse((v) => JSON.stringify(v, null, 2), input);
    if (res.ok) {
      setOutput(res.output);
      setNotice({ kind: 'ok', message: 'Valid JSON ✓' });
    } else {
      setOutput('');
      setNotice({ kind: 'error', message: res.message });
    }
  };

  const minify = () => {
    const res = parse((v) => JSON.stringify(v), input);
    if (res.ok) {
      setOutput(res.output);
      setNotice({ kind: 'ok', message: 'Valid JSON ✓' });
    } else {
      setOutput('');
      setNotice({ kind: 'error', message: res.message });
    }
  };

  const hasInput = input.trim().length > 0;

  return (
    <ConverterShell from="JSON" to="Pretty JSON">
      <ConverterHeading
        title="JSON Formatter & Validator"
        description="Paste any messy JSON and format it into clean, indented output — or get a precise error message. Everything runs in your browser."
      />

      <div className="flex w-full flex-col gap-3">
        <label className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Input JSON
          </span>
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"dağınık":   "json", ...}'
          rows={8}
          spellCheck={false}
          className="w-full resize-none rounded-2xl border border-amber-200 bg-amber-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-amber-400 dark:border-amber-900/50 dark:bg-amber-950/10 dark:text-zinc-100 dark:focus:border-amber-700/50"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={format}
            disabled={!hasInput}
            className="flex-1 rounded-xl bg-amber-500 py-3 font-medium text-zinc-900 shadow-lg transition-all hover:bg-amber-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Format
          </button>
          <button
            type="button"
            onClick={minify}
            disabled={!hasInput}
            className="flex-1 rounded-xl border border-amber-200 bg-white py-3 font-medium text-amber-700 shadow-sm transition-all hover:bg-amber-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-900/50 dark:bg-zinc-900 dark:text-amber-300 dark:hover:bg-zinc-800"
          >
            Minify
          </button>
        </div>

        {notice?.kind === 'error' && <ErrorBanner message={`JSON parse error: ${notice.message}`} />}
        {notice?.kind === 'ok' && (
          <div
            role="status"
            className="w-full break-words rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center font-mono text-xs text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400"
          >
            {notice.message}
          </div>
        )}

        <label className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Output
          </span>
          <CopyButton value={output} />
        </label>
        <textarea
          value={output}
          readOnly
          rows={8}
          spellCheck={false}
          placeholder="Formatted JSON appears here…"
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-100"
        />
      </div>
    </ConverterShell>
  );
}
