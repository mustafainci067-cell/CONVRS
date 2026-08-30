'use client';

import { useState } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';

/** Her textarea'nin ayrı kopyalama butonu */
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

export default function UrlConverter() {
  const [text, setText] = useState('');
  const [encoded, setEncoded] = useState('');

  const handleTextChange = (value: string) => {
    setText(value);
    setEncoded(encodeURIComponent(value));
  };

  const handleEncodedChange = (value: string) => {
    setEncoded(value);
    try {
      setText(decodeURIComponent(value));
    } catch {
      // Eksik/hatalı bir escape dizisi (örn. tek başına "%") yazılırken
      // "Text" alanı son geçerli değerinde kalır.
    }
  };

  return (
    <ConverterShell from="Text" to="URL Encoded">
      <ConverterHeading
        title="URL Encode / Decode"
        description="Type in either box and the other updates instantly. All percent-encoding happens in your browser — nothing leaves this device."
      />

      <div className="flex w-full flex-col gap-3">
        <label className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Text <span className="text-zinc-400 dark:text-zinc-600">(decoded)</span>
          </span>
          <CopyButton value={text} />
        </label>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Normal metni veya URL'yi buraya yazın..."
          rows={6}
          className="w-full resize-none rounded-2xl border border-violet-200 bg-violet-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-violet-400 dark:border-violet-900/50 dark:bg-violet-950/10 dark:text-zinc-100 dark:focus:border-violet-700/50"
        />

        <div className="flex items-center justify-center gap-2 py-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <svg
            className="h-4 w-4 text-violet-500 dark:text-violet-400"
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
          <span>Her iki alan da düzenlenebilir — biri yazılınca diğeri anında güncellenir</span>
        </div>

        <label className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Encoded URL
          </span>
          <CopyButton value={encoded} />
        </label>
        <textarea
          value={encoded}
          onChange={(e) => handleEncodedChange(e.target.value)}
          placeholder="Encode edilmiş URL'yi buraya yapıştırın..."
          rows={6}
          spellCheck={false}
          className="w-full resize-none rounded-2xl border border-violet-200 bg-violet-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-violet-400 dark:border-violet-900/50 dark:bg-violet-950/10 dark:text-zinc-100 dark:focus:border-violet-700/50"
        />
      </div>
    </ConverterShell>
  );
}