'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
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

type Mode = 'auto' | 'css' | 'js';

/**
 * Hafif, regex tabanli minifier. Zigzag taramasi sirasinda string/template
 * literallerin icini korur (// ve /* yorum kalibi ile \s bosluk + satir sonu
 * desenleri regex ile ayiklanir); sonuc tek satirdir.
 */
function minify(code: string): string {
  let out = '';
  let i = 0;
  const n = code.length;
  let quote: string | null = null; // '"' | "'" | '`'

  while (i < n) {
    const c = code[i];
    const next = code[i + 1];

    // Yorumlar (string disinda)
    if (quote === null && c === '/' && next === '/') {
      while (i < n && code[i] !== '\n') i++;
      continue;
    }
    if (quote === null && c === '/' && next === '*') {
      i += 2;
      while (i < n && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i += 2;
      continue;
    }

    // String literallerinin baslangici
    if (quote === null && (c === '"' || c === "'" || c === '`')) {
      quote = c;
      out += c;
      i++;
      continue;
    }
    if (quote !== null) {
      if (c === '\\') {
        out += c;
        if (i + 1 < n) {
          out += code[i + 1]; // escape edilen karakteri koru
          i += 2;
        } else i++;
      } else {
        out += c;
        if (c === quote) quote = null;
        i++;
      }
      continue;
    }

    // Disarida beyaz bosluk: daralt ve aradaki tek boslugu koru
    if (/\s/.test(c)) {
      let j = i;
      while (j < n && /\s/.test(code[j])) j++;
      const prev = out[out.length - 1];
      const nextChar = code[j];
      // Iki sozcuk/anahtar ard araya gelirse tek bosluk birak
      if (prev !== undefined && nextChar !== undefined && /\w/.test(prev) && /\w/.test(nextChar)) {
        out += ' ';
      }
      i = j;
      continue;
    }

    out += c;
    i++;
  }

  return out.trim();
}

/** Kod orneginden turu tahmin eder (auto modu icin). */
function detectMode(code: string): 'css' | 'js' {
  if (
    /(function\s|=>|\bconst\b|\blet\b|\bvar\b|console\.|document\.|window\.)/.test(code) ||
    /[)]\s*[{]/.test(code)
  ) {
    return 'js';
  }
  return 'css';
}

const TABS: { value: Mode; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'css', label: 'CSS' },
  { value: 'js', label: 'JavaScript' },
];

export default function CssJsMinifier() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('auto');

  const applied: 'css' | 'js' = mode === 'auto' ? detectMode(input) : mode;
  const output = useMemo(
    () => (input.trim() ? minify(input) : ''),
    [input]
  );

  const saved =
    input.trim() && output
      ? Math.round(((input.length - output.length) / input.length) * 100)
      : 0;

  return (
    <ConverterShell from="CSS / JS" to="Minified">
      <ConverterHeading
        title="CSS / JS Minifier"
        description="Paste CSS or JavaScript, pick a mode, and regex will strip comments and collapse whitespace — down to a single compact line, right in your browser."
      />

      <div className="flex w-full flex-col gap-4">
        {/* Mod secici */}
        <div className="flex rounded-xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setMode(tab.value)}
              className={cn(
                'flex-1 rounded-lg px-3 py-2 font-mono text-xs transition-colors',
                mode === tab.value
                  ? 'bg-orange-600 font-medium text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your CSS or JavaScript here…"
          rows={9}
          spellCheck={false}
          className="w-full resize-none rounded-2xl border border-orange-200 bg-orange-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-orange-400 dark:border-orange-900/50 dark:bg-orange-950/10 dark:text-zinc-100 dark:focus:border-orange-700/50"
        />

        {input.trim() && (
          <div className="flex items-center justify-between rounded-xl border border-orange-200/70 bg-white px-4 py-2.5 font-mono text-xs text-zinc-500 shadow-sm dark:border-orange-900/40 dark:bg-zinc-900/60 dark:text-zinc-400">
            <span>
              {input.length.toLocaleString()} → {output.length.toLocaleString()} chars
            </span>
            <span className="text-emerald-600 dark:text-emerald-400">−{saved}%</span>
          </div>
        )}

        <label className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Minified Output <span className="text-zinc-400 dark:text-zinc-600">({applied})</span>
          </span>
          <CopyButton value={output} />
        </label>
        <textarea
          value={output}
          readOnly
          rows={9}
          spellCheck={false}
          placeholder="Minified code appears here…"
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-100"
        />
      </div>
    </ConverterShell>
  );
}