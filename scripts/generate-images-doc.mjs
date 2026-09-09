/**
 * Regenerates IMAGES-NEEDED.md.  Run:  npm run images:doc
 *
 * Queries and skip rules come from scripts/imageQueries.mjs — the same module
 * the Pexels fetcher uses — so the checklist a human reads and the queries the
 * pipeline runs can never drift apart.
 */

import fs from "node:fs";
import path from "node:path";
import { CORE_SLOTS, DESTINATION_SLOTS } from "./imageQueries.mjs";

const ROOT = process.cwd();

/* Queries and skip rules come from scripts/imageQueries.mjs — the same source
   the fetcher uses, so this checklist can never drift from what it downloads. */
const fixed = CORE_SLOTS.map((s) => ({
  src: s.src,
  size: `${s.width}×${s.height}`,
  maxKb: s.maxKb,
  query: s.query ?? "— CLIENT PHOTO, do not use stock —",
  brief: s.note,
}));

const destinationRows = DESTINATION_SLOTS.map((s) => ({
  src: s.src,
  size: `${s.width}×${s.height}`,
  maxKb: s.maxKb,
  query: s.query,
  note: s.note,
}));

/* Files land as .webp from the pipeline but are listed here with their .jpg
   slot name, so resolve the extension exactly as the build manifest does. */
const EXTENSIONS = [".webp", ".avif", ".jpg", ".jpeg", ".png"];
const exists = (p) => {
  const base = p.replace(/\.[a-z0-9]+$/i, "");
  return EXTENSIONS.some((ext) =>
    fs.existsSync(path.join(ROOT, "public", base + ext)),
  );
};
const tick = (p) => (exists(p) ? "✅" : "⬜");

const lines = [];
lines.push("# Images Needed");
lines.push("");
lines.push(
  "Every slot below is already wired into the code. Until a file exists the site",
  "renders a branded purple→gold panel in its place — nothing looks broken, so",
  "there is no rush and no half-finished state. Drop a file in at the exact path",
  "and it appears on the next deploy, with no code change.",
);
lines.push("");
lines.push("> Regenerate this file with `node scripts/generate-images-doc.mjs`.");
lines.push("");
lines.push("---");
lines.push("");
lines.push("## Sourcing rules");
lines.push("");
lines.push("**Use only these two sources.** Both allow commercial use with no attribution:");
lines.push("");
lines.push("- Unsplash — <https://unsplash.com>");
lines.push("- Pexels — <https://pexels.com>");
lines.push("");
lines.push("**Never use** Getty, Shutterstock, Freepik, or anything found through Google");
lines.push("Images. These carry licence risk that lands on the client, not the designer.");
lines.push("");
lines.push("### Four hard rules");
lines.push("");
lines.push(
  "1. **Download the file — never paste a link.** An external URL breaks when the",
  "   source deletes the image, and leaks your visitors' referrer data.",
);
lines.push(
  "2. **No university logos, crests or branded signage.** Showing a university's",
  "   mark implies an official partnership. Until written proof of partnership",
  "   exists, campus photography must be generic.",
);
lines.push(
  "3. **No stock faces on success stories.** A stock portrait beside a student",
  "   testimonial is misrepresentation. Use a real photo with written consent, or",
  "   an initial-letter avatar.",
);
lines.push(
  "4. **Cast for the audience.** This consultancy serves Pakistani students.",
  "   Prefer South Asian and visibly diverse students — a hero full of only",
  "   Northern-European faces reads as a template and costs you enquiries.",
);
lines.push("");
lines.push("---");
lines.push("");
lines.push("## Optimisation — do this before adding any file");
lines.push("");
lines.push("Pakistani students are mostly on 3G/4G with data caps. A 4 MB hero will cost");
lines.push("you more enquiries than a mediocre photo will.");
lines.push("");
lines.push("1. Resize to the dimensions in the table — no larger.");
lines.push("2. Convert to WebP at quality 80 (<https://squoosh.app>, free, in-browser).");
lines.push("3. Check it against the size budget below.");
lines.push("4. Save into the folder shown. The extension does not have to match —");
lines.push("   `.webp`, `.jpg` and `.png` are all picked up automatically.");
lines.push("");
lines.push("Next.js re-encodes to AVIF/WebP and serves the right size per device, so the");
lines.push("budget is about the source file, not what the visitor downloads.");
lines.push("");
lines.push("---");
lines.push("");
lines.push("## Core images");
lines.push("");
lines.push("| ✓ | File | Size | Max | Search query | What makes a good pick |");
lines.push("|---|---|---|---|---|---|");
for (const s of fixed) {
  const q = s.query;
  lines.push(
    `| ${tick(s.src)} | \`${s.src}\` | ${s.size} | ${s.maxKb} KB | \`${q}\` | ${s.brief} |`,
  );
}
lines.push("");
lines.push("---");
lines.push("");
lines.push("## Destination images");
lines.push("");
lines.push("Two per country: a wide hero and a tighter card crop.");
lines.push("");
lines.push("| ✓ | File | Size | Max | Search query | Note |");
lines.push("|---|---|---|---|---|---|");
for (const d of destinationRows) {
  lines.push(
    `| ${tick(d.src)} | \`${d.src}\` | ${d.size} | ${d.maxKb} KB | \`${d.query}\` | ${d.note} |`,
  );
}
lines.push("");
lines.push("---");
lines.push("");
lines.push("## Where photography must NOT go");
lines.push("");
lines.push("These surfaces need clean brand purple or white behind them. Photography here");
lines.push("reduces readability and costs conversions:");
lines.push("");
lines.push("- Form panels (contact, apply, free assessment)");
lines.push("- The FAQ accordion");
lines.push("- The six-step process timeline");
lines.push("- The stats band");
lines.push("");
lines.push("---");
lines.push("");
const done = [...fixed.map((s) => s.src), ...destinationRows.map((d) => d.src)].filter(exists).length;
const total = fixed.length + destinationRows.length;
lines.push(`**Progress: ${done} / ${total} images supplied.**`);
lines.push("");

fs.writeFileSync(path.join(ROOT, "IMAGES-NEEDED.md"), lines.join("\n"), "utf8");
console.log(`IMAGES-NEEDED.md written — ${total} slots, ${done} supplied.`);
