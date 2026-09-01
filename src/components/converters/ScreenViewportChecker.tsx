'use client';

import { useSyncExternalStore } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';

type Viewport = {
  innerW: number;
  innerH: number;
  screenW: number;
  screenH: number;
  dpr: number;
  colorDepth: number;
  orientation: 'Portrait' | 'Landscape';
};

/** Sunucu/hydration ilk render'i icin sabit bos deger (useSyncExternalStore guvenli). */
const SERVER_SNAPSHOT: Viewport = {
  innerW: 0,
  innerH: 0,
  screenW: 0,
  screenH: 0,
  dpr: 1,
  colorDepth: 24,
  orientation: 'Landscape',
};

// getSnapshot ayni degerde ayni referansi dondurmeli (sonsuz render'i onler).
let cached: Viewport | null = null;

function getSnapshot(): Viewport {
  const next: Viewport = {
    innerW: window.innerWidth,
    innerH: window.innerHeight,
    screenW: window.screen.width,
    screenH: window.screen.height,
    dpr: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth || 24,
    orientation: window.innerWidth >= window.innerHeight ? 'Landscape' : 'Portrait',
  };
  const c = cached;
  if (
    c &&
    c.innerW === next.innerW &&
    c.innerH === next.innerH &&
    c.screenW === next.screenW &&
    c.screenH === next.screenH &&
    c.dpr === next.dpr &&
    c.colorDepth === next.colorDepth &&
    c.orientation === next.orientation
  ) {
    return c;
  }
  cached = next;
  return next;
}

function subscribe(cb: () => void) {
  window.addEventListener('resize', cb);
  window.addEventListener('orientationchange', cb);
  return () => {
    window.removeEventListener('resize', cb);
    window.removeEventListener('orientationchange', cb);
  };
}

function Tile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-sky-200/70 bg-white p-5 shadow-sm dark:border-sky-900/40 dark:bg-zinc-900/60">
      <p className="font-mono text-[11px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
        {label}
      </p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">{hint}</p>}
    </div>
  );
}

export default function ScreenViewportChecker() {
  const vp = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);

  return (
    <ConverterShell from="Device" to="Viewport">
      <ConverterHeading
        title="Screen / Viewport Checker"
        description="Your current screen resolution, browser window size and pixel density — read live from window and updated instantly as you resize."
      />

      <div className="flex w-full flex-col gap-4">
        {/* Ana pencere buyuklugu karti */}
        <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-sky-300 bg-sky-50 p-6 shadow-sm dark:border-sky-900/50 dark:bg-sky-950/10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Browser Window
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
              {vp.innerW || '—'} × {vp.innerH || '—'}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Tile label="Window" value={`${vp.innerW || '—'} × ${vp.innerH || '—'}`} hint="innerWidth × innerHeight" />
          <Tile label="Screen" value={`${vp.screenW || '—'} × ${vp.screenH || '—'}`} hint="screen resolution" />
          <Tile
            label="Pixel Ratio"
            value={`${vp.dpr}×`}
            hint="devicePixelRatio"
          />
          <Tile label="Color Depth" value={`${vp.colorDepth}-bit`} hint="bits per pixel" />
        </div>

        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-sky-200/70 bg-white p-5 shadow-sm sm:flex-row dark:border-sky-900/40 dark:bg-zinc-900/60">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Orientation</p>
          <p className="flex items-center gap-2 font-mono text-lg font-medium text-zinc-800 dark:text-zinc-100">
            <svg
              className={`h-5 w-5 text-sky-600 dark:text-sky-400 ${vp.orientation === 'Portrait' ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {vp.orientation}
          </p>
        </div>

        <p className="text-center font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          Values update live as you resize your browser window.
        </p>
      </div>
    </ConverterShell>
  );
}