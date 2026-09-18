// /guides (Blog) bölümünün içerik modeli — hukuki sayfalardaki (src/i18n/legal)
// modeli model alan, ancak uzun-okunur makaleler için zenginleştirilmiş bir yapı:
// blok tabanlı, 4 locale'de tam metin, JSON sözlük yerine TS modüllerinde tutulur
// (istemci paketine girmez, SSG'de doğrudan HTML'e gömülür).

export type Locale = "en" | "tr" | "de" | "es";

// Satır içi zengin metin: düz string veya stillendirilmiş öğe (legal types ile aynı)
export type Rich =
  | string
  | {
      text: string;
      url?: string;
      internal?: boolean; // iç rota (next-intl Link)
      external?: boolean; // yeni sekmede açılır
      bold?: boolean;
      underline?: boolean;
      code?: boolean; // satır içi kod parçacığı
    };

export type Block =
  | { type: "p"; content: Rich[] }
  | { type: "h2"; content: Rich[] }
  | { type: "h3"; content: Rich[] }
  | { type: "list"; ordered?: boolean; items: Rich[][] }
  | { type: "code"; lang?: string; content: string }
  | {
      type: "note";
      tone: "success" | "warning";
      title?: string;
      content: Rich[];
    }
  | { type: "table"; columns: string[]; rows: string[][] };

export type GuideMeta = {
  title: string; // H1 + <title> (marka eki layout template'inden eklenir)
  eyebrow: string; // başlık üstü etiketi (örn. "Privacy")
  description: string; // meta description (SEO)
  excerpt: string; // /guides index kartındaki kısa özet
  readingTime: string; // yerelleştirilmiş okuma süresi (örn. "8 min read")
  updatedDate: string; // yerelleştirilmiş tarih (örn. "September 16, 2026")
};

export type GuideDocument = {
  meta: GuideMeta;
  blocks: Block[];
};

export type GuideContent = Record<Locale, GuideDocument>;

// Kayıt defteri öğesi: slug tüm dillerde ortaktır (/tr/guides/slug gibi),
// içerik locale başına farklıdır.
export type GuideDefinition = {
  slug: string;
  content: GuideContent;
};

export type GuideRegistry = GuideDefinition[];