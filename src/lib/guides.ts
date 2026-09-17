/**
 * Rehber (guide) Markdown dosyalarını okur, frontmatter'ı parse eder
 * ve `marked` ile HTML'e dönüştürür.
 *
 * Tüm işlemler sunucu tarafında (Node.js) yapılır; tarayıcıya sadece
 * hazırlanmış veri gider. Ek paket gerekmez — `marked` zaten kurulu.
 *
 * Dosya konvansiyonu:
 *   src/content/guides/<slug>.md
 *
 * Frontmatter alanları:
 *   title       – sayfa başlığı (zorunlu)
 *   description – SEO açıklaması (zorunlu)
 *   date        – yayın tarihi: "YYYY-MM-DD" (zorunlu)
 *   slug        – URL slug'ı (zorunlu, dosya adıyla eşleşmeli)
 *   readingTime – tahmini okuma süresi (dakika, opsiyonel)
 *   tags        – etiket listesi (opsiyonel)
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// src/content/guides/[locale] klasörü
const getGuidesDir = (locale: string) => path.join(process.cwd(), 'src', 'content', 'guides', locale);

export type GuideFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  readingTime?: number;
  tags?: string[];
};

export type GuideData = GuideFrontmatter & {
  /** Güvenli HTML (marked çıktısı) */
  contentHtml: string;
};

export type GuideSummary = GuideFrontmatter;

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
    const colonIdx = line.indexOf(':');
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
    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      data[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''));
      continue;
    }

    data[key] = rawValue;
  }

  return { data, content };
}

/**
 * Tüm rehberlerin frontmatter özetini döner (listelemek için).
 * Tarihe göre azalan sırada sıralanır.
 */
export function getAllGuides(locale: string): GuideSummary[] {
  const dir = getGuidesDir(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  const guides: GuideSummary[] = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
    const { data } = parseFrontmatter(raw);
    return {
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      date: String(data.date ?? ''),
      slug: String(data.slug ?? filename.replace(/\.md$/, '')),
      readingTime: typeof data.readingTime === 'number' ? data.readingTime : undefined,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    };
  });

  return guides.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Belirli bir slug'ın tam içeriğini (HTML) döner.
 * Slug bulunamazsa `null` döner → 404.
 */
export async function getGuideBySlug(slug: string, locale: string): Promise<GuideData | null> {
  const dir = getGuidesDir(locale);
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = parseFrontmatter(raw);

  // marked ile Markdown → HTML (async API kullanıyoruz)
  const contentHtml = await marked(content, {
    gfm: true,      // GitHub Flavored Markdown (tablolar, görev listeleri)
    breaks: false,  // Tek satır sonu → <br> değil
  });

  return {
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    slug: String(data.slug ?? slug),
    readingTime: typeof data.readingTime === 'number' ? data.readingTime : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    contentHtml,
  };
}

/**
 * Tüm slug'ları döner — generateStaticParams için.
 */
export function getAllGuideSlugs(locale: string): string[] {
  const dir = getGuidesDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
