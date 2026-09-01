'use client';

import { useState } from 'react';
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

/** < , > , & , " , ' karakterlerini HTML entity'lerine cevirir (& ilk olmalidir). */
function encodeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Entity'lari (adli ve sayisal) tekrar orijinal karakterlere cevirir. */
function decodeHtml(input: string): string {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCharCode(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

export default function HtmlEncodeDecode() {
  const [html, setHtml] = useState('');
  const [encoded, setEncoded] = useState('');

  const handleHtmlChange = (value: string) => {
    setHtml(value);
    setEncoded(encodeHtml(value));
  };

  const handleEncodedChange = (value: string) => {
    setEncoded(value);
    const decoded = decodeHtml(value);
    setHtml(decoded === value ? html : decoded);
  };

  return (
    <ConverterShell from="HTML" to="Entities">
      <ConverterHeading
        title="HTML Encode / Decode"
        description="Type in either box and the other updates instantly — escape tags into &lt; &gt; entities, or decode them back. Both run in your browser."
      />

      <div className="flex w-full flex-col gap-3">
        <label className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            HTML <span className="text-zinc-400 dark:text-zinc-600">(readable)</span>
          </span>
          <CopyButton value={html} />
        </label>
        <textarea
          value={html}
          onChange={(e) => handleHtmlChange(e.target.value)}
          placeholder="<h1>Hello world</h1>"
          rows={6}
          spellCheck={false}
          className="w-full resize-none rounded-2xl border border-lime-200 bg-lime-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-lime-400 dark:border-lime-900/50 dark:bg-lime-950/10 dark:text-zinc-100 dark:focus:border-lime-700/50"
        />

        <div className="flex items-center justify-center gap-2 py-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <svg
            className="h-4 w-4 text-lime-600 dark:text-lime-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h12m0 0l-3-3m3 3l-3 3M17 17H5m0 0l3 3m-3-3l3-3"
            />
          </svg>
          <span>Edit either side — the other updates instantly</span>
        </div>

        <label className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Encoded (entities)
          </span>
          <CopyButton value={encoded} />
        </label>
        <textarea
          value={encoded}
          onChange={(e) => handleEncodedChange(e.target.value)}
          placeholder="&lt;h1&gt;Hello world&lt;/h1&gt;"
          rows={6}
          spellCheck={false}
          className="w-full resize-none rounded-2xl border border-lime-200 bg-lime-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-lime-400 dark:border-lime-900/50 dark:bg-lime-950/10 dark:text-zinc-100 dark:focus:border-lime-700/50"
        />
      </div>
    </ConverterShell>
  );
}