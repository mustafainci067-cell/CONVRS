// Makale sayfası için Article + BreadcrumbList JSON-LD.
// Slug tüm dillerde ortaktır; locale getRouteLocale() ile okunur (SSG güvenli).
import { getRouteLocale } from "@/i18n/locale";
import { getCanonicalUrl } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/JsonLd";

export default async function GuideJsonLd({
  slug,
  category,
  title,
  description,
}: {
  slug: string;
  category: string;
  title: string;
  description: string;
}) {
  const locale = await getRouteLocale();
  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const articleUrl = getCanonicalUrl(locale, `/guides/${category}/${slug}`);
  const homeUrl = getCanonicalUrl(locale, "");
  const guidesUrl = getCanonicalUrl(locale, "/guides");

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    author: { "@type": "Organization", name: "Convrs", url: homeUrl },
    publisher: { "@type": "Organization", name: "Convrs", url: homeUrl },
    mainEntityOfPage: articleUrl,
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

  return <JsonLd data={[article, breadcrumb]} />;
}