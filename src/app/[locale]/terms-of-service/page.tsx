<<<<<<< HEAD
import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { termsContent } from "@/i18n/legal/terms";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs kullanım şartları: siteyi ve dosya dönüştürme araçlarını kullanırken geçerli olan koşullar, haklar, sorumluluk reddi ve sınırlandırmalar.",
  en: "Convrs terms of service: the conditions, rights, disclaimers and limitations applicable when using the site and its file conversion tools.",
  de: "Convrs-Nutzungsbedingungen: die Bedingungen, Rechte, Haftungsausschlüsse und Beschränkungen, die bei der Nutzung der Website und ihrer Dateikonvertierungstools gelten.",
  es: "Condiciones de uso de Convrs: las condiciones, derechos, exenciones de responsabilidad y limitaciones aplicables al utilizar el sitio y sus herramientas de conversión de archivos.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = termsContent[locale as Locale] ?? termsContent.en;
  return {
    title: `${doc.title} — Convrs`,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = termsContent[locale as Locale] ?? termsContent.en;
  return <LegalRenderer doc={doc} />;
=======
import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { termsContent } from "@/i18n/legal/terms";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs kullanım şartları: siteyi ve dosya dönüştürme araçlarını kullanırken geçerli olan koşullar, haklar, sorumluluk reddi ve sınırlandırmalar.",
  en: "Convrs terms of service: the conditions, rights, disclaimers and limitations applicable when using the site and its file conversion tools.",
  de: "Convrs-Nutzungsbedingungen: die Bedingungen, Rechte, Haftungsausschlüsse und Beschränkungen, die bei der Nutzung der Website und ihrer Dateikonvertierungstools gelten.",
  es: "Condiciones de uso de Convrs: las condiciones, derechos, exenciones de responsabilidad y limitaciones aplicables al utilizar el sitio y sus herramientas de conversión de archivos.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = termsContent[locale as Locale] ?? termsContent.en;
  return {
    // Marka son eki layout'taki title.template ("%s — Convrs") tarafindan eklenir.
    title: doc.title,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = termsContent[locale as Locale] ?? termsContent.en;
  return <LegalRenderer doc={doc} />;
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
}