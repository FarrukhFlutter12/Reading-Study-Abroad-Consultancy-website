import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn, isReady } from "@/lib/utils";

/**
 * Renders the client's logo file once site.logo is filled in; until then it
 * falls back to a text lockup matching the brand banner.
 */
export function Logo({
  variant = "light",
  className,
  asLink = true,
}: {
  /** "light" = for light backgrounds, "dark" = for navy backgrounds */
  variant?: "light" | "dark";
  className?: string;
  asLink?: boolean;
}) {
  const onDark = variant === "dark";
  const file = onDark ? site.logo.onDark : site.logo.onLight;

  const inner = isReady(file) ? (
    <Image
      src={file}
      alt={`${site.name} logo`}
      width={190}
      height={56}
      priority
      className="h-11 w-auto sm:h-12"
    />
  ) : (
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          "font-display text-[22px] font-bold tracking-[0.06em] sm:text-2xl",
          onDark ? "text-white" : "text-navy",
        )}
      >
        READING
      </span>
      <span className="mt-1 flex items-center gap-1.5">
        <span className="h-px w-3 bg-gold" aria-hidden />
        <span
          className={cn(
            "font-display text-[9px] font-semibold uppercase tracking-[0.22em] sm:text-[10px]",
            onDark ? "text-gold-light" : "text-gold-dark",
          )}
        >
          Study Abroad
        </span>
        <span className="h-px w-3 bg-gold" aria-hidden />
      </span>
    </span>
  );

  if (!asLink) return <div className={className}>{inner}</div>;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("inline-flex items-center rounded-md", className)}
    >
      {inner}
    </Link>
  );
}
