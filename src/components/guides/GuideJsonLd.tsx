// Makale sayfası için Article + WebPage + BreadcrumbList JSON-LD.
// Slug tüm dillerde ortaktır veya dile özeldir; locale getRouteLocale() ile okunur (SSG güvenli).
import { getRouteLocale } from "@/i18n/locale";
import { getCanonicalUrl } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/JsonLd";

export default async function GuideJsonLd({
  slug,
  category,
  title,
  description,
  datePublished = "2026-03-01",
  dateModified,
}: {
  slug: string;
  category: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const locale = await getRouteLocale();
  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const articleUrl = getCanonicalUrl(locale, `/guides/${category}/${slug}`);
  const homeUrl = getCanonicalUrl(locale, "");
  const guidesUrl = getCanonicalUrl(locale, "/guides");

  const resolvedPublished = datePublished || "2026-03-01";
  const resolvedModified = dateModified || resolvedPublished;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${articleUrl}#webpage`,
    url: articleUrl,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": "https://www.convrs.org/#website" },
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: title,
    description,
    inLanguage: locale,
    datePublished: resolvedPublished,
    dateModified: resolvedModified,
    author: { "@type": "Organization", name: "Convrs", url: homeUrl },
    publisher: { "@type": "Organization", name: "Convrs", url: homeUrl },
    mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tSeo("home"), item: homeUrl },
      { "@type": "ListItem", position: 2, name: "Guides", item: guidesUrl },
      { "@type": "ListItem", position: 3, name: title, item: articleUrl },
    ],
  };

  return <JsonLd data={[webPage, article, breadcrumb]} />;
}
