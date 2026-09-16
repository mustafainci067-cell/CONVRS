// Faz 3 — SEO icerik sablonu: ortak tip tanimlari.
import type { ToolSeoConfig } from "@/content/toolSeo";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoContent = {
  /** H2 basligi — araca ve dile ozel. */
  heading: string;
  /** Numarali "Nasil yapilir" adimlari. */
  steps: string[];
  /** SSS maddeleri (soru + cevap). */
  faq: SeoFaqItem[];
};

/** Bir dile ozel "olgu" (claim) — soru + cevap. */
export type SeoClaim = { q: string; a: string };

/**
 * Bir dilin tum sablon cumlelerini tasiyan sozluk.
 * Motor (index.ts) bu slotlari config (@/content/toolSeo) ile birlestirir,
 * boylece mantik tek yerde, metinler dile gore ayri dosyalarda kalir.
 */
export type SeoPhrases = {
  claims: Record<string, SeoClaim>;
  /** "Nasil yapilir" basligi — etkilesim sekline gore. */
  headingFile: (from: string, to: string) => string;
  headingPaste: (from: string, to: string) => string;
  headingGenerate: (to: string) => string;
  /** Adim listeleri. */
  stepsFile: (from: string, to: string) => string[];
  stepsPaste: (from: string, to: string) => string[];
  stepsGenerate: (to: string) => string[];
  /** "Nasil yapilir?" SSS soru/cevaplari. */
  qHow: (from: string, to: string) => string;
  qHowGenerate: (to: string) => string;
  aHowFile: (from: string, to: string) => string;
  aHowPaste: (from: string, to: string) => string;
  aHowGenerate: (to: string) => string;
  /** Gizlilik SSS soru/cevabi. (Medya araclarında WASM vurgusu motor tarafından eklenir.) */
  qPrivate: (name: string) => string;
  aPrivate: (name: string) => string;
  /** Medya araclari icin WASM vurgusu — aPrivate cevabina motor ekler. */
  wasmSentence: string;
  /** Dosya boyutu limiti SSS. */
  qLimit: string;
  aLimit: (mb: number) => string;
};

/** toolSeo config'te kullanilabilen claim anahtarlarinin tipi (geliştirme yardimcisi). */
export type ClaimKey = keyof SeoPhrases["claims"];