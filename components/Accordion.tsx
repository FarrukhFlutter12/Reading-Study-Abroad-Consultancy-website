"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  className,
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <div className={cn("divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                id={`${uid}-btn-${i}`}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cream sm:px-6 sm:py-5"
              >
                <span className="font-display text-[15px] font-semibold leading-snug text-navy sm:text-base">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full transition-all duration-200",
                    isOpen
                      ? "rotate-45 bg-gold text-navy-dark"
                      : "bg-navy/10 text-navy",
                  )}
                  aria-hidden
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-btn-${i}`}
                  initial={reduce ? {} : { height: 0, opacity: 0 }}
                  animate={reduce ? {} : { height: "auto", opacity: 1 }}
                  exit={reduce ? {} : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75 sm:px-6 sm:pb-6 sm:pr-14">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
