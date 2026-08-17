import { Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { isReady, telLink } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./Icon";

/** Thin gold strip above the header. Desktop only. */
export function TopBar() {
  const { facebook, instagram, tiktok } = site.socials;

  return (
    <div className="hidden bg-navy-dark text-white lg:block">
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a
            href={telLink(site.phones[0])}
            className="inline-flex items-center gap-1.5 rounded transition-colors hover:text-gold"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span>{site.phonesDisplay[0]}</span>
          </a>
          <a
            href={telLink(site.phones[1])}
            className="inline-flex items-center gap-1.5 rounded transition-colors hover:text-gold"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span>{site.phonesDisplay[1]}</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 rounded transition-colors hover:text-gold"
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
          <div className="flex items-center gap-3">
            {isReady(facebook) && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Facebook`}
                className="rounded transition-colors hover:text-gold"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
            {isReady(instagram) && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Instagram`}
                className="rounded transition-colors hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
            {isReady(tiktok) && (
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on TikTok`}
                className="rounded transition-colors hover:text-gold"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
