'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const faqKeys = ['security', 'paid', 'formats', 'mobile'] as const;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations('Faq');

  const toggle = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section className="mt-16 w-full">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          FAQ
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h2>
        <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-3">
        {faqKeys.map((key, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={key}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition-colors dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="flex-1 text-left text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {t(`items.${key}_q`)}
                </span>
                <svg
                  className={cn(
                    'h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 dark:text-zinc-400',
                    isOpen && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                id={`faq-panel-${index}`}
                role="region"
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t.rich(`items.${key}_a`, {
                      strong: (chunks) => (
                        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
                          {chunks}
                        </strong>
                      ),
                      privacy: (chunks) => (
                        <Link
                          href="/privacy-policy"
                          className="font-medium text-zinc-800 underline underline-offset-2 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
