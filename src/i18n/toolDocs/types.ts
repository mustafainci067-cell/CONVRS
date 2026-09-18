// Faz 5 — Arac sayfaları için "long-form" SEO makale motoru tip tanımları.
//
// SEOContentBlock'un programatik kaynağıdır: her araca 4 dilde, kategoriye
// duyarlı, ~450-650 kelimelik içerik bloğu üretir. src/i18n/seo motoruyla
// AYNI mimariye sahiptir:
//   - metinler (src/i18n/toolDocs/{en,tr,de,es}.ts) dile göre ayrıdır,
//   - araca özel gerçekler (from/to/archetype/media/sizeLimitMb) config'den
//     (src/content/toolSeo.ts) gelir,
//   - SSS yeniden yazılmaz; src/i18n/seo motorunun FAQ'sı yeniden kullanılır.
//
// Böylece 64 aracın tamamında ince içerik kalmadan, tutarlı ve CWV'yi
// etkilemeyen (sunucu komponenti, istemci JS yok) derin metin üretilir.

export type ToolDocCategory =
  | "image"
  | "document"
  | "developer"
  | "text"
  | "media"
  | "other";

export type ToolDocContent = {
  /** İçerik bloğunun H2 başlığı. */
  title: string;
  /** 2-4 paragraf (kategoriye özel kullanım + evrensel gizlilik). */
  description: string[];
  /** Özellik kartları (yukarıdaki alt yapıyla eşleşen kısa satırlar). */
  features: string[];
  /** SSS — getToolSeoByPath'ten yeniden kullanılır. */
  faqs: { question: string; answer: string }[];
};

/**
 * Bir dilin tüm long-form cümle slotları. Motor (index.ts) bunları
 * ToolSeoConfig + kategori ile birleştirir; metinler dile göre ayrı dosyalarda kalır.
 */
export type ToolDocPhrases = {
  /** H2 başlığı — kategori/format duyarlı. */
  title: (category: ToolDocCategory, name: string, from: string, to: string) => string;
  /** Giriş paragrafı — araç ne yapar (archetype duyarlı). */
  intro: (archetype: "file" | "paste" | "generate", name: string, from: string, to: string) => string;
  /** Orta paragraf — kategoriye özel kullanım senaryosu. */
  useCase: (
    category: ToolDocCategory,
    name: string,
    from: string,
    to: string
  ) => string;
  /** Evrensel gizlilik paragrafı (yapısal: sunucu yok). */
  privacy: (name: string) => string;
  /** Yalnızca medya (WASM motor) araçları için ek paragraf. */
  wasm: (name: string) => string;
  /** Özellik kartları — medya/size duyarlı köşe + evrensel satırlar. */
  features: (hasMedia: boolean, sizeLimitMb?: number) => string[];
};