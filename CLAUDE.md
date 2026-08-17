# CLAUDE.md — Project Context

Website for **Reading Study Abroad**, a study abroad consultancy in Basharat
Market, Phase 03, Hayatabad, Peshawar, Pakistan. Its purpose is lead generation:
get students to book a free counselling session.

---

## The rule that overrides everything else

**Never invent facts.**

No fabricated student counts, visa success rates, testimonials, university
partnerships, awards, or team members. If real data is missing, the value stays
`REPLACE_ME` in `/data` and the component **hides that element entirely** —
guard every optional value with `isReady()` from `lib/utils.ts`.

Three further content rules, all non-negotiable:

1. **No specific figures.** No tuition amounts, visa fees, bank balance
   thresholds, processing times or post-study work durations anywhere on the
   site. They change every intake and publishing them creates liability. Route
   specifics to a counselling CTA: *"Requirements change each intake — book a
   free counselling session for the current criteria."*
2. **No guarantee language.** Never "guaranteed visa", "100% success", "assured
   admission". Use "we guide you through every step". Admission and visa
   decisions belong to universities and embassies, and the site says so.
3. **No student published without written consent** — name, photo or story.

Copy should read as honest and specific rather than promotional. The brand
position is "the consultancy that tells you the truth", including telling a
student a destination is a poor fit.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Icons | lucide-react |
| Forms | React state + Web3Forms (`https://api.web3forms.com/submit`) |
| Fonts | `next/font/google` — Poppins, Inter, Playfair Display |
| Hosting | Vercel free tier |

**Do not add dependencies.** No UI kit, no CMS, no database, no paid analytics.
Everything here is free-tier.

> Note: `lucide-react` v1 removed brand marks. WhatsApp, Facebook, Instagram and
> TikTok icons are hand-authored SVGs in `components/Icon.tsx`.

---

## Brand

```
navy   #0B1F4E   light #132C63   dark #071638
gold   #F5A623   light #FFC15E   dark #D4881A
cream  #FDFBF7
ink    #0F172A
```

- **Headings:** Poppins 600/700 (`font-display`)
- **Body:** Inter 400/500 (`font-sans`)
- **Tagline only:** Playfair Display Italic (`font-script`) — "Read the World
  with Reading Study Abroad"

Visual language, taken from the client's banner (`public/brand/banner.png`):
deep navy grounds with gold accents and thin gold rules, navy pill badges for
country names, circular flag chips with a white ring and soft shadow, sweeping
SVG curve dividers, generous white space on light sections, navy bands for CTAs
and the footer.

**Contrast:** gold on white fails at small sizes. Buttons use navy text on gold;
small gold text uses `gold-dark`. Never gold body copy on white.

---

## Conventions

### Folders

```
app/          routes only
components/   shared UI; 'use client' at the leaf, never on a page
data/         ALL editable copy — the client edits here, not in components
lib/          utils.ts (helpers + isReady), seo.ts (metadata + JSON-LD builders),
              web3forms.ts (submission client)
public/flags/ ten hand-authored SVGs, named by country slug
```

### Rules

- **Content belongs in `/data`.** Never hard-code marketing copy in a component.
- **`'use client'` only where interactivity is required**, and as deep in the
  tree as possible. Pages stay server components.
- Every page exports `dynamic = "force-static"` and metadata via `pageMeta()`
  from `lib/seo.ts`.
- Dynamic routes use `generateStaticParams()`.
- Title pattern: `{Page} | Reading Study Abroad — Peshawar` (handled by
  `pageMeta`).
- Animation is entrance-only (fade + 20px rise, 0.08s stagger), hover lift, and
  accordion height. Always respect `prefers-reduced-motion` — use the `Reveal`,
  `RevealGroup` and `RevealItem` wrappers, which already handle it.
- Images use `next/image` with explicit sizes and descriptive `alt`; `priority`
  only on above-the-fold hero images.
- One `h1` per page. Sections use `aria-labelledby`.

### Forms

Every form must carry:

- The Web3Forms access key from `site.web3formsKey`
- A descriptive `subject`
- `from_name` = "Reading Study Abroad Website"
- A visually hidden honeypot named `botcheck`
- Client-side validation — PK mobile regex `^(\+92|0092|92|0)?3\d{9}$`, email
- Loading, success and error states
- A WhatsApp hand-off button on success, with the enquiry pre-filled

Use `submitToWeb3Forms()` from `lib/web3forms.ts` rather than calling fetch
directly — it handles the missing-key case gracefully.

---

## Before you finish any change

```bash
npm run build
```

The build must pass with no TypeScript or ESLint errors. If you added content
that the client still needs to supply, add it to `CONTENT-NEEDED.md`.
