# Images Needed

Every slot below is already wired into the code. Until a file exists the site
renders a branded purple→gold panel in its place — nothing looks broken, so
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
4. Save into the folder shown. The extension does not have to match —
   `.webp`, `.jpg` and `.png` are all picked up automatically.

Next.js re-encodes to AVIF/WebP and serves the right size per device, so the
budget is about the source file, not what the visitor downloads.

---

## Core images

| ✓ | File | Size | Max | Search query | What makes a good pick |
|---|---|---|---|---|---|
| ✅ | `/images/hero/main-hero.jpg` | 1920×1080 | 250 KB | `diverse international students walking university campus` | Diverse students on campus, daylight, not stock-posed. Left third clear for the headline. |
| ✅ | `/images/hero/hero-mobile.jpg` | 1080×1350 | 200 KB | `asian students university campus together` | Portrait-safe crop of the same scene, subject centred. |
| ✅ | `/images/about/office-team.jpg` | 1200×800 | 150 KB | `asian advisor student documents desk office` | Advice session, not a sales meeting. Documents visible. |
| ✅ | `/images/about/counselling-session.jpg` | 1200×800 | 150 KB | `consultant meeting client laptop office asian` | One-to-one, laptop open, both people engaged. |
| ⬜ | `/images/about/office-exterior.jpg` | 1200×800 | 150 KB | `— CLIENT PHOTO, do not use stock —` | CLIENT PHOTO ONLY — the real office frontage. |
| ✅ | `/images/sections/students-group.jpg` | 1200×800 | 150 KB | `diverse students studying together library campus` | Collaborative and relaxed. |
| ✅ | `/images/sections/graduation.jpg` | 1200×800 | 150 KB | `graduation caps thrown air celebration` | Wide shot. Faces should not be individually identifiable — this sits near student stories. |
| ✅ | `/images/sections/visa-documents.jpg` | 1200×800 | 150 KB | `passport travel documents desk flat lay` | No legible names or numbers. |
| ✅ | `/images/sections/lecture-hall.jpg` | 1200×800 | 150 KB | `university lecture hall students seated` | NO university logos, crests or branded signage in frame. |
| ✅ | `/images/sections/airport-departure.jpg` | 1200×800 | 150 KB | `young traveller luggage airport terminal departure` | Hopeful rather than lonely in tone. |
| ✅ | `/images/sections/ielts-study.jpg` | 1200×800 | 150 KB | `student headphones studying books desk` | No visible IELTS/PTE branding. |

---

## Destination images

Two per country: a wide hero and a tighter card crop.

| ✓ | File | Size | Max | Search query | Note |
|---|---|---|---|---|---|
| ✅ | `/images/destinations/uk.jpg` | 1600×900 | 150 KB | `Big Ben and the Houses of Parliament` | Wide crop of Big Ben and the Houses of Parliament. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/uk-card.jpg` | 800×600 | 80 KB | `the United Kingdom city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/cyprus.jpg` | 1600×900 | 150 KB | `Mediterranean coastline` | Wide crop of Mediterranean coastline. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/cyprus-card.jpg` | 800×600 | 80 KB | `Cyprus city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/bulgaria.jpg` | 1600×900 | 150 KB | `Alexander Nevsky Cathedral, Sofia` | Wide crop of Alexander Nevsky Cathedral, Sofia. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/bulgaria-card.jpg` | 800×600 | 80 KB | `Bulgaria city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/italy.jpg` | 1600×900 | 150 KB | `The Colosseum, Rome` | Wide crop of The Colosseum, Rome. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/italy-card.jpg` | 800×600 | 80 KB | `Italy city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/lithuania.jpg` | 1600×900 | 150 KB | `Vilnius old town` | Wide crop of Vilnius old town. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/lithuania-card.jpg` | 800×600 | 80 KB | `Lithuania city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/malta.jpg` | 1600×900 | 150 KB | `Valletta harbour` | Wide crop of Valletta harbour. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/malta-card.jpg` | 800×600 | 80 KB | `Malta city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/south-korea.jpg` | 1600×900 | 150 KB | `Seoul skyline` | Wide crop of Seoul skyline. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/south-korea-card.jpg` | 800×600 | 80 KB | `South Korea city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/hungary.jpg` | 1600×900 | 150 KB | `The Hungarian Parliament, Budapest` | Wide crop of The Hungarian Parliament, Budapest. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/hungary-card.jpg` | 800×600 | 80 KB | `Hungary city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/france.jpg` | 1600×900 | 150 KB | `The Eiffel Tower, Paris` | Wide crop of The Eiffel Tower, Paris. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/france-card.jpg` | 800×600 | 80 KB | `France city landmark travel` | Tighter crop that still reads at 400 px wide. |
| ✅ | `/images/destinations/turkey.jpg` | 1600×900 | 150 KB | `The Blue Mosque, Istanbul` | Wide crop of The Blue Mosque, Istanbul. Leave the left third clear for the headline. |
| ✅ | `/images/destinations/turkey-card.jpg` | 800×600 | 80 KB | `Turkey city landmark travel` | Tighter crop that still reads at 400 px wide. |

---

## Where photography must NOT go

These surfaces need clean brand purple or white behind them. Photography here
reduces readability and costs conversions:

- Form panels (contact, apply, free assessment)
- The FAQ accordion
- The six-step process timeline
- The stats band

---

**Progress: 30 / 31 images supplied.**
