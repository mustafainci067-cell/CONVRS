'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getConsent, setConsent } from '@/lib/consent';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const t = useTranslations('Cookie');

  // İlk render'dan sonra onay durumu okunur; empty state ile server arasında
  // hydration uyumsuzluğu oluşmaz (banner yalnızca istemcide görünür).
  useEffect(() => {
    // localStorage erişilemezse banner her seferinde gösterilir (güvenli varsayılan)
    const consent = getConsent();
    if (consent === null) {
      // localStorage yalnızca hydration sonrası okunabilen harici bir sistemdir;
      // banner görünürlüğünü buradan ayarlamak zorunludur.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    setShow(false);
  };

  const handleReject = () => {
    setConsent('rejected');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center p-4 sm:p-6">
      <div className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-100/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-6 dark:border-zinc-800 dark:bg-zinc-900/95">
        <p className="flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {t('message')}
          <Link
            href="/cookie-policy"
            className="font-medium text-zinc-900 underline underline-offset-2 transition-colors hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400"
          >
            {t('policyLink')}
          </Link>
          .
        </p>
        <div className="flex w-full shrink-0 items-center justify-end gap-3 sm:w-auto">
          <button
            type="button"
            onClick={handleReject}
            className="rounded-xl border border-zinc-300 bg-transparent px-5 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            {t('reject')}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-emerald-500 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}