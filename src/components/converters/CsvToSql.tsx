'use client';

import { useState } from 'react';
import { csvToSql, sqlToCsv } from '@/lib/sql';
import {
  ConverterHeading,
  ConverterShell,
  DirectionToggle,
  ErrorBanner,
  type Accent,
} from './ConverterShell';
import { cn } from '@/lib/utils';

const LIME_ACCENT: Accent = {
  dropzone:
    'border-lime-300 bg-lime-50 hover:border-lime-400 dark:border-lime-900/50 dark:bg-lime-950/10 dark:hover:border-lime-700/50',
  iconBox:
    'border-lime-200 bg-lime-100 text-lime-600 dark:border-lime-800/50 dark:bg-lime-900/40 dark:text-lime-400',
  button: 'bg-lime-600 text-white hover:bg-lime-500',
  resultCard: 'border-lime-200 bg-lime-50 dark:border-lime-900/30 dark:bg-lime-950/30',
  pill: 'bg-lime-600 text-white shadow-[0_0_15px_rgba(101,163,13,0.4)]',
};

type Mode = 'csv-to-sql' | 'sql-to-csv';

const MAX_BATCH = 100;

export default function CsvToSql() {
  const [mode, setMode] = useState<Mode>('csv-to-sql');
  const [input, setInput] = useState('');
  const [tableName, setTableName] = useState('users');
  const [batchSize, setBatchSize] = useState(50);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isCsvToSql = mode === 'csv-to-sql';
  const from = isCsvToSql ? 'CSV' : 'SQL';
  const to = isCsvToSql ? 'SQL' : 'CSV';

  const handleConvert = () => {
    if (!input.trim()) return;
    setError(null);
    setCopied(false);
    try {
      setOutput(isCsvToSql ? csvToSql(input, tableName, batchSize) : sqlToCsv(input));
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Dönüştürme hatası.');
    }
  };

  const handleSwap = () => {
    // SQL'den CSV'ye geçildiğinde tablo adı girdisini gizle
    const next: Mode = isCsvToSql ? 'sql-to-csv' : 'csv-to-sql';
    setMode(next);
    if (output) setInput(output);
    setOutput('');
    setError(null);
    setCopied(false);
  };

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* pano erisimi reddedilebilir */
    }
  };

  const downloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], {
      type: isCsvToSql ? 'text/plain' : 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isCsvToSql ? 'insert.sql' : 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ConverterShell from={from} to={to}>
      <DirectionToggle from={from} to={to} onSwap={handleSwap} accent={LIME_ACCENT} />

      <ConverterHeading
        title={isCsvToSql ? 'CSV to SQL Converter' : 'SQL to CSV Converter'}
        description={
          isCsvToSql
            ? 'Paste a CSV table and generate ready-to-run INSERT INTO statements. Pick the table name and batch size — all built in your browser.'
            : 'Paste INSERT statement(s) and get a clean CSV table back, ready for Excel or Sheets.'
        }
      />

      {error && <ErrorBanner message={error} />}

      {/* Tablo adı / batch — yalnızca CSV→SQL */}
      {isCsvToSql && (
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Tablo Adı
            </label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              spellCheck={false}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Satır Başına (batch)
            </label>
            <input
              type="number"
              min={1}
              max={MAX_BATCH}
              value={batchSize}
              onChange={(e) => setBatchSize(Math.max(1, Math.min(MAX_BATCH, Number(e.target.value))))}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex w-full flex-col gap-4">
        <div className="space-y-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            {from} Girdi
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isCsvToSql
                ? 'id,name,email\n1,Ada,ada@example.com\n2,Deniz,deniz@example.com'
                : 'INSERT INTO users (id, name, email)\nVALUES\n  (1, \'Ada\', \'ada@example.com\'),\n  (2, \'Deniz\', \'deniz@example.com\');'
            }
            spellCheck={false}
            className="min-h-44 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-900 outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
          />
        </div>

        <button
          type="button"
          onClick={handleConvert}
          disabled={!input.trim()}
          className="w-full rounded-xl bg-lime-600 py-3.5 font-medium text-white shadow-lg transition-all hover:bg-lime-500 active:scale-[0.99] disabled:opacity-50"
        >
          Convert to {to} Now
        </button>

        {/* Output */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              {to} Çıktı
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className={cn(
                  'rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors disabled:opacity-40',
                  'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                )}
              >
                {copied ? 'Kopyalandı ✓' : 'Kopyala'}
              </button>
              <button
                type="button"
                onClick={downloadOutput}
                disabled={!output}
                className="rounded-lg bg-lime-600 px-2.5 py-1 font-mono text-[11px] text-white transition-colors hover:bg-lime-500 disabled:opacity-40"
              >
                İndir
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={`${to} çıktısı burada görünecek...`}
            spellCheck={false}
            className="min-h-44 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-900 outline-none focus:border-lime-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
          />
        </div>
      </div>
    </ConverterShell>
  );
}