import type { Metadata } from "next";
import LegalRenderer from "@/components/legal/LegalRenderer";
import { contactContent } from "@/i18n/legal/contact";
import type { Locale } from "@/i18n/legal/types";

const descriptions: Record<string, string> = {
  tr: "Convrs ile iletişime geçin — support@convrs.org. Tarayıcı içi dosya dönüştürme araçlarımız hakkında sorular, geri bildirim, hata bildirimi ve veri koruma talepleri. 1–2 iş günü içinde yanıt veririz.",
  en: "Contact Convrs — support@convrs.org. Questions about our in-browser file conversion tools, feedback, bug reports and data-protection requests. We reply within 1–2 business days.",
  de: "Kontaktieren Sie Convrs — support@convrs.org. Fragen zu unseren In-Browser-Dateikonvertierungstools, Feedback, Fehlermeldungen und Datenschutzanfragen. Wir antworten innerhalb von 1–2 Werktagen.",
  es: "Contacte con Convrs — support@convrs.org. Preguntas sobre nuestras herramientas de conversión de archivos en el navegador, comentarios, avisos de errores y solicitudes de protección de datos. Respondemos en 1–2 días laborables.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = contactContent[locale as Locale] ?? contactContent.en;
  return {
    // Marka son eki layout'taki title.template ("%s — Convrs") tarafindan eklenir.
    title: doc.title,
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