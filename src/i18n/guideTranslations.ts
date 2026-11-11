/**
 * Çok dilli Markdown rehberleri (localized slug kullanan 10 rehber grubu) için
 * diller arası (en, tr, de, es) kategori ve slug eşleme tablosu.
 *
 * Bu tablo sayesinde:
 * 1. Sitemap ve sayfa metadata'sında (hreflang / alternates.languages) 4 dilin
 *    tamamı birbirine doğru kanonik URL'lerle bağlanır.
 * 2. LanguageSwitcher bileşeni bir rehber sayfasındayken dil değiştirildiğinde
 *    404'e düşmek yerine hedef dildeki karşılık gelen slug'a yönlendirir.
 * 3. next.config.ts eski/çapraz dil URL'lerini (örn. /en/guides/developer/veri-gizliligi-...)
 *    308 kalıcı yönlendirme ile doğru kanonik rehbere taşır.
 */

export type GuideLocaleCode = "en" | "tr" | "de" | "es";

export type LocalizedGuideRef = {
  category: string;
  slug: string;
};

export type LocalizedGuideGroup = Record<GuideLocaleCode, LocalizedGuideRef>;

export const LOCALIZED_GUIDE_GROUPS: readonly LocalizedGuideGroup[] = [
  {
    en: { category: "developer", slug: "data-privacy-ai-cloud" },
    tr: { category: "developer", slug: "veri-gizliligi-ve-bulut-donusturuculer" },
    de: { category: "developer", slug: "datenschutz-ki-und-die-gefahren-von-cloud-konvertern" },
    es: { category: "developer", slug: "privacidad-ia-y-peligros-conversores-nube" },
  },
  {
    en: { category: "developer", slug: "data-sovereignty-taking-control-browser-technologies" },
    tr: { category: "developer", slug: "veri-egemenligi-tarayici-teknolojileriyle-kontrolu-ele-alin" },
    de: { category: "developer", slug: "datensouveranitat-kontrolle-browsertechnologien" },
    es: { category: "developer", slug: "soberania-datos-control-tecnologias-navegador" },
  },
  {
    en: { category: "developer", slug: "future-digital-signatures-client-side-cryptography" },
    tr: { category: "developer", slug: "dijital-imzalarin-gelecegi-istemci-tarafi-kriptografi" },
    de: { category: "developer", slug: "zukunft-digitaler-signaturen-client-kryptografie" },
    es: { category: "developer", slug: "futuro-firmas-digitales-criptografia-cliente" },
  },
  {
    en: { category: "developer", slug: "webassembly-revolutionizing-browser-processing" },
    tr: { category: "developer", slug: "webassembly-tarayici-islemeyi-nasil-degistiriyor" },
    de: { category: "developer", slug: "webassembly-revolutioniert-browser-verarbeitung" },
    es: { category: "developer", slug: "webassembly-revolucionando-procesamiento-navegador" },
  },
  {
    en: { category: "developer", slug: "webassembly-zero-backend-future" },
    tr: { category: "developer", slug: "webassembly-sifir-sunucu-mimarisi" },
    de: { category: "developer", slug: "webassembly-zero-backend-zukunft" },
    es: { category: "developer", slug: "webassembly-arquitectura-zero-backend" },
  },
  {
    en: { category: "document", slug: "open-source-tools-beating-proprietary-pdf-software" },
    tr: { category: "document", slug: "acik-kaynakli-araclar-tescilli-pdf-yazilimlarini-neden-yeniyor" },
    de: { category: "document", slug: "warum-open-source-tools-proprietare-pdf-software-verdrangen" },
    es: { category: "developer", slug: "por-que-herramientas-codigo-abierto-vencen-software-propietario" },
  },
  {
    en: { category: "document", slug: "pdf-security-in-browser-processing" },
    tr: { category: "document", slug: "pdf-guvenligi-tarayici-ici-isleme" },
    de: { category: "document", slug: "pdf-sicherheit-browser-verarbeitung" },
    es: { category: "document", slug: "seguridad-pdf-procesamiento-navegador" },
  },
  {
    en: { category: "image", slug: "heic-to-jpeg-png-conversion-guide" },
    tr: { category: "image", slug: "heic-jpeg-png-donusum-guvenligi" },
    de: { category: "image", slug: "heic-zu-jpeg-png-konvertierungsleitfaden" },
    es: { category: "image", slug: "guia-conversion-heic-a-jpeg-png" },
  },
  {
    en: { category: "image", slug: "svg-optimization-performance" },
    tr: { category: "image", slug: "svg-optimizasyon-rehberi" },
    de: { category: "image", slug: "svg-optimierungsleitfaden" },
    es: { category: "image", slug: "guia-optimizacion-svg" },
  },
  {
    en: { category: "media", slug: "video-optimization-mp4-gif" },
    tr: { category: "image", slug: "video-animasyon-mp4-gif" },
    de: { category: "image", slug: "web-video-optimierung-mp4-statt-gif" },
    es: { category: "image", slug: "optimizacion-video-web-mp4-vs-gif" },
  },
];

/**
 * Verilen bir slug herhangi bir çok dilli rehber grubuna aitse o grubu döner.
 */
export function findLocalizedGuideGroup(slug: string): LocalizedGuideGroup | undefined {
  return LOCALIZED_GUIDE_GROUPS.find((group) =>
    Object.values(group).some((entry) => entry.slug === slug)
  );
}

/**
 * Bir pathname (örn. `/guides/developer/veri-gizliligi-ve-bulut-donusturuculer`)
 * için hedef dildeki karşılık gelen pathname'i döner. Eşleşme yoksa mevcut
 * pathname'i aynen geri verir.
 */
export function getTranslatedGuidePathname(
  pathname: string,
  targetLocale: GuideLocaleCode
): string {
  const match = pathname.match(/^\/guides\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return pathname;
  const [, , slug] = match;
  const group = findLocalizedGuideGroup(slug);
  if (!group) return pathname;
  const target = group[targetLocale];
  return `/guides/${target.category}/${target.slug}`;
}

