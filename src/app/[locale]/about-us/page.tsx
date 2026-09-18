import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { aboutContent } from "@/i18n/legal/about";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs Hakkında: Sıfır sunucu (zero-backend) felsefemizle tanışın. Dosya dönüştürme ve işleme araçlarımızın neden tamamen tarayıcınızda çalıştığını öğrenin.",
  en: "About Convrs: Meet our zero-backend philosophy. Learn why our file conversion and processing tools run entirely in your browser.",
  de: "Über Convrs: Lernen Sie unsere Zero-Backend-Philosophie kennen. Erfahren Sie, warum unsere Dateikonvertierungs- und Verarbeitungstools vollständig in Ihrem Browser laufen.",
  es: "Acerca de Convrs: Conozca nuestra filosofía de cero servidores. Descubra por qué nuestras herramientas de conversión y procesamiento de archivos se ejecutan completamente en su navegador.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = aboutContent[locale as Locale] ?? aboutContent.en;
  return {
    title: `${doc.title} — Convrs`,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = aboutContent[locale as Locale] ?? aboutContent.en;
  return <LegalRenderer doc={doc} />;
}
