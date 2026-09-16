// Faz 4 — Affiliate (ortaklik) yapilandirmasi.
//
// `enabled` true yapilip `url`/`title` dolduruldugunda AffiliateBanner,
// arac sayfalarinda (ToolSeoContent kuyrugu) ve ana sayfada (SSS'ten sonra)
// "Sponsored" rozetli, nofollow+sponsored linkli bir oneri kutusu basar.
// Bosken (enabled=false) hicbir sey render edilmez — uretimde risk yok.
//
// Google politikasi geregi ortaklik linkleri rel="nofollow sponsored" tasimali
// ve kullaniciya aciklanmali (Ads.affiliateDisclosure). Sahisin kisisel/iletisim
// bilgisi buraya asla girmez — yalnizca dıs taraflı urun/servis linki.
export const AFFILIATE: {
  /** Ortaklik kutusunu ac/kapat. */
  enabled: boolean;
  /** Hedef ortaklik linki (tracking parametreleriyle birlikte). */
  url: string;
  /** Kutu basligi; bos birakilirsa yalnizca disclosure gorunur. */
  title: string;
} = {
  enabled: false,
  url: "",
  title: "",
};