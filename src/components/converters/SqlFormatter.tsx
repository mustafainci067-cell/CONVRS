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

function formatSql(sql: string): string {
  const trimmed = sql.trim();
  if (!trimmed) return '';

  // String literal'lerin icindekilere dokunmamak icin tek/cift tirnak durumunu takip et
  let result = '';
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === "'" && !inDouble) { inSingle = !inSingle; result += ch; continue; }
    if (ch === '"' && !inSingle) { inDouble = !inDouble; result += ch; continue; }
    if (inSingle || inDouble) { result += ch; continue; }
    result += ch;
  }

  const normalized = result
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s*\(\s*/g, ' (')
    .replace(/\s*\)\s*/g, ') ')
    .trim();

  let indent = 0;
  const output: string[] = [];
  const words = normalized.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const checkStr = word.replace(/[;,]+$/, '').toUpperCase();

    const isOpen = checkStr === 'VALUES' || checkStr === 'SET'
      || checkStr === 'WHERE' || checkStr === 'AND' || checkStr === 'OR'
      || checkStr === 'ORDER' || checkStr === 'GROUP' || checkStr === 'HAVING'
      || checkStr === 'LIMIT' || checkStr === 'OFFSET' || checkStr === 'INTO'
      || checkStr === 'ON' || checkStr === 'CASE' || checkStr === 'WHEN'
      || checkStr === 'THEN' || checkStr === 'ELSE' || checkStr === 'UNION';

    // Ana SQL ifadesi/clause satir basina alinir
    if (checkStr === 'SELECT' || checkStr === 'INSERT' || checkStr === 'UPDATE'
        || checkStr === 'DELETE' || checkStr === 'CREATE' || checkStr === 'ALTER'
        || checkStr === 'DROP' || checkStr === 'LEFT' || checkStr === 'RIGHT'
        || checkStr === 'INNER' || checkStr === 'OUTER' || checkStr === 'JOIN'
        || isOpen) {
      if (output.length > 0) {
        output.push('\n' + '  '.repeat(indent));
      }
    }

    output.push(word);

    for (const ch of word) {
      if (ch === '(') indent++;
      else if (ch === ')') indent = Math.max(0, indent - 1);
    }
  }

  return output.join(' ').replace(/ +\n/g, '\n').trim();
}

function minifySql(sql: string): string {
  let result = '';
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'" && !inDouble) { inSingle = !inSingle; result += ch; continue; }
    if (ch === '"' && !inSingle) { inDouble = !inDouble; result += ch; continue; }
    if (inSingle || inDouble) { result += ch; continue; }
    if (!/\s/.test(ch)) result += ch;
  }

  return result
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*=\s*/g, '=')
    .replace(/\s*>\s*/g, '>')
    .replace(/\s*<\s*/g, '<')
    .trim();
}

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    if (!input.trim()) { setError('Please enter a SQL query.'); return; }
    try {
      setOutput(mode === 'format' ? formatSql(input) : minifySql(input));
    } catch {
      setError('Could not process the SQL input.');
    }
  };

  return (
    <ConverterShell from="SQL" to="Result" badge="SQL">
      <ConverterHeading
        title="SQL Formatter & Minifier"
        description="Format complex SQL queries with proper indentation or minify them to a single line."
      />
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Mode</span>
        </div>
        <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setMode('format')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === 'format'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Format
          </button>
          <button
            type="button"
            onClick={() => setMode('minify')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === 'minify'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Minify
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block font-mono text-xs text-zinc-500 dark:text-zinc-400">SQL Query</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL query here…"
            className="h-48 w-full rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/30"
            spellCheck={false}
          />
        </div>

        <button
          type="button"
          onClick={handleConvert}
          className="w-full rounded-xl border border-cyan-200 bg-cyan-50 px-6 py-3 font-medium text-cyan-700 transition-all hover:bg-cyan-100 hover:shadow-md active:scale-[0.98] dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300 dark:hover:bg-cyan-950"
        >
          {mode === 'format' ? 'Format SQL' : 'Minify SQL'}
        </button>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        {output && (
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Result</span>
              <CopyButton value={output} />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </div>
    </ConverterShell>
  );
}
