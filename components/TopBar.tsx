import { Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { telLink } from "@/lib/utils";
import { SocialLinks } from "./SocialLinks";

/** Thin strip above the header. Desktop only. */
export function TopBar() {
  return (
    <div className="hidden bg-navy-dark text-white lg:block">
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          {site.phones.map((p, i) => (
            <a
              key={p}
              href={telLink(p)}
              className="inline-flex items-center gap-1.5 rounded transition-colors duration-200 hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              <span>{site.phonesDisplay[i]}</span>
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 rounded transition-colors duration-200 hover:text-gold"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span>{site.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white/60">
            {site.address.street}, {site.address.city}
          </span>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
