"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  ADSENSE_CLIENT,
  GA_ID,
  getConsent,
  subscribeConsent,
  type Consent,
} from "@/lib/consent";

// Google Consent Mode v2 + Limited Ads:
// Scriptler rıza beklenmeksizin HER ZAMAN yüklenir; ancak rıza verilmeden Google'a
// yalnızca "denied" sinyalleri gider. Böylece Google, kişiselleştirilmemiş
// (Limited Ads / Restricted Data Processing) reklam sunar — kullanıcı yine reklam
// görür, yayıncı yine kazanır. Kullanıcı "Kabul Et" dediğinde gtag('consent','update')
// ile sinyaller granted'a çekilir ve tam kişiselleştirme + analitik devreye girer.
const CONSENT_GRANTED = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
} as const;

const CONSENT_DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

// Consent Mode v2 varsayılan sinyal kodu — gtag.js'ten ÖNCE çalışmalı.
// next/script strategy="beforeInteractive" olmadan bunu garanti edemeyiz,
// bu yüzden inline script olarak <head>'e enjekte ediyoruz.
const CONSENT_DEFAULT_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });
  gtag('js', new Date());
`;

export default function ConsentGate() {
  const [mounted, setMounted] = useState(false);

  // hydration sonrası consent güncellemelerini dinle
  useEffect(() => {
    setMounted(true);

    const apply = (consent: Consent) => {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === "function") {
        w.gtag(
          "consent",
          "update",
          consent === "accepted" ? CONSENT_GRANTED : CONSENT_DENIED
        );
      }
    };

    // Mevcut rıza zaten 'accepted' ise ilk yüklemede granted'a çek
    apply(getConsent());
    const unsubscribe = subscribeConsent(apply);
    return unsubscribe;
  }, []);

  // GA_ID veya ADSENSE_CLIENT tanımlı değilse (örn. dev env'de .env.local yoksa)
  // script'leri yükleme — gereksiz 404 isteği önlenir.
  if (!GA_ID || !ADSENSE_CLIENT) return null;

  return (
    <>
      {/* 1. Consent Mode v2 varsayılan sinyali — gtag.js'ten önce çalışmalı */}
      <Script
        id="gtag-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
      />

      {/* 2. Google Tag Manager / Analytics loader */}
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* 3. GA config — gtag.js yüklendikten sonra çalışır */}
      {mounted && (
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `gtag('config', '${GA_ID}', { anonymize_ip: true });`,
          }}
        />
      )}

      {/* 4. AdSense — afterInteractive: sayfa interaktif olduktan sonra yükle (pagespeed) */}
      <Script
        id="adsense-js"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
