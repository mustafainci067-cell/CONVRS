/**
 * Rehber (guide) Markdown dosyalarını okur, frontmatter'ı parse eder
 * ve `marked` ile HTML'e dönüştürür.
 *
 * Tüm işlemler sunucu tarafında (Node.js) yapılır; tarayıcıya sadece
 * hazırlanmış veri gider. Ek paket gerekmez — `marked` zaten kurulu.
 *
 * Dosya konvansiyonu:
 *   src/content/guides/<locale>/<category>/<slug>.md
 *
 * Frontmatter alanları:
 *   title       – sayfa başlığı (zorunlu)
 *   description – SEO açıklaması (zorunlu)
 *   date        – yayın tarihi: "YYYY-MM-DD" (zorunlu)
 *   slug        – URL slug'ı (zorunlu, dosya adıyla eşleşmeli)
 *   readingTime – tahmini okuma süresi (dakika, opsiyonel)
 *   tags        – etiket listesi (opsiyonel)
 */

import fs from "fs";
import path from "path";
import { marked } from "marked";
import { guideSlugs, getCategoryForTsGuide } from "@/i18n/guides";
import { findLocalizedGuideGroup, type GuideLocaleCode } from "@/i18n/guideTranslations";
import { routing, getCanonicalUrl } from "@/i18n/routing";

// src/content/guides/[locale] klasörü
const getGuidesDir = (locale: string) =>
  path.join(process.cwd(), "src", "content", "guides", locale);

export type GuideFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  readingTime?: number;
  tags?: string[];
};

export type GuideData = GuideFrontmatter & {
  category: string;
  /** Güvenli HTML (marked çıktısı) */
  contentHtml: string;
};

export type GuideSummary = GuideFrontmatter & {
  category: string;
};

/**
 * Sunucu/Edge uyumlu, sıfır `jsdom` bağımlılıklı HTML temizleyici.
 * `isomorphic-dompurify` paketi `jsdom` -> `whatwg-url@17` ESM zinciri yüzünden
 * Vercel Serverless Node çalışma zamanında 500 Internal Server Error üretebildiği
 * için yerel Markdown çıktısını hafif ve deterministik olarak temizler.
 */
function sanitizeGuideHtml(html: string): string {
  return html
    .replace(/<(script|iframe|object|embed|form|style)[\s\S]*?>[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|iframe|object|embed|form|style)[^>]*\/?>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*(?:javascript|vbscript|data:text\/html):[^"']*\2/gi, '$1=$2#$2');
}

/**
 * YAML frontmatter bloğunu basit regex ile parse eder.
 * gray-matter bağımlılığı olmadan çalışır.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];

  const data: Record<string, unknown> = {};
  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rawValue = line.slice(colonIdx + 1).trim();

    // Sayı
    if (/^\d+$/.test(rawValue)) {
      data[key] = parseInt(rawValue, 10);
      continue;
    }

    // Tırnaklı string
    if (/^["'].*["']$/.test(rawValue)) {
      data[key] = rawValue.slice(1, -1);
      continue;
    }

    // Dizi: ["a", "b"] ya da [a, b]
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    data[key] = rawValue;
  }

  return { data, content };
}

/**
 * Recursively find all markdown files in a directory.
 */
function getAllMarkdownFiles(
  dir: string,
  fileList: { file: string; category: string }[] = [],
  category = ""
): { file: string; category: string }[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList, file); // directory name is the category
    } else if (file.endsWith(".md")) {
      fileList.push({ file: filePath, category: category || "misc" });
    }
  }
  return fileList;
}

// Build ve çalışma zamanında 50.000+ tekrarlı disk okumasını (fs.readFileSync)
// önlemek için bellek içi önbellek: SSG süresini ~75 saniyeden ~8 saniyeye indirir.
const guideSlugsCache = new Map<
  string,
  { slug: string; category: string; date: string }[]
>();
const allGuidesCache = new Map<string, GuideSummary[]>();

/**
 * Tüm rehberlerin frontmatter özetini döner (listelemek için).
 * TS rehberleriyle çakışan slug'lar (örn. client-side-processing-privacy)
 * çift kart ve duplicate key oluşmaması için filtrelenir.
 * Tarihe göre azalan sırada sıralanır.
 */
export function getAllGuides(locale: string): GuideSummary[] {
  const cached = allGuidesCache.get(locale);
  if (cached) return cached;

  const dir = getGuidesDir(locale);
  if (!fs.existsSync(dir)) return [];

  const mdFiles = getAllMarkdownFiles(dir);

  const guides: GuideSummary[] = mdFiles
    .map(({ file, category }) => {
      const raw = fs.readFileSync(file, "utf8");
      const { data } = parseFrontmatter(raw);
      const filename = path.basename(file);
      const slug = String(data.slug ?? filename.replace(/\.md$/, ""));
      return {
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        slug,
        category,
        readingTime: typeof data.readingTime === "number" ? data.readingTime : undefined,
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      };
    })
    .filter((g) => !guideSlugs.includes(g.slug));

  const sorted = guides.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  allGuidesCache.set(locale, sorted);
  return sorted;
}

/**
 * Belirli bir slug'ın tam içeriğini (HTML) döner.
 * Slug bulunamazsa `null` döner → 404.
 */
export async function getGuideBySlug(
  slug: string,
  locale: string
): Promise<GuideData | null> {
  const dir = getGuidesDir(locale);
  if (!fs.existsSync(dir)) return null;

  const mdFiles = getAllMarkdownFiles(dir);
  const matchedFile = mdFiles.find((f) => {
    const filename = path.basename(f.file).replace(/\.md$/, "");
    return filename === slug;
  });

  if (!matchedFile) return null;

  const raw = fs.readFileSync(matchedFile.file, "utf8");
  const { data, content } = parseFrontmatter(raw);

  // marked ile Markdown → HTML (async API kullanıyoruz)
  const rawHtml = await marked(content, {
    gfm: true, // GitHub Flavored Markdown (tablolar, görev listeleri)
    breaks: false, // Tek satır sonu → <br> değil
  });

  const contentHtml = sanitizeGuideHtml(rawHtml);

  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    slug: String(data.slug ?? slug),
    category: matchedFile.category,
    readingTime: typeof data.readingTime === "number" ? data.readingTime : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    contentHtml,
  };
}

/**
 * Tüm slug'ları ve kategorilerini döner — generateStaticParams ve sitemap için.
 * TS rehberleriyle çakışan slug'lar elenir.
 */
export function getAllGuideSlugs(
  locale: string
): { slug: string; category: string; date: string }[] {
  const cached = guideSlugsCache.get(locale);
  if (cached) return cached;

  const dir = getGuidesDir(locale);
  if (!fs.existsSync(dir)) return [];

  const mdFiles = getAllMarkdownFiles(dir);
  const result = mdFiles
    .map((f) => {
      const slug = path.basename(f.file).replace(/\.md$/, "");
      const raw = fs.readFileSync(f.file, "utf8");
      const { data } = parseFrontmatter(raw);
      return {
        slug,
        category: f.category,
        date: String(data.date ?? "2026-03-01"),
      };
    })
    .filter((g) => !guideSlugs.includes(g.slug));

  guideSlugsCache.set(locale, result);
  return result;
}

/**
 * Bir rehberin (TS veya MD) tüm mevcut dil alternatiflerini (hreflang + x-default)
 * kanonik mutlak URL'ler olarak hesaplar.
 * - TS rehberleri ve tüm dillerde aynı slug'ı paylaşan MD rehberleri: 4 dilde aynı slug.
 * - Dile özel slug kullanan 10 MD rehber grubu: `LOCALIZED_GUIDE_GROUPS` üzerinden
 *   her dilin kendi gerçek (category, slug) çiftine bağlanır.
 */
export function getGuideLanguageAlternates(
  slug: string,
  category: string
): Record<string, string> {
  if (guideSlugs.includes(slug)) {
    const tsCat = getCategoryForTsGuide(slug);
    const languages: Record<string, string> = {};
    for (const loc of routing.locales) {
      languages[loc] = getCanonicalUrl(loc, `/guides/${tsCat}/${slug}`);
    }
    languages["x-default"] = getCanonicalUrl(
      routing.defaultLocale,
      `/guides/${tsCat}/${slug}`
    );
    return languages;
  }

  const localizedGroup = findLocalizedGuideGroup(slug);
  if (localizedGroup) {
    const languages: Record<string, string> = {};
    for (const loc of routing.locales) {
      const ref = localizedGroup[loc as GuideLocaleCode];
      if (ref) {
        languages[loc] = getCanonicalUrl(loc, `/guides/${ref.category}/${ref.slug}`);
      }
    }
    const enRef = localizedGroup.en;
    languages["x-default"] = getCanonicalUrl(
      "en",
      `/guides/${enRef.category}/${enRef.slug}`
    );
    return languages;
  }

  const existingLocales = routing.locales.filter((loc) =>
    getAllGuideSlugs(loc).some((g) => g.slug === slug && g.category === category)
  );
  const languages: Record<string, string> = {};
  for (const loc of existingLocales) {
    languages[loc] = getCanonicalUrl(loc, `/guides/${category}/${slug}`);
  }
  if (existingLocales.length > 0) {
    const defaultLoc = existingLocales.includes("en") ? "en" : existingLocales[0];
    languages["x-default"] = getCanonicalUrl(defaultLoc, `/guides/${category}/${slug}`);
  }
  return languages;
}
