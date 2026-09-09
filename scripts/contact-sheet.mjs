/**
 * Builds one contact sheet of every image in /public/images, so a human can
 * review the whole set at a glance.
 *
 *   npm run images:sheet            # everything
 *   npm run images:sheet -- sections   # only paths containing "sections"
 *
 * WHY THIS MATTERS
 * The Pexels fetcher filters candidates on their alt TEXT. It cannot see what
 * is actually inside the frame — a university crest on a banner, a readable
 * logo, a sign in the background. Those are exactly the things that create
 * legal exposure for the client, and only a person looking at the pictures will
 * catch them. Run this before every launch.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES = path.join(ROOT, "public", "images");
const FILTER = process.argv[2] ?? "";
const OUT = path.join(ROOT, "image-review.png");

const files = [];
(function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(webp|avif|jpe?g|png)$/i.test(entry.name) && p.includes(FILTER))
      files.push(p);
  }
})(IMAGES);

if (!files.length) {
  console.log("No images found. Run `npm run images:fetch` first.");
  process.exit(0);
}

files.sort();

const COLS = 5;
const W = 320;
const H = 200;
const rows = Math.ceil(files.length / COLS);

const tiles = await Promise.all(
  files.map(async (f, i) => ({
    input: await sharp(f).resize(W, H, { fit: "cover" }).png().toBuffer(),
    left: (i % COLS) * W,
    top: Math.floor(i / COLS) * H,
  })),
);

await sharp({
  create: {
    width: COLS * W,
    height: rows * H,
    channels: 3,
    background: { r: 36, g: 4, b: 76 },
  },
})
  .composite(tiles)
  .png()
  .toFile(OUT);

console.log(`${files.length} images → ${path.relative(ROOT, OUT)}  (${COLS} per row)\n`);
files.forEach((f, i) =>
  console.log(
    `  ${String(i + 1).padStart(2)}. ${path.relative(path.join(ROOT, "public"), f)}`,
  ),
);
console.log(
  "\nCheck every frame for: university crests or signage, readable text or logos,\n" +
    "and whether the people shown suit a Pakistani student audience.",
);
