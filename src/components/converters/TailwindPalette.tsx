'use client';

import { useMemo, useState } from 'react';
import { ConverterHeading, ConverterShell, ErrorBanner } from './ConverterShell';
import { cn } from '@/lib/utils';

type Rgb = [number, number, number];

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/**
 * Her tonal adımda karıştırılacak beyaz (50-400) veya siyah (600-950) oranı.
 * 500 = kullanıcının girdiği base renk.
 */
const MIX: Record<number, number> = {
  50: 0.92,
  100: 0.8,
  200: 0.63,
  300: 0.43,
  400: 0.2,
  500: 0,
  600: 0.18,
  700: 0.4,
  800: 0.62,
  900: 0.8,
  950: 0.9,
};

function parseHex(input: string): Rgb | null {
  let hex = input.trim().replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: Rgb): string {
  const to = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

/** Algilanan parlaklığa göre relative luminance — açık zeminlerde koyu metin. */
function isLight(hex: string): boolean {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  const [r, g, b] = rgb.map((c) => c / 255);
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.5;
}

function shade(base: Rgb, mix: number, towardWhite: boolean): string {
  const target = towardWhite ? 255 : 0;
  const blended: Rgb = base.map((c) => c + (target - c) * mix) as Rgb;
  return rgbToHex(blended);
}

export default function TailwindPalette() {
  const [hex, setHex] = useState('#3B82F6');
  const [copied, setCopied] = useState<string | null>(null);

  const base = parseHex(hex);
  const palette = useMemo(() => {
    if (!base) return null;
    return SHADES.map((shadeValue) => {
      const towardWhite = shadeValue < 500;
      return {
        shade: shadeValue,
        hex: shade(base, MIX[shadeValue], towardWhite),
      };
    });
  }, [base]);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ConverterShell from="Color" to="Palette">
      <ConverterHeading
        title="Tailwind Color Palette"
        description="Enter a HEX color and generate matching Tailwind-style shades (50 → 950) scaled toward white and black. Click any swatch to copy its hex code."
      />

      <div className="flex w-full flex-col items-center gap-4">
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          spellCheck={false}
          placeholder="#3B82F6"
          className="w-full max-w-sm rounded-2xl border border-blue-200 bg-blue-50 p-3 text-center font-mono text-lg text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-blue-400 dark:border-blue-900/50 dark:bg-blue-950/10 dark:text-zinc-100 dark:focus:border-blue-700/50"
        />

        {palette ? (
          <div className="grid w-full gap-2">
            {palette.map(({ shade: s, hex: h }) => {
              const darkText = !isLight(h);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleCopy(h)}
                  title="Click to copy"
                  className="group flex w-full items-center justify-between gap-3 rounded-xl border border-black/5 px-4 py-3 transition-transform hover:scale-[1.01] dark:border-white/5"
                  style={{ backgroundColor: h }}
                >
                  <span
                    className={cn(
                      'font-mono text-sm font-semibold',
                      darkText ? 'text-white' : 'text-zinc-900'
                    )}
                  >
                    {s}
                  </span>
                  <span
                    className={cn(
                      'flex items-center gap-2 font-mono text-xs',
                      darkText ? 'text-white/80' : 'text-zinc-700',
                      copied === h && 'font-semibold'
                    )}
                  >
                    {copied === h ? 'Copied ✓' : h}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <ErrorBanner message="Invalid hex color. Use formats like #3B82F6 or 3B82F6." />
        )}
      </div>
    </ConverterShell>
  );
}
