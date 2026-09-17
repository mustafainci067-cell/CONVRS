'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

/**
 * Geçersiz lokale veya var olmayan bir yola gidildiğinde gösterilen 404 sayfası.
 * [locale] layout'unun NextIntlClientProvider sarmalı içinde render edildiği
 * için çeviriler (NotFound namespace'i) buradan okunur.
 */
export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center p-5 font-sans sm:p-8">
      <div className="w-full max-w-md animate-fade-in space-y-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          {t('title')}
        </h1>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t('description')}
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-emerald-500"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l8-8m0 0l8 8m-8-8v18"
              />
            </svg>
            {t('home')}
          </Link>
        </div>
      </div>
    </main>
  );
}