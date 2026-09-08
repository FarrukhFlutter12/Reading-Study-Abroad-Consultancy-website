import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon } from "./Icon";
import { TikTokIcon } from "./icons/TikTokIcon";

/**
 * The single source of truth for social links across the top bar, footer,
 * contact page and mobile drawer.
 *
 * All three handles are confirmed live, so — unlike the placeholder-guarded
 * fields in data/site.ts — these always render. Every link opens in a new tab
 * with rel="noopener noreferrer" and a descriptive aria-label, and hovers to
 * brand gold over 200ms.
 */

const LINKS = [
  { name: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { name: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { name: "TikTok", href: site.socials.tiktok, Icon: TikTokIcon },
];

export function SocialLinks({
  variant = "bare",
  iconClass = "h-4 w-4",
  circleClass = "border-white/20",
  className,
}: {
  /** "bare" = inline icons; "circle" = bordered round buttons. */
  variant?: "bare" | "circle";
  iconClass?: string;
  /** Border colour for the circle variant — depends on the surrounding surface. */
  circleClass?: string;
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {LINKS.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${name}`}
            className={cn(
              "inline-flex transition-colors duration-200 hover:text-gold",
              variant === "circle" &&
                cn(
                  "h-9 w-9 items-center justify-center rounded-full border hover:border-gold",
                  circleClass,
                ),
            )}
          >
            <Icon className={iconClass} />
          </a>
        </li>
      ))}
    </ul>
  );
}
