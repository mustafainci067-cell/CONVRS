// Faz 4 — CWV-güvenli tek reklam yuvası.
//
// SSR: slot ID'si yapılandırılmamışsa hicbir sey basmaz (üretimde boş alan yok).
// Yapılandırılmışsa: sabit min-height rezervli kutu + "Reklam" etiketi +
// <ins class="adsbygoogle"> basar. Rezerve edilen yükseklik CLS'yi sıfırlar.
//
// Client: IntersectionObserver ile yuva görünüm alanına yaklaşınca adsbygoogle
// push tetiklenir (lazy-load) — LCP'ye talep gitmez; bir kez tetiklenince
// observer temizlenir. consent/ConsentGate'e dokunmaz: script zaten her sayfada
// yüklenir (Consent Mode v2 + Limited Ads), bu bileşen yalnızca yuvanın DOLUMUNU
// görünürlüğe bağlar. Rıza yoksa Google Limited Ads gösterir (Memory: monetizasyon).
'use client';

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ADSENSE_CLIENT, isAdConfigured } from "@/lib/ads";

const FORMAT_HEIGHT = { rectangle: 280, horizontal: 100 } as const;
type AdFormat = keyof typeof FORMAT_HEIGHT;

export default function AdUnit({
  slot,
  format = "rectangle",
  className,
}: {
  slot: string;
  format?: AdFormat;
  className?: string;
}) {
  const t = useTranslations("Ads");
  const insRef = useRef<HTMLModElement>(null);
  const configured = isAdConfigured(slot);

  useEffect(() => {
    if (!configured || !insRef.current) return;
    const el = insRef.current;
    let pushed = false;

    const fire = () => {
      if (pushed) return;
      pushed = true;
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            fire();
            io.disconnect();
            break;
          }
        }
      },
      // 300px erken: kullanıcı kaydırdıkça yuva dolmaya başlasın (LCP'yi beklemeden)
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [configured, slot]);

  if (!configured) return null;

  return (
    <div className={cn("w-full", className)} aria-label={t("adLabel")}>
      <p className="mb-1 text-center font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
        {t("adLabel")}
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={{ minHeight: FORMAT_HEIGHT[format], display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format === "horizontal" ? "horizontal" : "rectangle"}
        data-full-width-responsive="true"
      />
    </div>
  );
}