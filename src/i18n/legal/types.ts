export type Locale = "en" | "tr" | "de" | "es";

// Satır içi zengin metin: düz string veya stillendirilmiş öğe
export type Rich =
  | string
  | {
      text: string;
      url?: string; // link hedefi
      internal?: boolean; // iç rota (next-intl Link)
      external?: boolean; // yeni sekmede açılır
      bold?: boolean; // font-medium dark uyumlu
      underline?: boolean;
      code?: boolean; // satır içi kod parçacığı
    };

export type TableBlock = {
  type: "table";
  columns: string[];
  rows: string[][];
};

export type Block =
  | { type: "p"; content: Rich[] }
  | { type: "h4"; content: Rich[] }
  | { type: "list"; items: Rich[][] }
  | TableBlock
  | {
      type: "note";
      tone: "success" | "warning";
      title?: string;
      content: Rich[];
    }
  | { type: "contact"; title: string; lines: Rich[][] };

export type Section = {
  heading: Rich[];
  divider?: boolean; // üstte ayraç çizgisi (son iletişim bölümleri için)
  blocks: Block[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  updatedLabel: string;
  updatedDate: string;
  scope?: string;
  note?: Block; // başlığın hemen altındaki öne çıkan kutu
  intro?: Rich[][]; // başlık/kutu sonrası giriş paragrafları
  sections: Section[];
};

export type LegalContent = Record<Locale, LegalDocument>;

// Ortak zengin metin yardımcıları: bağlantılar ve vurgular
export const links = {
  googlePrivacy: "https://policies.google.com/privacy",
  googleAdsSettings: "https://adssettings.google.com",
  googlePartnerSites: "https://policies.google.com/technologies/partner-sites",
  googleCookies: "https://policies.google.com/technologies/cookies",
  bmcPrivacy: "https://www.buymeacoffee.com/privacy",
  kvkk: "https://www.kvkk.gov.tr",
  caAttorney: "https://oag.ca.gov/privacy",
  allaboutcookies: "https://www.allaboutcookies.org",
  contactMail: "mailto:support@convrs.org",
} as const;

export const SUPPORT_EMAIL = "support@convrs.org";