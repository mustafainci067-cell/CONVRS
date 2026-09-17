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

/** RFC 4122 UUID v4 üretimi. crypto.randomUUID() yoksa getRandomValues'a düşer. */
function uuidV4(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
}

const COUNT_OPTIONS = [1, 5, 10, 50];

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('');
  const [count, setCount] = useState(1);
  const [list, setList] = useState<string[]>([]);

  const generate = () => {
    const n = COUNT_OPTIONS.includes(count) ? count : 1;
    const values = Array.from({ length: n }, () => uuidV4());
    setList(values);
    setUuid(values[0]);
  };

  const multiple = list.length > 1;

  return (
    <ConverterShell from="Random" to="UUID v4">
      <ConverterHeading
        title="UUID Generator"
        description="Generate cryptographically random UUID v4 values with one click, using your browser's Web Crypto API. Nothing is sent anywhere."
      />

      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm dark:border-violet-900/50 dark:bg-violet-950/10">
          <p className="min-w-0 break-all px-1 font-mono text-lg tracking-tight text-violet-900 dark:text-violet-100">
            {uuid || 'Click Generate…'}
          </p>
          {uuid && <CopyButton value={multiple ? list.join('\n') : uuid} />}
        </div>

        <button
          type="button"
          onClick={generate}
          className="w-full rounded-xl bg-violet-600 py-3 font-medium text-zinc-50 shadow-lg transition-all hover:bg-violet-500 active:scale-[0.99]"
        >
          Generate
        </button>

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Count
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1 font-mono text-xs text-zinc-700 outline-none focus:border-violet-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-violet-700"
            >
              {COUNT_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          {multiple && <CopyButton value={list.join('\n')} />}
        </div>

        {multiple && (
          <textarea
            value={list.join('\n')}
            readOnly
            rows={Math.min(count, 10)}
            spellCheck={false}
            className="w-full resize-none rounded-2xl border border-violet-200 bg-violet-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none dark:border-violet-900/50 dark:bg-violet-950/10 dark:text-zinc-100"
          />
        )}
      </div>
    </ConverterShell>
  );
}
