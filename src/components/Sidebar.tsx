'use client';

import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';
import { categoryConfigs } from '@/config/nav';

const iconClass = 'w-4 h-4 shrink-0';

// Mobilde sidebar'i sola/saga kaydirarak kapatmak/acmak icin min. kaydirma mesafesi (px)
const SWIPE_THRESHOLD = 60;

function ThemeSwitch({ isOpen }: { isOpen: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('Sidebar');

  // next-themes'in resolvedTheme degeri SSR'da/hydration oncesi bilinemez.
  // mounted bayragi theme-sonrasi sonlandirilmadan title/aria-label'i sabit
  // tutar; boylece server ile ilk istemci render'i uyusur (hydration hatasi yok).
  const [mounted, setMounted] = useState(false);
  // mounted bayragi hydration sonrasi theme'nin bilinmesini saglar; bu desen
  // CookieBanner'da da aynen kullanilir. setState yalnizca effect basinda
  // bir kez calisir ve render dongusu yaratmaz.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';

  // Tema sunucuda bilinemez. Bu yuzden iki durum da render edilir ve gorunurluk
  // `dark:` varyantiyla CSS uzerinden secilir; boylece hydration uyusmazligi olmaz.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      title={isDark ? t('theme.toLight') : t('theme.toDark')}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors',
        'border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900',
        'dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
        !isOpen && 'justify-center px-0'
      )}
    >
      {/* Koyu temada gunes (aydinliga gec), acik temada ay (karanliga gec) */}
      <svg
        className={cn(iconClass, 'hidden dark:block')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M12 3v1.5m0 15V21m9-9h-1.5m-15 0H3m15.36-6.36l-1.06 1.06M6.7 17.3l-1.06 1.06m12.72 0l-1.06-1.06M6.7 6.7L5.64 5.64M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        className={cn(iconClass, 'block dark:hidden')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
        />
      </svg>

      {isOpen && (
        <span className="flex-1 text-left">
          <span className="hidden dark:inline">{t('theme.lightMode')}</span>
          <span className="inline dark:hidden">{t('theme.darkMode')}</span>
        </span>
      )}
      {isOpen && (
        <span className="relative h-5 w-9 shrink-0 rounded-full bg-zinc-300 transition-colors dark:bg-emerald-500/80">
          <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-all dark:left-[1.125rem]" />
        </span>
      )}
    </button>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  // Mobil: sidebar kapaliyken ekran disinda durur, hamburger ile acilir.
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const t = useTranslations('Sidebar');

  // Header'daki buton: masaustunde sidebar'i daraltir/genisletir,
  // mobilde ise cekmeceyi kapatir.
  const handleHeaderToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsOpen((open) => !open);
    } else {
      setMobileOpen(false);
    }
  };

  // Mobil dokunmatik: sola kaydirmak sidebar'i kapatir, saga kaydirmak acar.
  // Yalnizca yatay-dominant hareket swipe sayilir; dikey kaydirma scroll'a birakilir.
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (window.innerWidth >= 768) return; // yalnızca mobil görünüm
    swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD) return; // eşiği aşmayan dokunuş/tap
    if (Math.abs(dx) <= Math.abs(dy) * 1.5) return; // dikey dominant -> swipe değil

    // Mobil cekmecede swipe, drawer acik/kapali durumunu yonetir;
    // masaustunde ise daraltma/genisletme anlamina gelir.
    if (window.innerWidth < 768) {
      setMobileOpen(dx > 0);
    } else {
      setIsOpen(dx > 0);
    }
  };

  return (
    <>
      {/* Mobil: icerigi tam kapsayacak sekilde sidebar ekran disina itilir;
          bu sabit hamburger dorudan dokunarak acilir. */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label={t('openNav')}
        aria-expanded={mobileOpen}
        className="fixed left-3 top-3 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/90 text-zinc-600 shadow-sm backdrop-blur transition-colors hover:bg-zinc-200 hover:text-zinc-900 md:hidden dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobil: cekmece acikken disarida kalan alana dokunarak kapatma */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          swipeStart.current = null;
        }}
        className={cn(
          // Temel: dokunmatik tarayici secim/zoon gecikmelerini onle
          '[touch-action:pan-y] z-50 flex h-full select-none flex-col border-r transition-all duration-300',
          'border-zinc-200 bg-zinc-50 dark:border-zinc-800/60 dark:bg-[#0e0e0e]',
          // Mobil: soldan kayan cekmece (kapaliyken ekran disinda)
          'fixed inset-y-0 left-0 w-72 max-w-[85vw]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Masaustu: statik sutun, daraltilabilir (w-72 / w-20)
          'md:static md:inset-auto md:max-w-none md:translate-x-0',
          isOpen ? 'md:w-72' : 'md:w-20'
        )}
      >
        <div
          className={cn(
            'flex items-center border-b border-zinc-200 p-4 dark:border-zinc-800/60',
            isOpen ? 'justify-between' : 'justify-center'
          )}
        >
          {isOpen && (
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-inner dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Convrs
              </span>
            </Link>
          )}
          <button
            type="button"
            onClick={handleHeaderToggle}
            aria-label={isOpen ? t('collapse') : t('expand')}
            aria-expanded={isOpen}
            className="rounded-xl p-2 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          {categoryConfigs.map((category) => (
            <div key={category.titleKey} className="space-y-2">
              {isOpen && (
                <p className="flex items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                  <span>{t(`categories.${category.titleKey}`)}</span>
                </p>
              )}
              <div className="space-y-1">
                {category.items.map((item) => {
                  const isActiveRoute = item.status === 'active' && pathname === item.path;
                  const toolName = t(`tools.${item.nameKey}`);
                  return item.status === 'active' ? (
                    <Link
                      key={item.nameKey}
                      href={item.path}
                      title={toolName}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                        isActiveRoute
                          ? 'bg-zinc-200/70 text-zinc-900 shadow-sm dark:bg-zinc-800/80 dark:text-zinc-100'
                          : 'text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200',
                        !isOpen && 'justify-center px-0'
                      )}
                    >
                      {isOpen && <span className="flex-1 truncate">{toolName}</span>}
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        title="Available"
                      />
                    </Link>
                  ) : (
                    <div
                      key={item.nameKey}
                      title={`${toolName} — ${t('comingSoon')}`}
                      aria-disabled="true"
                      className={cn(
                        'flex cursor-not-allowed items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium',
                        'border-zinc-200/70 bg-zinc-100/50 text-zinc-400',
                        'dark:border-zinc-900/50 dark:bg-zinc-900/20 dark:text-zinc-600',
                        !isOpen && 'justify-center px-0'
                      )}
                    >
                      {isOpen && <span className="flex-1 truncate">{toolName}</span>}
                      {isOpen && (
                        <span className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                          {t('comingSoon')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-2 border-t border-zinc-200 p-4 dark:border-zinc-800/60">
          <LanguageSwitcher isOpen={isOpen} />
          <ThemeSwitch isOpen={isOpen} />
        </div>
      </aside>
    </>
  );
}
