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
