<<<<<<< HEAD
import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { cookiesContent } from "@/i18n/legal/cookies";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs çerez politikası: kullandığımız çerezlerin türleri, amaçları, süreleri ve bunları nasıl yönetebileceğiniz. KVKK, GDPR ve CCPA uyumlu.",
  en: "Convrs cookie policy: the types, purposes and durations of the cookies we use and how you can manage them. KVKK, GDPR and CCPA compliant.",
  de: "Convrs-Cookie-Richtlinie: Arten, Zwecke und Laufzeiten der von uns verwendeten Cookies und deren Verwaltung. KVKK-, DSGVO- und CCPA-konform.",
  es: "Política de cookies de Convrs: los tipos, finalidades y duraciones de las cookies que utilizamos y cómo gestionarlas. Conforme a KVKK, RGPD y CCPA.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = cookiesContent[locale as Locale] ?? cookiesContent.en;
  return {
    title: `${doc.title} — Convrs`,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = cookiesContent[locale as Locale] ?? cookiesContent.en;
  return <LegalRenderer doc={doc} />;
=======
import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { cookiesContent } from "@/i18n/legal/cookies";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs çerez politikası: kullandığımız çerezlerin türleri, amaçları, süreleri ve bunları nasıl yönetebileceğiniz. KVKK, GDPR ve CCPA uyumlu.",
  en: "Convrs cookie policy: the types, purposes and durations of the cookies we use and how you can manage them. KVKK, GDPR and CCPA compliant.",
  de: "Convrs-Cookie-Richtlinie: Arten, Zwecke und Laufzeiten der von uns verwendeten Cookies und deren Verwaltung. KVKK-, DSGVO- und CCPA-konform.",
  es: "Política de cookies de Convrs: los tipos, finalidades y duraciones de las cookies que utilizamos y cómo gestionarlas. Conforme a KVKK, RGPD y CCPA.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = cookiesContent[locale as Locale] ?? cookiesContent.en;
  return {
    // Marka son eki layout'taki title.template ("%s — Convrs") tarafindan eklenir.
    title: doc.title,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = cookiesContent[locale as Locale] ?? cookiesContent.en;
  return <LegalRenderer doc={doc} />;
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
}