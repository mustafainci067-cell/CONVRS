"use client";

import { useEffect } from "react";
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

// gtag fonksiyonunu tanımlar, rıza varsayılanını (denied) gtag.js'ten ÖNCE push eder
// ve scriptleri yükler. Consent Mode v2'de default, loader'dan önce okunmalıdır.
function bootstrap() {
  const inline = document.createElement("script");
  inline.id = "gtag-inline";
  inline.textContent = `
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
  document.head.appendChild(inline);

  const loader = document.createElement("script");
  loader.id = "gtag-js";
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(loader);

  const config = document.createElement("script");
  config.id = "gtag-config";
  config.textContent = `gtag('config', '${GA_ID}', { anonymize_ip: true });`;
  document.head.appendChild(config);

  const adsense = document.createElement("script");
  adsense.id = "adsense-js";
  adsense.async = true;
  adsense.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  adsense.crossOrigin = "anonymous";
  document.head.appendChild(adsense);
}

export default function ConsentGate() {
  useEffect(() => {
    bootstrap();

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

  return null;
}
