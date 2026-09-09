# Reading Study Abroad — Website

Lead-generation website for **Reading Study Abroad**, a study abroad consultancy
in Basharat Market, Phase 03, Hayatabad, Peshawar.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.
Statically generated, deployed free on Vercel, with forms delivered by Web3Forms.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # then paste your Web3Forms key
npm run dev                     # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build — run this before every deploy
npm run start    # serve the production build locally
npm run lint     # ESLint
```

---

## Form Setup (required)

**No form on this site can send anything until this is done.** Until the key
exists, every form shows a polite message asking the visitor to call or WhatsApp
instead — nothing looks broken, but no enquiry reaches the inbox.

### 1. Create the access key

1. Go to <https://web3forms.com>
2. Enter `readingstudyabroad.pk@gmail.com` and click **Create Access Key**
3. Check that inbox — the key arrives by email

### 2. Local development

```bash
cp .env.example .env.local
```

Paste the key into `.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
```

Then **restart the dev server** — Next.js only reads env files at startup. While
the key is missing you will see a red banner across the top of every page in
development; that banner never appears in production.

### 3. Vercel (production)

1. Project → **Settings** → **Environment Variables**
2. Add `NEXT_PUBLIC_WEB3FORMS_KEY`, applied to **Production, Preview and
   Development**
3. **Redeploy.**

> The redeploy is not optional. `NEXT_PUBLIC_*` variables are inlined into the
> JavaScript bundle at build time, so adding the variable does nothing to a
> build that has already shipped.

### 4. Verify it works

Submit the contact form with real details and confirm the email arrives at
`readingstudyabroad.pk@gmail.com`. The subject line tells you which form it came
from — `APPLICATION —`, `FREE ASSESSMENT —`, `CONTACT —`, `QUICK LEAD —` or
`LEAD (Country) —` — so the inbox stays sortable. Hitting Reply in Gmail replies
straight to the student, because every submission sets a reply-to address.

---

## Environment variables

| Variable | Required | Used at | What it does |
|---|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | **Yes** | Build + browser | Delivers form submissions to the office inbox |
| `PEXELS_API_KEY` | No | Local scripts only | Used by `npm run images:fetch` to download site photography. Never read at runtime, never sent to the browser. |

Copy `.env.example` to `.env.local` and fill them in. `.env.local` is gitignored
and must never be committed.

> `NEXT_PUBLIC_*` variables are inlined into the JavaScript bundle at **build**
> time. Changing one in Vercel does nothing until you **redeploy**.

---

## Brand palette

Taken from the client's logo artwork — the logo is the authoritative brand
asset, so the site matches it rather than the other way round.

| Token | Hex | Used for |
|---|---|---|
| `brand` | `#24044C` | Header, hero, primary surfaces |
| `brand-light` | `#38106B` | Hover states, raised surfaces |
| `brand-dark` | `#16032F` | Top bar, footer, deepest sections |
| `gold` | `#FCAC04` | Buttons, accents, the reversed logo |
| `gold-light` | `#FFC94A` | Hover on gold |
| `gold-dark` | `#D48F00` | **Small gold text on light backgrounds** |
| `cream` | `#FDFBF7` | Light section backgrounds |
| `ink` | `#0F172A` | Body copy |

**Contrast rules — these are not preferences:**

- Gold on `brand` passes comfortably. White on `brand` passes easily.
- **Gold text on white fails** below 18px. Use `gold-dark` for small text on
  light surfaces.
- Gold buttons take `brand` text, never white.

Everything lives in `tailwind.config.ts`. No raw hex appears anywhere else in
the codebase except `app/opengraph-image.tsx`, which renders outside Tailwind.
The old pre-logo palette is recorded in a comment at the top of the colour
block, so the change is a single edit to revert.

---

## Scripts

```bash
npm run dev              # local dev server
npm run build            # production build (runs images:manifest first)
npm run start            # serve the production build
npm run lint             # ESLint

npm run logo             # regenerate all logo derivatives from /brand-source
npm run images:fetch     # download + optimise site photography (needs PEXELS_API_KEY)
npm run images:manifest  # refresh which image files exist (automatic on build)
npm run images:doc       # regenerate IMAGES-NEEDED.md
```

### `npm run logo`

Reads the client's original artwork from `/brand-source` and produces every
asset the site uses: transparent lockups for light and dark backgrounds, a
horizontal lockup that stays legible in the header, icon marks, and the
favicon / Apple touch icon.

It is a self-contained PNG codec built on Node's `zlib` — no image library — so
it runs anywhere with no install. Re-run it whenever the client sends new
artwork.

### `npm run images:fetch`

Fills the 31 photographic slots from the Pexels API (free, commercial use, no
attribution required). Needs `PEXELS_API_KEY` in `.env.local`; without it the
script explains how to get one and exits without writing anything.

Picks are **deterministic** — candidates are ranked by resolution, aspect ratio
and casting signals, and the winning photo ID is written to
`scripts/images.lock.json`. Re-running reuses the locked IDs, so the build is
reproducible and photography does not silently reshuffle. Delete an entry from
the lockfile to re-pick that one slot.

Images are cover-cropped to exact dimensions, encoded to WebP, and stepped down
in quality until they fit their size budget (hero ≤ 250KB, section ≤ 150KB,
card ≤ 80KB). Pakistani students are mostly on 3G/4G with data caps.

Three slots are **never** auto-filled — the office exterior (a stock building
would be a lie), success-story portraits (a stock face beside a testimonial is
misrepresentation), and anything university-branded (implies an unproven
partnership). See `CONTENT-NEEDED.md`.

---

## Images

`data/images.ts` is the single source of truth for all 31 photographic slots.
`scripts/imageQueries.mjs` holds the search queries and skip rules, shared by
both the fetcher and the checklist generator so they cannot drift apart.

`components/SmartImage.tsx` renders a photo when the file exists and a branded
purple→gold panel when it does not — so the site is fully image-ready before a
single photo is sourced, and never shows a broken image. File presence comes
from `data/imageManifest.ts`, generated at build time, which is why SmartImage
works in both server and client components.

`IMAGES-NEEDED.md` is the working checklist. Regenerate it with
`npm run images:doc`; it re-counts what has been supplied.

**Photography must never go behind** form panels, the FAQ accordion, the process
timeline, or the stats band. Those need clean flat backgrounds to stay readable.

---

## Editing content

**All text lives in `/data`. You do not need to touch any component to change
copy.**

| File | Contains |
|---|---|
| `data/site.ts` | Business name, address, phones, email, socials, hours, stats, logo paths |
| `data/countries.ts` | All ten destinations — intro, highlights, courses, requirements, documents, intakes, FAQs |
| `data/services.ts` | All ten service pages |
| `data/faqs.ts` | Site-wide FAQs, grouped by category |
| `data/posts.ts` | Blog articles |
| `data/process.ts` | The six-step journey, the five USPs, and the "why choose us" cards |
| `data/testimonials.ts` | Student stories — **empty until you have written consent** |
| `data/universities.ts` | Partner universities — empty until verified |
| `data/team.ts` | Team members, office photos, mission, vision, values |
| `data/nav.ts` | Menu structure |

After editing, run `npm run build` to confirm nothing broke, then push.

### The `REPLACE_ME` rule

Any value still set to `REPLACE_ME` is **hidden at render time** rather than
printed. That means missing content never leaks onto the live site — it just
does not appear. See `CONTENT-NEEDED.md` for the full checklist.

The guard is `isReady()` in `lib/utils.ts`. If you add a new optional field,
wrap its usage in `isReady(value) && ...`.

### Adding a blog post

Open `data/posts.ts` and copy an existing object. Body content is a list of
blocks:

```ts
{ type: "h2", text: "A heading" }
{ type: "p", text: "A paragraph." }
{ type: "ul", items: ["First", "Second"] }
{ type: "ol", items: ["Step one", "Step two"] }
{ type: "callout", title: "Note", text: "Highlighted box." }
```

The post appears on `/blog`, gets its own page, and is added to the sitemap
automatically.

### Adding a destination

Add an object to `countries` in `data/countries.ts` following the existing
shape, and drop a flag SVG into `public/flags/<slug>.svg`. The new country
appears in the navigation, footer, home grid, forms and sitemap automatically.

---

## Content rules — please read before editing

These are not stylistic preferences; they exist to keep the business out of
trouble.

1. **Never publish specific figures.** No tuition amounts, visa fees, bank
   balance thresholds, processing times or post-study work durations. They
   change every intake, and an out-of-date figure on your website is a problem.
   Route specifics to a counselling CTA instead.
2. **Never guarantee an outcome.** No "guaranteed visa", "100% success",
   "assured admission". Admission and visa decisions belong to universities and
   embassies.
3. **Never invent social proof.** No made-up student counts, success rates,
   testimonials or university partnerships.
4. **Written consent before publishing any student.** Name, photo or story.

The footer disclaimer (`data/site.ts` → `disclaimer`) appears on every page.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to <https://vercel.com> → **Add New → Project** → import the repo.
3. Vercel detects Next.js automatically — no build settings to change.
4. Before the first deploy, add the environment variable:
   **Settings → Environment Variables** → `NEXT_PUBLIC_WEB3FORMS_KEY`, applied
   to Production, Preview and Development.
5. Deploy.
6. **Settings → Domains** → add `readingstudyabroad.pk` and follow the DNS
   instructions.

Every push to the main branch redeploys automatically. Pull requests get their
own preview URL.

> If you change the live domain, update `url` in `data/site.ts` too — it feeds
> canonical URLs, the sitemap and all structured data.

---

## Project structure

```
app/                        routes (App Router)
  page.tsx                  home
  about/ contact/ faqs/     static pages
  destinations/[slug]/      10 generated country pages
  services/[slug]/          10 generated service pages
  blog/[slug]/              generated post pages
  free-assessment/          the main lead magnet (4-step form)
  apply/                    full application enquiry form
  sitemap.ts robots.ts      SEO routes
  opengraph-image.tsx       generated social share card
components/                 shared UI
data/                       ALL editable content
lib/                        utils, SEO builders, submitForm (the one form
                            client), brandAssets (server-only logo detection)
public/flags/               ten hand-authored flag SVGs
```

---

## Forms

Every form routes through **one** submit client, `lib/submitForm.ts`. No form
component calls `fetch` directly — that keeps the access key, subject, reply-to
address, honeypot handling and error copy identical everywhere.

Two form components consume it:

- **`LeadForm`** — reusable, `variant="compact" | "full"` and `kind` (which
  chooses the subject line). Used on the home page band, destination sidebars,
  service sidebars, blog sidebars, contact, scholarships, test prep and apply.
- **`AssessmentForm`** — the four-step assessment on `/free-assessment`. Each
  step validates before "Continue"; only the final step submits, with all four
  steps' data merged.

Both provide: a hidden `botcheck` honeypot, controlled inputs, client-side
validation (Pakistani mobile `03xxxxxxxxx` / `+923xxxxxxxxx`, plus email), the
four states idle → sending → success → error, a WhatsApp fallback button on the
error panel, and a WhatsApp handoff with the enquiry pre-filled on success. The
form resets after a successful send while the success panel keeps showing the
submitted name from a snapshot.

Submissions arrive at `readingstudyabroad.pk@gmail.com`. See **Form Setup
(required)** above — without the access key nothing sends.

## Flags

`public/flags/` contains ten hand-authored SVGs — small, fast and dependency-free.
They are simplified rather than heraldically exact (the Union Jack omits the
counterchange of the red saltire, for example), which is invisible at the sizes
used.

To swap in exact versions, download CC0 SVGs from
[flagicons.lipis.dev](https://flagicons.lipis.dev/) or
[Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_flags) and
overwrite the files, keeping the same filenames.

---

## SEO

- Unique title, description and canonical on every page
- Open Graph and Twitter cards, with a generated share image
- `sitemap.xml` covering every static and generated route
- `robots.txt` referencing the sitemap
- Structured data: `EducationalOrganization` + `LocalBusiness` sitewide,
  `BreadcrumbList` on inner pages, `FAQPage` on FAQs and country pages,
  `Service` on service pages, `Article` on blog posts

**Highest-impact next step:** claim the Google Business Profile for the
Hayatabad office. For local searches it outperforms anything on the site itself.

---

## Accessibility & performance notes

- Every page is statically generated; no client JavaScript is used unless the
  component is interactive
- `prefers-reduced-motion` is respected throughout — all animation collapses
- Skip-to-content link, semantic landmarks, one `h1` per page, visible focus
  rings
- Gold `#F5A623` is never used for body text on white (it fails contrast) —
  buttons use navy text on gold; small gold text uses the darker `gold-dark`
