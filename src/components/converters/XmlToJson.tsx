'use client';

import { useState } from 'react';
import { xmlToJson } from '@/lib/xml';
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

export default function XmlToJson() {
  const [xml, setXml] = useState('');
  const [json, setJson] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setXml(value);

    if (!value.trim()) {
      setJson('');
      setErrorMsg(null);
      return;
    }

    try {
      setJson(JSON.stringify(xmlToJson(value), null, 2));
      setErrorMsg(null);
    } catch (err) {
      setJson('');
      setErrorMsg(
        err instanceof Error ? `XML çözümlenemedi: ${err.message}` : 'XML çözümlenemedi'
      );
    }
  };

  return (
    <ConverterShell from="XML" to="JSON">
      <ConverterHeading
        title="XML to JSON Converter"
        description="Paste XML and watch valid JSON appear live. Parsed entirely in your browser with the native DOMParser — nothing is sent to a server."
      />

      <div className="flex w-full flex-col gap-3">
        <label className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            XML Input
          </span>
          <CopyButton value={xml} />
        </label>
        <textarea
          value={xml}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="XML içeriğini buraya yapıştırın..."
          rows={8}
          spellCheck={false}
          className="w-full resize-none rounded-2xl border border-amber-200 bg-amber-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-amber-400 dark:border-amber-900/50 dark:bg-amber-950/10 dark:text-zinc-100 dark:focus:border-amber-700/50"
        />

        <div className="flex items-center justify-center gap-2 py-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <svg
            className="h-4 w-4 text-amber-500 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v14m0 0l-6-6m6 6l6-6"
            />
          </svg>
          <span>Girdi anında JSON'a dönüştürülür</span>
        </div>

        <label className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            JSON Output
          </span>
          <CopyButton value={json} />
        </label>
        <textarea
          value={json}
          readOnly
          placeholder="Dönüştürülen JSON burada görünecek..."
          rows={10}
          spellCheck={false}
          className="w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-700 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:focus:border-zinc-600"
        />
      </div>

      {errorMsg && <ErrorBanner message={errorMsg} />}
    </ConverterShell>
  );
}