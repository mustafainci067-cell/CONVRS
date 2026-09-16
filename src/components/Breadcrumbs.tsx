// Breadcrumbs — görünür, sunucu taraflı ekmek kırıntısı gezinmesi.
// ToolJsonLd'deki BreadcrumbList JSON-LD'siyle birebir aynı hiyerarşiyi DOM'a
// taşır (E-E-A-T + a11y + SERP kırıntıları). Saf sunucu bileşeni: istemci JS yok.
import { Link } from "@/i18n/navigation";

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumbs({
  items,
  label,
}: {
  items: BreadcrumbItem[];
  label: string;
}) {
  if (!items.length) return null;

  return (
    <nav
      aria-label={label}
      className="mb-8 flex justify-center sm:justify-start"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-x-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "text-zinc-800 dark:text-zinc-100"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}