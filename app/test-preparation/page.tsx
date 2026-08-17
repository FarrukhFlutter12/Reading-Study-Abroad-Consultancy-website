import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { CTABand, CheckList, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "IELTS, PTE & Duolingo Preparation",
  description:
    "Which English test should you take? IELTS, PTE and Duolingo compared for Pakistani students — formats, scoring, acceptance and a structured preparation plan.",
  path: "/test-preparation",
});

const TESTS = [
  {
    name: "IELTS Academic",
    tag: "Widest acceptance",
    body: "The most broadly accepted English test worldwide and the safest choice when you are unsure. Four sections — Listening, Reading, Writing and Speaking — reported in bands.",
    points: [
      "Speaking is a face-to-face conversation with a human examiner",
      "Available in paper-based and computer-delivered formats",
      "Take the Academic version, not General Training, for university study",
      "Some destinations additionally require a specific UKVI-approved version",
    ],
  },
  {
    name: "PTE Academic",
    tag: "Fastest results",
    body: "Fully computer-based and automatically scored, including Speaking, which you record into a microphone. Results are typically returned quickly, which matters against a tight deadline.",
    points: [
      "No human examiner — everything is done on a computer",
      "Integrated tasks: one question often assesses two skills at once",
      "Suits students comfortable with typing and computer interfaces",
      "Confirm acceptance with both your university and the embassy",
    ],
  },
  {
    name: "Duolingo English Test",
    tag: "Shortest & cheapest",
    body: "Taken online from home, considerably shorter and cheaper than the alternatives. Acceptance has grown steadily but remains narrower than IELTS or PTE.",
    points: [
      "Adaptive format — question difficulty adjusts as you answer",
      "Strict technical and environment requirements at home",
      "University acceptance does not guarantee embassy acceptance",
      "Always verify both before relying on it",
    ],
  },
];

const FAQS = [
  {
    q: "Which English test should I take?",
    a: "Whichever your target universities and your destination embassy both accept. IELTS has the widest acceptance and is the safe default. PTE suits students who prefer a fully computer-based format. Duolingo is accepted by a narrower set of institutions — verify before booking.",
  },
  {
    q: "What score do I need?",
    a: "It depends on your course level, university and destination. Postgraduate, clinical and law programmes typically require higher scores than general undergraduate entry, and many universities also set a minimum for each individual section. We confirm the exact requirement for your shortlist.",
  },
  {
    q: "How long should I prepare?",
    a: "It depends entirely on where you are starting from, which is why the first step is a timed practice test rather than a booking. Once we know your current level, we can give you a realistic timeline for your target score.",
  },
  {
    q: "Can I study abroad without an English test?",
    a: "Sometimes. Some universities accept their own internal assessment or an online interview, and a few waive the requirement where your previous education was in English. The embassy may still require a test, so both must be checked.",
  },
  {
    q: "What if I do not get the score I need?",
    a: "You can retake any of the three tests. Prepare specifically for the section that let you down rather than repeating general practice — and consider whether a different test format suits you better.",
  },
  {
    q: "Do you run classes at your office?",
    a: "Contact us for our current class schedule and format. We will tell you exactly what is running, and what it costs, when you enquire.",
  },
];

const PREP = [
  "Sit a full timed practice test before booking anything — students misjudge their level in both directions",
  "Spend most of your preparation on your weakest section; Writing is the most common weak point",
  "Practise Speaking out loud and record yourself — silent reading builds nothing",
  "Learn the exact format so nothing about the test day is a surprise",
  "Build reading speed with academic material, not casual browsing",
  "Learn the instruction wording — many marks are lost to misread task instructions",
  "Book the real test only once your practice scores sit consistently at or above target",
];

export default function TestPreparationPage() {
  return (
    <>
      <PageHero
        eyebrow="English tests"
        title="IELTS, PTE & Duolingo — Which Should You Take?"
        subtitle="Booking a test before checking which one your universities and embassy accept is one of the most expensive mistakes students make. Here is how the three compare, and how to prepare properly."
        crumbs={[{ label: "Test Preparation", href: "/test-preparation" }]}
      />

      {/* --------------------------------------------------- comparison */}
      <section aria-labelledby="tests-heading" className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="tests-heading"
              eyebrow="Side by side"
              title="The Three Main Tests"
              subtitle="All three assess the same four skills. They differ in format, scoring method, turnaround and — most importantly — who accepts them."
            />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTS.map((t) => (
              <RevealItem
                key={t.name}
                className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7"
              >
                <span className="inline-flex w-fit rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-dark">
                  {t.tag}
                </span>
                <h3 className="mt-4 text-xl">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {t.body}
                </p>
                <div className="mt-5 border-t border-navy/10 pt-5">
                  <CheckList items={t.points} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mx-auto mt-10 max-w-3xl rounded-2xl bg-navy-gradient p-6 text-center sm:p-8">
            <p className="text-sm leading-relaxed text-white/85">
              <strong className="text-gold">Ask one question first:</strong> do
              my target universities and my destination embassy accept this
              test, and what score do they require? Every other consideration —
              cost, format, convenience — comes second.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- scores */}
      <section aria-labelledby="scores-heading" className="bg-white py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              id="scores-heading"
              align="left"
              eyebrow="Targets"
              title="What Score Will You Need?"
            />
            <div className="prose-page mt-6">
              <p>
                There is no single answer, and any consultancy quoting you one
                number for &ldquo;studying abroad&rdquo; is guessing. The
                requirement is set by each university for each programme, and
                the destination embassy may set its own separate minimum.
              </p>
              <p>
                As a general pattern, undergraduate entry requirements sit lower
                than postgraduate ones, and clinical, law and teaching
                programmes sit higher again. Many universities also set a
                per-section minimum, so a strong overall score with one weak
                section can still fall short.
              </p>
              <p>
                Send us your shortlist and we will confirm the exact
                requirement for each course — including whether individual
                section minimums apply — before you book anything.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/free-assessment" className="btn-gold">
                Get your target score confirmed
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              align="left"
              eyebrow="Preparation"
              title="How to Prepare Properly"
            />
            <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7">
              <CheckList items={PREP} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- form */}
      <section aria-labelledby="tp-form" className="bg-cream py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading
              id="tp-form"
              align="left"
              eyebrow="Not sure where to start?"
              title="Tell Us Your Destination"
              subtitle="We will confirm which tests your universities accept, what score you need, and give you a preparation plan built around your current level."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm variant="compact" source="Test Preparation page" />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- FAQs */}
      <section aria-labelledby="tp-faq" className="bg-white py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="tp-faq"
              eyebrow="Questions"
              title="English Test FAQs"
            />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <Accordion items={FAQS} defaultOpen={0} />
            <p className="mt-6 text-center text-sm text-ink/70">
              Read the full comparison in our guide:{" "}
              <Link
                href="/blog/ielts-vs-pte-vs-duolingo"
                className="font-semibold text-gold-dark underline-offset-2 hover:underline"
              >
                IELTS vs PTE vs Duolingo
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Book Your Free Counselling Session"
        body="We will confirm the test you need, the score to target, and how it fits into your application timeline."
      />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { label: "Test Preparation", href: "/test-preparation" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />
    </>
  );
}
