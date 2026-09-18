// Faz 5 — Long-form SEO içerik motoru: ortak montajcı.
// Config (@/content/toolSeo) + kategori (categoryConfigs) + dil sözlüğü
// birlikte harmanlanır; SSS, src/i18n/seo motorundan yeniden kullanılır.
// Yalnızca sunucu komponentlerinde kullanılır; client bundle'a girmez.
import { toolSeoConfigs } from "@/content/toolSeo";
import { categoryConfigs } from "@/config/nav";
import { getToolSeoByPath } from "@/i18n/seo";
import { en } from "./en";
import { tr } from "./tr";
import { de } from "./de";
import { es } from "./es";
import type { ToolDocCategory, ToolDocContent, ToolDocPhrases } from "./types";

const DICTS: Record<string, ToolDocPhrases> = { en, tr, de, es };

/** Bir aracın nav.ts'teki kategori anahtarını (path -> titleKey) bulur. */
function categoryForPath(path: string): ToolDocCategory | null {
  for (const category of categoryConfigs) {
    if (category.items.some((item) => item.path === path)) {
      return category.titleKey as ToolDocCategory;
    }
  }
  return null;
}

/**
 * path + locale için hazır long-form içerik. Hand-written ToolContent JSON'u
 * yoksa SEOContentBlock bu fonksiyona düşer.
 */
export function getToolDocs(
  locale: string,
  path: string,
  name: string
): ToolDocContent | null {
  const config = toolSeoConfigs[path];
  if (!config) return null;
  const category = categoryForPath(path);
  if (!category) return null;

  const p = DICTS[locale] ?? en;
  const { archetype, from, to, media } = config;

  return {
    title: p.title(category, name, from, to),
    description: [
      p.intro(archetype, name, from, to),
      p.useCase(category, name, from, to),
      p.privacy(name),
      ...(media ? [p.wasm(name)] : []),
    ],
    features: p.features(Boolean(media), config.sizeLimitMb),
    faqs: getToolSeoByPath(locale, path, name)?.faq ?? [],
  };
}