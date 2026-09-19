// /guides (Blog) kayıt defteri — tüm makaleler buradan yönetilir.
// Yeni bir rehber eklemek: makale dosyasını src/i18n/guides/ altında oluştur,
// buraya import edip `guides` dizisine ekle. Slug tüm dillerde ortaktır;
// {locale}/guides/{slug} sayfası ve sitemap buradan beslenir.
import type { GuideDefinition } from "./types";

import clientSideProcessingPrivacy from "./client-side-processing-privacy";
import webassemblyBrowserCapabilities from "./webassembly-browser-capabilities";
import secureFileConversionGuide from "./secure-file-conversion-guide";
import imageConversionGuide from "./image-conversion-complete-guide";
import documentProcessingGuide from "./document-processing-guide";
import developerToolsGuide from "./developer-tools-guide";
import textProcessingGuide from "./text-processing-guide";
import audioVideoGuide from "./audio-video-processing-guide";
import imageOptimizationGuide from "./image-optimization-for-web-speed";
import removeBackgroundGuide from "./remove-background-guide";
import exifMetadataGuide from "./exif-metadata-privacy-guide";
import pdfFileGuide from "./pdf-file-guide";
import spreadsheetConversionGuide from "./spreadsheet-conversion-guide";
import jwtTokenGuide from "./jwt-token-guide";
import hashFunctionGuide from "./hash-function-guide";
import base64Guide from "./base64-guide";
import videoToGifGuide from "./video-to-gif-guide";
import qrCodeGuide from "./qr-code-guide";
import colorConversionGuide from "./color-conversion-guide";
import audioFormatsQualityGuide from "./audio-formats-quality-guide";
import htmlEncodingGuide from "./html-encoding-guide";

export const guides: GuideDefinition[] = [
  audioFormatsQualityGuide,
  htmlEncodingGuide,
  colorConversionGuide,
  clientSideProcessingPrivacy,
  webassemblyBrowserCapabilities,
  secureFileConversionGuide,
  imageConversionGuide,
  documentProcessingGuide,
  developerToolsGuide,
  textProcessingGuide,
  audioVideoGuide,
  imageOptimizationGuide,
  removeBackgroundGuide,
  exifMetadataGuide,
  pdfFileGuide,
  spreadsheetConversionGuide,
  jwtTokenGuide,
  hashFunctionGuide,
  base64Guide,
  videoToGifGuide,
  qrCodeGuide,
];

const tsGuideCategories: Record<string, string> = {
  'audio-formats-quality-guide': 'media',
  'html-encoding-guide': 'developer',
  'color-conversion-guide': 'image',
  'client-side-processing-privacy': 'developer',
  'webassembly-browser-capabilities': 'developer',
  'secure-file-conversion-guide': 'developer',
  'image-conversion-complete-guide': 'image',
  'document-processing-guide': 'document',
  'developer-tools-guide': 'developer',
  'text-processing-guide': 'document',
  'audio-video-processing-guide': 'media',
  'image-optimization-for-web-speed': 'image',
  'remove-background-guide': 'image',
  'exif-metadata-privacy-guide': 'image',
  'pdf-file-guide': 'document',
  'spreadsheet-conversion-guide': 'document',
  'jwt-token-guide': 'developer',
  'hash-function-guide': 'developer',
  'base64-guide': 'developer',
  'video-to-gif-guide': 'media',
  'qr-code-guide': 'image'
};

/** Slug'a göre kategoriyi bulur */
export function getCategoryForTsGuide(slug: string): string {
  return tsGuideCategories[slug] || 'misc';
}

/** Slug'a göre rehber kaydını bulur (bulunamazsa undefined). */
export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guides.find((guide) => guide.slug === slug);
}

/** Tüm slug'lar — generateStaticParams ve sitemap için. */
export const guideSlugs: string[] = guides.map((guide) => guide.slug);

/** /guides index sayfasında kart sıralaması: son eklenen/güncellenen en üstte. */
export const guidesByRecency: GuideDefinition[] = [...guides].reverse();