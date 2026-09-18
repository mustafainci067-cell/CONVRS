// Faz 4 — Ortaklık (affiliate) öneri kutusu.
//
// Sunucu bileşenidir: JS'siz, build'de statik HTML basılır (bot-okunur).
// src/lib/affiliate.ts'deki config kapalıyken hicbir sey render etmez;
// açıldığında "Sponsored" rozetli, nofollow+sponsored linkli ve kullanıcıya
// açıklamalı (Ads.affiliateDisclosure) bir kutu basar. Sahisin kişisel/iletişim
// bilgisi asla buraya girmez (Memory: kırmızı çizgi).
import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";
import { AFFILIATE } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

export default async function AffiliateBanner({
  className,
}: {
  className?: string;
}) {
  if (!AFFILIATE.enabled || !AFFILIATE.url) return null;

  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: "Ads" });

  const link = (
    <a
      href={AFFILIATE.url}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className="font-semibold text-emerald-700 underline-offset-2 transition-colors hover:text-emerald-600 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
    >
      {AFFILIATE.title || t("sponsoredLabel")}
    </a>
  );

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-1.5 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:flex-row sm:items-center sm:gap-3",
        "dark:border-zinc-800 dark:bg-zinc-900/40",
        className
      )}
    >
      <span className="shrink-0 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
        {t("sponsoredLabel")}
      </span>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {AFFILIATE.title && (
          <>
            {link}
            <span className="mx-2 text-zinc-400 dark:text-zinc-600">·</span>
          </>
        )}
        {t("affiliateDisclosure")}
      </p>
    </div>
  );
}