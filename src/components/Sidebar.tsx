'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  path: string;
  status: 'active' | 'coming-soon';
};

type NavCategory = {
  title: string;
  items: NavItem[];
};

const iconClass = 'w-4 h-4 shrink-0';

const ImageIcon = (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      d="M4 16l4.6-4.6a2 2 0 012.8 0L16 16m-2-2l1.6-1.6a2 2 0 012.8 0L20 14M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm9.5 4a.5.5 0 11-1 0 .5.5 0 011 0z"
    />
  </svg>
);

const DocIcon = (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l6 6v11a2 2 0 01-2 2z"
    />
  </svg>
);

const MediaIcon = (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 6h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
    />
  </svg>
);

const categories: NavCategory[] = [
  {
    title: "Image Converters",
    items: [
      { name: "HEIC ↔ JPG", path: "/heic-to-jpg", status: "active" },
      { name: "JPG ↔ WebP", path: "/jpg-to-webp", status: "active" },
      { name: "PNG ↔ JPG", path: "/png-to-jpg", status: "active" },
      { name: "SVG ➝ PNG", path: "/svg-to-png", status: "active" },
      { name: "WEBP ➝ PNG", path: "#", status: "coming-soon" },
      { name: "ICO ➝ PNG", path: "#", status: "coming-soon" },
    ],
  },
  {
    title: "Document & Data",
    items: [
      { name: "JSON ↔ CSV", path: "/json-to-csv", status: "active" },
      { name: "XML ↔ JSON", path: "#", status: "coming-soon" },
      { name: "Markdown ➝ HTML", path: "#", status: "coming-soon" },
      { name: "PDF ➝ JPG", path: "#", status: "coming-soon" },
      { name: "XLSX ➝ CSV", path: "#", status: "coming-soon" },
    ],
  },
  {
    title: "Developer Tools",
    items: [
      { name: "Base64 Encoder", path: "#", status: "coming-soon" },
      { name: "URL Converter", path: "#", status: "coming-soon" },
      { name: "QR Generator", path: "/qr-generator", status: "active" },
    ],
  },
  {
    title: "Video & Audio",
    items: [
      { name: "MP4 ↔ WebM", path: "#", status: "coming-soon" },
      { name: "WAV ↔ MP3", path: "#", status: "coming-soon" },
    ],
  },
];

function ThemeSwitch({ isOpen }: { isOpen: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();

  // Tema sunucuda bilinemez. Bu yuzden iki durum da render edilir ve gorunurluk
  // `dark:` varyantiyla CSS uzerinden secilir; boylece hydration uyusmazligi olmaz.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
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
          <span className="hidden dark:inline">Light mode</span>
          <span className="inline dark:hidden">Dark mode</span>
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
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'z-50 flex h-full shrink-0 select-none flex-col border-r transition-all duration-300',
        'border-zinc-200 bg-zinc-50 dark:border-zinc-800/60 dark:bg-[#0e0e0e]',
        isOpen ? 'w-72' : 'w-20'
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
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={isOpen}
          className="rounded-xl p-2 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {categories.map((category) => (
          <div key={category.title} className="space-y-2">
            {isOpen && (
              <p className="flex items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                <span>{category.title}</span>
              </p>
            )}
            <div className="space-y-1">
              {category.items.map((item) => {
                const isActiveRoute = item.status === 'active' && pathname === item.path;
                return item.status === 'active' ? (
                  <Link
                    key={item.name}
                    href={item.path}
                    title={item.name}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      isActiveRoute
                        ? 'bg-zinc-200/70 text-zinc-900 shadow-sm dark:bg-zinc-800/80 dark:text-zinc-100'
                        : 'text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200',
                      !isOpen && 'justify-center px-0'
                    )}
                  >
                    {isOpen && <span className="flex-1 truncate">{item.name}</span>}
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      title="Available"
                    />
                  </Link>
                ) : (
                  <div
                    key={item.name}
                    title={`${item.name} — Coming Soon`}
                    aria-disabled="true"
                    className={cn(
                      'flex cursor-not-allowed items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium',
                      'border-zinc-200/70 bg-zinc-100/50 text-zinc-400',
                      'dark:border-zinc-900/50 dark:bg-zinc-900/20 dark:text-zinc-600',
                      !isOpen && 'justify-center px-0'
                    )}
                  >
                    {isOpen && <span className="flex-1 truncate">{item.name}</span>}
                    {isOpen && (
                      <span className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                        Soon
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800/60">
        <ThemeSwitch isOpen={isOpen} />
      </div>
    </aside>
  );
}
