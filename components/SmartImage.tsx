import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ImageSlot } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * SERVER-ONLY (uses node:fs). Do not import from a 'use client' component.
 *
 * Renders a photograph if the file exists, and a branded navy→gold gradient
 * panel if it does not — so the site is fully image-ready before a single photo
 * has been sourced, and never shows a broken-image icon.
 *
 * Always fills its parent, which must be `relative` with a height or aspect
 * ratio of its own.
 */

const exists = (publicPath: string) => {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
};

/**
 * A tiny navy blur placeholder. Inlined as a data URI so it costs no request
 * and prevents the layout flashing white before a photo decodes.
 */
const NAVY_BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="#0B1F4E"/></svg>`,
  ).toString("base64");

export function SmartImage({
  slot,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  /** Darkens the photo so overlaid text keeps its contrast. */
  overlay = "none",
  blur = false,
}: {
  slot: ImageSlot;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** "none" | "soft" (cards) | "strong" (text sits directly on top). */
  overlay?: "none" | "soft" | "strong";
  blur?: boolean;
}) {
  const has = exists(slot.src);

  return (
    <span className={cn("absolute inset-0 overflow-hidden", className)}>
      {has ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          {...(blur ? { placeholder: "blur" as const, blurDataURL: NAVY_BLUR } : {})}
        />
      ) : (
        /* Branded stand-in. Reads as a deliberate panel, not a failure. */
        <span
          aria-hidden
          className="absolute inset-0 bg-navy-gradient"
        >
          <span className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-40" />
          <span className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        </span>
      )}

      {/* Contrast guard over photography. Skipped for the fallback panel,
          which is already dark enough for white text on its own. */}
      {has && overlay !== "none" && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0",
            overlay === "strong"
              ? "bg-navy/70"
              : "bg-gradient-to-t from-navy/80 via-navy/30 to-transparent",
          )}
        />
      )}
    </span>
  );
}
