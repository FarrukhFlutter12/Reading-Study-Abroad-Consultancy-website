# Images Needed

Every slot below is already wired into the code. Until a file exists the site
renders a branded navy→gold panel in its place — nothing looks broken, so
there is no rush and no half-finished state. Drop a file in at the exact path
and it appears on the next deploy, with no code change.

> Regenerate this file with `node scripts/generate-images-doc.mjs`.

---

## Sourcing rules

**Use only these two sources.** Both allow commercial use with no attribution:

- Unsplash — <https://unsplash.com>
- Pexels — <https://pexels.com>

**Never use** Getty, Shutterstock, Freepik, or anything found through Google
Images. These carry licence risk that lands on the client, not the designer.

### Four hard rules

1. **Download the file — never paste a link.** An external URL breaks when the
   source deletes the image, and leaks your visitors' referrer data.
2. **No university logos, crests or branded signage.** Showing a university's
   mark implies an official partnership. Until written proof of partnership
   exists, campus photography must be generic.
3. **No stock faces on success stories.** A stock portrait beside a student
   testimonial is misrepresentation. Use a real photo with written consent, or
   an initial-letter avatar.
4. **Cast for the audience.** This consultancy serves Pakistani students.
   Prefer South Asian and visibly diverse students — a hero full of only
   Northern-European faces reads as a template and costs you enquiries.

---

## Optimisation — do this before adding any file

Pakistani students are mostly on 3G/4G with data caps. A 4 MB hero will cost
you more enquiries than a mediocre photo will.

1. Resize to the dimensions in the table — no larger.
2. Convert to WebP at quality 80 (<https://squoosh.app>, free, in-browser).
3. Check it against the size budget below.
4. Save with the exact filename shown. Keep the `.jpg` name even for a
   WebP file if you prefer — or update the path in `data/images.ts`.

Next.js re-encodes to AVIF/WebP and serves the right size per device, so the
budget is about the source file, not what the visitor downloads.

---

## Core images

| ✓ | File | Size | Max | Search query | What makes a good pick |
|---|---|---|---|---|---|
| ⬜ | `/images/hero/main-hero.jpg` | 1920×1080 | 250 KB | `diverse international students walking campus` | Diverse group of university students walking on campus in natural daylight, genuinely happy — not stock-posed. Must include South Asian students. Leave the left third uncluttered so the headline sits cleanly. |
| ⬜ | `/images/hero/hero-mobile.jpg` | 1080×1350 | 200 KB | `international students campus portrait` | Tighter portrait-safe crop of the same scene. Subject centred so nothing important is lost on a narrow screen. |
| ⬜ | `/images/about/office-team.jpg` | 1200×800 | 150 KB | `advisor student desk documents office` | Counsellor at a desk with a student, documents visible, warm office lighting. Should read as an advice session, not a sales meeting. |
| ⬜ | `/images/about/counselling-session.jpg` | 1200×800 | 150 KB | `consultant meeting client laptop office` | One-on-one counselling, laptop open, engaged conversation. Both faces visible and relaxed. |
| ⬜ | `/images/about/office-exterior.jpg` | 1200×800 | 150 KB | `— CLIENT PHOTO, do not use stock —` | CLIENT PHOTO REQUIRED — the real Hayatabad office frontage with signage. Never use stock for this: it is a factual claim about a real place. |
| ⬜ | `/images/sections/students-group.jpg` | 1200×800 | 150 KB | `students studying together library campus` | Students studying together in a library or on a campus lawn. Collaborative and relaxed. |
| ⬜ | `/images/sections/graduation.jpg` | 1200×800 | 150 KB | `graduation caps thrown air celebration` | Graduation caps in the air, celebratory, wide shot. Faces should not be individually identifiable — this sits near student stories. |
| ⬜ | `/images/sections/visa-documents.jpg` | 1200×800 | 150 KB | `passport documents desk flat lay` | Passport, forms and a pen on a clean desk. Check carefully that no real names, numbers or personal data are legible. |
| ⬜ | `/images/sections/lecture-hall.jpg` | 1200×800 | 150 KB | `university lecture hall professor students` | Professor teaching, students attentive. NO university logos, crests or identifiable branded signage anywhere in frame. |
| ⬜ | `/images/sections/airport-departure.jpg` | 1200×800 | 150 KB | `student luggage airport terminal departure` | Student with luggage at an airport terminal. Hopeful rather than lonely in tone. |
| ⬜ | `/images/sections/ielts-study.jpg` | 1200×800 | 150 KB | `student headphones studying english test` | Person studying with headphones and test-prep materials. Avoid any visible IELTS/PTE branding. |

---

## Destination images

Two per country: a wide hero and a tighter card crop.

| ✓ | File | Size | Max | Search query | Note |
|---|---|---|---|---|---|
| ⬜ | `/images/destinations/uk.jpg` | 1600×900 | 150 KB | `Big Ben and the Houses of Parliament landscape` | Wide crop of Big Ben and the Houses of Parliament. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/uk-card.jpg` | 800×600 | 80 KB | `the United Kingdom university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/cyprus.jpg` | 1600×900 | 150 KB | `Mediterranean coastline landscape` | Wide crop of Mediterranean coastline. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/cyprus-card.jpg` | 800×600 | 80 KB | `Cyprus university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/bulgaria.jpg` | 1600×900 | 150 KB | `Alexander Nevsky Cathedral, Sofia landscape` | Wide crop of Alexander Nevsky Cathedral, Sofia. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/bulgaria-card.jpg` | 800×600 | 80 KB | `Bulgaria university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/italy.jpg` | 1600×900 | 150 KB | `The Colosseum, Rome landscape` | Wide crop of The Colosseum, Rome. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/italy-card.jpg` | 800×600 | 80 KB | `Italy university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/lithuania.jpg` | 1600×900 | 150 KB | `Vilnius old town landscape` | Wide crop of Vilnius old town. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/lithuania-card.jpg` | 800×600 | 80 KB | `Lithuania university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/malta.jpg` | 1600×900 | 150 KB | `Valletta harbour landscape` | Wide crop of Valletta harbour. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/malta-card.jpg` | 800×600 | 80 KB | `Malta university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/south-korea.jpg` | 1600×900 | 150 KB | `Seoul skyline landscape` | Wide crop of Seoul skyline. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/south-korea-card.jpg` | 800×600 | 80 KB | `South Korea university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/hungary.jpg` | 1600×900 | 150 KB | `The Hungarian Parliament, Budapest landscape` | Wide crop of The Hungarian Parliament, Budapest. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/hungary-card.jpg` | 800×600 | 80 KB | `Hungary university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/france.jpg` | 1600×900 | 150 KB | `The Eiffel Tower, Paris landscape` | Wide crop of The Eiffel Tower, Paris. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/france-card.jpg` | 800×600 | 80 KB | `France university campus students` | Tighter crop that still reads at 400 px wide. |
| ⬜ | `/images/destinations/turkey.jpg` | 1600×900 | 150 KB | `The Blue Mosque, Istanbul landscape` | Wide crop of The Blue Mosque, Istanbul. Leave the left third clear for the headline. |
| ⬜ | `/images/destinations/turkey-card.jpg` | 800×600 | 80 KB | `Turkey university campus students` | Tighter crop that still reads at 400 px wide. |

---

## Where photography must NOT go

These surfaces need clean navy or white behind them. Photography here reduces
readability and costs conversions:

- Form panels (contact, apply, free assessment)
- The FAQ accordion
- The six-step process timeline
- The stats band

---

**Progress: 0 / 31 images supplied.**
