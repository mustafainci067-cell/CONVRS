import type { MetadataRoute } from 'next';

const BASE_URL = 'https://convrs.org';

// next-intl routing.ts ile senkron tutulmali
const LOCALES = ['en', 'tr', 'de', 'es'] as const;

// Sidebar / home grid'i ile ayni olan tum aktif arac yollari.
// Yeni bir arac eklerken bu listeye de eklemeyi unutma.
// NOT: Bu site localePrefix:'always' kullandigi icin her sayfa
// /{locale}/... altinda sunulur; kok URL'de sayfa yoktur.
const TOOL_PATHS = [
  // Gorsel Dönüştürücüler
  '/heic-to-jpg',
  '/jpg-to-webp',
  '/png-to-jpg',
  '/svg-to-png',
  '/webp-to-png',
  '/ico-to-png',
  '/image-compressor',
  '/remove-background',
  '/image-to-base64',
  // Belge & Veri
  '/json-to-csv',
  '/xml-to-json',
  '/markdown-to-html',
  '/pdf-to-jpg',
  '/pdf-merge-split',
  '/docx-to-pdf',
  '/xlsx-to-csv',
  // Geliştirici Araçları
  '/base64-encoder',
  '/url-converter',
  '/qr-generator',
  '/jwt-decoder',
  '/hash-generator',
  '/color-converter',
  '/json-formatter',
  '/unix-timestamp',
  '/uuid-generator',
  '/password-generator',
  '/css-js-minifier',
  '/px-rem-em-converter',
  '/html-encode-decode',
  '/sql-formatter',
  '/box-shadow-generator',
  '/meta-tag-generator',
  // Metin Araçları
  '/case-converter',
  '/word-counter',
  '/lorem-ipsum',
  '/text-diff',
  // Diğer Araçlar
  '/screen-viewport-checker',
  // Video & Ses
  '/mp4-to-webm',
  '/wav-to-mp3',
  '/video-to-mp3',
  '/video-to-gif',
  '/mute-video',
  '/audio-trimmer',
  '/volume-booster',
  '/video-speed',
  '/video-resizer',
  '/voice-recorder',
  '/speech-to-text',
];

const SITEMAP_DATE = new Date('2026-09-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITEMAP_DATE;

  // Ayni sayfanin tum dil surumlerini hreflang alternates olarak ekler
  const alternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = `${BASE_URL}/${locale}${path}`;
    }
    return { languages };
  };

  const entries: MetadataRoute.Sitemap = [];

  // Ana sayfa (her dil icin; priority 1)
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: alternates(''),
    });
  }

  // Tum araclar (her dil × her arac; priority 0.8)
  for (const path of TOOL_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
