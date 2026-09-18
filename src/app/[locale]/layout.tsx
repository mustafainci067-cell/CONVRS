<<<<<<< HEAD
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ConsentGate from "@/components/ConsentGate";
import BuyMeCoffeeButton from "@/components/BuyMeCoffeeButton";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Convrs — Modern File Conversion Platform",
    description: "100% Client-Side, fast, and secure file converter.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen bg-white text-zinc-900 antialiased dark:bg-[#0a0a0a] dark:text-zinc-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Sidebar />
            {/* Sag-ust kosede sabit "Buy me a coffee" butonuna yer acmak icin
                ust bosluk her ekran boyutunda korunur; buton boylece mobilde
                hamburger, masaustunde ise converter rozetinin uzerine binmez. */}
            <div className="flex flex-1 flex-col pt-14">
              {children}
              <Footer />
            </div>
            {/* Sitenin sag-ust kosesi. Sabit; z-30 oldugu icin mobil cekmece
                acilinca karartmanin (z-40) altinda kalir ve hamburgerle ayni
                hizada durur. */}
            <BuyMeCoffeeButton className="fixed right-5 top-3 z-30 shadow-sm" />
            <CookieBanner />
          </NextIntlClientProvider>
          {/* Rıza kapısı: analitik/reklam scriptleri yalnızca kullanıcı çerezleri
              "Kabul Et" ile onayladıysa yüklenir. */}
          <ConsentGate />
        </ThemeProvider>
      </body>
    </html>
  );
}
=======
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ConsentGate from "@/components/ConsentGate";
import BuyMeCoffeeButton from "@/components/BuyMeCoffeeButton";
import JsonLd from "@/components/JsonLd";
import { ThemeProvider } from "@/components/theme-provider";
import { routing, SITE_URL } from "@/i18n/routing";

const BRAND = "Convrs";

// [locale] altindaki tum sayfalar icerik + istemci-tarafi konvertordur; istek
// aninda sunucu verisi yoktur. setRequestLocale + force-static ile tumu
// build'de prerender olur (SSG) -> daha hizli TTFB ve saglikli crawl budget.
export const dynamic = "force-static";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  const t = await getTranslations({ locale: lang, namespace: "Seo" });
  const url = `${SITE_URL}/${lang}`;

  return {
    title: {
      default: t("homeTitle"),
      template: `%s — ${BRAND}`,
    },
    description: t("homeDescription"),
    applicationName: BRAND,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${SITE_URL}/en`,
        en: `${SITE_URL}/en`,
        tr: `${SITE_URL}/tr`,
        de: `${SITE_URL}/de`,
        es: `${SITE_URL}/es`,
      },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url,
      siteName: BRAND,
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Statik render (SSG) icin locale'i istek kapsamina sabitle; boylece
  // next-intl dinamik baslik okumaz ve [locale] altindaki sayfalar prerender olur.
  setRequestLocale(locale);

  // getMessages() request scope'a bagli oldugu icin SSG altinda EN doner;
  // messages'i brute'in locale parametresinden explicit yukleriz.
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen overflow-hidden bg-white text-zinc-900 antialiased dark:bg-[#0a0a0a] dark:text-zinc-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Atla baglantisi: klavye kullanicilari icerige hizlica ulasir (a11y). */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:shadow-lg"
            >
              {(messages as Record<string, Record<string, string>>).A11y?.skipToContent ?? "Skip to content"}
            </a>
            <Sidebar />
            {/* Sag-ust kosede sabit "Buy me a coffee" butonuna yer acmak icin
                ust bosluk her ekran boyutunda korunur; buton boylece mobilde
                hamburger, masaustunde ise converter rozetinin uzerine binmez. */}
            <div id="main-content" className="flex h-full flex-1 flex-col overflow-y-auto pt-14">
              {children}
              <Footer />
            </div>
            {/* Sitenin sag-ust kosesi. Sabit; z-30 oldugu icin mobil cekmece
                acilinca karartmanin (z-40) altinda kalir ve hamburgerle ayni
                hizada durur. */}
            <BuyMeCoffeeButton className="fixed right-5 top-3 z-30 shadow-sm" />
            <CookieBanner />
          </NextIntlClientProvider>
          {/* Rıza kapısı: analitik/reklam scriptleri yalnızca kullanıcı çerezleri
              "Kabul Et" ile onayladıysa yüklenir. */}
          <ConsentGate />
          {/* Saha geneli yapısal veri: WebSite + Organization (iletişim/adres
              içermez — şahsi bilgi kırmızı çizgisi gereği yalnızca marka + url). */}
          <JsonLd
            data={[
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: BRAND,
                url: `${SITE_URL}/${locale}`,
                inLanguage: routing.locales,
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: BRAND,
                url: SITE_URL,
                sameAs: ["https://buymeacoffee.com/convrs"],
              },
            ]}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
