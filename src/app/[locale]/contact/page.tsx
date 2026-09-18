import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { contactContent } from "@/i18n/legal/contact";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs İletişim: Geri bildirim, destek veya özellik talepleriniz için bize ulaşın.",
  en: "Convrs Contact: Reach out to us for feedback, support, or feature requests.",
  de: "Convrs Kontakt: Kontaktieren Sie uns für Feedback, Support oder Funktionsanfragen.",
  es: "Contacto de Convrs: Comuníquese con nosotros para comentarios, soporte o solicitudes de funciones.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = contactContent[locale as Locale] ?? contactContent.en;
  return {
    title: `${doc.title} — Convrs`,
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = contactContent[locale as Locale] ?? contactContent.en;
  return <LegalRenderer doc={doc} />;
}
