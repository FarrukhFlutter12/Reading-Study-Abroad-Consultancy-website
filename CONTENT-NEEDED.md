# Content Needed from the Client

The website is complete and live-ready, but a number of items are deliberately
**hidden** rather than filled with invented content. Anywhere a value is still
`REPLACE_ME`, the site simply omits that element — nothing broken shows to a
visitor.

Work through this list and the corresponding sections switch on automatically.

---

## 1. Social media handles — *required*

**File:** `data/site.ts` → `socials`

| Field | Current | Needed |
|---|---|---|
| `facebook` | ✅ Already set | — |
| `instagram` | `REPLACE_ME` | Full profile URL, e.g. `https://www.instagram.com/readingstudyabroad.pk/` |
| `tiktok` | `REPLACE_ME` | Full profile URL |

**Where it shows:** top bar, footer, contact page, and the `sameAs` field in
search-engine structured data. Icons for missing handles are hidden.

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

## 6. Student testimonials — *written consent required*

**File:** `data/testimonials.ts`

Currently empty; every page that would show testimonials falls back to a
"your story could be next" card. Supply 5–8 real stories, each with:

- Student's name (as they want it published)
- Destination country slug
- University and course
- Intake (e.g. "September 2025")
- Their quote, **in their own words**
- Photo — optional; the card works without one

> **You must hold written consent** from each student before their name, photo
> or story is published, and they must be able to withdraw it. A WhatsApp
> message saying "yes you can use this" is acceptable — keep it on file.
> Do not publish any student's documents, visa or offer letter, ever.

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

## 8. Office photos

**File:** `data/team.ts` → `officePhotos`
**Folder:** put images in `public/office/`

Six photos would fill the About page gallery nicely:

1. Building exterior / signage
2. Reception area
3. Counselling room
4. A counsellor with a student (with permission)
5. Wide interior shot
6. Team group photo

Landscape, at least 1200 px wide. Each needs a short `alt` description.

---

## 9. Logo files

**Folder:** `public/`
**File to update:** `data/site.ts` → `logo`

| File | Purpose |
|---|---|
| `logo.png` (or `.svg`) | For light backgrounds |
| `logo-white.png` (or `.svg`) | For the navy header and footer |

Then change `logo.onLight` to `"/logo.png"` and `logo.onDark` to
`"/logo-white.png"`. Until you do, the site renders a text lockup
(**READING** over — STUDY ABROAD —) matching your banner.

Also useful: a square version at 512×512 for `public/icon.png` (browser tab and
mobile bookmark icon).

---

## 10. Destination photos — *optional*

**Folder:** `public/destinations/`

Country pages currently use the navy brand gradient with the flag, which looks
clean and loads fast. If you want photography instead, supply one landscape
image per country named after its slug (`uk.jpg`, `cyprus.jpg`, and so on),
at least 1600 px wide.

> Use only images you have the rights to. Unsplash and Pexels are free for
> commercial use; a Google image search result is not.

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

## 14. Web3Forms key — *required before launch*

**Files:** `.env.local` and Vercel environment variables

1. Go to <https://web3forms.com>
2. Enter `readingstudyabroad.pk@gmail.com` and get the free access key
3. Put it in `.env.local` as `NEXT_PUBLIC_WEB3FORMS_KEY=your_key`
4. Add the same variable in Vercel → Settings → Environment Variables
5. Redeploy

**Until this is done, no form on the site can send anything.** Forms show a
polite message asking the visitor to call or WhatsApp instead — so nothing looks
broken, but you will not receive enquiries by email.

---

## 15. Domain

The site is configured for `https://readingstudyabroad.pk` (set in
`data/site.ts` → `url`). If the live domain differs, change it there — it feeds
the sitemap, canonical URLs and all structured data.

---

## Quick priority order

| Priority | Item |
|---|---|
| 🔴 Before launch | 14 (Web3Forms key), 2 (office hours), 15 (domain) |
| 🟠 First week | 1 (social handles), 9 (logo files), 11 (Maps pin + Google Business Profile) |
| 🟡 First month | 5 (universities), 6 (testimonials), 7 (team), 8 (office photos) |
| 🟢 When ready | 3, 4, 10, 12, 13 |
