'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import AdSlot from '@/components/AdSlot';

/**
 * Tum donusturucu sayfalarinin ortak gorsel kabugu.
 * Boylece yeni bir arac eklendiginde tasarim dili kendiliginden ayni kalir.
 */

export type Accent = {
  dropzone: string;
  iconBox: string;
  button: string;
  resultCard: string;
  pill: string;
};

export function ConverterShell({
  from,
  to,
  badge,
  children,
}: {
  from: string;
  to: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center p-5 font-sans selection:bg-zinc-200 sm:p-8 dark:selection:bg-zinc-800">
      <header className="flex w-full max-w-4xl items-center justify-between border-b border-zinc-200 py-4 dark:border-zinc-800/60">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
          {from} ➝ {to}
        </span>
        {badge ?? (
          <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 font-mono text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
            100% Client-Side
          </span>
        )}
      </header>

      {/* Reklam: header altı leaderboard — UX'i bozmamak için max-w-xl ile hizalanır */}
      <AdSlot
        slotId="YOUR_SLOT_ID"
        format="horizontal"
        className="w-full max-w-xl py-2"
      />

      <div className="my-auto flex w-full max-w-xl flex-col items-center gap-6 py-8 sm:gap-8 sm:py-10">{children}</div>
    </div>
  );
}

/** Cift yonlu araclarda yon degistirici (PNG ↔ JPG, JSON ↔ CSV) */
export function DirectionToggle({
  from,
  to,
  onSwap,
  accent,
}: {
  from: string;
  to: string;
  onSwap: () => void;
  accent: Accent;
}) {
  return (
    <div className="flex items-center justify-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-100/70 p-2 shadow-inner dark:border-zinc-800/60 dark:bg-zinc-900/40">
      <span
        className={cn(
          'rounded-xl px-4 py-2 font-mono text-sm transition-all duration-300',
          accent.pill
        )}
      >
        {from}
      </span>

      <button
        type="button"
        onClick={onSwap}
        title="Yönü değiştir"
        aria-label={`Switch direction to ${to} to ${from}`}
        className="rounded-full border border-zinc-300 bg-white p-3 shadow-lg transition-all hover:scale-110 active:scale-95 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700"
      >
        <svg
          className="h-5 w-5 text-zinc-700 dark:text-zinc-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      </button>

      <span className="rounded-xl px-4 py-2 font-mono text-sm text-zinc-500 transition-all duration-300 dark:text-zinc-500">
        {to}
      </span>
    </div>
  );
}

export function ConverterHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-3 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}

export function Dropzone({
  accept,
  inputLabel,
  fileName,
  onFile,
  onFiles,
  multiple,
  accent,
  maxSizeMb,
}: {
  accept: string;
  inputLabel: string;
  fileName?: string;
  onFile?: (file: File) => void;
  onFiles?: (files: File[]) => void;
  multiple?: boolean;
  accent: Accent;
  /** Varsa, yukleme alaninin altinda gorunen hard boyut limiti notu */
  maxSizeMb?: number;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const t = useTranslations('Dropzone');

  const collect = (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []);
    if (onFiles) {
      if (files.length) onFiles(files);
    } else if (files[0] && onFile) {
      onFile(files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        collect(e.dataTransfer.files);
      }}
      className={cn(
        'group relative flex w-full cursor-pointer touch-manipulation select-none flex-col items-center justify-center gap-4 rounded-2xl border border-dashed p-8 shadow-sm transition-all sm:p-12',
        accent.dropzone,
        isDragging && 'scale-[1.01] border-emerald-500'
      )}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          collect(e.target.files);
          e.target.value = '';
        }}
        aria-label={`Select ${multiple ? '' : 'a '}${inputLabel} file${multiple ? 's' : ''}`}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-xl border shadow-inner transition-transform group-hover:scale-105',
          accent.iconBox
        )}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {fileName ?? t('default', { file: inputLabel })}
        </p>
        <p className="text-xs text-zinc-500">{t('hint')}</p>
      </div>

      {maxSizeMb && (
        <p className="mt-2 max-w-full text-center font-mono text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">
          {t('maxSize', { size: maxSizeMb })}
        </p>
      )}
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="w-full max-w-full break-words rounded-xl border border-red-200 bg-red-50 p-3 text-center font-mono text-xs leading-relaxed text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
    >
      {message}
    </div>
  );
}

export function ConvertButton({
  onClick,
  disabled,
  accent,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  accent: Accent;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full rounded-xl py-3.5 font-medium shadow-lg transition-all active:scale-[0.99] disabled:opacity-50',
        accent.button
      )}
    >
      {children}
    </button>
  );
}

export function ResultPanel({
  accent,
  href,
  downloadName,
  label,
  children,
}: {
  accent: Accent;
  href: string;
  downloadName: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in flex w-full flex-col gap-3">
      <div
        className={cn('flex items-center justify-between rounded-xl border p-4', accent.resultCard)}
      >
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          Conversion Complete
        </span>
        <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">● Ready</span>
      </div>
      {children}
      <a
        href={href}
        download={downloadName}
        className="w-full rounded-xl bg-emerald-600 py-3.5 text-center font-medium text-zinc-50 shadow-lg transition-all hover:bg-emerald-500"
      >
        {label}
      </a>

      {/* Reklam: "İndir" butonu hemen altı — dönüşüm tamamlanan kullanıcı için ideal pozisyon */}
      <AdSlot
        slotId="YOUR_SLOT_ID"
        format="rectangle"
        className="w-full"
      />
    </div>
  );
}
