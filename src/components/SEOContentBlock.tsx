// SEOContentBlock — arac sayfalarının altına yerleşen, uzun içerikli (long-form)
// SEO yazı bloğu: title + açıklama paragrafları + özellik kartları +
// Teknik Özellikler & Tarayıcı İşleme Mimarisi tablosu +
// Format Özellikleri (Avantajlar / Dezavantajlar) karşılaştırma bileşeni.
//
// İçerik iki kaynaktan gelir (öncelik sırasıyla):
//   1. Elde yazılmış, araca özel çeviri kayıtları: src/messages/*.json
//      -> "ToolContent" namespace'i. (jpg-to-webp gibi özenli kayıtlar.)
//   2. Programatik long-form motoru: src/i18n/toolDocs + src/i18n/toolSpecs —
//      64 aracın 4 dilde zengin, araca ve formata özel içerik üretmesini sağlar.
//      Böylece HİÇBİR araç sayfası ince/kopya içerikle ("thin content") kalmaz.
//
// Tamamen bir sunucu bileşenidir:
//   - force-static SSG uyumlu (getRouteLocale + açık locale ile getTranslations),
//   - build'de metinler statik HTML'e gömülür, arama motoru botları doğrudan okur,
//   - istemci JS yüklemez -> Core Web Vitals korunur.
import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";
import { getToolDocs } from "@/i18n/toolDocs";
import { toolSeoConfigs } from "@/content/toolSeo";
import {
  getToolEngineSummary,
  type FormatSpec,
  type LocaleCode,
} from "@/i18n/toolSpecs";

type SeoFaq = { question: string; answer: string };

type SeoBlockContent = {
  title: string;
  description: string[];
  features: string[];
  faqs: SeoFaq[];
};

const UI_LABELS: Record<
  LocaleCode,
  {
    techSpecsBadge: string;
    techSpecsTitle: string;
    engineLabel: string;
    inputLabel: string;
    outputLabel: string;
    executionLabel: string;
    executionValue: string;
    formatSectionBadge: string;
    formatComparisonTitle: (from: string, to: string) => string;
    formatSingleTitle: (fmt: string) => string;
    sourceBadge: string;
    targetBadge: string;
    formatBadge: string;
    mimeLabel: string;
    extLabel: string;
    compressionLabel: string;
    structureLabel: string;
    prosTitle: string;
    consTitle: string;
  }
> = {
  en: {
    techSpecsBadge: "Technical Architecture",
    techSpecsTitle: "Technical Specifications & Browser Processing Pipeline",
    engineLabel: "Processing Engine",
    inputLabel: "Source Input",
    outputLabel: "Target Output",
    executionLabel: "Execution & Privacy Model",
    executionValue: "100% Client-Side RAM (Zero Server Upload / Zero Retention)",
    formatSectionBadge: "Format Analysis",
    formatComparisonTitle: (from, to) => `${from} vs. ${to}: Format Properties, Pros & Cons`,
    formatSingleTitle: (fmt) => `${fmt} Format Properties: Advantages & Disadvantages`,
    sourceBadge: "Source Format",
    targetBadge: "Target Format",
    formatBadge: "Format Specification",
    mimeLabel: "MIME Type",
    extLabel: "File Extension",
    compressionLabel: "Compression / Encoding",
    structureLabel: "Color / Structure Support",
    prosTitle: "Advantages",
    consTitle: "Limitations & Disadvantages",
  },
  tr: {
    techSpecsBadge: "Teknik Mimari",
    techSpecsTitle: "Teknik Özellikler ve Tarayıcı İşleme Mimarisi",
    engineLabel: "İşleme Motoru (Engine)",
    inputLabel: "Kaynak Girdi",
    outputLabel: "Hedef Çıktı",
    executionLabel: "Çalışma ve Gizlilik Modeli",
    executionValue: "%100 İstemci Taraflı RAM (Sıfır Sunucu Yüklemesi / Sıfır Veri Kaydı)",
    formatSectionBadge: "Format Analizi",
    formatComparisonTitle: (from, to) => `${from} ve ${to} Karşılaştırması: Avantajlar ve Dezavantajlar`,
    formatSingleTitle: (fmt) => `${fmt} Format Özellikleri: Avantajlar ve Dezavantajlar`,
    sourceBadge: "Kaynak Format",
    targetBadge: "Hedef Format",
    formatBadge: "Format Standardı",
    mimeLabel: "MIME Türü",
    extLabel: "Dosya Uzantısı",
    compressionLabel: "Sıkıştırma / Kodlama",
    structureLabel: "Şeffaflık / Yapı Desteği",
    prosTitle: "Avantajları",
    consTitle: "Dezavantajları ve Sınırlamalar",
  },
  de: {
    techSpecsBadge: "Technische Architektur",
    techSpecsTitle: "Technische Spezifikationen & Browser-Pipeline",
    engineLabel: "Verarbeitungs-Engine",
    inputLabel: "Eingabeformat",
    outputLabel: "Ausgabeformat",
    executionLabel: "Ausführungs- & Datenschutzmodell",
    executionValue: "100 % Client-seitiger RAM (Kein Server-Upload / Keine Speicherung)",
    formatSectionBadge: "Formatanalyse",
    formatComparisonTitle: (from, to) => `${from} vs. ${to}: Formateigenschaften, Vor- & Nachteile`,
    formatSingleTitle: (fmt) => `${fmt}-Formateigenschaften: Vorteile & Nachteile`,
    sourceBadge: "Quellformat",
    targetBadge: "Zielformat",
    formatBadge: "Formatspezifikation",
    mimeLabel: "MIME-Typ",
    extLabel: "Dateiendung",
    compressionLabel: "Kompression / Kodierung",
    structureLabel: "Transparenz / Struktur",
    prosTitle: "Vorteile",
    consTitle: "Nachteile & Einschränkungen",
  },
  es: {
    techSpecsBadge: "Arquitectura Técnica",
    techSpecsTitle: "Especificaciones Técnicas y Motor de Procesamiento",
    engineLabel: "Motor de Procesamiento",
    inputLabel: "Formato de Entrada",
    outputLabel: "Formato de Salida",
    executionLabel: "Modelo de Ejecución y Privacidad",
    executionValue: "100 % Memoria RAM Local (Cero Subidas al Servidor / Cero Retención)",
    formatSectionBadge: "Análisis de Formato",
    formatComparisonTitle: (from, to) => `${from} vs. ${to}: Propiedades, Ventajas y Desventajas`,
    formatSingleTitle: (fmt) => `Propiedades del Formato ${fmt}: Ventajas y Desventajas`,
    sourceBadge: "Formato de Origen",
    targetBadge: "Formato de Destino",
    formatBadge: "Especificación del Formato",
    mimeLabel: "Tipo MIME",
    extLabel: "Extensión",
    compressionLabel: "Compresión / Codificación",
    structureLabel: "Transparencia / Estructura",
    prosTitle: "Ventajas",
    consTitle: "Desventajas y Limitaciones",
  },
};

function FormatSpecCard({
  spec,
  badge,
  loc,
  labels,
}: {
  spec: FormatSpec;
  badge: string;
  loc: LocaleCode;
  labels: (typeof UI_LABELS)[LocaleCode];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400">
          {badge}
        </span>
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {spec.extension}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {spec.name}
      </h3>

      <dl className="mt-4 grid grid-cols-1 gap-2 border-y border-zinc-200/80 py-3 text-xs dark:border-zinc-800/80">
        <div className="flex justify-between gap-2">
          <dt className="font-medium text-zinc-500 dark:text-zinc-400">{labels.mimeLabel}:</dt>
          <dd className="font-mono text-zinc-800 dark:text-zinc-200">{spec.mimeType}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="font-medium text-zinc-500 dark:text-zinc-400">{labels.compressionLabel}:</dt>
          <dd className="text-zinc-700 dark:text-zinc-300">{spec.compression[loc]}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="font-medium text-zinc-500 dark:text-zinc-400">{labels.structureLabel}:</dt>
          <dd className="text-zinc-700 dark:text-zinc-300">{spec.transparencyOrStructure[loc]}</dd>
        </div>
      </dl>

      {/* Avantajlar */}
      <div className="mt-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✓ {labels.prosTitle}
        </h4>
        <ul className="space-y-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {spec.pros[loc].map((pro, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dezavantajlar */}
      <div className="mt-4 pt-2">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          ! {labels.consTitle}
        </h4>
        <ul className="space-y-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {spec.cons[loc].map((con, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function SEOContentBlock({ path }: { path: string }) {
  const locale = await getRouteLocale();
  const loc = (["en", "tr", "de", "es"].includes(locale) ? locale : "en") as LocaleCode;
  const labels = UI_LABELS[loc];
  const t = await getTranslations({ locale, namespace: "ToolContent" });

  // Kaynak 1 — elde yazılmış JSON kaydı (varsa). t.has() ile yokluk kontrolü:
  // anahtar yoksa t.raw() MISSING_MESSAGE fırlatır (64 araçtan 63'ünde yok),
  // bu yüzden önce varlığını denetler, sonra okur.
  let content: SeoBlockContent | undefined;
  const toolKey = path.slice(1);
  if (t.has(toolKey)) {
    content = t.raw(toolKey) as SeoBlockContent | undefined;
  }

  // Kaynak 2 — elle yazılmış kayıt yoksa programatik long-form motoru.
  if (!content?.title) {
    const tTools = await getTranslations({ locale, namespace: "Home.tools" });
    const rawName = tTools.raw(`${path.slice(1)}.title`);
    const name =
      typeof rawName === "string" && rawName.trim()
        ? rawName
        : path.slice(1).replace(/-/g, " ");
    const generated = getToolDocs(locale, path, name);
    if (generated) {
      content = {
        title: generated.title,
        description: generated.description,
        features: generated.features,
        faqs: generated.faqs,
      };
    }
  }
  if (!content?.title) return null;

  const { title, description = [], features = [] } = content;
  const config = toolSeoConfigs[path];
  const engineSummary = getToolEngineSummary(path, loc);
  const { sourceSpec, targetSpec } = engineSummary;

  const headingId = `seoc-${path.replace(/[^a-z0-9]/gi, "-")}`;
  const specsHeadingId = `specs-${path.replace(/[^a-z0-9]/gi, "-")}`;
  const formatsHeadingId = `formats-${path.replace(/[^a-z0-9]/gi, "-")}`;

  return (
    <article
      aria-labelledby={headingId}
      className="mx-auto w-full max-w-4xl px-5 pb-16 pt-14 sm:px-8"
    >
      {/* Başlık */}
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          {t("about")}
        </span>
        <h2
          id={headingId}
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          {title}
        </h2>
      </div>

      {/* Açıklama paragrafları */}
      <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Özellik kartları */}
      {features.length > 0 && (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {feature}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Teknik Özellikler ve İşleme Mimarisi Tablosu */}
      {config && (
        <section
          aria-labelledby={specsHeadingId}
          className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800/60"
        >
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {labels.techSpecsBadge}
            </span>
            <h2
              id={specsHeadingId}
              className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              {labels.techSpecsTitle}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
            <dl className="divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
              <div className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                  {labels.engineLabel}
                </dt>
                <dd className="font-mono text-xs text-zinc-900 sm:col-span-2 dark:text-zinc-100">
                  {engineSummary.engineName}
                </dd>
              </div>
              {config.from !== "-na-" && (
                <div className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                    {labels.inputLabel}
                  </dt>
                  <dd className="text-zinc-800 sm:col-span-2 dark:text-zinc-200">
                    {sourceSpec ? `${sourceSpec.name} (${sourceSpec.extension})` : config.from}
                  </dd>
                </div>
              )}
              <div className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                  {labels.outputLabel}
                </dt>
                <dd className="text-zinc-800 sm:col-span-2 dark:text-zinc-200">
                  {targetSpec ? `${targetSpec.name} (${targetSpec.extension})` : config.to}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                  {labels.executionLabel}
                </dt>
                <dd className="text-emerald-700 sm:col-span-2 dark:text-emerald-400">
                  {labels.executionValue}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      {/* Format Özellikleri: Avantajlar ve Dezavantajlar Karşılaştırması */}
      {(sourceSpec || targetSpec) && (
        <section
          aria-labelledby={formatsHeadingId}
          className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800/60"
        >
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {labels.formatSectionBadge}
            </span>
            <h2
              id={formatsHeadingId}
              className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              {sourceSpec && targetSpec
                ? labels.formatComparisonTitle(sourceSpec.id, targetSpec.id)
                : labels.formatSingleTitle((sourceSpec ?? targetSpec)!.id)}
            </h2>
          </div>

          <div
            className={
              sourceSpec && targetSpec
                ? "grid grid-cols-1 gap-6 md:grid-cols-2"
                : "mx-auto max-w-2xl"
            }
          >
            {sourceSpec && (
              <FormatSpecCard
                spec={sourceSpec}
                badge={targetSpec ? labels.sourceBadge : labels.formatBadge}
                loc={loc}
                labels={labels}
              />
            )}
            {targetSpec && (
              <FormatSpecCard
                spec={targetSpec}
                badge={sourceSpec ? labels.targetBadge : labels.formatBadge}
                loc={loc}
                labels={labels}
              />
            )}
          </div>
        </section>
      )}
    </article>
  );
}
