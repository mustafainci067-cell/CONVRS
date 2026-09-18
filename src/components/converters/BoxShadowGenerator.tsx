<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { ConverterShell } from './ConverterShell';

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

interface Shadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const DEFAULT_SHADOW: Shadow = {
  offsetX: 0, offsetY: 4, blur: 6, spread: -1,
  color: '#000000', opacity: 0.25, inset: false,
};

function buildCss(shadows: Shadow[]): string {
  return shadows
    .map((s) => {
      const hex = s.color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${s.inset ? 'inset ' : ''}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px rgba(${r}, ${g}, ${b}, ${s.opacity})`;
    })
    .join(',\n');
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function Slider({
  label, value, min, max, step, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:shadow-md"
      />
      <span className="w-10 text-right font-mono text-xs text-zinc-700 dark:text-zinc-300">{value}</span>
    </div>
  );
}

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...DEFAULT_SHADOW }]);
  const [activeIndex, setActiveIndex] = useState(0);

  const shadow = shadows[activeIndex];

  const updateShadow = (key: keyof Shadow, value: boolean | number | string) => {
    setShadows((prev) => prev.map((s, i) => (i === activeIndex ? { ...s, [key]: value } : s)));
  };

  const addShadow = () => {
    setShadows((prev) => [...prev, { ...DEFAULT_SHADOW }]);
    setActiveIndex(shadows.length);
  };

  const removeShadow = (index: number) => {
    if (shadows.length <= 1) return;
    setShadows((prev) => prev.filter((_, i) => i !== index));
    setActiveIndex(Math.min(activeIndex, shadows.length - 2));
  };

  const cssCode = buildCss(shadows);

  return (
    <ConverterShell from="Shadow" to="CSS" badge="Generator">
      <div className="space-y-6">
        {/* Live preview */}
        <div className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div
            className="h-32 w-48 rounded-xl border border-zinc-200 bg-white transition-all dark:border-zinc-700 dark:bg-zinc-800"
            style={{ boxShadow: cssCode }}
          />
        </div>

        {/* Shadow tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {shadows.map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  i === activeIndex
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                }`}
              >
                Shadow {i + 1}
              </button>
              {shadows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeShadow(i)}
                  className="rounded p-1 text-zinc-400 transition-colors hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addShadow}
            className="rounded-lg border border-dashed border-zinc-300 px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-violet-400 hover:text-violet-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-violet-500 dark:hover:text-violet-400"
          >
            + Add shadow
          </button>
        </div>

        {/* Controls */}
        {shadow && (
          <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <Slider label="X" value={shadow.offsetX} min={-100} max={100} step={1} onChange={(v) => updateShadow('offsetX', v)} />
            <Slider label="Y" value={shadow.offsetY} min={-100} max={100} step={1} onChange={(v) => updateShadow('offsetY', v)} />
            <Slider label="Blur" value={shadow.blur} min={0} max={200} step={1} onChange={(v) => updateShadow('blur', v)} />
            <Slider label="Spread" value={shadow.spread} min={-100} max={100} step={1} onChange={(v) => updateShadow('spread', v)} />
            <Slider label="Opacity" value={shadow.opacity} min={0} max={1} step={0.01} onChange={(v) => updateShadow('opacity', v)} />

            <div className="flex items-center gap-3 pt-1">
              <span className="w-14 text-xs text-zinc-500 dark:text-zinc-400">Color</span>
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="color" value={shadow.color}
                  onChange={(e) => updateShadow('color', e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700"
                />
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  rgb({hexToRgb(shadow.color)})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-14 text-xs text-zinc-500 dark:text-zinc-400">Type</span>
              <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox" checked={shadow.inset}
                  onChange={(e) => updateShadow('inset', e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-violet-500 focus:ring-violet-500/30 dark:border-zinc-700"
                />
                Inset shadow
              </label>
            </div>
          </div>
        )}

        {/* CSS output */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">CSS Code</span>
            <CopyButton value={`box-shadow: ${cssCode};`} />
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
            <code>{`box-shadow: ${cssCode};`}</code>
          </pre>
        </div>
      </div>
    </ConverterShell>
  );
}
=======
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

interface Shadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const DEFAULT_SHADOW: Shadow = {
  offsetX: 0, offsetY: 4, blur: 6, spread: -1,
  color: '#000000', opacity: 0.25, inset: false,
};

function buildCss(shadows: Shadow[]): string {
  return shadows
    .map((s) => {
      const hex = s.color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${s.inset ? 'inset ' : ''}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px rgba(${r}, ${g}, ${b}, ${s.opacity})`;
    })
    .join(',\n');
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function Slider({
  label, value, min, max, step, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:shadow-md"
      />
      <span className="w-10 text-right font-mono text-xs text-zinc-700 dark:text-zinc-300">{value}</span>
    </div>
  );
}

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...DEFAULT_SHADOW }]);
  const [activeIndex, setActiveIndex] = useState(0);

  const shadow = shadows[activeIndex];

  const updateShadow = (key: keyof Shadow, value: boolean | number | string) => {
    setShadows((prev) => prev.map((s, i) => (i === activeIndex ? { ...s, [key]: value } : s)));
  };

  const addShadow = () => {
    setShadows((prev) => [...prev, { ...DEFAULT_SHADOW }]);
    setActiveIndex(shadows.length);
  };

  const removeShadow = (index: number) => {
    if (shadows.length <= 1) return;
    setShadows((prev) => prev.filter((_, i) => i !== index));
    setActiveIndex(Math.min(activeIndex, shadows.length - 2));
  };

  const cssCode = buildCss(shadows);

  return (
    <ConverterShell from="Shadow" to="CSS" badge="Generator">
      <ConverterHeading
        title="CSS Box-Shadow Generator"
        description="Visually create CSS box-shadow with live preview, adjustable sliders and instant code copy."
      />
      <div className="space-y-6">
        {/* Live preview */}
        <div className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div
            className="h-32 w-48 rounded-xl border border-zinc-200 bg-white transition-all dark:border-zinc-700 dark:bg-zinc-800"
            style={{ boxShadow: cssCode }}
          />
        </div>

        {/* Shadow tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {shadows.map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  i === activeIndex
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                }`}
              >
                Shadow {i + 1}
              </button>
              {shadows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeShadow(i)}
                  className="rounded p-1 text-zinc-400 transition-colors hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addShadow}
            className="rounded-lg border border-dashed border-zinc-300 px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-violet-400 hover:text-violet-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-violet-500 dark:hover:text-violet-400"
          >
            + Add shadow
          </button>
        </div>

        {/* Controls */}
        {shadow && (
          <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <Slider label="X" value={shadow.offsetX} min={-100} max={100} step={1} onChange={(v) => updateShadow('offsetX', v)} />
            <Slider label="Y" value={shadow.offsetY} min={-100} max={100} step={1} onChange={(v) => updateShadow('offsetY', v)} />
            <Slider label="Blur" value={shadow.blur} min={0} max={200} step={1} onChange={(v) => updateShadow('blur', v)} />
            <Slider label="Spread" value={shadow.spread} min={-100} max={100} step={1} onChange={(v) => updateShadow('spread', v)} />
            <Slider label="Opacity" value={shadow.opacity} min={0} max={1} step={0.01} onChange={(v) => updateShadow('opacity', v)} />

            <div className="flex items-center gap-3 pt-1">
              <span className="w-14 text-xs text-zinc-500 dark:text-zinc-400">Color</span>
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="color" value={shadow.color}
                  onChange={(e) => updateShadow('color', e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700"
                />
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  rgb({hexToRgb(shadow.color)})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-14 text-xs text-zinc-500 dark:text-zinc-400">Type</span>
              <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox" checked={shadow.inset}
                  onChange={(e) => updateShadow('inset', e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-violet-500 focus:ring-violet-500/30 dark:border-zinc-700"
                />
                Inset shadow
              </label>
            </div>
          </div>
        )}

        {/* CSS output */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">CSS Code</span>
            <CopyButton value={`box-shadow: ${cssCode};`} />
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
            <code>{`box-shadow: ${cssCode};`}</code>
          </pre>
        </div>
      </div>
    </ConverterShell>
  );
}
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
