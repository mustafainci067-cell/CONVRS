// Faz 2+3 — Arac sayfasi icin SoftwareApplication + BreadcrumbList + FAQPage + HowTo JSON-LD.
// Her arac sayfasi su sekilde cagirir:
//   <ToolJsonLd path="/webp-to-png" />
// Arac adi/aciklamasi nav.ts + src/messages/{locale}.json (Home.tools.*) kaynaklidir;
// bu yuzden yeni bir arac eklendiginde yapilandirma degismez.
// FAQPage/HowTo, Faz 3 SEO icerik motoruyla (src/i18n/seo) AYNI kaynaktan uretilir;
// boylece sayfadaki HTML ile structured data asla birbirinden sapmaz.
import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";
import { categoryConfigs } from "@/config/nav";
import { SITE_URL } from "@/i18n/routing";
import { getToolSeoByPath } from "@/i18n/seo";
import { getToolDocs } from "@/i18n/toolDocs";
import JsonLd from "@/components/JsonLd";

// schema.org SoftwareApplication.applicationCategory — izin verilen degerler.
const CATEGORY_APP_TYPE: Record<string, string> = {
  image: "MultimediaApplication",
  media: "MultimediaApplication",
  document: "BusinessApplication",
  developer: "DeveloperApplication",
  text: "UtilitiesApplication",
  other: "UtilitiesApplication",
};

export default async function ToolJsonLd({ path }: { path: string }) {
  const locale = await getRouteLocale();

  const entry = categoryConfigs
    .flatMap((category) =>
      category.items.map((item) => ({ ...item, categoryKey: category.titleKey }))
    )
    .find((item) => item.path === path);

  if (!entry || entry.status !== "active") return null;

  const tTools = await getTranslations({ locale, namespace: "Home.tools" });
  const tCat = await getTranslations({ locale, namespace: "Sidebar.categories" });
  const tSeo = await getTranslations({ locale, namespace: "Seo" });

  const name = tTools(`${entry.nameKey}.title`);
  const description = tTools(`${entry.nameKey}.description`);
  const categoryLabel = tCat(`${entry.categoryKey}`);
  const canonical = `${SITE_URL}/${locale}${path}`;

  // Faz 5 — featureList icin long-form motorundan ozellik listesi.
  const toolDocs = getToolDocs(locale, path, name);
  const featureList = toolDocs?.features ?? [];

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: CATEGORY_APP_TYPE[entry.categoryKey] ?? "UtilitiesApplication",
    applicationSubCategory: categoryLabel,
    operatingSystem: "Web, Windows, macOS, iOS, Android, Linux",
    browserRequirements: "Requires JavaScript. Runs entirely in the browser.",
    softwareVersion: "1.0",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: canonical,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: "Convrs", url: SITE_URL },
    ...(featureList.length > 0 ? { featureList } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tSeo("home"),
        item: `${SITE_URL}/${locale}`,
      },
      { "@type": "ListItem", position: 2, name: categoryLabel },
      { "@type": "ListItem", position: 3, name },
    ],
  };

  // Faz 3 — sayfadaki "Nasıl yapılır"/SSS bölümüyle birebir aynı kaynaktan.
  const seo = getToolSeoByPath(locale, path, name);

  const faqPage = seo
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const howTo = seo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        inLanguage: locale,
        step: seo.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step,
        })),
      }
    : null;

  const data = [softwareApp, breadcrumb, ...(faqPage ? [faqPage] : []), ...(howTo ? [howTo] : [])];

  return <JsonLd data={data} />;
}