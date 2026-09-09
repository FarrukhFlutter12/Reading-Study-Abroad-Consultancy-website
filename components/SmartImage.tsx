import Image from "next/image";
import type { ImageSlot } from "@/data/images";
import { resolveImage } from "@/data/imageManifest";
import { blurData } from "@/data/blurData";
import { cn } from "@/lib/utils";

/**
 * Renders a photograph if the file exists, and a branded purple→gold panel if
 * it does not — so the site is fully image-ready before a single photo has been
 * sourced, and never shows a broken-image icon.
 *
 * Works in BOTH server and client components: file presence comes from
 * data/imageManifest.ts, which is generated at build time, so there is no
 * filesystem access here. That is what unblocks the destination cards, which
 * render inside the "use client" StoryExplorer tree.
 *
 * Always fills its parent, which must be `relative` with its own height or
 * aspect ratio.
 */

/**
 * Fallback blur used before a photo has its own generated placeholder.
 * Real per-image blurs live in data/blurData.ts, produced by the fetch script
 * from the actual photograph, so the fade-in matches the picture rather than
 * flashing a flat colour.
 */
const BRAND_BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="#24044C"/></svg>`,
  ).toString("base64");

export function SmartImage({
  slot,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
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
  // The real file may have a different extension than the slot name — the
  // pipeline writes .webp, a hand-supplied file might be .jpg.
  const resolved = resolveImage(slot.src);
  const has = resolved !== null;

  return (
    <span className={cn("absolute inset-0 overflow-hidden", className)}>
      {has ? (
        <Image
          src={resolved}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          {...(blur
            ? {
                placeholder: "blur" as const,
                blurDataURL: blurData[slot.src] ?? BRAND_BLUR,
              }
            : {})}
        />
      ) : (
        /* Branded stand-in. Reads as a deliberate panel, not a failure. */
        <span aria-hidden className="absolute inset-0 bg-brand-gradient">
          <span className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-40" />
          <span className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        </span>
      )}

      {/* Contrast guard over photography. Skipped for the fallback panel, which
          is already dark enough for white text on its own. */}
      {has && overlay !== "none" && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0",
            overlay === "strong"
              ? "bg-brand/70"
              : "bg-gradient-to-t from-brand/80 via-brand/30 to-transparent",
          )}
        />
      )}
    </span>
  );
}
