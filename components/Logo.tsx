import Image from "next/image";
import Link from "next/link";
import type { LogoAsset } from "@/lib/brandAssets";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Renders the real logo artwork, falling back to the brand text lockup only if
 * the file is somehow missing — the site must never show a broken image.
 *
 * Callers pass the asset in (resolved server-side by lib/brandAssets.ts) so this
 * works in both server and client trees. Pick the asset by BACKGROUND: navy
 * surfaces get `onDark`, light and gold surfaces get `onLight`.
 *
 * Sizing rule: height comes from CSS, width is always auto with object-contain,
 * so the lockup is never stretched.
 */
export function Logo({
  asset,
  variant = "light",
  sizeClass = "h-10 w-auto sm:h-12",
  className,
  asLink = true,
  priority = false,
}: {
  /** From getBrandAssets(); null renders the text lockup. */
  asset?: LogoAsset | null;
  /** Only affects the text-lockup fallback: "dark" = for navy backgrounds. */
  variant?: "light" | "dark";
  /** Tailwind height + w-auto. Never set a fixed width alongside it. */
  sizeClass?: string;
  className?: string;
  asLink?: boolean;
  priority?: boolean;
}) {
  const onDark = variant === "dark";

  const inner = asset ? (
    <Image
      src={asset.src}
      alt={site.name}
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={cn(sizeClass, "object-contain")}
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

/**
 * Icon mark on its own, for 404 and loading states.
 *
 * Decorative by default: it sits beside visible text that already names the
 * business, so it carries an empty alt and aria-hidden.
 */
export function LogoIcon({
  asset,
  sizeClass = "h-16 w-16",
  className,
}: {
  asset?: LogoAsset | null;
  sizeClass?: string;
  className?: string;
}) {
  if (!asset) return null;
  return (
    <Image
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      className={cn(sizeClass, "object-contain", className)}
      aria-hidden
    />
  );
}
