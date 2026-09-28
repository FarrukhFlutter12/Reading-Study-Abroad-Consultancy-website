# Content Needed from the Client

The website is complete and live-ready, but a number of items are deliberately
**hidden** rather than filled with invented content. Anywhere a value is still
`REPLACE_ME`, the site simply omits that element — nothing broken shows to a
visitor.

Work through this list and the corresponding sections switch on automatically.

---

## 1. Social media handles — ✅ DONE

All three handles are live in `data/site.ts` and render in the top bar, footer,
contact page, mobile drawer, and the `sameAs` field of the search-engine
structured data:

| Platform | URL |
|---|---|
| Facebook | `https://www.facebook.com/ReadingStudyAbroad.PK` |
| Instagram | `https://www.instagram.com/readingstudyabroad.pk` |
| TikTok | `https://www.tiktok.com/@readingstudyabroad.pk` |

Nothing further needed. To change a handle later, edit `data/site.ts` → `socials`.

---

## 2. Office hours — *required*

**File:** `data/site.ts` → `officeHours`

Supply exactly as you want it displayed, e.g. `Mon – Sat, 10:00 AM – 6:00 PM`.
Also confirm whether you are closed on Fridays for Jummah, and whether Ramadan
hours differ.

**Where it shows:** footer, contact page, About page, and structured data.

---

## 3. Founding year — *optional but recommended*

**File:** `data/site.ts` → `foundedYear`

A four-digit year, e.g. `2019`. Used in structured data to establish business
history. Only supply the real year.

---

## 4. Statistics — *supply only what you can evidence*

**File:** `data/site.ts` → `stats`

| Field | Needed |
|---|---|
| `studentsPlaced` | e.g. `"450+"` — only a number you can substantiate from records |
| `visaSuccessRate` | e.g. `"92%"` — **only if you keep records that prove it** |
| `partnerUniversities` | e.g. `"120+"` — count of institutions you genuinely represent |
| `countries` | ✅ Already set to `10` |

> **Important:** the stats band only appears once **two or more** of these are
> real. Do not invent a visa success rate — it is a measurable claim and
> publishing a false one is a liability. If you do not track it, leave it as
> `REPLACE_ME` and the site never mentions it.

---

## 5. Partner university list

**File:** `data/universities.ts`

Currently an empty array, and the Universities page shows a "list is being
verified" message with a shortlist request form instead.

For each university supply:

- Official name
- Country (must match a slug: `uk`, `cyprus`, `bulgaria`, `italy`, `lithuania`,
  `malta`, `south-korea`, `hungary`, `france`, `turkey`)
- City
- Official website URL
- Nature of the relationship (e.g. "Direct application partner")
- Logo file, if you have permission to use it

> Only list institutions you genuinely represent or can evidence a relationship
> with. Claiming an association that does not exist is a legal exposure.

---

## 6. Student testimonials — ⚠️ ADDED 2026-09-28, CONFIRM CONSENT ON FILE

**File:** `data/testimonials.ts`

14 testimonials (names, home city and quotes) were supplied directly and added
to the site — they now appear on the Home page and `/success-stories`. Two of
them ("Israr Nawab" and "Muhammad Haseeb") did not name a destination country,
so no destination tag is shown for those two; the rest are tagged Cyprus or
Turkey to match what was supplied. Two students mentioned Belarus, but the site
has no Belarus destination page yet, so no destination tag was added for them
either — say if a Belarus page should be built.

> **Please confirm written consent is on file for each of these 14 students**
> before treating this as final — the site's policy (and CLAUDE.md) requires
> consent for every name, photo or quote published, and it wasn't possible to
> verify consent from the request alone. A WhatsApp message saying "yes you can
> use this" is enough — keep it on file. No photos were added (none were
> supplied), and none of these students' documents, visas or offer letters
> should ever be published.

---

## 7. Team members

**File:** `data/team.ts` → `team`

The team section is hidden entirely while this array is empty. For each person:

- Name
- Role (e.g. "Senior Counsellor — Europe")
- Photo (square, at least 400×400 px)
- Two-sentence bio

> Get each person's permission before publishing their photo and name.

---

## 8. Office photos — 🔴 STILL NEEDED (client photos only)

**Folder:** `public/images/about/`

One of these is a factual claim about a real place and **must not be stock**:

| File | Subject | Stock allowed? |
|---|---|---|
| `office-exterior.jpg` | The real Hayatabad office frontage with signage | ❌ **Client photo only** |
| `office-team.jpg` | Counsellor and student at a desk, documents visible | ⚠️ Stock acceptable, real photo much better |
| `counselling-session.jpg` | One-to-one counselling, laptop open | ⚠️ Stock acceptable, real photo much better |

A phone photo in decent daylight beats stock here — students recognise a real
office, and it is the single strongest trust signal on the About page.

If any staff member or student is identifiable in a photo, get their permission
before it is published.

See `IMAGES-NEEDED.md` for sizes and the full list of 31 image slots.

---

## 8b. University partnership proof — 🔴 REQUIRED BEFORE LISTING ANY UNIVERSITY

Two separate things are blocked on this:

1. **The universities list** (`data/universities.ts`, still empty)
2. **Campus photography** — no university logo, crest or branded signage may
   appear in any photo on the site

Displaying a university's mark, or listing it as a partner, implies an official
relationship. If that relationship does not exist and is challenged, it is the
consultancy that carries the liability, not the website.

For each university the client wants listed, supply **one** of:

- A signed representation or partnership agreement
- An official appointment letter or email from the university's international office
- A listing of the consultancy on the university's own agent directory page

Until then the Universities page shows a "list is being verified" panel with a
shortlist request form, and campus photography stays generic. That is a
deliberate choice, not an unfinished state.

---

## 8c. Consented student photos — 🔴 REQUIRED BEFORE ANY SUCCESS STORY

**Folder:** `public/students/` · **File:** `data/testimonials.ts`

A stock portrait next to a student testimonial is misrepresentation, so the
success-story slots will never use one. For each student the client wants to
feature, supply:

- Their photo, or explicit permission to publish without one
- Their story in their own words
- Their destination, university and intake
- **Written consent** — a WhatsApp message saying "yes, you can publish this"
  is enough, but keep it on file, and tell them they can withdraw it any time

Students who prefer not to appear in a photo can still have their story
published with an initial-letter avatar instead.

---

## 9. Logo files — ✅ DONE

The client supplied three square PNGs. They are archived in `/brand-source/`
(outside `/public`, so the 3 MB of originals are never served to visitors), and
`node scripts/generate-icons.mjs` derives every asset the site uses:

| Generated file | Role |
|---|---|
| `public/logo-on-light.png` | Wide lockup, purple + gold — light backgrounds |
| `public/logo-on-dark.png` | Wide lockup, all gold — navy header, drawer |
| `public/logo-stacked-on-dark.png` | Stacked lockup — footer |
| `public/logo-mark.png` / `-on-dark.png` | Icon mark only |
| `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | Browser tab and home-screen icons |

Nothing further is needed. If the client sends new artwork, replace the files in
`/brand-source/` and run `npm run logo`.

**One thing worth raising with the client:** their brand purple is `#24044C`,
but the website's navy is `#0B1F4E`. These are visibly different — a violet
versus a blue. The site currently keeps its navy and the logo sits on top of it,
which looks fine, but if they want exact brand consistency the site palette can
be shifted to `#24044C`. Their gold (`#FCAC04`) and the site gold (`#F5A623`)
are close enough that no change is needed.

---

## 10. Photography — 🟡 31 slots, see IMAGES-NEEDED.md

Every photographic slot on the site is already wired up. Until a file exists the
page renders a branded navy→gold panel, so nothing looks broken and there is no
half-finished state to worry about.

`IMAGES-NEEDED.md` is the working checklist — it lists all 31 slots with the
exact filename, dimensions, size budget, a copy-paste Unsplash/Pexels search
query, and a note on what makes a good pick. Regenerate it any time with
`npm run images:doc` and it re-counts what has been supplied.

Free and safe sources: **Unsplash** and **Pexels** only. Never Getty,
Shutterstock, Freepik or Google Images.

---

## 11. Google Maps pin

**File:** `data/site.ts` → `address.mapsQuery`

The map currently searches for "Basharat Market Phase 3 Hayatabad Peshawar",
which is approximate. For an exact pin:

1. Find your office on Google Maps
2. Right-click the exact spot → click the coordinates to copy them
3. Send us the coordinates (e.g. `33.9899, 71.4372`)

Also worth doing: claim your **Google Business Profile**. It is free and is the
single highest-impact thing for "study abroad consultant near me" searches in
Peshawar.

---

## 12. Test preparation — confirm what you offer

**File:** `data/services.ts` → `test-preparation`, and
`app/test-preparation/page.tsx`

We have written this as *guidance* (which test to take, what to target, how to
prepare) rather than claiming you run classes. Confirm:

- Do you run IELTS/PTE/Duolingo classes in-house? If so: schedule, duration,
  batch size, fee.
- Or do you refer students to a partner institute?

The copy will be adjusted to match the truth either way.

---

## 13. Service fees

**Files:** the individual pages under `app/services/`

No fees appear anywhere on the site, deliberately. If you want a published price
list (or a "starting from" figure) for any service, send the figures and we will
add them with a clear "subject to change" note.

---

## 14. Web3Forms key — ✅ set locally, confirm it's also in Vercel

**Files:** `.env.local` and Vercel environment variables

`.env.local` already has a `NEXT_PUBLIC_WEB3FORMS_KEY` value, so every form
works in local development. This variable is inlined at **build** time, so
production only works if the same key is also set in Vercel and the site has
been redeployed since:

1. Vercel → Project → Settings → Environment Variables
2. Confirm `NEXT_PUBLIC_WEB3FORMS_KEY` is set there to the same value
3. Redeploy if you just added or changed it

**Until the Vercel copy is set and deployed, the live site's forms will not
send anything**, even though local development works fine.

---

## 15. Domain

The site is configured for `https://readingstudyabroad.pk` (set in
`data/site.ts` → `url`). If the live domain differs, change it there — it feeds
the sitemap, canonical URLs and all structured data.

---

## Quick priority order

| Priority | Item |
|---|---|
| 🔴 Before launch | 14 (confirm Web3Forms key is set in **Vercel**, not just locally), 2 (office hours), 15 (domain) |
| 🟠 First week | 6 (confirm written consent on file for the 14 testimonials just added), 8 (office exterior photo), 11 (Maps pin + Google Business Profile) |
| 🟡 First month | 8b (university partnership proof), 5 (universities list), 8c (consented student photos), 7 (team), 10 (photography) |
| 🟢 When ready | 3, 4, 12, 13 |

✅ **Done:** 1 (social handles), 9 (logo files — all assets generated), 6 (14 testimonials added, pending consent confirmation), 14 (key set locally, pending Vercel confirmation).
