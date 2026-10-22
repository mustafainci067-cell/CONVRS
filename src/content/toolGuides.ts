// Arac sayfasi -> ilgili uzun-okunur rehber(ler) eslemesi.
//
// Her arac sayfasinin altinda, yalnizca o araca konu olarak yakin 1-3 rehber
// "Derinlemesine oku" blogu olarak listelenir. Boylece sablon tabanli arac
// metni, sitenin ozgun uzun icerigine (guides) baglanir: iç link + konu kumesi,
// ve arac sayfalari tek basina "ince icerik" gibi gorunmez.
//
// Degerler src/i18n/guides/index.ts'deki slug'lardir (TS rehberler 4 dilde de var).
// Eslenmemis bir arac icin kategori varsayilani (CATEGORY_FALLBACK) kullanilir.

export const toolGuideSlugs: Record<string, string[]> = {
  // ── Gorsel ─────────────────────────────────────────────────────────────
  '/heic-to-jpg': ['image-conversion-complete-guide', 'secure-file-conversion-guide'],
  '/jpg-to-webp': ['image-optimization-for-web-speed', 'image-conversion-complete-guide'],
  '/png-to-jpg': ['image-conversion-complete-guide', 'image-optimization-for-web-speed'],
  '/svg-to-png': ['svg-vectors-for-web', 'image-conversion-complete-guide'],
  '/webp-to-png': ['image-conversion-complete-guide', 'image-optimization-for-web-speed'],
  '/ico-to-png': ['image-conversion-complete-guide', 'svg-vectors-for-web'],
  '/image-compressor': ['image-optimization-for-web-speed', 'image-conversion-complete-guide'],
  '/remove-background': ['remove-background-guide', 'client-side-processing-privacy'],
  '/image-to-base64': ['base64-guide', 'image-optimization-for-web-speed'],
  '/image-resizer': ['image-resize-crop-guide', 'image-optimization-for-web-speed'],
  '/image-cropper': ['image-resize-crop-guide', 'image-optimization-for-web-speed'],
  '/image-filters': ['image-resize-crop-guide', 'image-conversion-complete-guide'],
  '/watermark-adder': ['image-resize-crop-guide', 'exif-metadata-privacy-guide'],
  '/color-palette-extractor': ['color-conversion-guide', 'image-optimization-for-web-speed'],
  '/exif-cleaner': ['exif-metadata-privacy-guide', 'client-side-processing-privacy'],

  // ── Dokuman ────────────────────────────────────────────────────────────
  '/json-to-csv': ['spreadsheet-conversion-guide', 'developer-tools-guide'],
  '/xml-to-json': ['developer-tools-guide', 'document-processing-guide'],
  '/markdown-to-html': ['text-processing-guide', 'document-processing-guide'],
  '/pdf-to-jpg': ['pdf-file-guide', 'secure-file-conversion-guide'],
  '/pdf-merge-split': ['pdf-file-guide', 'secure-file-conversion-guide'],
  '/docx-to-pdf': ['document-processing-guide', 'pdf-file-guide'],
  '/xlsx-to-csv': ['spreadsheet-conversion-guide', 'document-processing-guide'],
  '/json-to-yaml': ['developer-tools-guide', 'document-processing-guide'],
  '/csv-to-sql': ['spreadsheet-conversion-guide', 'developer-tools-guide'],
  '/xml-to-csv': ['spreadsheet-conversion-guide', 'document-processing-guide'],
  '/pdf-to-text': ['pdf-file-guide', 'text-processing-guide'],
  '/xlsx-to-json': ['spreadsheet-conversion-guide', 'developer-tools-guide'],
  '/vcf-to-csv': ['spreadsheet-conversion-guide', 'document-processing-guide'],

  // ── Gelistirici ────────────────────────────────────────────────────────
  '/base64-encoder': ['base64-guide', 'developer-tools-guide'],
  '/url-converter': ['html-encoding-guide', 'developer-tools-guide'],
  '/qr-generator': ['qr-code-guide', 'developer-tools-guide'],
  '/jwt-decoder': ['jwt-token-guide', 'hash-function-guide'],
  '/hash-generator': ['hash-function-guide', 'password-security-guide'],
  '/color-converter': ['color-conversion-guide', 'css-shadow-design-guide'],
  '/json-formatter': ['developer-tools-guide', 'text-processing-guide'],
  '/unix-timestamp': ['developer-tools-guide', 'jwt-token-guide'],
  '/uuid-generator': ['developer-tools-guide', 'hash-function-guide'],
  '/password-generator': ['password-security-guide', 'hash-function-guide'],
  '/css-js-minifier': ['image-optimization-for-web-speed', 'developer-tools-guide'],
  '/px-rem-em-converter': ['responsive-design-viewport-guide', 'css-shadow-design-guide'],
  '/html-encode-decode': ['html-encoding-guide', 'developer-tools-guide'],
  '/sql-formatter': ['developer-tools-guide', 'text-processing-guide'],
  '/box-shadow-generator': ['css-shadow-design-guide', 'color-conversion-guide'],
  '/meta-tag-generator': ['developer-tools-guide', 'html-encoding-guide'],
  '/chmod-calculator': ['chmod-permissions-guide', 'developer-tools-guide'],
  '/js-keycode': ['developer-tools-guide', 'text-processing-guide'],
  '/tailwind-palette': ['color-conversion-guide', 'css-shadow-design-guide'],
  '/url-parser': ['html-encoding-guide', 'developer-tools-guide'],

  // ── Metin ──────────────────────────────────────────────────────────────
  '/case-converter': ['text-processing-guide', 'developer-tools-guide'],
  '/word-counter': ['text-processing-guide', 'document-processing-guide'],
  '/lorem-ipsum': ['text-processing-guide', 'responsive-design-viewport-guide'],
  '/text-diff': ['text-processing-guide', 'developer-tools-guide'],

  // ── Diger ──────────────────────────────────────────────────────────────
  '/screen-viewport-checker': ['responsive-design-viewport-guide', 'css-shadow-design-guide'],

  // ── Medya ──────────────────────────────────────────────────────────────
  '/mp4-to-webm': ['audio-video-processing-guide', 'webassembly-browser-capabilities'],
  '/wav-to-mp3': ['audio-formats-quality-guide', 'audio-video-processing-guide'],
  '/video-to-mp3': ['audio-formats-quality-guide', 'audio-video-processing-guide'],
  '/video-to-gif': ['video-to-gif-guide', 'audio-video-processing-guide'],
  '/mute-video': ['audio-video-processing-guide', 'webassembly-browser-capabilities'],
  '/audio-trimmer': ['audio-formats-quality-guide', 'audio-video-processing-guide'],
  '/volume-booster': ['audio-formats-quality-guide', 'audio-video-processing-guide'],
  '/video-speed': ['audio-video-processing-guide', 'webassembly-browser-capabilities'],
  '/video-resizer': ['audio-video-processing-guide', 'image-resize-crop-guide'],
  '/voice-recorder': ['audio-formats-quality-guide', 'client-side-processing-privacy'],
  '/speech-to-text': ['text-processing-guide', 'client-side-processing-privacy'],
};

// Eslesmeyen araclar icin kategori bazli varsayilan.
export const CATEGORY_FALLBACK: Record<string, string[]> = {
  image: ['image-conversion-complete-guide', 'client-side-processing-privacy'],
  document: ['document-processing-guide', 'secure-file-conversion-guide'],
  developer: ['developer-tools-guide', 'client-side-processing-privacy'],
  text: ['text-processing-guide', 'client-side-processing-privacy'],
  media: ['audio-video-processing-guide', 'webassembly-browser-capabilities'],
  other: ['client-side-processing-privacy', 'developer-tools-guide'],
};

export function getGuideSlugsForTool(path: string, categoryKey?: string): string[] {
  return (
    toolGuideSlugs[path] ??
    (categoryKey ? CATEGORY_FALLBACK[categoryKey] : undefined) ??
    CATEGORY_FALLBACK.other
  );
}
