// /guides (Blog) kayıt defteri — tüm makaleler buradan yönetilir.
// Yeni bir rehber eklemek: makale dosyasını src/i18n/guides/ altında oluştur,
// buraya import edip `guides` dizisine ekle. Slug tüm dillerde ortaktır;
// {locale}/guides/{slug} sayfası ve sitemap buradan beslenir.
import type { GuideDefinition, GuideDocument, Rich, Locale } from "./types";

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
import chmodPermissionsGuide from "./chmod-permissions-guide";
import cssShadowDesignGuide from "./css-shadow-design-guide";
import imageResizeCropGuide from "./image-resize-crop-guide";
import passwordSecurityGuide from "./password-security-guide";
import responsiveDesignViewportGuide from "./responsive-design-viewport-guide";
import svgVectorsGuide from "./svg-vectors-for-web";

export const guides: GuideDefinition[] = [
  svgVectorsGuide,
  responsiveDesignViewportGuide,
  passwordSecurityGuide,
  imageResizeCropGuide,
  cssShadowDesignGuide,
  chmodPermissionsGuide,
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
  'qr-code-guide': 'image',
  'chmod-permissions-guide': 'developer',
  'css-shadow-design-guide': 'developer',
  'image-resize-crop-guide': 'image',
  'password-security-guide': 'developer',
  'responsive-design-viewport-guide': 'developer',
  'svg-vectors-for-web': 'image',
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

export const MIN_INDEXABLE_GUIDE_WORDS = 400;

function richToText(parts: Rich[]): string {
  return parts.map((r) => (typeof r === "string" ? r : r.text)).join(" ");
}

export function countGuideWords(doc: GuideDocument): number {
  const chunks: string[] = [doc.meta.title, doc.meta.description];
  for (const block of doc.blocks) {
    if (block.type === "p" || block.type === "h2" || block.type === "h3") {
      chunks.push(richToText(block.content));
    } else if (block.type === "list") {
      for (const item of block.items) {
        chunks.push(richToText(item));
      }
    } else if (block.type === "note") {
      if (block.title) chunks.push(block.title);
      chunks.push(richToText(block.content));
    } else if (block.type === "table") {
      chunks.push(...block.columns);
      for (const row of block.rows) {
        chunks.push(...row);
      }
    }
  }
  return chunks.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

const tsIndexableCache = new Map<string, boolean>();

export function isTsGuideIndexable(slug: string, locale: string): boolean {
  if (locale === "en") return true;
  const cacheKey = `${locale}:${slug}`;
  const cached = tsIndexableCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const guide = getGuideBySlug(slug);
  const doc = guide?.content[locale as Locale];
  const result = Boolean(doc && countGuideWords(doc) >= MIN_INDEXABLE_GUIDE_WORDS);
  tsIndexableCache.set(cacheKey, result);
  return result;
}

const EN_MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

export function getTsGuideIsoDate(
  guide: GuideDefinition,
  fallback = "2026-03-01"
): string {
  const raw = (guide.content.en?.meta.updatedDate ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const m = raw.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return fallback;
  const month = EN_MONTHS[m[1].toLowerCase()];
  if (!month) return fallback;
  const day = m[2].padStart(2, "0");
  return `${m[3]}-${month}-${day}`;
}