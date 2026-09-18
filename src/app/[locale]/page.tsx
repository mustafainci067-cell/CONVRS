<<<<<<< HEAD
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Faq from '@/components/FAQ';
import { categoryConfigs } from '@/config/nav';

type Tool = {
  href: string;
  nameKey: string;
  status: 'active' | 'coming-soon';
};

// Home grid'i de Sidebar ile ayni kaynaktan (src/config/nav.ts) beslenir;
// yeni bir arac eklendiginde burada da otomatik gorunur.
const tools: Tool[] = categoryConfigs.flatMap((category) =>
  category.items.map((item) => ({
    href: item.path,
    nameKey: item.nameKey,
    status: item.status,
  }))
);

export default async function Home() {
  const t = await getTranslations('Home');
  const tFaq = await getTranslations('Faq');

  const toolName = (key: string) => t(`tools.${key}.title`);
  const toolDescription = (key: string) => t(`tools.${key}.description`);

  // FAQ cevaplari <strong>/<privacy> gibi zengin metin etiketleri icerir.
  // JSON-LD structured data duz metin istedigi icin etiketleri "chunks" ile
  // aynen gecip isaretleyen handler'lar veriyoruz; aksi halde next-intl
  // FORMATTING_ERROR firlatir.
  const toPlainText = (key: string) =>
    // tFaq.rich, <strong>/<privacy> etiketlerini handler ile isler; chunks'i
    // aynen geri vererek JSON-LD icin duz metin elde ederiz (FORMATTING_ERROR yok).
    tFaq.rich(key, {
      strong: (chunks) => chunks,
      privacy: (chunks) => chunks,
    });

  // SEO: Yerelleştirilmiş FAQPage structured data (Google arama sonuçları için)
  const faqStructuredData = [
    { question: tFaq('items.security_q'), answer: toPlainText('items.security_a') },
    { question: tFaq('items.paid_q'), answer: toPlainText('items.paid_a') },
    { question: tFaq('items.formats_q'), answer: toPlainText('items.formats_a') },
    { question: tFaq('items.mobile_q'), answer: toPlainText('items.mobile_a') },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqStructuredData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="flex flex-1 flex-col items-center p-5 font-sans sm:p-8">
      <div className="w-full max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <section className="flex flex-col items-center gap-4 pt-8 pb-12 text-center sm:pt-12 sm:pb-16">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Convrs
          </h1>
          <p className="max-w-lg text-base text-zinc-400 sm:text-lg">{t('tagline')}</p>
        </section>

        {/* Big Guides Banner */}
        <div className="mb-6">
          <Link
            href="/guides"
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-8 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900/40 dark:to-zinc-900/80 dark:hover:border-zinc-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="z-10 flex flex-col items-start gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t('guides.title')}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {t('guides.title')}
              </h2>
              <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                {t('guides.desc')}
              </p>
            </div>
            
            <div className="z-10 mt-6 flex shrink-0 items-center gap-2 sm:mt-0">
              <span className="font-mono text-sm font-medium text-emerald-600 transition-colors group-hover:text-emerald-700 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                {t('guides.link')}
              </span>
            </div>

            {/* Decorative background shape */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition-all group-hover:bg-emerald-500/20 dark:bg-emerald-400/5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tools.map((tool) =>
            tool.status === 'active' ? (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    {toolName(tool.nameKey)}
                  </h2>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    {t('available')}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {toolDescription(tool.nameKey)}
                </p>
                <span className="mt-4 inline-block font-mono text-xs text-zinc-500 transition-colors group-hover:text-zinc-800 dark:group-hover:text-zinc-300">
                  {t('openTool')}
                </span>
              </Link>
            ) : (
              <div
                key={tool.href}
                aria-disabled="true"
                title={`${toolName(tool.nameKey)} — Coming Soon`}
                className="cursor-not-allowed rounded-2xl border border-zinc-200/70 bg-zinc-100/40 p-6 opacity-70 dark:border-zinc-800/50 dark:bg-zinc-900/20"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
                    {toolName(tool.nameKey)}
                  </h2>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                    <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    {t('available')}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
                  {toolDescription(tool.nameKey)}
                </p>
              </div>
            )
          )}
        </div>

        <Faq />
      </div>
    </main>
  );
}
=======
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { getRouteLocale } from '@/i18n/locale';
import AdUnit from '@/components/AdUnit';
import JsonLd from '@/components/JsonLd';
import { AD_SLOT_HOMEPAGE } from '@/lib/ads';
import Faq from '@/components/FAQ';
import { categoryConfigs } from '@/config/nav';
import { SITE_URL } from '@/i18n/routing';

type Tool = {
  href: string;
  nameKey: string;
  status: 'active' | 'coming-soon';
};

// Home grid'i de Sidebar ile ayni kaynaktan (src/config/nav.ts) beslenir;
// yeni bir arac eklendiginde burada da otomatik gorunur.
const tools: Tool[] = categoryConfigs.flatMap((category) =>
  category.items.map((item) => ({
    href: item.path,
    nameKey: item.nameKey,
    status: item.status,
  }))
);

export default async function Home() {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Home' });
  const tFaq = await getTranslations({ locale, namespace: 'Faq' });

  const toolName = (key: string) => t(`tools.${key}.title`);
  const toolDescription = (key: string) => t(`tools.${key}.description`);

  // FAQ cevaplari <strong>/<privacy> gibi zengin metin etiketleri icerir.
  // JSON-LD structured data duz metin istedigi icin etiketleri "chunks" ile
  // aynen gecip isaretleyen handler'lar veriyoruz; aksi halde next-intl
  // FORMATTING_ERROR firlatir.
  const toPlainText = (key: string) =>
    // tFaq.rich, <strong>/<privacy> etiketlerini handler ile isler; chunks'i
    // aynen geri vererek JSON-LD icin duz metin elde ederiz (FORMATTING_ERROR yok).
    tFaq.rich(key, {
      strong: (chunks) => chunks,
      privacy: (chunks) => chunks,
    });

  // SEO: Yerelleştirilmiş FAQPage structured data (Google arama sonuçları için)
  const faqStructuredData = [
    { question: tFaq('items.security_q'), answer: toPlainText('items.security_a') },
    { question: tFaq('items.paid_q'), answer: toPlainText('items.paid_a') },
    { question: tFaq('items.formats_q'), answer: toPlainText('items.formats_a') },
    { question: tFaq('items.mobile_q'), answer: toPlainText('items.mobile_a') },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqStructuredData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // SEO: ItemList — ana sayfadaki arac grid'i icin structured data.
  const activeTools = tools.filter((t) => t.status === 'active');
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Convrs — Free Online Privacy-First Tools',
    numberOfItems: activeTools.length,
    itemListElement: activeTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/${locale}${tool.href}`,
      name: toolName(tool.nameKey),
    })),
  };

  return (
    <main className="flex flex-1 flex-col items-center p-5 font-sans sm:p-8">
      <div className="w-full max-w-3xl">
        <JsonLd data={[faqJsonLd, itemListJsonLd]} />
        <section className="flex flex-col items-center gap-4 pt-8 pb-12 text-center sm:pt-12 sm:pb-16">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Convrs
          </h1>
          <p className="max-w-lg text-base text-zinc-400 sm:text-lg">{t('tagline')}</p>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tools.map((tool) =>
            tool.status === 'active' ? (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    {toolName(tool.nameKey)}
                  </h2>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    {t('available')}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {toolDescription(tool.nameKey)}
                </p>
                <span className="mt-4 inline-block font-mono text-xs text-zinc-500 transition-colors group-hover:text-zinc-800 dark:group-hover:text-zinc-300">
                  {t('openTool')}
                </span>
              </Link>
            ) : (
              <div
                key={tool.href}
                aria-disabled="true"
                title={`${toolName(tool.nameKey)} — Coming Soon`}
                className="cursor-not-allowed rounded-2xl border border-zinc-200/70 bg-zinc-100/40 p-6 opacity-70 dark:border-zinc-800/50 dark:bg-zinc-900/20"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
                    {toolName(tool.nameKey)}
                  </h2>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                    <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    {t('available')}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
                  {toolDescription(tool.nameKey)}
                </p>
              </div>
            )
          )}
        </div>

        {/* Faz 4 — Ana sayfa reklam yuvası: araç tablosu ile SSS arasında.
            Config'de slot id yoksa hiç görünmez (slot idsiz üretim güvenli). */}
        <AdUnit slot={AD_SLOT_HOMEPAGE} format="rectangle" className="mt-10" />

        <Faq />
      </div>
    </main>
  );
}
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
