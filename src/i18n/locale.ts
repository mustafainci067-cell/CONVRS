// Locale yardimcisi — request scope yerine route param'ina dayanir.
//
// [locale] dizini dogrudan app/ altinda oldugu icin `locale`, Next 16'nin
// root parameter'idir. next-intl'in request scope API'leri (getLocale /
// getMessages) `force-static` SSG altinda build/derleme aninda EN'e sabitlenir
// (setRequestLocale -> setCachedRequestLocale Next 16'da deprecate edildi ve
// layout->child arasinda React.cache paylasilmaz). next/root-params derleyici
// tarafindan gercek route param'ina baglanir; boylece /tr, /de, /es sayfalari
// build'de kendi dillerinde pierilir. Herhangi bir Server Component'ten prop
// gecirmeden cagrilabilir.
import { locale as getRootLocale } from "next/root-params";

export async function getRouteLocale(): Promise<string> {
  return await getRootLocale();
}