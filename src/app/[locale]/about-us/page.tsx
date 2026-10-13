import { redirect } from "@/i18n/navigation";

// /{locale}/about-us, eksiksiz hakkımızda sayfası olan /{locale}/about'a
// yönlendirir (içerik kopyası üretmemek için).
export default async function AboutUsRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/about", locale });
  return null;
}
