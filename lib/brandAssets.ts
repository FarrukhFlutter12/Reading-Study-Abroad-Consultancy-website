import fs from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

/**
 * SERVER-ONLY. Do not import this from a component marked 'use client' —
 * node:fs does not exist in the browser bundle and the build will fail.
 * Server components may import it directly; client components (Header,
 * MobileNav) receive the result as a prop from app/layout.tsx.
 *
 * Resolves each logo role to a real file, reading the PNG's true dimensions so
 * next/image never has to guess an aspect ratio and never stretches the mark.
 * If a file is missing the role resolves to null and the caller falls back to
 * the text lockup, so the site can never render a broken image.
 *
 * Evaluated once during `next build` (all pages are static), so there is no
 * per-request filesystem cost.
 */

const publicFile = (p: string) => path.join(process.cwd(), "public", p);

/**
 * Reads a PNG's real pixel dimensions straight from the IHDR chunk.
 *
 * The PNG spec puts width and height as big-endian uint32s at byte offsets 16
 * and 20, so a 24-byte read is enough — no image library, and this project
 * takes no extra dependencies.
 */
function readPngSize(absPath: string): { width: number; height: number } | null {
  let fd: number | null = null;
  try {
    fd = fs.openSync(absPath, "r");
    const buf = Buffer.alloc(24);
    if (fs.readSync(fd, buf, 0, 24, 0) < 24) return null;

    const isPng =
      buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
    if (!isPng) return null;

    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return width && height ? { width, height } : null;
  } catch {
    return null;
  } finally {
    if (fd !== null) {
      try {
        fs.closeSync(fd);
      } catch {
        /* ignore */
      }
    }
  }
}

export type LogoAsset = {
  src: string;
  width: number;
  height: number;
};

function load(publicPath: string): LogoAsset | null {
  const abs = publicFile(publicPath);
  if (!fs.existsSync(abs)) return null;

  // Non-PNG artwork (e.g. an SVG) has no header to parse; fall back to a
  // sensible intrinsic size and let CSS drive the rendered dimensions.
  const size = readPngSize(abs) ?? { width: 320, height: 96 };
  return { src: publicPath, width: size.width, height: size.height };
}

/**
 * Logo roles, keyed by the background they belong on.
 *
 * There is no colour-inversion fallback any more: the client supplied a genuine
 * reversed (all-gold) lockup, so dark surfaces use real artwork rather than a
 * CSS filter.
 */
export type BrandAssets = {
  /** Wide lockup for light/cream/gold backgrounds. */
  onLight: LogoAsset | null;
  /** Wide lockup for navy backgrounds. */
  onDark: LogoAsset | null;
  /** Stacked lockup, for surfaces with vertical room (footer). */
  stackedOnLight: LogoAsset | null;
  stackedOnDark: LogoAsset | null;
  /** Icon mark only — colour. */
  mark: LogoAsset | null;
  /** Icon mark only — gold, for navy backgrounds. */
  markOnDark: LogoAsset | null;
};

export function getBrandAssets(): BrandAssets {
  return {
    onLight: load(site.logo.onLight),
    onDark: load(site.logo.onDark),
    stackedOnLight: load(site.logo.stackedOnLight),
    stackedOnDark: load(site.logo.stackedOnDark),
    mark: load(site.logo.mark),
    markOnDark: load(site.logo.markOnDark),
  };
}
