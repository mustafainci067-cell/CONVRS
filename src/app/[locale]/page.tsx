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
          {/* ── Rehberler (Guides) Kartı ── */}
          <Link
            href="/guides"
            className="group col-span-1 sm:col-span-2 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-6 transition-all hover:border-indigo-400 hover:shadow-md dark:border-indigo-900 dark:bg-indigo-950/30 dark:hover:border-indigo-700"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
                  {t('guidesCard.title')}
                </h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-indigo-700 dark:text-indigo-400">
              {t('guidesCard.description')}
            </p>
            <span className="mt-4 inline-block font-mono text-xs text-indigo-600 transition-colors group-hover:text-indigo-800 dark:text-indigo-400 dark:group-hover:text-indigo-300">
              {t('guidesCard.link')}
            </span>
          </Link>

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
                <span className="mt-4 inline-block font-mono text-xs text-zinc-600 transition-colors group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-300">
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
