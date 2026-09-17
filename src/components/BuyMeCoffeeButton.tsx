import { cn } from "@/lib/utils";

interface BuyMeCoffeeButtonProps {
  className?: string;
}

export default function BuyMeCoffeeButton({ className }: BuyMeCoffeeButtonProps) {
  return (
    <a
      href="https://buymeacoffee.com/convrs"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee — support this project"
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
        "border-zinc-200 bg-zinc-100 text-zinc-600 hover:border-[#FFDD00]/60 hover:bg-zinc-200 hover:text-zinc-900",
        "dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-[#FFDD00]/40 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDD00]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a0a]",
        className
      )}
    >
      <svg
        className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-[#FFDD00] dark:text-zinc-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 10h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4Z" />
        <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
        <path d="M8 2c-.5 1 -1.5 1.5 -1.5 2.75S7.5 6.5 8 6.5" />
        <path d="M12 2c-.5 1 -1.5 1.5 -1.5 2.75S11.5 6.5 12 6.5" />
      </svg>
      <span className="whitespace-nowrap">Buy me a coffee</span>
    </a>
  );
}
