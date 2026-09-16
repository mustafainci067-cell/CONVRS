// Faz 3 — Programatik SEO icerik veri modulu.
//
// Her aracin "semantik kabugu": etkilesim sekli (archetype), giris/cikti
// bicimleri ve bu araca ozel, cevrilmeye hazir "olgu" anahtarlari (claimKeys).
//
// Metinler burada YOKTUR. Her dil icin gercek cumleler src/i18n/seo/{en,tr,de,es}.ts
// dosyalarindaki sablon motoru tarafindan bu kurgudan uretilir. Boylece:
//   - 64 arac icin 4 dilde icerik, tek bir kaynaktan otomatik uretilir,
//   - yeni bir arac eklemek icin yalnizca buraya bir satir eklemek yeter,
//   - içerik client bundle'a girmez (yalnizca sunucu komponentlerinde kullanilir)
//     -> Core Web Vitals korunur.
//
// claimKeys, i18n/seo/*.ts icindeki `claims` sozlugune basvurur (or. "webpSmaller").
// sizeLimitMb, idiom: gorsel araclar ~20MB, dokumanlar ~50MB, medya ~100MB.

export type SeoArchetype = 'file' | 'paste' | 'generate';

export type ToolSeoConfig = {
  path: string;
  /** Etkilesim sekli — "Nasil yapilir" adim sablonlarini yonlendirir. */
  archetype: SeoArchetype;
  /** Format/cikti sabiti, or. "PNG" — bicim adlari yerellestirilmez. */
  from: string;
  to: string;
  /** Bu araca ozel, dile gore cevrilen "olgu" anahtarlari (i18n/seo/*.ts -> claims). */
  claimKeys: string[];
  /** Medya WS (WASM motor) — gizlilik FAQ'sunda "WebAssembly motoru" vurgusu ekler. */
  media?: boolean;
  /** Dosya tabanli araclar icin desteklenen en buyuk dosya (MiB). */
  sizeLimitMb?: number;
};

// path -> config eslemesi. Araclar nav.ts'ten (path == nameKey) senkrondur.
export const toolSeoConfigs: Record<string, ToolSeoConfig> = {
  // ─── Gorsel (image) ──────────────────────────────────────────────────────────
  '/heic-to-jpg': {
    path: '/heic-to-jpg',
    archetype: 'file',
    from: 'HEIC',
    to: 'JPG',
    claimKeys: ['heicIos', 'jpgPhoto'],
    sizeLimitMb: 20,
  },
  '/jpg-to-webp': {
    path: '/jpg-to-webp',
    archetype: 'file',
    from: 'JPG',
    to: 'WebP',
    claimKeys: ['webpSmaller', 'jpgPhoto'],
    sizeLimitMb: 20,
  },
  '/png-to-jpg': {
    path: '/png-to-jpg',
    archetype: 'file',
    from: 'PNG',
    to: 'JPG',
    claimKeys: ['pngTransparency', 'jpgPhoto'],
    sizeLimitMb: 20,
  },
  '/svg-to-png': {
    path: '/svg-to-png',
    archetype: 'file',
    from: 'SVG',
    to: 'PNG',
    claimKeys: ['svgVector', 'pngTransparency'],
    sizeLimitMb: 20,
  },
  '/webp-to-png': {
    path: '/webp-to-png',
    archetype: 'file',
    from: 'WebP',
    to: 'PNG',
    claimKeys: ['pngTransparency'],
    sizeLimitMb: 20,
  },
  '/ico-to-png': {
    path: '/ico-to-png',
    archetype: 'file',
    from: 'ICO',
    to: 'PNG',
    claimKeys: ['icoWindows'],
    sizeLimitMb: 20,
  },
  '/image-compressor': {
    path: '/image-compressor',
    archetype: 'file',
    from: 'JPG / PNG',
    to: 'compressed image',
    claimKeys: ['imageCompress'],
    sizeLimitMb: 20,
  },
  '/remove-background': {
    path: '/remove-background',
    archetype: 'file',
    from: 'JPG / PNG',
    to: 'PNG with a transparent background',
    claimKeys: ['removeBg', 'pngTransparency'],
    sizeLimitMb: 20,
  },
  '/image-to-base64': {
    path: '/image-to-base64',
    archetype: 'file',
    from: 'image',
    to: 'Base64 string',
    claimKeys: ['imageToBase64', 'base64Text'],
    sizeLimitMb: 20,
  },
  '/image-resizer': {
    path: '/image-resizer',
    archetype: 'file',
    from: 'image',
    to: 'resized image',
    claimKeys: ['imageResize'],
    sizeLimitMb: 20,
  },
  '/image-cropper': {
    path: '/image-cropper',
    archetype: 'file',
    from: 'image',
    to: 'cropped image',
    claimKeys: ['imageCrop'],
    sizeLimitMb: 20,
  },
  '/image-filters': {
    path: '/image-filters',
    archetype: 'file',
    from: 'image',
    to: 'filtered image',
    claimKeys: ['filtersGraphic'],
    sizeLimitMb: 20,
  },
  '/watermark-adder': {
    path: '/watermark-adder',
    archetype: 'file',
    from: 'image',
    to: 'watermarked image',
    claimKeys: ['watermark'],
    sizeLimitMb: 20,
  },
  '/color-palette-extractor': {
    path: '/color-palette-extractor',
    archetype: 'file',
    from: 'image',
    to: 'color palette',
    claimKeys: ['palette'],
    sizeLimitMb: 20,
  },
  '/exif-cleaner': {
    path: '/exif-cleaner',
    archetype: 'file',
    from: 'JPG / PNG',
    to: 'clean image',
    claimKeys: ['exif'],
    sizeLimitMb: 20,
  },

  // ─── Dokuman (document) ──────────────────────────────────────────────────────
  '/json-to-csv': {
    path: '/json-to-csv',
    archetype: 'paste',
    from: 'JSON',
    to: 'CSV',
    claimKeys: ['jsonStructured', 'csvTabular'],
  },
  '/xml-to-json': {
    path: '/xml-to-json',
    archetype: 'paste',
    from: 'XML',
    to: 'JSON',
    claimKeys: ['jsonStructured'],
  },
  '/markdown-to-html': {
    path: '/markdown-to-html',
    archetype: 'paste',
    from: 'Markdown',
    to: 'HTML',
    claimKeys: ['markdownHtml'],
  },
  '/pdf-to-jpg': {
    path: '/pdf-to-jpg',
    archetype: 'file',
    from: 'PDF',
    to: 'JPG images',
    claimKeys: ['pdfMultiPage', 'jpgPhoto'],
    sizeLimitMb: 50,
  },
  '/pdf-merge-split': {
    path: '/pdf-merge-split',
    archetype: 'file',
    from: 'PDF',
    to: 'combined or split PDF',
    claimKeys: ['pdfMultiPage'],
    sizeLimitMb: 50,
  },
  '/docx-to-pdf': {
    path: '/docx-to-pdf',
    archetype: 'file',
    from: 'DOCX',
    to: 'PDF',
    claimKeys: ['docxEditing', 'pdfMultiPage'],
    sizeLimitMb: 50,
  },
  '/xlsx-to-csv': {
    path: '/xlsx-to-csv',
    archetype: 'file',
    from: 'XLSX',
    to: 'CSV',
    claimKeys: ['xlsxRows', 'csvTabular'],
    sizeLimitMb: 50,
  },
  '/json-to-yaml': {
    path: '/json-to-yaml',
    archetype: 'paste',
    from: 'JSON',
    to: 'YAML',
    claimKeys: ['jsonStructured', 'yamlHuman'],
  },
  '/csv-to-sql': {
    path: '/csv-to-sql',
    archetype: 'paste',
    from: 'CSV',
    to: 'SQL',
    claimKeys: ['csvTabular', 'sqlPretty'],
  },
  '/xml-to-csv': {
    path: '/xml-to-csv',
    archetype: 'paste',
    from: 'XML',
    to: 'CSV',
    claimKeys: ['csvTabular'],
  },
  '/pdf-to-text': {
    path: '/pdf-to-text',
    archetype: 'file',
    from: 'PDF',
    to: 'plain text',
    claimKeys: ['pdfMultiPage'],
    sizeLimitMb: 50,
  },
  '/xlsx-to-json': {
    path: '/xlsx-to-json',
    archetype: 'file',
    from: 'XLSX',
    to: 'JSON',
    claimKeys: ['jsonStructured', 'xlsxRows'],
    sizeLimitMb: 50,
  },
  '/vcf-to-csv': {
    path: '/vcf-to-csv',
    archetype: 'file',
    from: 'VCF',
    to: 'CSV',
    claimKeys: ['vcfContacts', 'csvTabular'],
    sizeLimitMb: 50,
  },

  // ─── Gelistirici (developer) ──────────────────────────────────────────────────
  '/base64-encoder': {
    path: '/base64-encoder',
    archetype: 'paste',
    from: 'text',
    to: 'Base64',
    claimKeys: ['base64Text'],
  },
  '/url-converter': {
    path: '/url-converter',
    archetype: 'paste',
    from: 'URL',
    to: 'encoded / decoded URL',
    claimKeys: ['urlEncode'],
  },
  '/qr-generator': {
    path: '/qr-generator',
    archetype: 'generate',
    from: 'text / URL',
    to: 'QR code',
    claimKeys: ['qrUrls'],
  },
  '/jwt-decoder': {
    path: '/jwt-decoder',
    archetype: 'paste',
    from: 'JWT token',
    to: 'decoded claims',
    claimKeys: ['jwtTokens'],
  },
  '/hash-generator': {
    path: '/hash-generator',
    archetype: 'paste',
    from: 'text',
    to: 'hash',
    claimKeys: ['hashOneWay'],
  },
  '/color-converter': {
    path: '/color-converter',
    archetype: 'paste',
    from: 'color code',
    to: 'HEX / RGB / HSL',
    claimKeys: ['colorModels'],
  },
  '/json-formatter': {
    path: '/json-formatter',
    archetype: 'paste',
    from: 'JSON',
    to: 'formatted JSON',
    claimKeys: ['jsonStructured'],
  },
  '/unix-timestamp': {
    path: '/unix-timestamp',
    archetype: 'generate',
    from: 'Unix timestamp',
    to: 'date',
    claimKeys: ['unixEpoch'],
  },
  '/uuid-generator': {
    path: '/uuid-generator',
    archetype: 'generate',
    from: '-na-',
    to: 'UUID',
    claimKeys: ['uuidStandard'],
  },
  '/password-generator': {
    path: '/password-generator',
    archetype: 'generate',
    from: '-na-',
    to: 'strong password',
    claimKeys: ['passwordStrength'],
  },
  '/css-js-minifier': {
    path: '/css-js-minifier',
    archetype: 'paste',
    from: 'CSS / JS',
    to: 'minified code',
    claimKeys: ['cssMinify'],
  },
  '/px-rem-em-converter': {
    path: '/px-rem-em-converter',
    archetype: 'paste',
    from: 'px',
    to: 'rem / em',
    claimKeys: ['cssUnits'],
  },
  '/html-encode-decode': {
    path: '/html-encode-decode',
    archetype: 'paste',
    from: 'HTML',
    to: 'encoded / decoded HTML',
    claimKeys: ['htmlRfc'],
  },
  '/sql-formatter': {
    path: '/sql-formatter',
    archetype: 'paste',
    from: 'SQL',
    to: 'formatted SQL',
    claimKeys: ['sqlPretty'],
  },
  '/box-shadow-generator': {
    path: '/box-shadow-generator',
    archetype: 'generate',
    from: '-na-',
    to: 'box shadow CSS',
    claimKeys: ['boxShadow'],
  },
  '/meta-tag-generator': {
    path: '/meta-tag-generator',
    archetype: 'generate',
    from: '-na-',
    to: 'meta tags',
    claimKeys: ['metaTags'],
  },
  '/chmod-calculator': {
    path: '/chmod-calculator',
    archetype: 'generate',
    from: '-na-',
    to: 'chmod value',
    claimKeys: ['chmodPerms'],
  },
  '/js-keycode': {
    path: '/js-keycode',
    archetype: 'generate',
    from: '-na-',
    to: 'key code',
    claimKeys: ['jsKeycode'],
  },
  '/tailwind-palette': {
    path: '/tailwind-palette',
    archetype: 'generate',
    from: '-na-',
    to: 'Tailwind palette',
    claimKeys: ['tailwindClasses'],
  },
  '/url-parser': {
    path: '/url-parser',
    archetype: 'paste',
    from: 'URL',
    to: 'parsed parts',
    claimKeys: ['urlParse'],
  },

  // ─── Metin (text) ─────────────────────────────────────────────────────────────
  '/case-converter': {
    path: '/case-converter',
    archetype: 'paste',
    from: 'text',
    to: 'different text case',
    claimKeys: ['caseText'],
  },
  '/word-counter': {
    path: '/word-counter',
    archetype: 'paste',
    from: 'text',
    to: 'word / character counts',
    claimKeys: ['wordCount'],
  },
  '/lorem-ipsum': {
    path: '/lorem-ipsum',
    archetype: 'generate',
    from: '-na-',
    to: 'Lorem Ipsum text',
    claimKeys: ['loremPlaceholder'],
  },
  '/text-diff': {
    path: '/text-diff',
    archetype: 'paste',
    from: 'two texts',
    to: 'diff',
    claimKeys: ['textDiff'],
  },

  // ─── Diger (other) ────────────────────────────────────────────────────────────
  '/screen-viewport-checker': {
    path: '/screen-viewport-checker',
    archetype: 'generate',
    from: '-na-',
    to: 'viewport size',
    claimKeys: ['screenViewport'],
  },

  // ─── Medya (media) ────────────────────────────────────────────────────────────
  '/mp4-to-webm': {
    path: '/mp4-to-webm',
    archetype: 'file',
    from: 'MP4',
    to: 'WebM',
    claimKeys: ['mp4Webm'],
    media: true,
    sizeLimitMb: 100,
  },
  '/wav-to-mp3': {
    path: '/wav-to-mp3',
    archetype: 'file',
    from: 'WAV',
    to: 'MP3',
    claimKeys: ['mp3Audio', 'wavLossless'],
    media: true,
    sizeLimitMb: 100,
  },
  '/video-to-mp3': {
    path: '/video-to-mp3',
    archetype: 'file',
    from: 'video',
    to: 'MP3',
    claimKeys: ['mp3Audio'],
    media: true,
    sizeLimitMb: 100,
  },
  '/video-to-gif': {
    path: '/video-to-gif',
    archetype: 'file',
    from: 'video',
    to: 'GIF',
    claimKeys: ['gifLite'],
    media: true,
    sizeLimitMb: 100,
  },
  '/mute-video': {
    path: '/mute-video',
    archetype: 'file',
    from: 'video',
    to: 'muted video',
    claimKeys: ['muteVideo'],
    media: true,
    sizeLimitMb: 100,
  },
  '/audio-trimmer': {
    path: '/audio-trimmer',
    archetype: 'file',
    from: 'audio',
    to: 'trimmed audio',
    claimKeys: ['audioTrim', 'mp3Audio'],
    media: true,
    sizeLimitMb: 100,
  },
  '/volume-booster': {
    path: '/volume-booster',
    archetype: 'file',
    from: 'audio',
    to: 'louder audio',
    claimKeys: ['volumeBoost'],
    media: true,
    sizeLimitMb: 100,
  },
  '/video-speed': {
    path: '/video-speed',
    archetype: 'file',
    from: 'video',
    to: 'speed-changed video',
    claimKeys: ['videoSpeed'],
    media: true,
    sizeLimitMb: 100,
  },
  '/video-resizer': {
    path: '/video-resizer',
    archetype: 'file',
    from: 'video',
    to: 'resized video',
    claimKeys: ['videoResize'],
    media: true,
    sizeLimitMb: 100,
  },
  '/voice-recorder': {
    path: '/voice-recorder',
    archetype: 'generate',
    from: 'microphone',
    to: 'voice recording',
    claimKeys: ['voiceRecorder'],
  },
  '/speech-to-text': {
    path: '/speech-to-text',
    archetype: 'generate',
    from: 'microphone',
    to: 'text transcript',
    claimKeys: ['speechText'],
  },
};