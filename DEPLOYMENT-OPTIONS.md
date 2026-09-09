# Deployment Options

No config has been changed yet — this is a comparison to support a decision.
Whichever option is picked, apply its config changes as a separate step.

The codebase was checked directly (not assumed) for anything that would break
under a static export. Two things matter:

1. **`app/opengraph-image.tsx`** sets `export const runtime = "edge"` and, at
   request time, does a `fetch()` back to `https://readingstudyabroad.pk` to
   check whether the logo mark exists before drawing it. Edge runtime and
   request-time `fetch` both require a server. `output: 'export'` has neither
   — Next.js refuses to build a route that sets `runtime = "edge"` when
   `output: 'export'` is set. **This route cannot ship as-is under Option A.**
2. Everything else is already static: every page under `app/` exports
   `dynamic = "force-static"`, the three dynamic routes
   (`destinations/[slug]`, `services/[slug]`, `blog/[slug]`) use
   `generateStaticParams()`, `app/sitemap.ts` and `app/robots.ts` both compile
   to static files, and there is no `middleware.ts`, no `app/api/*`, and no
   use of `cookies()`/`headers()` anywhere. Forms already call Web3Forms
   directly from the browser (`lib/submitForm.ts`) — they never touch a
   Next.js server, so they're identical under both options.

---

## Option A — Static export (WebSouls or any shared cPanel hosting)

**What changes in `next.config.js`:**

```js
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,   // no server to run the optimizer — see below
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline';",
  },
};
```

**What breaks, and what has to happen instead:**

- **`app/opengraph-image.tsx` must be removed or rewritten.** As it stands
  (edge runtime + a live fetch), it will fail the export build. The practical
  fix is to replace it with one static PNG generated once and referenced from
  `lib/seo.ts` — same visual result, just not regenerated per-page. This is a
  real code change, not a config flag; budget ~30 minutes for it before
  exporting.
- **`next/image` optimization stops.** `unoptimized: true` means the browser
  gets exactly the file that's in `/public/images` — no automatic AVIF/WebP
  re-encoding, no responsive resizing per device. This is exactly why the
  destination-hero size-budget work in this session mattered: every
  photographic slot is already a hand-sized WebP under its KB budget
  (150KB/80KB), so visitors get a reasonably small file regardless. `sizes`
  and `fill` still work for layout; they just don't trigger server-side
  resizing.
- **Anything dynamic still won't work** — but there isn't anything dynamic
  left in this codebase to worry about (see the check above).

**What stays exactly the same:**

- Forms — Web3Forms is called from the browser with `fetch()`, no Next.js
  server involved either way.
- All copy, layout, animations, `isReady()` content-hiding logic — none of
  this touches the server.

**Build command and output:**

```bash
npm run build
```

With `output: "export"` set, this produces static HTML/CSS/JS in **`out/`**
instead of `.next/`. `next start` no longer applies — there is no server to
run.

**Uploading to cPanel:**

1. Run `npm run build` locally (or in a CI step) with `output: "export"` set.
2. Zip the contents of `out/` (not the folder itself — its contents).
3. In cPanel → File Manager, upload and extract into `public_html/` (or the
   subfolder mapped to the domain).
4. Confirm `.htaccess` isn't needed for routing — Next's static export writes
   real `.html` files per route (e.g. `destinations/turkey.html` alongside a
   `destinations/turkey/` redirect setup), which plain Apache serves natively.
5. Point the domain's DNS/nameservers at the WebSouls hosting if not already
   done; no Node.js app needs to be configured in cPanel — this is a plain
   static site.

---

## Option B — Node.js runtime (Netlify free tier)

**What changes:** nothing in `next.config.js`. The current config (server
rendering + `next/image` optimization + the edge-runtime OG route) works as-is
— Netlify runs Next.js through its own adapter (`@netlify/plugin-nextjs`,
installed automatically when Netlify detects a Next.js project).

**Netlify settings:**

- Build command: `npm run build`
- Publish directory: leave as Netlify's Next.js plugin default (it manages
  this itself — do not point it at `.next` manually)
- Connect the GitHub repo directly (`FarrukhFlutter12/Reading-Study-Abroad-Consultancy-website`)
  so every push to `main` redeploys automatically
- No environment variables are required for the build itself, but
  `NEXT_PUBLIC_WEB3FORMS_KEY` must be set in Netlify's site settings
  (Site configuration → Environment variables) **before the first deploy** —
  this value gets baked into the client bundle at build time, so adding it
  later requires a redeploy, not just a settings save.
- The edge-runtime OG image route works unmodified — Netlify supports Next.js
  edge functions natively.

**Trade-off vs Option A:** Netlify's free tier has bandwidth/build-minute
caps that a shared cPanel plan doesn't. For a low-traffic lead-gen site
neither is likely to bind in practice, but it's the one caveat worth knowing
before choosing "free forever" over "the hosting WebSouls already sells."

---

## Recommendation

If WebSouls hosting is already paid for or preferred for support reasons,
Option A is fine — the codebase has almost nothing that depends on a server;
the only real work is swapping the OG image route for a static PNG. If there's
no reason to prefer cPanel specifically, Option B ships today with zero code
changes.
