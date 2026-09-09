/**
 * Pre-computes which image files actually exist, into data/imageManifest.ts.
 * Runs automatically before every build (see the `prebuild` npm script).
 *
 * WHY A MANIFEST INSTEAD OF A SERVER/CLIENT SPLIT
 * SmartImage originally called node:fs to check for a file, which meant it
 * could only be used from server components — that blocked the destination
 * cards, because Cards.tsx is imported by the "use client" StoryExplorer.
 * Baking the lookup into a plain object at build time removes the problem
 * entirely: no fs in any component, and SmartImage works on both sides.
 *
 * WHY IT RESOLVES EXTENSIONS
 * data/images.ts names every slot with a .jpg path, but the Pexels pipeline
 * writes .webp (smaller, and what we actually want to serve). A human following
 * IMAGES-NEEDED.md might drop in a .jpg or .png by hand instead. So rather than
 * matching on the exact filename, each slot resolves to whichever supported
 * file is actually present — and the manifest records that real path.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const OUT = path.join(ROOT, "data", "imageManifest.ts");

/** Checked in order — WebP wins when several exist, because it is smallest. */
const EXTENSIONS = [".webp", ".avif", ".jpg", ".jpeg", ".png"];

/** Every path referenced by data/images.ts, read straight from the source. */
function collectSlotPaths() {
  const src = fs.readFileSync(path.join(ROOT, "data", "images.ts"), "utf8");
  const paths = new Set();

  // Literal paths: src: "/images/…"
  for (const m of src.matchAll(/src:\s*"(\/images\/[^"]+)"/g)) paths.add(m[1]);

  // Templated destination paths: src: `/images/destinations/${slug}.jpg`
  const slugs = [...src.matchAll(/dest\("([a-z-]+)"/g)].map((m) => m[1]);
  for (const slug of slugs) {
    paths.add(`/images/destinations/${slug}.jpg`);
    paths.add(`/images/destinations/${slug}-card.jpg`);
  }

  return [...paths].sort();
}

/** Returns the public path of whichever file is really there, or null. */
function resolve(slotPath) {
  const withoutExt = slotPath.replace(/\.[a-z0-9]+$/i, "");
  for (const ext of EXTENSIONS) {
    const candidate = withoutExt + ext;
    if (fs.existsSync(path.join(PUB, candidate))) return candidate;
  }
  return null;
}

const entries = collectSlotPaths().map((p) => [p, resolve(p)]);
const found = entries.filter(([, r]) => r).length;

const body = `// GENERATED FILE — do not edit by hand.
// Regenerate with: npm run images:manifest  (runs automatically on prebuild)
//
// Maps every photographic slot to the file that is actually present in /public,
// or null when none is. SmartImage reads this instead of touching the
// filesystem, so it works in both server and client components.
//
// The value may differ from the key's extension: the Pexels pipeline writes
// .webp, while a hand-supplied file might be .jpg.

export const imageManifest: Record<string, string | null> = {
${entries.map(([p, r]) => `  ${JSON.stringify(p)}: ${r ? JSON.stringify(r) : "null"},`).join("\n")}
};

/** The real file to render for this slot, or null if it has not been supplied. */
export function resolveImage(src: string): string | null {
  return imageManifest[src] ?? null;
}
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, body, "utf8");

console.log(
  `data/imageManifest.ts written — ${found}/${entries.length} image files present.`,
);
