// SEOContentBlock — arac sayfalarının altına yerleşen, uzun içerikli (long-form)
// SEO yazı bloğu: title + açıklama paragrafları + özellik kartları + SSS.
//
// İçerik iki kaynaktan gelir (öncelik sırasıyla):
//   1. Elde yazılmış, araca özel çeviri kayıtları: src/messages/*.json
//      -> "ToolContent" namespace'i. (jpg-to-webp gibi özenli kayıtlar.)
//   2. Programatik long-form motoru: src/i18n/toolDocs — 64 aracın 4 dilde
//      ~450-650 kelimelik içerik üretir. Böylece HİÇBİR arac sayfası ince
//      içerikle kalmaz ("low value content" riski kapanır).
//
// Tamamen bir sunucu bileşenidir:
//   - force-static SSG uyumlu (getRouteLocale + açık locale ile getTranslations),
//   - build'de metinler statik HTML'e gömülür, arama motoru botları doğrudan okur,
//   - istemci JS yüklemez -> Core Web Vitals korunur.
import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";
import { getToolDocs } from "@/i18n/toolDocs";

type SeoFaq = { question: string; answer: string };

type SeoBlockContent = {
  title: string;
  description: string[];
  features: string[];
  faqs: SeoFaq[];
};

export default async function SEOContentBlock({ path }: { path: string }) {
  const locale = await getRouteLocale();
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

  const { title, description = [], features = [], faqs = [] } = content;

  // Köşe etiketi (sozlukteki ortak anahtar) ile Site geneli SSS başlığı.
  const tFaq = await getTranslations({ locale, namespace: "Faq" });
  const headingId = `seoc-${path.replace(/[^a-z0-9]/gi, "-")}`;

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
        <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
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

      {/* SSS — tarayıcı-okunur <details>/<summary> (JS'siz) */}
      {faqs.length > 0 && (
        <div className="mt-12">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              FAQ
            </span>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {tFaq("title")}
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <details
                key={index}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition-colors dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 p-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-left text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {item.question}
                  </span>
                  <svg
                    className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 group-open:rotate-180 dark:text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}