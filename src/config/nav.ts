// Bu dosya, tüm araç navigasyonunun TEK kaynağıdır (single source of truth).
//
// Sidebar (src/components/Sidebar.tsx), ana sayfa grid'i (src/app/[locale]/page.tsx)
// ve app/sitemap.ts buradan beslenir. Yeni bir araç eklerken:
//   1. Buradaki ilgili kategorinin `items` dizisine { nameKey, path, status } ekle.
//   2. src/messages/{en,tr,de,es}.json içinde Sidebar.tools ve Home.tools çevirilerini ekle.
//   3. Aracın sayfa dosyasını src/app/[locale]/<path>/page.tsx altında oluştur.
//
// Sonrasında araç Sidebar'da, ana sayfada ve sitemap'te otomatik görünür.
// sitemap yalnızca status: 'active' olan (sayfası var olan) araçları içerir.

export type NavItemStatus = 'active' | 'coming-soon';

export type NavItemConfig = {
  nameKey: string;
  path: string;
  status: NavItemStatus;
};

export type NavCategoryConfig = {
  titleKey: string;
  items: NavItemConfig[];
};

export const categoryConfigs: NavCategoryConfig[] = [
  {
    titleKey: 'image',
    items: [
      { nameKey: 'heic-to-jpg', path: '/heic-to-jpg', status: 'active' },
      { nameKey: 'jpg-to-webp', path: '/jpg-to-webp', status: 'active' },
      { nameKey: 'png-to-jpg', path: '/png-to-jpg', status: 'active' },
      { nameKey: 'svg-to-png', path: '/svg-to-png', status: 'active' },
      { nameKey: 'webp-to-png', path: '/webp-to-png', status: 'active' },
      { nameKey: 'ico-to-png', path: '/ico-to-png', status: 'active' },
      { nameKey: 'image-compressor', path: '/image-compressor', status: 'active' },
      { nameKey: 'remove-background', path: '/remove-background', status: 'active' },
      { nameKey: 'image-to-base64', path: '/image-to-base64', status: 'active' },
      { nameKey: 'image-resizer', path: '/image-resizer', status: 'active' },
      { nameKey: 'image-cropper', path: '/image-cropper', status: 'active' },
      { nameKey: 'image-filters', path: '/image-filters', status: 'active' },
      { nameKey: 'watermark-adder', path: '/watermark-adder', status: 'active' },
      { nameKey: 'color-palette-extractor', path: '/color-palette-extractor', status: 'active' },
      { nameKey: 'exif-cleaner', path: '/exif-cleaner', status: 'active' },
    ],
  },
  {
    titleKey: 'document',
    items: [
      { nameKey: 'json-to-csv', path: '/json-to-csv', status: 'active' },
      { nameKey: 'xml-to-json', path: '/xml-to-json', status: 'active' },
      { nameKey: 'markdown-to-html', path: '/markdown-to-html', status: 'active' },
      { nameKey: 'pdf-to-jpg', path: '/pdf-to-jpg', status: 'active' },
      { nameKey: 'pdf-merge-split', path: '/pdf-merge-split', status: 'active' },
      { nameKey: 'docx-to-pdf', path: '/docx-to-pdf', status: 'active' },
      { nameKey: 'xlsx-to-csv', path: '/xlsx-to-csv', status: 'active' },
    ],
  },
  {
    titleKey: 'developer',
    items: [
      { nameKey: 'base64-encoder', path: '/base64-encoder', status: 'active' },
      { nameKey: 'url-converter', path: '/url-converter', status: 'active' },
      { nameKey: 'qr-generator', path: '/qr-generator', status: 'active' },
      { nameKey: 'jwt-decoder', path: '/jwt-decoder', status: 'active' },
      { nameKey: 'hash-generator', path: '/hash-generator', status: 'active' },
      { nameKey: 'color-converter', path: '/color-converter', status: 'active' },
      { nameKey: 'json-formatter', path: '/json-formatter', status: 'active' },
      { nameKey: 'unix-timestamp', path: '/unix-timestamp', status: 'active' },
      { nameKey: 'uuid-generator', path: '/uuid-generator', status: 'active' },
      { nameKey: 'password-generator', path: '/password-generator', status: 'active' },
      { nameKey: 'css-js-minifier', path: '/css-js-minifier', status: 'active' },
      { nameKey: 'px-rem-em-converter', path: '/px-rem-em-converter', status: 'active' },
      { nameKey: 'html-encode-decode', path: '/html-encode-decode', status: 'active' },
      { nameKey: 'sql-formatter', path: '/sql-formatter', status: 'active' },
      { nameKey: 'box-shadow-generator', path: '/box-shadow-generator', status: 'active' },
      { nameKey: 'meta-tag-generator', path: '/meta-tag-generator', status: 'active' },
      { nameKey: 'chmod-calculator', path: '/chmod-calculator', status: 'active' },
      { nameKey: 'js-keycode', path: '/js-keycode', status: 'active' },
      { nameKey: 'tailwind-palette', path: '/tailwind-palette', status: 'active' },
      { nameKey: 'url-parser', path: '/url-parser', status: 'active' },
    ],
  },
  {
    titleKey: 'text',
    items: [
      { nameKey: 'case-converter', path: '/case-converter', status: 'active' },
      { nameKey: 'word-counter', path: '/word-counter', status: 'active' },
      { nameKey: 'lorem-ipsum', path: '/lorem-ipsum', status: 'active' },
      { nameKey: 'text-diff', path: '/text-diff', status: 'active' },
    ],
  },
  {
    titleKey: 'other',
    items: [
      { nameKey: 'screen-viewport-checker', path: '/screen-viewport-checker', status: 'active' },
    ],
  },
  {
    titleKey: 'media',
    items: [
      { nameKey: 'mp4-to-webm', path: '/mp4-to-webm', status: 'active' },
      { nameKey: 'wav-to-mp3', path: '/wav-to-mp3', status: 'active' },
      { nameKey: 'video-to-mp3', path: '/video-to-mp3', status: 'active' },
      { nameKey: 'video-to-gif', path: '/video-to-gif', status: 'active' },
      { nameKey: 'mute-video', path: '/mute-video', status: 'active' },
      { nameKey: 'audio-trimmer', path: '/audio-trimmer', status: 'active' },
      { nameKey: 'volume-booster', path: '/volume-booster', status: 'active' },
      { nameKey: 'video-speed', path: '/video-speed', status: 'active' },
      { nameKey: 'video-resizer', path: '/video-resizer', status: 'active' },
      { nameKey: 'voice-recorder', path: '/voice-recorder', status: 'active' },
      { nameKey: 'speech-to-text', path: '/speech-to-text', status: 'active' },
    ],
  },
];

/** Sayfası var olan (status: 'active') tüm araç yolları, kategori sırası korunarak. */
export const activeToolPaths: string[] = categoryConfigs.flatMap((category) =>
  category.items.filter((item) => item.status === 'active').map((item) => item.path)
);
