import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convrs — Modern File Conversion Platform",
  description: "100% Client-Side, fast, and secure file converter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes <html> uzerindeki class'i hydration oncesi yazar
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen overflow-hidden bg-white text-zinc-900 antialiased dark:bg-[#0a0a0a] dark:text-zinc-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Sidebar />
          <div className="flex h-full flex-1 flex-col overflow-y-auto">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
