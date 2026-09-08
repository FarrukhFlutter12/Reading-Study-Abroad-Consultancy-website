/**
 * Logo asset generator — run with:  node scripts/generate-icons.mjs
 *
 * WHY THIS EXISTS
 * The client supplied three square PNGs (logo.png, logo1.png, logo2.png), each
 * with a solid baked-in background and no alpha channel. Used as-is they render
 * as coloured squares that clash with whatever sits behind them, and the stacked
 * 1:1 lockup makes the wordmark illegible at header height.
 *
 * This script derives every asset the site actually needs:
 *   - transparent versions (background keyed out, edges feathered)
 *   - a horizontal lockup (mark beside wordmark) that stays legible in a header
 *   - an icon-only mark, plus favicon / app icons
 *
 * `sharp` is not a dependency of this project and the brief forbids adding one,
 * so this is a self-contained PNG codec built on Node's stdlib `zlib`.
 * Re-run it any time the client sends new artwork.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const APP = path.join(ROOT, "app");
// Original client artwork lives outside /public so the 3 MB of unused source
// files are never served to browsers. Only the derived assets ship.
const SRC = path.join(ROOT, "brand-source");

/* Brand constants — sampled from the supplied artwork, not guessed. */
const BRAND = {
  purple: [0x24, 0x04, 0x4c], // logo artwork / logo1 background
  gold: [0xfc, 0xac, 0x04], // logo2 background
  nearWhite: [0xfc, 0xfc, 0xfc], // logo background
  siteNavy: [0x0b, 0x1f, 0x4e], // tailwind navy.DEFAULT
};

/* ------------------------------------------------------------ PNG decode */

function readPng(file) {
  const buf = fs.readFileSync(file);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error(`not a PNG: ${file}`);

  let pos = 8;
  let ihdr = null;
  const idat = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") break;
    pos += 12 + len;
  }

  if (!ihdr) throw new Error(`no IHDR: ${file}`);
  if (ihdr.bitDepth !== 8) throw new Error(`only 8-bit PNGs supported: ${file}`);
  if (ihdr.interlace !== 0) throw new Error(`interlaced PNG unsupported: ${file}`);

  const CH = { 0: 1, 2: 3, 4: 2, 6: 4 }[ihdr.colorType];
  if (!CH) throw new Error(`unsupported colorType ${ihdr.colorType}: ${file}`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const { width: w, height: h } = ihdr;
  const stride = w * CH;
  const px = Buffer.alloc(w * h * 4);
  let prev = Buffer.alloc(stride);
  const cur = Buffer.alloc(stride);
  let rp = 0;

  for (let y = 0; y < h; y++) {
    const filter = raw[rp++];
    raw.copy(cur, 0, rp, rp + stride);
    rp += stride;

    for (let i = 0; i < stride; i++) {
      const a = i >= CH ? cur[i - CH] : 0;
      const b = prev[i];
      const c = i >= CH ? prev[i - CH] : 0;
      let x = cur[i];
      if (filter === 1) x += a;
      else if (filter === 2) x += b;
      else if (filter === 3) x += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        x += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[i] = x & 0xff;
    }
    prev = Buffer.from(cur);

    for (let x = 0; x < w; x++) {
      const s = x * CH;
      const d = (y * w + x) * 4;
      if (CH === 3) {
        px[d] = cur[s]; px[d + 1] = cur[s + 1]; px[d + 2] = cur[s + 2]; px[d + 3] = 255;
      } else if (CH === 4) {
        px[d] = cur[s]; px[d + 1] = cur[s + 1]; px[d + 2] = cur[s + 2]; px[d + 3] = cur[s + 3];
      } else if (CH === 1) {
        px[d] = px[d + 1] = px[d + 2] = cur[s]; px[d + 3] = 255;
      } else {
        px[d] = px[d + 1] = px[d + 2] = cur[s]; px[d + 3] = cur[s + 1];
      }
    }
  }

  return { w, h, px };
}

/* ------------------------------------------------------------ PNG encode */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/**
 * Zeroes the colour channels of fully transparent pixels.
 *
 * After keying, invisible pixels still carry the old background colour, which
 * is noise that defeats PNG compression. Flattening them to 0 turns those
 * regions into long uniform runs and roughly halves the file size.
 */
function cleanTransparent({ w, h, px }) {
  const out = Buffer.from(px);
  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    if (out[p + 3] === 0) {
      out[p] = 0; out[p + 1] = 0; out[p + 2] = 0;
    }
  }
  return { w, h, px: out };
}

function encodePng({ w, h, px }) {
  const raw = Buffer.alloc(h * (w * 4 + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter: None
    px.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const writePng = (file, img) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, encodePng(cleanTransparent(img)));
  return fs.statSync(file).size;
};

/* --------------------------------------------------------------- imaging */

/**
 * Turns a solid background into transparency.
 *
 * Uses a soft threshold rather than an exact match so anti-aliased edge pixels
 * fade out instead of leaving a hard fringe. RGB is left untouched — only alpha
 * changes — which keeps the artwork colour intact.
 */
function keyOut({ w, h, px }, bg, t0 = 26, t1 = 96) {
  const out = Buffer.from(px);
  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    const d = Math.max(
      Math.abs(out[p] - bg[0]),
      Math.abs(out[p + 1] - bg[1]),
      Math.abs(out[p + 2] - bg[2]),
    );
    out[p + 3] =
      d <= t0 ? 0 : d >= t1 ? 255 : Math.round((255 * (d - t0)) / (t1 - t0));
  }
  return { w, h, px: out };
}

function bbox({ w, h, px }, min = 8) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (px[(y * w + x) * 4 + 3] > min) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) throw new Error("image is fully transparent after keying");
  return { x0, y0, x1, y1 };
}

function crop({ w, px }, { x0, y0, x1, y1 }) {
  const cw = x1 - x0 + 1;
  const ch = y1 - y0 + 1;
  const out = Buffer.alloc(cw * ch * 4);
  for (let y = 0; y < ch; y++) {
    px.copy(out, y * cw * 4, ((y + y0) * w + x0) * 4, ((y + y0) * w + x0 + cw) * 4);
  }
  return { w: cw, h: ch, px: out };
}

/**
 * Finds the transparent gap separating the stacked icon from the wordmark.
 * Returns the row index to split at, or null when no clean gap exists.
 */
function findGap({ w, h, px }, min = 8) {
  const empty = [];
  for (let y = 0; y < h; y++) {
    let any = false;
    for (let x = 0; x < w; x++) {
      if (px[(y * w + x) * 4 + 3] > min) { any = true; break; }
    }
    empty.push(!any);
  }

  let best = null;
  let run = null;
  for (let y = 0; y <= h; y++) {
    if (y < h && empty[y]) {
      if (!run) run = { start: y, end: y };
      else run.end = y;
    } else if (run) {
      const mid = (run.start + run.end) / 2;
      const len = run.end - run.start + 1;
      // Only consider gaps in the middle band — ignore padding at the edges.
      if (mid > h * 0.3 && mid < h * 0.8 && (!best || len > best.len)) {
        best = { ...run, len, mid };
      }
      run = null;
    }
  }
  return best ? Math.round(best.mid) : null;
}

/** Box-filter resize. Averages in premultiplied alpha to avoid edge halos. */
function resize({ w, h, px }, dw, dh) {
  const out = Buffer.alloc(dw * dh * 4);
  for (let y = 0; y < dh; y++) {
    const sy0 = Math.floor((y * h) / dh);
    const sy1 = Math.max(sy0 + 1, Math.floor(((y + 1) * h) / dh));
    for (let x = 0; x < dw; x++) {
      const sx0 = Math.floor((x * w) / dw);
      const sx1 = Math.max(sx0 + 1, Math.floor(((x + 1) * w) / dw));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          const p = (sy * w + sx) * 4;
          const al = px[p + 3];
          r += px[p] * al; g += px[p + 1] * al; b += px[p + 2] * al;
          a += al; n++;
        }
      }
      const d = (y * dw + x) * 4;
      if (a > 0) {
        out[d] = Math.round(r / a);
        out[d + 1] = Math.round(g / a);
        out[d + 2] = Math.round(b / a);
        out[d + 3] = Math.round(a / n);
      }
    }
  }
  return { w: dw, h: dh, px: out };
}

function blank(w, h, fill = null) {
  const px = Buffer.alloc(w * h * 4);
  if (fill) {
    for (let i = 0; i < w * h; i++) {
      const p = i * 4;
      px[p] = fill[0]; px[p + 1] = fill[1]; px[p + 2] = fill[2]; px[p + 3] = 255;
    }
  }
  return { w, h, px };
}

/** Standard source-over composite. */
function paste(dst, src, ox, oy) {
  for (let y = 0; y < src.h; y++) {
    const dy = y + oy;
    if (dy < 0 || dy >= dst.h) continue;
    for (let x = 0; x < src.w; x++) {
      const dx = x + ox;
      if (dx < 0 || dx >= dst.w) continue;
      const s = (y * src.w + x) * 4;
      const d = (dy * dst.w + dx) * 4;
      const sa = src.px[s + 3] / 255;
      if (sa === 0) continue;
      const da = dst.px[d + 3] / 255;
      const oa = sa + da * (1 - sa);
      for (let c = 0; c < 3; c++) {
        dst.px[d + c] = Math.round(
          (src.px[s + c] * sa + dst.px[d + c] * da * (1 - sa)) / oa,
        );
      }
      dst.px[d + 3] = Math.round(oa * 255);
    }
  }
  return dst;
}

/** Fits `img` inside a square canvas with padding, preserving aspect ratio. */
function squarePad(img, size, padPct = 0.1, bg = null) {
  const inner = Math.round(size * (1 - padPct * 2));
  const scale = Math.min(inner / img.w, inner / img.h);
  const rw = Math.max(1, Math.round(img.w * scale));
  const rh = Math.max(1, Math.round(img.h * scale));
  const canvas = blank(size, size, bg);
  return paste(canvas, resize(img, rw, rh), (size - rw) >> 1, (size - rh) >> 1);
}

/**
 * Builds a wide lockup: mark on the left, wordmark on the right.
 *
 * The supplied artwork stacks them vertically in a 1:1 square, which at header
 * height renders the wordmark far too small to read. Laying them out
 * horizontally keeps the name legible at h-12.
 */
function horizontalLockup(mark, word, H) {
  const markH = H;
  const markW = Math.round((mark.w / mark.h) * markH);
  const wordH = Math.round(H * 0.62);
  const wordW = Math.round((word.w / word.h) * wordH);
  const gap = Math.round(H * 0.16);

  const canvas = blank(markW + gap + wordW, H);
  paste(canvas, resize(mark, markW, markH), 0, 0);
  paste(canvas, resize(word, wordW, wordH), markW + gap, Math.round((H - wordH) / 2));
  return canvas;
}

/** ICO container with an embedded PNG (supported by every browser since IE11). */
function writeIco(file, img) {
  const png = encodePng(cleanTransparent(img));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = img.w >= 256 ? 0 : img.w;
  entry[1] = img.h >= 256 ? 0 : img.h;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  fs.writeFileSync(file, Buffer.concat([header, entry, png]));
  return fs.statSync(file).size;
}

/* ------------------------------------------------------------------ main */

function prepare(sourceFile, bgColour, label) {
  const src = readPng(path.join(SRC, sourceFile));
  const keyed = keyOut(src, bgColour);
  const full = crop(keyed, bbox(keyed));
  const gap = findGap(full);

  if (gap === null) {
    console.warn(`  ! ${label}: no icon/wordmark gap found — using full lockup only`);
    return { full, mark: null, word: null };
  }

  const markRaw = crop(full, { x0: 0, y0: 0, x1: full.w - 1, y1: gap - 1 });
  const wordRaw = crop(full, { x0: 0, y0: gap, x1: full.w - 1, y1: full.h - 1 });
  // Re-crop each half to its own tight bounds.
  const mark = crop(markRaw, bbox(markRaw));
  const word = crop(wordRaw, bbox(wordRaw));

  console.log(
    `  ${label}: lockup ${full.w}x${full.h} → mark ${mark.w}x${mark.h}, wordmark ${word.w}x${word.h}`,
  );
  return { full, mark, word };
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

console.log("Reading source artwork…");
const light = prepare("logo.png", BRAND.nearWhite, "logo.png  (colour on near-white)");
const dark = prepare("logo1.png", BRAND.purple, "logo1.png (gold on purple)");

console.log("\nWriting assets…");
const written = [];
const emit = (file, img) => {
  const size = writePng(file, img);
  written.push([path.relative(ROOT, file), `${img.w}x${img.h}`, kb(size)]);
};

// Wide lockups for the header and drawer.
emit(path.join(PUB, "logo-on-light.png"), horizontalLockup(light.mark, light.word, 200));
emit(path.join(PUB, "logo-on-dark.png"), horizontalLockup(dark.mark, dark.word, 200));

// Stacked lockups, for places with vertical room (footer).
emit(path.join(PUB, "logo-stacked-on-light.png"), resize(light.full, Math.round((light.full.w / light.full.h) * 400), 400));
emit(path.join(PUB, "logo-stacked-on-dark.png"), resize(dark.full, Math.round((dark.full.w / dark.full.h) * 400), 400));

// Icon marks.
emit(path.join(PUB, "logo-mark.png"), squarePad(light.mark, 384, 0.04));
emit(path.join(PUB, "logo-mark-on-dark.png"), squarePad(dark.mark, 384, 0.04));

// App icons. Apple's icon gets a solid navy plate — iOS ignores transparency
// and would otherwise render a black square.
emit(path.join(APP, "icon.png"), squarePad(light.mark, 256, 0.1));
emit(path.join(APP, "apple-icon.png"), squarePad(dark.mark, 180, 0.16, BRAND.siteNavy));

const icoSize = writeIco(path.join(APP, "favicon.ico"), squarePad(dark.mark, 48, 0.12, BRAND.siteNavy));
written.push([path.relative(ROOT, path.join(APP, "favicon.ico")), "48x48", kb(icoSize)]);

console.log("");
for (const [f, dim, size] of written) {
  console.log(`  ${f.padEnd(34)} ${dim.padEnd(10)} ${size}`);
}
console.log("\nDone.");
