export type ToolLocale = "en" | "tr" | "de" | "es";

const CONVERSION_RE = /^(.+?)\s*(?:→|↔)\s*(.+)$/;

type Tpl = {
  h1: (f: string, t: string) => string;
  seo: (f: string, t: string) => string;
  toolSuffix: string;
  descSuffix: string;
};

const TEMPLATES: Record<ToolLocale, Tpl> = {
  en: {
    h1: (f, t) => `${f} to ${t} Converter`,
    seo: (f, t) => `${f} to ${t} Converter — Free, No Upload`,
    toolSuffix: "Free Online Tool, No Upload",
    descSuffix: "Free, runs 100% in your browser — your files never leave your device.",
  },
  tr: {
    h1: (f, t) => `${f} → ${t} Dönüştürücü`,
    seo: (f, t) => `${f} → ${t} Dönüştürücü — Ücretsiz, Yüklemesiz`,
    toolSuffix: "Ücretsiz Online Araç, Yüklemesiz",
    descSuffix: "Ücretsizdir ve tamamen tarayıcınızda çalışır — dosyalarınız cihazınızdan çıkmaz.",
  },
  de: {
    h1: (f, t) => `${f} in ${t} umwandeln`,
    seo: (f, t) => `${f} in ${t} umwandeln — kostenlos, ohne Upload`,
    toolSuffix: "Kostenloses Online-Tool ohne Upload",
    descSuffix: "Kostenlos und zu 100 % im Browser — Ihre Dateien verlassen nie Ihr Gerät.",
  },
  es: {
    h1: (f, t) => `Convertir ${f} a ${t}`,
    seo: (f, t) => `Convertir ${f} a ${t} — Gratis, sin subir archivos`,
    toolSuffix: "Herramienta online gratis, sin subir archivos",
    descSuffix: "Gratis y 100 % en tu navegador: tus archivos nunca salen de tu dispositivo.",
  },
};

function loc(locale: string): ToolLocale {
  return (["en", "tr", "de", "es"].includes(locale) ? locale : "en") as ToolLocale;
}

export function buildToolHeading(
  locale: string,
  localizedTitle: string
): { h1: string; seoTitle: string } {
  const tpl = TEMPLATES[loc(locale)];
  const m = localizedTitle.match(CONVERSION_RE);
  if (m) {
    const from = m[1].trim();
    const to = m[2].trim();
    return { h1: tpl.h1(from, to), seoTitle: tpl.seo(from, to) };
  }
  return { h1: localizedTitle, seoTitle: `${localizedTitle} — ${tpl.toolSuffix}` };
}

export function buildToolMetaDescription(locale: string, description: string): string {
  const d = description.trim();
  if (!d) return "";
  return `${/[.!?…]$/.test(d) ? d : d + "."} ${TEMPLATES[loc(locale)].descSuffix}`;
}
