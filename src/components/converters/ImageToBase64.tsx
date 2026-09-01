'use client';

import { useState } from 'react';
import {
  ConverterHeading,
  ConverterShell,
  Dropzone,
  ErrorBanner,
  type Accent,
} from './ConverterShell';
import { IMAGE_SIZE_LIMIT_MB } from '@/lib/file-validation';

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

const CYAN_ACCENT: Accent = {
  dropzone:
    'border-cyan-300 bg-cyan-50 hover:border-cyan-400 dark:border-cyan-900/50 dark:bg-cyan-950/10 dark:hover:border-cyan-700/50',
  iconBox:
    'border-cyan-200 bg-cyan-100 text-cyan-600 dark:border-cyan-800/50 dark:bg-cyan-900/40 dark:text-cyan-400',
  button: 'bg-cyan-600 text-white hover:bg-cyan-500',
  resultCard: 'border-cyan-200 bg-cyan-50 dark:border-cyan-900/30 dark:bg-cyan-950/30',
  pill: 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]',
};

export default function ImageToBase64() {
  const [fileName, setFileName] = useState<string | undefined>();
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => setDataUrl(String(reader.result));
    reader.onerror = () => {
      setDataUrl('');
      setError('Could not read this image in your browser.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <ConverterShell from="Image" to="Base64">
      <ConverterHeading
        title="Image to Base64"
        description="Drop or pick an image and it becomes a Base64 data URI instantly. All reading happens in your browser — the image never leaves your device."
      />

      <div className="flex w-full flex-col gap-4">
        <Dropzone
          accept="image/*"
          inputLabel="Image"
          fileName={fileName}
          onFile={handleFile}
          accent={CYAN_ACCENT}
          maxSizeMb={IMAGE_SIZE_LIMIT_MB}
        />

        {error && <ErrorBanner message={error} />}

        {dataUrl && (
          <>
            <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm dark:border-cyan-900/30 dark:bg-zinc-900/60">
              {/* data: URI onizlemesi — next/image data URI desteklemez, bu yuzden <img> gerekli */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUrl}
                alt="Base64 preview"
                className="h-16 w-16 shrink-0 rounded-xl border border-zinc-200 object-cover dark:border-zinc-800"
              />
              <div className="min-w-0 text-right">
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  Data URI length
                </p>
                <p className="mt-0.5 break-all font-mono text-sm text-zinc-800 dark:text-zinc-100">
                  {dataUrl.length.toLocaleString()} chars
                </p>
              </div>
            </div>

            <label className="flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                Base64 Data URI
              </span>
              <CopyButton value={dataUrl} />
            </label>
            <textarea
              value={dataUrl}
              readOnly
              rows={6}
              spellCheck={false}
              className="w-full resize-y rounded-2xl border border-cyan-200 bg-cyan-50 p-4 font-mono text-xs leading-relaxed break-all text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 dark:border-cyan-900/50 dark:bg-cyan-950/10 dark:text-zinc-100"
            />
          </>
        )}
      </div>
    </ConverterShell>
  );
}