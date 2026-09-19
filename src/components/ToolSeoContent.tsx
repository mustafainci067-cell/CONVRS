// Faz 3/5 — Arac sayfasının altındaki "Nasıl yapılır?" (How-to) + SSS (FAQ) bölümü.
//
// Tamamen sunucu komponentidir: metinler build'de statik HTML olarak basılır ve
// arama motoru botları doğrudan okur (SSG, force-static ile uyumlu). SSS yapısında
// <details>/<summary> kullanıldığı için istemci JS'ye gerek yoktur (CWV korunur).
//
// Faz 5 eklentileri (64 arac sayfasının tümüne tek noktadan):
//   1. Görünür ekmek kırıntısı (breadcrumb) — ToolJsonLd'nin BreadcrumbList
//      şemasıyla birebir hizalı; SERP kırıntıları + E-E-A-T + a11y.
//   2. "İlgili araçlar" bloğu — aynı kategorideki kardeş araçlara iç bağlantılar
//      (konu kümeleri + iç link sağlığı; hiçbir sayfa "yetim" hissettirmez).
//
// Kullanım (tüm arac sayfalarında):
//   <ToolSeoContent path="/webp-to-png" />
import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";
import AdUnit from "@/components/AdUnit";
import AffiliateBanner from "@/components/AffiliateBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { AD_SLOT_TOOL_PAGE } from "@/lib/ads";
import { toolSeoConfigs } from "@/content/toolSeo";
import { categoryConfigs } from "@/config/nav";
import { getToolSeoByPath } from "@/i18n/seo";

export default async function ToolSeoContent({ path }: { path: string }) {
  const locale = await getRouteLocale();
  const config = toolSeoConfigs[path];
  if (!config) return null;

  // Yerellestirilmis arac adi (or. "PNG ↔ JPG") — step sozlerinde kullanilir.
  const tTools = await getTranslations({ locale, namespace: "Home.tools" });
  const rawName = tTools.raw(`${path.slice(1)}.title`);
  const name =
    typeof rawName === "string" && rawName.trim()
      ? rawName
      : `${config.from} → ${config.to}`;

  // SSS bölüm basligi, site genelindeki Faq sozlugunden gelir (4 dilde hazir).
  const tFaq = await getTranslations({ locale, namespace: "Faq" });
  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const tCat = await getTranslations({ locale, namespace: "Sidebar.categories" });
  const tA11y = await getTranslations({ locale, namespace: "A11y" });
  const tContent = await getTranslations({ locale, namespace: "ToolContent" });

  const toolKey = path.slice(1);
  let customFaqs: { question: string; answer: string }[] | null = null;
  if (tContent.has(toolKey)) {
    const rawContent = tContent.raw(toolKey) as any;
    if (rawContent?.faqs?.length) {
      customFaqs = rawContent.faqs;
    }
  }

  // Kategori bilgisi — ToolJsonLd ile ayni arama: path -> titleKey.
  const categoryEntry = categoryConfigs.find((category) =>
    category.items.some((item) => item.path === path)
  );

  const seo = getToolSeoByPath(locale, path, name);
  if (!seo) return null;

  const finalFaqs = customFaqs || seo.faq;

  // Ayni kategorideki kardes araclar (en fazla 8) — ilgili araclar blogu.
  const related =
    categoryEntry
      ? categoryEntry.items
          .filter((item) => item.status === "active" && item.path !== path)
          .slice(0, 8)
      : [];

  const breadcrumbItems = [
    { label: tSeo("home"), href: "/" },
    ...(categoryEntry ? [{ label: tCat(categoryEntry.titleKey) }] : []),
    { label: name },
  ];

  return (
    <section className="mx-auto w-full max-w-4xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
      {/* Faz 5 — Görünür ekmek kırıntısı (kırıntı şemasıyla hizalı). */}
      <Breadcrumbs label={tA11y("breadcrumb")} items={breadcrumbItems} />

      {/* Faz 4 — Arac sayfasi reklam yuvasi: donusturucu kartin hemen altinda,
          kat'in altina duser. Config'de slot id yoksa hic gorunmez. */}
      <AdUnit slot={AD_SLOT_TOOL_PAGE} format="rectangle" className="mb-8 sm:mb-10" />

      {/* How-To basligi */}
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          How to
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {seo.heading}
        </h2>
      </div>

      {/* Numaralı adımlar — statik <ol>, her zaman görünür */}
      <ol className="space-y-3">
        {seo.steps.map((step, index) => (
          <li
            key={index}
            className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-mono text-sm font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              {index + 1}
            </span>
            <span className="pt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {step}
            </span>
          </li>
        ))}
      </ol>

      {/* SSS basligi — site genelindeki Faq sozluguyle ayni görsel dil */}
      <div className="mb-8 mt-16 flex flex-col items-center gap-2 text-center">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          FAQ
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {tFaq("title")}
        </h2>
        <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          {tFaq("subtitle")}
        </p>
      </div>

      {/* SSS — tarayicinin kendi <details> arayüzü (JS'siz, tarayici-okunur) */}
      <div className="space-y-3">
        {finalFaqs.map((item, index) => (
          <details
            key={index}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition-colors dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <summary
              className="flex w-full cursor-pointer list-none items-center justify-between gap-4 p-5 text-left [&::-webkit-details-marker]:hidden"
            >
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

      {/* Faz 4 — Ortaklık önerisi (config'de kapalıyken görünmez). */}
      <AffiliateBanner className="mt-8" />

      {/* Faz 5 — İlgili araçlar: aynı kategorideki kardeşlere iç bağlantılar
          (konu kümeleri, yalıtılmış sayfa riski yok). */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-tools-heading"
          className="mt-16 border-t border-zinc-200 pt-10 dark:border-zinc-800/60"
        >
          <h2
            id="related-tools-heading"
            className="mb-6 text-center text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            {tA11y("relatedTools")}
          </h2>
          <nav aria-label={tA11y("relatedTools")} className="flex flex-wrap justify-center gap-3">
            {related.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-emerald-400/60 hover:text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
              >
                {tTools(`${item.nameKey}.title`)}
              </Link>
            ))}
          </nav>
        </section>
      )}
    </section>
  );
}