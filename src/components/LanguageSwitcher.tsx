'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const LOCALES = ['en', 'tr', 'de', 'es'] as const;

// Her dil icin gercel emoji bayragi (satir ici gorunum, ikon gibi hizalanir)
const FLAGS: Record<(typeof LOCALES)[number], string> = {
  en: '🇬🇧',
  tr: '🇹🇷',
  de: '🇩🇪',
  es: '🇪🇸',
};

export default function LanguageSwitcher({ isOpen }: { isOpen: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('LanguageSwitcher');
  const tLang = useTranslations('Lang');

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Disari tiklayinca veya Esc ile menu kapanir
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const changeLocale = (nextLocale: (typeof LOCALES)[number]) => {
    setOpen(false);
    if (nextLocale === locale) return;
    // Ayni sayfayi yeni dilde ac (locale prefix'i next-intl otomatik yonetir)
    router.replace(pathname, { locale: nextLocale });
  };

  const currentFlag = FLAGS[locale as (typeof LOCALES)[number]];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('label')}
        title={tLang(locale)}
        className={cn(
          'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors',
          'border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900',
          'dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
          !isOpen && 'justify-center px-0'
        )}
      >
        {/* Gercel emoji bayragi en solda, ikon gibi hizalanir */}
        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-base leading-none">
          {currentFlag}
        </span>
        {isOpen && (
          <span className="flex flex-1 items-center justify-between text-left">
            <span className="truncate">{tLang(locale)}</span>
            <svg
              className={cn('h-3.5 w-3.5 text-zinc-400 transition-transform', open && 'rotate-180')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        )}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('label')}
          className="absolute bottom-full left-0 z-50 mb-2 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1.5 shadow-2xl dark:border-zinc-800 dark:bg-[#0e0e0e]"
        >
          {LOCALES.map((code) => {
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => changeLocale(code)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    active
                      ? 'bg-zinc-200/70 font-medium text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100'
                      : 'text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200'
                  )}
                >
                  {/* Gercel emoji bayragi her satirin en solunda, ikon gibi */}
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-base leading-none">
                    {FLAGS[code]}
                  </span>
                  <span className="flex-1 truncate">{tLang(code)}</span>
                  {active && (
                    <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
