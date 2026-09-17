import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { privacyContent } from "@/i18n/legal/privacy";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs gizlilik politikası: tüm dosya dönüştürme işlemleri %100 kullanıcı tarayıcısında gerçekleşir. Dosyalarınız hiçbir sunucuya yüklenmez, kaydedilmez veya üçüncü şahıslarla paylaşılmaz. KVKK, GDPR ve CCPA uyumluluğu.",
  en: "Convrs privacy policy: all file conversion takes place 100% in your browser. Your files are never uploaded, stored or shared with third parties. KVKK, GDPR and CCPA compliant.",
  de: "Convrs-Datenschutzrichtlinie: Alle Dateikonvertierungen erfolgen zu 100 % in Ihrem Browser. Ihre Dateien werden niemals hochgeladen, gespeichert oder mit Dritten geteilt. KVKK-, DSGVO- und CCPA-konform.",
  es: "Política de privacidad de Convrs: toda la conversión de archivos se realiza 100 % en su navegador. Sus archivos nunca se suben, almacenan ni comparten con terceros. Conforme a KVKK, RGPD y CCPA.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = privacyContent[locale as Locale] ?? privacyContent.en;
  return {
    title: `${doc.title} — Convrs`,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = privacyContent[locale as Locale] ?? privacyContent.en;
  return <LegalRenderer doc={doc} />;
}