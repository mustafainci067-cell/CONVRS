import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Faq from '@/components/FAQ';

type Tool = {
  href: string;
  nameKey: string;
  status: 'active' | 'coming-soon';
};

const tools: Tool[] = [
  { href: '/heic-to-jpg', nameKey: 'heic-to-jpg', status: 'active' },
  { href: '/jpg-to-webp', nameKey: 'jpg-to-webp', status: 'active' },
  { href: '/png-to-jpg', nameKey: 'png-to-jpg', status: 'active' },
  { href: '/svg-to-png', nameKey: 'svg-to-png', status: 'active' },
  { href: '/webp-to-png', nameKey: 'webp-to-png', status: 'active' },
  { href: '/ico-to-png', nameKey: 'ico-to-png', status: 'active' },
  { href: '/pdf-to-jpg', nameKey: 'pdf-to-jpg', status: 'active' },
  { href: '/json-to-csv', nameKey: 'json-to-csv', status: 'active' },
  { href: '/xml-to-json', nameKey: 'xml-to-json', status: 'active' },
  { href: '/markdown-to-html', nameKey: 'markdown-to-html', status: 'active' },
  { href: '/xlsx-to-csv', nameKey: 'xlsx-to-csv', status: 'active' },
  { href: '/base64-encoder', nameKey: 'base64-encoder', status: 'active' },
  { href: '/url-converter', nameKey: 'url-converter', status: 'active' },
  { href: '/qr-generator', nameKey: 'qr-generator', status: 'active' },
  { href: '/pdf-merge-split', nameKey: 'pdf-merge-split', status: 'active' },
  { href: '/docx-to-pdf', nameKey: 'docx-to-pdf', status: 'active' },
  { href: '/image-compressor', nameKey: 'image-compressor', status: 'active' },
  { href: '/remove-background', nameKey: 'remove-background', status: 'active' },
  { href: '/video-to-mp3', nameKey: 'video-to-mp3', status: 'active' },
  { href: '/mp4-to-webm', nameKey: 'mp4-to-webm', status: 'active' },
  { href: '/wav-to-mp3', nameKey: 'wav-to-mp3', status: 'active' },
  { href: '/jwt-decoder', nameKey: 'jwt-decoder', status: 'active' },
  { href: '/hash-generator', nameKey: 'hash-generator', status: 'active' },
  { href: '/color-converter', nameKey: 'color-converter', status: 'active' },
];

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
