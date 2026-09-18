<<<<<<< HEAD
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800/60">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-8 py-6 font-mono text-xs text-zinc-500 dark:text-zinc-400 sm:flex-row">
        <span>{t("copyright")}</span>
        <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="/about-us"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("about")}
            </Link>
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
            <Link
              href="/cookie-policy"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("cookie")}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("contact")}
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
=======
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getRouteLocale } from "@/i18n/locale";

export default async function Footer() {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tA11y = await getTranslations({ locale, namespace: "A11y" });

  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800/60">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-8 py-6 font-mono text-xs text-zinc-500 dark:text-zinc-400 sm:flex-row">
        <span>{t("copyright")}</span>
        <nav aria-label={tA11y("footerNav")} className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/about"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("about")}
            </Link>
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
            <Link
              href="/cookie-policy"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("cookie")}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("contactPage")}
            </Link>
            <Link
              href="/guides"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              {t("guides")}
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
