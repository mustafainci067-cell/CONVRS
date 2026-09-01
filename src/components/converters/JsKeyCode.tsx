'use client';

import { useEffect, useState } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';

type KeyEvent = {
  keyCode: number | null;
  key: string;
  code: string;
};

const EMPTY: KeyEvent = { keyCode: null, key: '—', code: '—' };

export default function JsKeyCode() {
  // Hydration uyumsuzlugunu onlemek icin ilk render'da bos deger; klavye
  // olaylari yalnizca istemcide dinlenir.
  const [event, setEvent] = useState<KeyEvent>(EMPTY);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      setEvent({
        keyCode: e.keyCode ?? e.which ?? null,
        key: e.key || ' ',
        code: e.code || '—',
      });
      setCount((c) => c + 1);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  const cards = [
    { label: 'event.keyCode', value: event.keyCode !== null ? String(event.keyCode) : '—' },
    { label: 'event.key', value: event.key },
    { label: 'event.code', value: event.code },
  ];

  return (
    <ConverterShell from="Keyboard" to="JS Events">
      <ConverterHeading
        title="JS KeyCode Viewer"
        description="Press any key on your keyboard and read its keyCode, key and code values — captured live with a plain keydown listener, entirely client-side."
      />

      <div className="flex w-full flex-col gap-3">
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center text-sm text-indigo-800 dark:border-indigo-900/40 dark:bg-indigo-950/20 dark:text-indigo-200">
          Press any key on your keyboard…
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className={cnCard(card.value.length > 8)}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                {card.label}
              </span>
              <span className="mt-1 block break-all text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {card.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100/70 px-4 py-2.5 font-mono text-xs text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:text-zinc-500">
          <span>Keys captured</span>
          <span className="text-zinc-700 dark:text-zinc-300">{count}</span>
        </div>
      </div>
    </ConverterShell>
  );
}

function cnCard(long: boolean): string {
  return [
    'flex min-h-[7.5rem] flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm',
    'dark:border-zinc-800 dark:bg-zinc-900/40',
    long ? 'min-h-[8.5rem]' : '',
  ].join(' ');
}
