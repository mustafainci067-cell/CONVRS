// Makale sayfası için Article + BreadcrumbList JSON-LD.
// Slug tüm dillerde ortaktır; locale getRouteLocale() ile okunur (SSG güvenli).
import { getRouteLocale } from "@/i18n/locale";
import { SITE_URL } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/JsonLd";

export default async function GuideJsonLd({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const locale = await getRouteLocale();
  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const url = `${SITE_URL}/${locale}/guides/${slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    author: { "@type": "Organization", name: "Convrs", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Convrs", url: SITE_URL },
    mainEntityOfPage: url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tSeo("home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/${locale}/guides` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return <JsonLd data={[article, breadcrumb]} />;
}