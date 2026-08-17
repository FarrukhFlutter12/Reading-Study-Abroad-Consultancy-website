"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn, waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./Icon";

const MESSAGE = `Assalam-o-Alaikum! I would like to speak to a counsellor about studying abroad.`;

/**
 * Fixed chat button. Hides itself while a form field is focused on mobile so it
 * never covers the on-screen keyboard area or the field being typed into.
 */
export function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);

    const onFocusIn = (e: FocusEvent) => {
      if (window.innerWidth < 1024 && isField(e.target)) setHidden(true);
    };
    const onFocusOut = () => setHidden(false);

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <a
      href={waLink(site.whatsapp, MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with a counsellor on WhatsApp"
      className={cn(
        "no-print group fixed right-4 z-40 transition-all duration-300 lg:right-6",
        // sits above the mobile sticky CTA bar
        "bottom-[calc(4.75rem+env(safe-area-inset-bottom))] lg:bottom-6",
        hidden
          ? "pointer-events-none translate-y-4 opacity-0"
          : "translate-y-0 opacity-100",
      )}
    >
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform group-hover:scale-105">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-pulse-ring"
        />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>

      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lift transition-opacity group-hover:opacity-100 lg:block">
        Chat with a counsellor
      </span>
    </a>
  );
}
