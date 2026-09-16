import { redirect } from "@/i18n/navigation";

// /{locale}/terms, eksiksiz şartlar sayfası olan /{locale}/terms-of-service'e
// yönlendirir (içerik kopyası üretmemek için). AdSense /terms yolunu da görebilir.
export default async function TermsRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/terms-of-service", locale });
  // redirect() bir yanıt fırlatır; bu satır kullanıcıya asla gösterilmez.
  return null;
}