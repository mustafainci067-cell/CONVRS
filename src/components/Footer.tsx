import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import BuyMeCoffeeButton from "@/components/BuyMeCoffeeButton";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800/60">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-8 py-6 font-mono text-xs text-zinc-500 dark:text-zinc-400 sm:flex-row">
        <span>{t("copyright")}</span>
        <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("terms")}
            </Link>
            <a
              href="mailto:support@convrs.org"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("contact")}
            </a>
          </div>
          <BuyMeCoffeeButton />
        </nav>
      </div>
    </footer>
  );
}
