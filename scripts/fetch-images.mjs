/**
 * Fills every photographic slot from the Pexels API.
 *   npm run images:fetch
 *
 * Pexels is used rather than Unsplash because Unsplash's demo tier caps at
 * 50 requests/hour, which stalls part-way through 30 slots. Both licences allow
 * commercial use with no attribution.
 *
 * DETERMINISTIC BY DESIGN
 * Candidates are ranked, never picked at random, and the winning photo id is
 * written to scripts/images.lock.json. Re-running reuses the locked id, so the
 * build is reproducible and a second run does not silently reshuffle the site's
 * photography. Delete an entry from the lockfile to re-pick that one slot.
 *
 * Requires `sharp` (devDependency — it never ships to the browser bundle).
 */

import fs from "node:fs";
import path from "node:path";
import {
  ALL_SLOTS,
  NEVER_AUTOFILL,
  REJECT_WORDS,
  PREFER_WORDS,
  EXCLUDE_IDS,
} from "./imageQueries.mjs";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const LOCK = path.join(ROOT, "scripts", "images.lock.json");
const BLUR_OUT = path.join(ROOT, "data", "blurData.ts");

/* --------------------------------------------------------------- env key */

function readEnvKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  try {
    const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8");
    const m = env.match(/^\s*PEXELS_API_KEY\s*=\s*(.+)\s*$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    /* no .env.local */
  }
  return "";
}

const API_KEY = readEnvKey();

if (!API_KEY) {
  console.error(`
────────────────────────────────────────────────────────────────────
  PEXELS_API_KEY is not set — no images were downloaded.

  This is not an error in the code. The pipeline needs a free API key:

    1. Go to  https://www.pexels.com/api/
    2. Sign up (free) and copy your API key
    3. Add it to .env.local:

         PEXELS_API_KEY=your_key_here

    4. Run  npm run images:fetch  again

  Nothing was written and nothing was faked. Until real photographs are
  supplied, every slot renders the branded purple-gold panel, which is a
  deliberate design state — not a broken one.
────────────────────────────────────────────────────────────────────
`);
  process.exit(1);
}

/* ----------------------------------------------------------------- sharp */

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error(
    "sharp is not installed. Run:  npm i -D sharp\n" +
      "It is a devDependency only and never ships to the browser bundle.",
  );
  process.exit(1);
}

/* ------------------------------------------------------------- lockfile */

const lock = fs.existsSync(LOCK)
  ? JSON.parse(fs.readFileSync(LOCK, "utf8"))
  : {};

/* --------------------------------------------------------------- picking */

/**
 * Ranks candidates so the same photo wins every time:
 *   1. must meet the required resolution
 *   2. closest aspect ratio to the target
 *   3. casting and quality signals from the alt text
 *   4. lowest photo id, as a final deterministic tie-break
 */
function pickBest(photos, slot) {
  const targetAspect = slot.width / slot.height;

  const scored = photos
    .filter((p) => !EXCLUDE_IDS.has(p.id))
    .filter((p) => p.width >= slot.width && p.height >= slot.height)
    .map((p) => {
      const alt = (p.alt || "").toLowerCase();
      const rejected = REJECT_WORDS.some((w) => alt.includes(w));
      const preferred = PREFER_WORDS.filter((w) => alt.includes(w)).length;
      const aspectDelta = Math.abs(p.width / p.height - targetAspect);
      return { photo: p, rejected, preferred, aspectDelta };
    })
    .filter((c) => !c.rejected);

  if (!scored.length) return null;

  scored.sort(
    (a, b) =>
      b.preferred - a.preferred ||
      a.aspectDelta - b.aspectDelta ||
      a.photo.id - b.photo.id,
  );

  return scored[0].photo;
}

async function searchPexels(query, orientation) {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", "15");

  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (res.status === 429) throw new Error("rate limited by Pexels — try again later");
  if (!res.ok) throw new Error(`Pexels ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.photos ?? [];
}

async function fetchPhotoById(id) {
  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: { Authorization: API_KEY },
  });
  if (!res.ok) return null;
  return res.json();
}

/* -------------------------------------------------------------- encoding */

/**
 * Cover-crops to the exact target size and encodes to WebP, stepping quality
 * down until the file fits its budget. Never letterboxes, never stretches.
 */
async function encodeToBudget(buffer, slot) {
  for (let quality = 80; quality >= 60; quality -= 5) {
    const out = await sharp(buffer)
      .resize(slot.width, slot.height, { fit: "cover", position: "attention" })
      .webp({ quality })
      .toBuffer();
    if (out.length <= slot.maxKb * 1024 || quality === 60) {
      return { out, quality };
    }
  }
  return null;
}

async function makeBlur(buffer) {
  const tiny = await sharp(buffer).resize(10).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${tiny.toString("base64")}`;
}

/* ------------------------------------------------------------------ main */

const rows = [];
const blurs = {};
const skipped = [];

for (const slot of ALL_SLOTS) {
  const reason = NEVER_AUTOFILL[slot.src];
  if (reason || !slot.query) {
    skipped.push([slot.src, reason ?? "no query — client photo required"]);
    continue;
  }

  // Written as .webp regardless of the slot's nominal .jpg name; the build
  // manifest resolves whichever extension is actually on disk.
  const abs = path.join(PUB, slot.src.replace(/\.[a-z0-9]+$/i, ".webp"));
  process.stdout.write(`  ${slot.src.padEnd(44)} `);

  try {
    let photo = null;

    // A locked pick that has since been rejected in review must be re-picked.
    if (lock[slot.src]?.id && EXCLUDE_IDS.has(lock[slot.src].id)) {
      delete lock[slot.src];
    }

    if (lock[slot.src]?.id) {
      photo = await fetchPhotoById(lock[slot.src].id);
      if (photo) process.stdout.write("(locked) ");
    }

    if (!photo) {
      const candidates = await searchPexels(slot.query, slot.orientation);
      photo = pickBest(candidates, slot);
      if (!photo) {
        console.log("no candidate met the resolution/quality bar — SKIPPED");
        skipped.push([slot.src, `no Pexels result matched "${slot.query}"`]);
        continue;
      }
    }

    const imgRes = await fetch(photo.src.original);
    if (!imgRes.ok) throw new Error(`download ${imgRes.status}`);
    const raw = Buffer.from(await imgRes.arrayBuffer());

    const encoded = await encodeToBudget(raw, slot);
    if (!encoded) throw new Error("could not meet size budget");

    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, encoded.out);

    blurs[slot.src] = await makeBlur(raw);
    lock[slot.src] = {
      id: photo.id,
      photographer: photo.photographer,
      url: photo.url,
      query: slot.query,
    };

    const kb = (encoded.out.length / 1024).toFixed(1);
    rows.push([
      slot.src,
      slot.query,
      photo.id,
      `${slot.width}x${slot.height}`,
      `${kb} KB`,
      `q${encoded.quality}`,
    ]);
    console.log(`ok  id=${photo.id}  ${kb} KB  q${encoded.quality}`);
  } catch (err) {
    console.log(`FAILED — ${err.message}`);
    skipped.push([slot.src, err.message]);
  }
}

/* --------------------------------------------------------------- outputs */

fs.writeFileSync(LOCK, JSON.stringify(lock, null, 2) + "\n", "utf8");

const blurBody = `// GENERATED FILE — do not edit by hand.
// Regenerate with: npm run images:fetch

export const blurData: Record<string, string> = {
${Object.entries(blurs)
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
  .join("\n")}
};
`;
fs.writeFileSync(BLUR_OUT, blurBody, "utf8");

console.log("\n" + "─".repeat(100));
console.log(
  ["SLOT", "QUERY", "PEXELS ID", "SIZE", "FILE", "Q"]
    .map((h, i) => h.padEnd([44, 40, 11, 11, 10, 4][i]))
    .join(""),
);
console.log("─".repeat(100));
for (const r of rows) {
  console.log(
    r.map((c, i) => String(c).padEnd([44, 40, 11, 11, 10, 4][i])).join(""),
  );
}

if (skipped.length) {
  console.log("\nSKIPPED (deliberately or unmatched):");
  for (const [src, why] of skipped) console.log(`  ${src.padEnd(44)} ${why}`);
}

console.log(
  `\n${rows.length} downloaded, ${skipped.length} skipped.`,
  "\nRun `npm run images:manifest` then `npm run images:doc` to refresh the checklist.",
);
