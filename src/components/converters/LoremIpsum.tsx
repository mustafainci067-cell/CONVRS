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

/* Klasik Lorem Ipsum sozcuk bankasi */
const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit',
  'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
];

/** Deterministik PRNG (mulberry32) — ayni seed ayni ciktigi verir (hydration guvenli). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rnd: () => number, arr: string[]) => arr[Math.floor(rnd() * arr.length)];
const caps = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

function sentence(rnd: () => number): string {
  const count = 6 + Math.floor(rnd() * 8); // 6-13 sozcuk
  const body = Array.from({ length: count }, () => pick(rnd, WORDS)).join(' ');
  return `${caps(body)}.`;
}

function paragraph(rnd: () => number): string {
  const count = 4 + Math.floor(rnd() * 3); // 4-6 cumle
  return Array.from({ length: count }, () => sentence(rnd)).join(' ');
}

type Mode = 'paragraphs' | 'sentences' | 'words';

function generate(mode: Mode, count: number, seed: number): string {
  if (count <= 0) return '';
  const rnd = mulberry32(seed);
  if (mode === 'paragraphs') {
    return Array.from({ length: count }, () => paragraph(rnd)).join('\n\n');
  }
  if (mode === 'sentences') {
    return Array.from({ length: count }, () => sentence(rnd)).join(' ');
  }
  // words
  return Array.from({ length: count }, () => pick(rnd, WORDS)).join(' ');
}

const MODES: { value: Mode; label: string }[] = [
  { value: 'paragraphs', label: 'Paragraphs' },
  { value: 'sentences', label: 'Sentences' },
  { value: 'words', label: 'Words' },
];

export default function LoremIpsum() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState(42); // Sabit baslangic: SSR/hydration tutarli

  const output = useMemo(() => generate(mode, count, seed), [mode, count, seed]);

  return (
    <ConverterShell from="Dummy" to="Lorem Ipsum">
      <ConverterHeading
        title="Lorem Ipsum Generator"
        description="Pick a length and type — classic placeholder text is generated instantly. It runs entirely on this page, with nothing sent to a server."
      />

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          {/* Tur secimi */}
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Type
            </span>
            <div className="flex rounded-xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  className={
                    mode === m.value
                      ? 'flex-1 rounded-lg bg-indigo-600 px-3 py-2 font-mono text-xs font-medium text-zinc-50'
                      : 'flex-1 rounded-lg px-3 py-2 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200'
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Adet */}
          <label className="flex flex-1 flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Count
            </span>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="w-full rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 font-mono text-sm text-zinc-800 shadow-sm outline-none focus:border-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-950/10 dark:text-zinc-100 dark:focus:border-indigo-700/50"
            />
          </label>

          <button
            type="button"
            onClick={() => setSeed(Math.floor(Math.random() * 1_000_000_000))}
            className="rounded-xl border border-indigo-200 bg-white px-5 py-2.5 font-medium text-indigo-700 shadow-sm transition-all hover:bg-indigo-50 active:scale-[0.99] dark:border-indigo-900/50 dark:bg-zinc-900 dark:text-indigo-300 dark:hover:bg-zinc-800"
          >
            Generate
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Output
          </span>
          <CopyButton value={output} />
        </div>
        <textarea
          value={output}
          readOnly
          rows={10}
          spellCheck={false}
          placeholder="Generated Lorem Ipsum appears here…"
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-100"
        />
      </div>
    </ConverterShell>
  );
}