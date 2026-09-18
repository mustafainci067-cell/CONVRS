// Faz 3 — SEO icerik sablonu: ortak motor.
// Config (@/content/toolSeo) + dil sozlugu (en/tr/de/es) birlestirilir.
// Yalnizca sunucu komponentlerinde kullanilir; client bundle'a girmez.
import { toolSeoConfigs, type ToolSeoConfig } from "@/content/toolSeo";
import { en } from "./en";
import { tr } from "./tr";
import { de } from "./de";
import { es } from "./es";
import type { SeoClaim, SeoContent, SeoPhrases } from "./types";

const DICTS: Record<string, SeoPhrases> = { en, tr, de, es };

export function getSeoDict(locale: string): SeoPhrases {
  return DICTS[locale] ?? en;
}

export function getToolSeo(
  locale: string,
  config: ToolSeoConfig,
  name: string
): SeoContent {
  const p = getSeoDict(locale);
  const { from, to, archetype } = config;

  let heading: string;
  let steps: string[];
  if (archetype === "file") {
    heading = p.headingFile(from, to);
    steps = p.stepsFile(from, to);
  } else if (archetype === "paste") {
    heading = p.headingPaste(from, to);
    steps = p.stepsPaste(from, to);
  } else {
    heading = p.headingGenerate(to);
    steps = p.stepsGenerate(to);
  }

  const howAnswer =
    archetype === "file"
      ? p.aHowFile(from, to)
      : archetype === "paste"
        ? p.aHowPaste(from, to)
        : p.aHowGenerate(to);
  const howQuestion =
    archetype === "generate" ? p.qHowGenerate(to) : p.qHow(from, to);

  const claimFaq = config.claimKeys
    .slice(0, 2)
    .map((key) => p.claims[key])
    .filter((c): c is SeoClaim => Boolean(c))
    .map((c) => ({ question: c.q, answer: c.a }));

  const faq = [
    { question: howQuestion, answer: howAnswer },
    {
      question: p.qPrivate(name),
      answer: `${p.aPrivate(name)}${config.media ? p.wasmSentence : ""}`,
    },
    ...claimFaq,
  ];

  if (config.sizeLimitMb) {
    faq.push({
      question: p.qLimit,
      answer: p.aLimit(config.sizeLimitMb),
    });
  }

  return { heading, steps, faq };
}

/** path + locale icin hazir icerik (ToolSeoContent/ToolJsonLd ortak cagirisi). */
export function getToolSeoByPath(
  locale: string,
  path: string,
  name: string
): SeoContent | null {
  const config = toolSeoConfigs[path];
  if (!config) return null;
  return getToolSeo(locale, config, name);
}