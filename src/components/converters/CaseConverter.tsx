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

/** Karisik girdiyi (spaces, -. _, camelCase) tek tek sozcuklere ayirir. */
function splitToWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // camelCase siniri
    .replace(/[_\-\s]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

function toUpper(input: string) {
  return input.toUpperCase();
}
function toLower(input: string) {
  return input.toLowerCase();
}
function toTitle(input: string) {
  return splitToWords(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
function toCamel(input: string) {
  return splitToWords(input)
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join('');
}
function toSnake(input: string) {
  return splitToWords(input)
    .map((w) => w.toLowerCase())
    .join('_');
}

type Output = { key: string; label: string; value: string };

export default function CaseConverter() {
  const [input, setInput] = useState('');

  const outputs = useMemo<Output[]>(() => {
    if (!input.trim()) return [];
    return [
      { key: 'upper', label: 'UPPERCASE', value: toUpper(input.trim()) },
      { key: 'lower', label: 'lowercase', value: toLower(input.trim()) },
      { key: 'title', label: 'Title Case', value: toTitle(input) },
      { key: 'camel', label: 'camelCase', value: toCamel(input) },
      { key: 'snake', label: 'snake_case', value: toSnake(input) },
    ];
  }, [input]);

  return (
    <ConverterShell from="Text" to="Cases">
      <ConverterHeading
        title="Case Converter"
        description="Type any text and watch it transform into UPPERCASE, lowercase, Title Case, camelCase and snake_case — live, in your browser."
      />

      <div className="flex w-full flex-col gap-3">
        <label className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Input Text
          </span>
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write anything, e.g. quick-brown_fox jumpsOver…"
          rows={5}
          className="w-full resize-none rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-emerald-400 dark:border-emerald-900/50 dark:bg-emerald-950/10 dark:text-zinc-100 dark:focus:border-emerald-700/50"
        />

        {outputs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-200 p-6 text-center font-mono text-xs text-zinc-400 dark:border-zinc-800">
            Converted results appear here…
          </p>
        ) : (
          <div className="flex w-full flex-col gap-3">
            {outputs.map((out) => (
              <div
                key={out.key}
                className="flex items-center justify-between gap-4 rounded-xl border border-emerald-200/70 bg-white px-4 py-3 shadow-sm dark:border-emerald-900/40 dark:bg-zinc-900/60"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {out.label}
                  </p>
                  <p className="mt-1 break-all font-mono text-sm text-zinc-800 dark:text-zinc-100">
                    {out.value}
                  </p>
                </div>
                <CopyButton value={out.value} />
              </div>
            ))}
          </div>
        )}
      </div>
    </ConverterShell>
  );
}
