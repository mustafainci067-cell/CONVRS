"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  buttonClassName?: string;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
  buttonClassName,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn("group flex w-full items-center justify-between py-4 text-left transition-colors", buttonClassName)}
      >
        {title}
        <div
          className={cn(
            "ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all duration-300 dark:bg-zinc-900 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800",
            isOpen && "rotate-180 bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/60"
          )}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
