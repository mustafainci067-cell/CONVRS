'use client';

import { useState } from 'react';
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

type Options = {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
};

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

/** Secili karakter setlerinden charset boyutunu hesaplar (entropi icin). */
function charsetSize(o: Options): number {
  return (
    (o.lower ? LOWERCASE.length : 0) +
    (o.upper ? UPPERCASE.length : 0) +
    (o.numbers ? NUMBERS.length : 0) +
    (o.symbols ? SYMBOLS.length : 0)
  );
}

/** crypto.getRandomValues ile kriptografik guvenli rastgele sifre uretir. */
function generatePassword(o: Options): string {
  const pool = [
    o.lower ? LOWERCASE : '',
    o.upper ? UPPERCASE : '',
    o.numbers ? NUMBERS : '',
    o.symbols ? SYMBOLS : '',
  ].join('');
  if (!pool) return '';

  const bytes = new Uint32Array(o.length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (n) => pool[n % pool.length]).join('');
}

function strength(o: Options): { label: string; color: string; pct: number } {
  const bits = o.length * Math.log2(charsetSize(o));
  if (bits < 45) return { label: 'Weak', color: 'bg-red-500', pct: 33 };
  if (bits < 80) return { label: 'Good', color: 'bg-amber-500', pct: 66 };
  return { label: 'Strong', color: 'bg-emerald-500', pct: 100 };
}

const CHARSET_OPTIONS: { key: keyof Omit<Options, 'length'>; label: string }[] = [
  { key: 'upper', label: 'A-Z' },
  { key: 'lower', label: 'a-z' },
  { key: 'numbers', label: '0-9' },
  { key: 'symbols', label: '!@#$' },
];

export default function PasswordGenerator() {
  const [options, setOptions] = useState<Options>({
    length: 20,
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState('');

  const applyChange = (next: Options) => {
    // Hicbir karakter seti secili kalmazsa son secilen kaldirilmis sayilmaz.
    if (!(next.upper || next.lower || next.numbers || next.symbols)) next.upper = true;
    setOptions(next);
    setPassword(generatePassword(next));
  };

  const st = strength(options);

  return (
    <ConverterShell from="Random" to="Password">
      <ConverterHeading
        title="Password Generator"
        description="Pick a length with the slider and toggle character types — a strong, cryptographically random password is generated instantly. Nothing leaves your browser."
      />

      <div className="flex w-full flex-col gap-5">
        {/* Uzunluk slider */}
        <label className="space-y-2">
          <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Length
            <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              {options.length}
            </span>
          </span>
          <input
            type="range"
            min={6}
            max={64}
            value={options.length}
            onChange={(e) => applyChange({ ...options, length: Number(e.target.value) })}
            className="w-full accent-rose-600"
          />
        </label>

        {/* Karakter seti toggle'lari */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CHARSET_OPTIONS.map(({ key, label }) => {
            const checked = options[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => applyChange({ ...options, [key]: !checked })}
                aria-pressed={checked}
                className={cn(
                  'rounded-xl border px-3 py-2.5 font-mono text-xs font-medium transition-colors',
                  checked
                    ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/20 dark:text-rose-300'
                    : 'border-zinc-200 bg-white text-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Gucluluk gostergesi */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Strength
            <span className="text-rose-600 dark:text-rose-400">{st.label}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className={cn('h-full rounded-full transition-all', st.color)}
              style={{ width: `${st.pct}%` }}
            />
          </div>
        </div>

        {/* Sifre ciktisi */}
        <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/10">
          <p className="min-w-0 break-all px-1 font-mono text-lg tracking-tight text-rose-900 dark:text-rose-100">
            {password || 'Adjust options or tap Generate…'}
          </p>
          {password && <CopyButton value={password} />}
        </div>

        <button
          type="button"
          onClick={() => {
            setOptions(options);
            setPassword(generatePassword(options));
          }}
          className="w-full rounded-xl bg-rose-600 py-3 font-medium text-zinc-50 shadow-lg transition-all hover:bg-rose-500 active:scale-[0.99]"
        >
          Generate
        </button>
      </div>
    </ConverterShell>
  );
}
