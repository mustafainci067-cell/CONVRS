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
  category: string;
  /** Güvenli HTML (marked çıktısı) */
  contentHtml: string;
};

export type GuideSummary = GuideFrontmatter & {
  category: string;
};

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
 * Recursively find all markdown files in a directory.
 */
function getAllMarkdownFiles(dir: string, fileList: { file: string; category: string }[] = [], category = ''): { file: string; category: string }[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList, file); // directory name is the category
    } else if (file.endsWith('.md')) {
      fileList.push({ file: filePath, category: category || 'misc' });
    }
  }
  return fileList;
}

/**
 * Tüm rehberlerin frontmatter özetini döner (listelemek için).
 * Tarihe göre azalan sırada sıralanır.
 */
export function getAllGuides(locale: string): GuideSummary[] {
  const dir = getGuidesDir(locale);
  if (!fs.existsSync(dir)) return [];

  const mdFiles = getAllMarkdownFiles(dir);

  const guides: GuideSummary[] = mdFiles.map(({ file, category }) => {
    const raw = fs.readFileSync(file, 'utf8');
    const { data } = parseFrontmatter(raw);
    const filename = path.basename(file);
    return {
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      date: String(data.date ?? ''),
      slug: String(data.slug ?? filename.replace(/\.md$/, '')),
      category,
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
  if (!fs.existsSync(dir)) return null;

  const mdFiles = getAllMarkdownFiles(dir);
  const matchedFile = mdFiles.find(f => {
    const filename = path.basename(f.file).replace(/\.md$/, '');
    return filename === slug;
  });

  if (!matchedFile) return null;

  const raw = fs.readFileSync(matchedFile.file, 'utf8');
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
    category: matchedFile.category,
    readingTime: typeof data.readingTime === 'number' ? data.readingTime : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    contentHtml,
  };
}

/**
 * Tüm slug'ları ve kategorilerini döner — generateStaticParams için.
 */
export function getAllGuideSlugs(locale: string): { slug: string; category: string }[] {
  const dir = getGuidesDir(locale);
  if (!fs.existsSync(dir)) return [];
  
  const mdFiles = getAllMarkdownFiles(dir);
  return mdFiles.map(f => ({
    slug: path.basename(f.file).replace(/\.md$/, ''),
    category: f.category
  }));
}

