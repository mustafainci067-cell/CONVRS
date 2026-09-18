<<<<<<< HEAD
'use client';

import { useState, useMemo } from 'react';
import { ConverterShell } from './ConverterShell';

type DiffLine = {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
};

function computeLCS(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp;
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const dp = computeLCS(oldLines, newLines);

  const result: DiffLine[] = [];
  let i = oldLines.length;
  let j = newLines.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({ type: 'unchanged', content: oldLines[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', content: newLines[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', content: oldLines[i - 1] });
      i--;
    }
  }

  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function TextDiff() {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  const [diffResult, setDiffResult] = useState<DiffLine[] | null>(null);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'inline'>('side-by-side');

  const handleCompare = () => {
    setDiffResult(computeDiff(oldText, newText));
  };

  // Girilen metinler degisince eski diff'i temizle (bayat sonuc gosterme);
  // onChange icinde yapilir cunku setDiffResult bir effect icinde cagrilmamali.
  const updateOld = (v: string) => { setOldText(v); setDiffResult(null); };
  const updateNew = (v: string) => { setNewText(v); setDiffResult(null); };

  const stats = useMemo(() => {
    if (!diffResult) return { added: 0, removed: 0, unchanged: 0 };
    return diffResult.reduce(
      (acc, line) => {
        if (line.type === 'added') acc.added++;
        else if (line.type === 'removed') acc.removed++;
        else acc.unchanged++;
        return acc;
      },
      { added: 0, removed: 0, unchanged: 0 }
    );
  }, [diffResult]);

  return (
    <ConverterShell from="Original" to="Changed" badge="Diff">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs text-zinc-500 dark:text-zinc-400">Original Text</label>
            <textarea
              value={oldText}
              onChange={(e) => updateOld(e.target.value)}
              placeholder="Paste the original text here…"
              className="h-48 w-full rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-rose-400 dark:focus:ring-rose-400/30"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-xs text-zinc-500 dark:text-zinc-400">Modified Text</label>
            <textarea
              value={newText}
              onChange={(e) => updateNew(e.target.value)}
              placeholder="Paste the modified text here…"
              className="h-48 w-full rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-rose-400 dark:focus:ring-rose-400/30"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCompare}
            className="rounded-xl border border-rose-200 bg-rose-50 px-6 py-3 font-medium text-rose-700 transition-all hover:bg-rose-100 hover:shadow-md active:scale-[0.98] dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-950"
          >
            Compare
          </button>
          <button
            type="button"
            onClick={() => { setOldText(newText); setNewText(oldText); setDiffResult(null); }}
            className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm text-zinc-600 transition-all hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Swap
          </button>
        </div>

        {diffResult && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-zinc-600 dark:text-zinc-400">+{stats.added} added</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-zinc-600 dark:text-zinc-400">-{stats.removed} removed</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <span className="text-zinc-600 dark:text-zinc-400">{stats.unchanged} unchanged</span>
              </span>
            </div>

            <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => setViewMode('side-by-side')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                Side by side
              </button>
              <button
                type="button"
                onClick={() => setViewMode('inline')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === 'inline'
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                Inline
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
              {viewMode === 'inline' ? (
                <div className="overflow-x-auto p-2">
                  {diffResult.map((line, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        line.type === 'added'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : line.type === 'removed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className="inline-block w-8 shrink-0 select-none pr-2 text-right text-xs opacity-40">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                      </span>
                      <pre className="whitespace-pre-wrap font-mono text-sm">{escapeHtml(line.content) || ' '}</pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {diffResult.map((line, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        line.type === 'added'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : line.type === 'removed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className="inline-block w-12 shrink-0 select-none border-r border-zinc-200/50 px-2 py-0.5 text-right text-xs opacity-40 dark:border-zinc-700/50">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ''}
                      </span>
                      <pre className="whitespace-pre-wrap p-0.5 px-3 font-mono text-sm">{escapeHtml(line.content) || ' '}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ConverterShell>
  );
}
=======
'use client';

import { useState, useMemo } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';

type DiffLine = {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
};

function computeLCS(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp;
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const dp = computeLCS(oldLines, newLines);

  const result: DiffLine[] = [];
  let i = oldLines.length;
  let j = newLines.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({ type: 'unchanged', content: oldLines[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', content: newLines[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', content: oldLines[i - 1] });
      i--;
    }
  }

  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function TextDiff() {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  const [diffResult, setDiffResult] = useState<DiffLine[] | null>(null);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'inline'>('side-by-side');

  const handleCompare = () => {
    setDiffResult(computeDiff(oldText, newText));
  };

  // Girilen metinler degisince eski diff'i temizle (bayat sonuc gosterme);
  // onChange icinde yapilir cunku setDiffResult bir effect icinde cagrilmamali.
  const updateOld = (v: string) => { setOldText(v); setDiffResult(null); };
  const updateNew = (v: string) => { setNewText(v); setDiffResult(null); };

  const stats = useMemo(() => {
    if (!diffResult) return { added: 0, removed: 0, unchanged: 0 };
    return diffResult.reduce(
      (acc, line) => {
        if (line.type === 'added') acc.added++;
        else if (line.type === 'removed') acc.removed++;
        else acc.unchanged++;
        return acc;
      },
      { added: 0, removed: 0, unchanged: 0 }
    );
  }, [diffResult]);

  return (
    <ConverterShell from="Original" to="Changed" badge="Diff">
      <ConverterHeading
        title="Text Diff Checker"
        description="Compare two texts side by side with highlighted added, removed and changed lines."
      />
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs text-zinc-500 dark:text-zinc-400">Original Text</label>
            <textarea
              value={oldText}
              onChange={(e) => updateOld(e.target.value)}
              placeholder="Paste the original text here…"
              className="h-48 w-full rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-rose-400 dark:focus:ring-rose-400/30"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-xs text-zinc-500 dark:text-zinc-400">Modified Text</label>
            <textarea
              value={newText}
              onChange={(e) => updateNew(e.target.value)}
              placeholder="Paste the modified text here…"
              className="h-48 w-full rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-rose-400 dark:focus:ring-rose-400/30"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCompare}
            className="rounded-xl border border-rose-200 bg-rose-50 px-6 py-3 font-medium text-rose-700 transition-all hover:bg-rose-100 hover:shadow-md active:scale-[0.98] dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-950"
          >
            Compare
          </button>
          <button
            type="button"
            onClick={() => { setOldText(newText); setNewText(oldText); setDiffResult(null); }}
            className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm text-zinc-600 transition-all hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Swap
          </button>
        </div>

        {diffResult && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-zinc-600 dark:text-zinc-400">+{stats.added} added</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-zinc-600 dark:text-zinc-400">-{stats.removed} removed</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <span className="text-zinc-600 dark:text-zinc-400">{stats.unchanged} unchanged</span>
              </span>
            </div>

            <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => setViewMode('side-by-side')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                Side by side
              </button>
              <button
                type="button"
                onClick={() => setViewMode('inline')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === 'inline'
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                Inline
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
              {viewMode === 'inline' ? (
                <div className="overflow-x-auto p-2">
                  {diffResult.map((line, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        line.type === 'added'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : line.type === 'removed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className="inline-block w-8 shrink-0 select-none pr-2 text-right text-xs opacity-40">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                      </span>
                      <pre className="whitespace-pre-wrap font-mono text-sm">{escapeHtml(line.content) || ' '}</pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {diffResult.map((line, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        line.type === 'added'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : line.type === 'removed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className="inline-block w-12 shrink-0 select-none border-r border-zinc-200/50 px-2 py-0.5 text-right text-xs opacity-40 dark:border-zinc-700/50">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ''}
                      </span>
                      <pre className="whitespace-pre-wrap p-0.5 px-3 font-mono text-sm">{escapeHtml(line.content) || ' '}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ConverterShell>
  );
}
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
