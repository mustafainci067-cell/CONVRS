import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getCanonicalUrl } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    robots: { index: false, follow: true },
    alternates: {
      canonical: getCanonicalUrl(locale, "/about"),
    },
  };
}

// Kalıcı (308) yönlendirme: /about-us → /about (next.config.ts'de de eşleniği var)
export default async function AboutUsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/about`);
}
