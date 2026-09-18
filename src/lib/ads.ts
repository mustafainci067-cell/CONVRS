// Faz 4 — Reklam yuvasi yapilandirmasi (tek kaynak).
//
// AdSense panelinden (google.com/adsense) "Display" formatinda yuva olusturun
// ve cikan 7+ haneli slot ID'sini ilgili sabite yapistirin:
//
//   AD_SLOT_TOOL_PAGE = "1234567890";        // arac sayfalari yuvasi
//   AD_SLOT_HOMEPAGE  = "1234567891";        // ana sayfa yuvasi
//
// Slot ID'si girilene kadar `isAdConfigured` false doner ve AdUnit hicbir sey
// render etmez (uretinde bos alan gorunmez). Girildigi anda yava bayrakli
// (lazy, IntersectionObserver) <ins class="adsbygoogle"> tinitesi devreye girer.
//
// Client-safe: modul ustunde window/global erisimi yoktur.
import { ADSENSE_CLIENT } from "@/lib/consent";

export { ADSENSE_CLIENT };

/** Arac sayfalarinin (ToolSeoContent ustunde, donusturucu kartin altinda) reklam yuvasi. */
export const AD_SLOT_TOOL_PAGE = "";

/** Ana sayfa (araç tablosu ile SSS arasinda) reklam yuvasi. */
export const AD_SLOT_HOMEPAGE = "";

// AdSense slot id'leri 7+ haneli rakamdir ("1234567890"). Degisken tutarli
// olmasi icin regex ile dogrulanir; bos/hedef-isaret forumlari konfigurasyon-siz sayilir.
const CONFIGURED = /^[0-9]{7,}$/;

export function isAdConfigured(id: string): boolean {
  return CONFIGURED.test(id);
}