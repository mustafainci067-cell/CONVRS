'use client';

import { useEffect, useState } from 'react';
import { ConverterHeading, ConverterShell, ErrorBanner } from './ConverterShell';

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-512'] as const;
type Algorithm = (typeof ALGORITHMS)[number];

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

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hashText(algorithm: Algorithm, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  return bytesToHex(await crypto.subtle.digest(algorithm, data));
}

export default function HashGenerator() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<Record<Algorithm, string>>({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-512': '',
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Metin degistikce Web Crypto ile aninda turetim
  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      if (!text.trim()) {
        setResults({ 'SHA-1': '', 'SHA-256': '', 'SHA-512': '' });
        return;
      }
      try {
        if (!crypto?.subtle) {
          throw new Error('Web Crypto API bu tarayıcıda kullanılamıyor.');
        }
        const [sha1, sha256, sha512] = await Promise.all(
          ALGORITHMS.map((algo) => hashText(algo, text))
        );
        if (cancelled) return;
        setResults({ 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-512': sha512 });
        setErrorMsg(null);
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setErrorMsg('Hash üretilirken bir hata oluştu.');
      }
    };
    void compute();
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <ConverterShell from="Text" to="Hash">
      <ConverterHeading
        title="Hash Generator"
        description="Type any text and watch SHA-1, SHA-256 and SHA-512 hashes appear instantly — computed right in your browser with the native Web Crypto API."
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to hash..."
        rows={4}
        spellCheck={false}
        className="w-full resize-none rounded-2xl border border-orange-200 bg-orange-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-orange-400 dark:border-orange-900/50 dark:bg-orange-950/10 dark:text-zinc-100 dark:focus:border-orange-700/50"
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {results['SHA-1'] && (
        <div className="flex w-full flex-col gap-4">
          {ALGORITHMS.map((algo) => (
            <div key={algo} className="flex flex-col gap-2">
              <label className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {algo}
                </span>
                <CopyButton value={results[algo]} />
              </label>
              <pre className="max-h-40 w-full overflow-auto rounded-xl border border-orange-200 bg-orange-50 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all text-zinc-700 dark:border-orange-900/30 dark:bg-orange-950/30 dark:text-zinc-300">
                {results[algo]}
              </pre>
            </div>
          ))}
        </div>
      )}
    </ConverterShell>
  );
}
