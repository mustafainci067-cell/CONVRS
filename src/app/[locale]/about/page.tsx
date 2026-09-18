import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { aboutContent } from "@/i18n/legal/about";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs hakkında — 60'tan fazla tarayıcı içi dosya dönüştürme aracına sahip ücretsiz, gizlilik öncelikli çevrimiçi platform. %100 istemci tarafı, WebAssembly ile çalışır. Dosyalar asla yüklenmez.",
  en: "Learn about Convrs — the free, privacy-first online toolkit with 60+ in-browser file conversion tools. 100% client-side, powered by WebAssembly. No uploads, ever.",
  de: "Erfahren Sie mehr über Convrs — die kostenlose, datenschutzorientierte Online-Sammlung mit über 60 In-Browser-Dateikonvertierungstools. 100 % clientseitig, unterstützt durch WebAssembly. Nie Hochladen.",
  es: "Conozca Convrs — la colección gratuita en línea con más de 60 herramientas de conversión de archivos en el navegador, con privacidad como prioridad y tecnología WebAssembly. Nunca se sube nada.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = aboutContent[locale as Locale] ?? aboutContent.en;
  return {
    // Marka son eki layout'taki title.template ("%s — Convrs") tarafindan eklenir.
    title: doc.title,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = aboutContent[locale as Locale] ?? aboutContent.en;
  return <LegalRenderer doc={doc} />;
}