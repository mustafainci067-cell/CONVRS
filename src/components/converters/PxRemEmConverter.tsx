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

type Unit = 'px' | 'rem' | 'em';

const UNITS: Unit[] = ['px', 'rem', 'em'];

/** Sayiyi 3 ondalik basamaga yuvarlayip sondaki sifirlari temizler. */
function fmt(n: number): string {
  const rounded = Math.round(n * 1000) / 1000;
  return rounded.toString();
}

function OutputRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-fuchsia-200/70 bg-white px-4 py-3 shadow-sm dark:border-fuchsia-900/40 dark:bg-zinc-900/60">
      <p className="font-mono text-[11px] uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <span className="break-all font-mono text-sm text-zinc-800 dark:text-zinc-100">{value}</span>
        <CopyButton value={value} />
      </div>
    </div>
  );
}

export default function PxRemEmConverter() {
  const [base, setBase] = useState<number>(16);
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<Unit>('px');

  const num = parseFloat(value);
  const valid = Number.isFinite(num) && num >= 0;

  const px = valid ? (unit === 'px' ? num : num * base) : null;
  const rem = valid ? (unit === 'rem' ? num : px! / base) : null;
  const em = valid ? (unit === 'em' ? num : px! / base) : null;

  return (
    <ConverterShell from="PX" to="REM / EM">
      <ConverterHeading
        title="PX ↔ REM / EM Converter"
        description="Convert pixel sizes to rem/em and back, with an adjustable base font size (default 16px). CSS sizing made instant — entirely in your browser."
      />

      <div className="flex w-full flex-col gap-4">
        {/* Temel font boyutu */}
        <label className="space-y-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Base font size
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              step={0.5}
              value={base}
              onChange={(e) => setBase(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-2.5 font-mono text-sm text-zinc-800 shadow-sm outline-none focus:border-fuchsia-400 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/10 dark:text-zinc-100 dark:focus:border-fuchsia-700/50"
            />
            <span className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 font-mono text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              px
            </span>
          </div>
        </label>

        {/* Deger + birim */}
        <label className="space-y-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Value
          </span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="number"
              min={0}
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="16"
              className="w-full flex-1 rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-2.5 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-fuchsia-400 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/10 dark:text-zinc-100 dark:focus:border-fuchsia-700/50"
            />
            <div className="flex rounded-xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              {UNITS.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={cn(
                    'flex-1 rounded-lg px-4 py-2 font-mono text-xs transition-colors sm:flex-none',
                    unit === u
                      ? 'bg-fuchsia-600 font-medium text-zinc-50'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </label>

        <div className="flex flex-col gap-2">
          <OutputRow label="Pixels (px)" value={px == null ? null : `${fmt(px)}px`} />
          <OutputRow label="REM" value={rem == null ? null : `${fmt(rem)}rem`} />
          <OutputRow label="EM" value={em == null ? null : `${fmt(em)}em`} />
        </div>

        {!valid && (
          <p className="rounded-xl border border-dashed border-zinc-200 p-6 text-center font-mono text-xs text-zinc-400 dark:border-zinc-800">
            Enter a value to convert…
          </p>
        )}
      </div>
    </ConverterShell>
  );
}