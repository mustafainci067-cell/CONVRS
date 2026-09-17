// Çerez onayı yönetimi — yalnızca istemci tarafında çalışır.
// CookieBanner (onay depolama) ile ConsentGate (script yükleme) aynı modülü kullanır,
// böylece kullanıcı kabul ettiği anda scriptler yüklenir, reddettiğinde yüklenmez.

export const CONSENT_KEY = "convrs-cookie-consent";

// ID'ler .env.local'den okunur; hardcoded bırakılmaz.
// NEXT_PUBLIC_ prefix'i Next.js'in client bundle'a dahil etmesi için gereklidir.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export type Consent = "accepted" | "rejected" | null;

// localStorage'a güvenli erişim (erişilemezse güvenli varsayılan: rıza yok)
function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // depolama engellenmişse onay oturum boyunca bellek üzerinden izlenir
  }
}

function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // yoksay
  }
}

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = safeGet(CONSENT_KEY);
  if (v === "accepted") return "accepted";
  if (v === "rejected") return "rejected";
  return null;
}

type Listener = (consent: Consent) => void;
const listeners = new Set<Listener>();

export function setConsent(value: Consent): void {
  if (typeof window === "undefined") return;
  if (value === "accepted") safeSet(CONSENT_KEY, "accepted");
  else if (value === "rejected") safeSet(CONSENT_KEY, "rejected");
  else safeRemove(CONSENT_KEY);
  listeners.forEach((l) => l(value));
}

export function subscribeConsent(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}