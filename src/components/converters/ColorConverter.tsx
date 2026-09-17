'use client';

import { useState } from 'react';
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

type Rgb = { r: number; g: number; b: number };

/* ---------------------------------------------- donusumler */

function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) => n.toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return ln - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
  };
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

/* ---------------------------------------------- ayrisma */

function parseHex(input: string): Rgb | null {
  let hex = input.trim().replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function parseRgb(input: string): Rgb | null {
  const m = input.match(/(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/);
  if (!m) return null;
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  if ([r, g, b].some((n) => n < 0 || n > 255)) return null;
  return { r, g, b };
}

function parseHsl(input: string): Rgb | null {
  const m = input.match(/([-+]?[\d.]+)[\s,]+([\d.]+)%?[\s,]+([\d.]+)%?/);
  if (!m) return null;
  const s = Number(m[2]);
  const l = Number(m[3]);
  if (s < 0 || s > 100 || l < 0 || l > 100) return null;
  const h = ((Number(m[1]) % 360) + 360) % 360;
  return hslToRgb(h, s, l);
}

/* ---------------------------------------------- bilesen */

export default function ColorConverter() {
  const [hex, setHex] = useState('#FF0000');
  const [rgb, setRgb] = useState('rgb(255, 0, 0)');
  const [hsl, setHsl] = useState('hsl(0, 100%, 50%)');
  const [preview, setPreview] = useState('#FF0000');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /** Gecersiz sekilde guncellenen alani parlatan yardimci. */
  const applyColor = (color: Rgb) => {
    setHex(rgbToHex(color));
    const { h, s, l } = rgbToHsl(color);
    setRgb(`rgb(${color.r}, ${color.g}, ${color.b})`);
    setHsl(`hsl(${h}, ${s}%, ${l}%)`);
    setPreview(rgbToHex(color));
    setErrorMsg(null);
  };

  const fail = (format: string) => {
    setErrorMsg(
      `Geçersiz ${format} değeri. Örn: ${format === 'HEX' ? '#ff0000' : format === 'RGB' ? 'rgb(255, 0, 0)' : 'hsl(0, 100%, 50%)'}`
    );
  };

  const handleHex = (value: string) => {
    setHex(value);
    const color = parseHex(value);
    if (color) applyColor(color);
    else if (value.trim()) fail('HEX');
    else setErrorMsg(null);
  };

  const handleRgb = (value: string) => {
    setRgb(value);
    const color = parseRgb(value);
    if (color) applyColor(color);
    else if (value.trim()) fail('RGB');
    else setErrorMsg(null);
  };

  const handleHsl = (value: string) => {
    setHsl(value);
    const color = parseHsl(value);
    if (color) applyColor(color);
    else if (value.trim()) fail('HSL');
    else setErrorMsg(null);
  };

  const fields = [
    { label: 'HEX', value: hex, onChange: handleHex, hint: '#ff0000' },
    { label: 'RGB', value: rgb, onChange: handleRgb, hint: 'rgb(255, 0, 0)' },
    { label: 'HSL', value: hsl, onChange: handleHsl, hint: 'hsl(0, 100%, 50%)' },
  ];

  return (
    <ConverterShell from="Color" to="Color">
      <ConverterHeading
        title="Color Converter"
        description="Type a HEX, RGB or HSL value in any field and the other two update instantly — converted mathematically right in your browser."
      />

      <div className="flex w-full flex-col gap-3">
        <div
          className="h-20 w-full rounded-2xl border border-zinc-200 shadow-inner transition-colors duration-150 dark:border-zinc-800"
          style={{ backgroundColor: preview }}
        />

        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-2">
            <label className="flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {field.label}
              </span>
              <CopyButton value={field.value} />
            </label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              spellCheck={false}
              placeholder={field.hint}
              className="w-full rounded-2xl border border-lime-200 bg-lime-50 p-3 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-lime-400 dark:border-lime-900/50 dark:bg-lime-950/10 dark:text-zinc-100 dark:focus:border-lime-700/50"
            />
          </div>
        ))}
      </div>

      {errorMsg && <ErrorBanner message={errorMsg} />}
    </ConverterShell>
  );
}
