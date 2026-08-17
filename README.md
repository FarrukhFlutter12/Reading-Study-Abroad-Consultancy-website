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

## Environment variables

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes | Delivers form submissions to the office inbox |

Get the key free at <https://web3forms.com> using
`readingstudyabroad.pk@gmail.com`. Put it in `.env.local` for development, and
add it in Vercel for production.

**Without the key**, every form shows a polite message asking the visitor to
call or WhatsApp instead — the site still works, but no enquiries arrive by
email.

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
lib/                        helpers (utils, SEO builders, Web3Forms client)
public/flags/               ten hand-authored flag SVGs
```

---

## Forms

Three form components, all posting to Web3Forms:

- **`LeadForm`** — reusable, `variant="compact" | "full"`. Used in the home page
  band, destination sidebars, service sidebars, blog sidebars, contact and apply.
- **`AssessmentForm`** — the four-step assessment on `/free-assessment`.

Every form includes a hidden honeypot field, client-side validation (Pakistani
mobile format `03xxxxxxxxx` / `+923xxxxxxxxx`), loading/success/error states, and
a WhatsApp hand-off button on success with the enquiry pre-filled.

Submissions arrive at `readingstudyabroad.pk@gmail.com` with a subject line
naming the student and their destination, so you can triage from the inbox.

---

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
