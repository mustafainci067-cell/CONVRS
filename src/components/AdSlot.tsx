"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/consent";
import { cn } from "@/lib/utils";

/**
 * Google AdSense reklam slot bileşeni.
 *
 * Kurallar:
 * - Yalnızca useEffect ile client-side render edildikten sonra aktif olur
 *   (SSR sırasında boş bir placeholder döner → CLS riski sıfır).
 * - AdSense client ID'si .env.local'den gelir; hardcoded değildir.
 * - Slot ID'leri Google AdSense panelinden alınmalı; şimdilik "YOUR_SLOT_ID"
 *   placeholder kullanılıyor.
 *
 * Kullanım:
 * ```tsx
 * <AdSlot slotId="YOUR_SLOT_ID" format="horizontal" className="my-4" />
 * ```
 */

// AdSense'in window nesnesine eklediği kuyruğu TypeScript'e bildiriyoruz.
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export type AdFormat =
  | "auto"
  | "horizontal"    // Leaderboard — header altı
  | "vertical"      // Wide Skyscraper — yan sütun
  | "rectangle";    // Medium Rectangle — içerik arası

interface AdSlotProps {
  /** Google AdSense panelinden alınan reklam birimi (ad unit) slot ID'si */
  slotId?: string;
  format?: AdFormat;
  className?: string;
  /** Responsive mod; varsayılan true */
  fullWidthResponsive?: boolean;
}

/** Format başına minimum yükseklikler (CLS önleme) */
const MIN_HEIGHT: Record<AdFormat, string> = {
  auto: "min-h-[90px]",
  horizontal: "min-h-[90px]",
  vertical: "min-h-[250px]",
  rectangle: "min-h-[250px]",
};

export default function AdSlot({
  slotId = "YOUR_SLOT_ID",
  format = "auto",
  className,
  fullWidthResponsive = true,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Strict Mode'da iki kez çalışmayı önle
    if (pushed.current) return;
    pushed.current = true;

    try {
      // AdSense script'i ConsentGate tarafından yükleniyor;
      // burada yalnızca kuyruğa push yapılır.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Script henüz yüklenmemişse sessizce geç
    }
  }, []);

  // AdSense client tanımlı değilse (dev ortamı) boş döner
  if (!ADSENSE_CLIENT) return null;

  return (
    <div
      className={cn(
        "overflow-hidden text-center",
        MIN_HEIGHT[format],
        className
      )}
      aria-label="Advertisement"
    >
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
