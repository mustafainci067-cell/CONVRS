'use client';

import { useMemo, useState } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-teal-200/70 bg-white p-4 shadow-sm dark:border-teal-900/40 dark:bg-zinc-900/60">
      <p className="font-mono text-[11px] uppercase tracking-wider text-teal-600 dark:text-teal-400">
        {label}
      </p>
      <p className="mt-1 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default function WordCounter() {
  const [input, setInput] = useState('');

  const stats = useMemo(() => {
    const text = input;
    const trimmed = text.trim();
    return {
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      chars: text.length,
      charsNoSpace: text.replace(/\s/g, '').length,
      lines: text ? text.split('\n').length : 0,
      paragraphs: trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0,
      sentences: text ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length : 0,
    };
  }, [input]);

  return (
    <ConverterShell from="Text" to="Stats">
      <ConverterHeading
        title="Word & Character Counter"
        description="Paste or type any text — word, character (with and without spaces), line and paragraph counts update in real time, entirely in your browser."
      />

      <div className="flex w-full flex-col gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write or paste your text here…"
          rows={8}
          className="w-full resize-none rounded-2xl border border-teal-200 bg-teal-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-teal-400 dark:border-teal-900/50 dark:bg-teal-950/10 dark:text-zinc-100 dark:focus:border-teal-700/50"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Words" value={stats.words} />
          <StatCard label="Characters" value={stats.chars} />
          <StatCard label="No Spaces" value={stats.charsNoSpace} />
          <StatCard label="Paragraphs" value={stats.paragraphs} />
          <StatCard label="Lines" value={stats.lines} />
          <StatCard label="Sentences" value={stats.sentences} />
        </div>
      </div>
    </ConverterShell>
  );
}
