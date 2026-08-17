import Link from "next/link";
import { ClipboardList, Phone } from "lucide-react";
import { site } from "@/data/site";
import { telLink, waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./Icon";

/** Bottom action bar, mobile only. Body gets matching padding in layout.tsx. */
export function StickyMobileCTA() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-dark/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 pb-[env(safe-area-inset-bottom)]">
        <a
          href={telLink(site.phones[0])}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-white transition-colors hover:text-gold"
        >
          <Phone className="h-5 w-5" strokeWidth={2} aria-hidden />
          Call
        </a>
        <a
          href={waLink(
            site.whatsapp,
            "Assalam-o-Alaikum! I would like to speak to a counsellor about studying abroad.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-x border-white/10 py-2.5 text-[11px] font-semibold text-white transition-colors hover:text-gold"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
        <Link
          href="/free-assessment"
          className="flex flex-col items-center justify-center gap-1 bg-gold py-2.5 text-[11px] font-semibold text-navy-dark"
        >
          <ClipboardList className="h-5 w-5" strokeWidth={2} aria-hidden />
          Free Check
        </Link>
      </div>
    </div>
  );
}
