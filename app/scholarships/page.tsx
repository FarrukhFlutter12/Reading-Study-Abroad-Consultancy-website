import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { CTABand, CheckList, PageHero } from "@/components/Blocks";
import { FeatureCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Scholarships & Funding",
  description:
    "How study abroad scholarships work for Pakistani students — merit awards, need-based schemes, government programmes and departmental funding explained.",
  path: "/scholarships",
});

const TYPES = [
  {
    icon: "award",
    title: "Government-Funded Programmes",
    body: "National scholarship schemes run by the destination country's government. Typically the most generous and by far the most competitive, with fixed annual cycles and early deadlines.",
  },
  {
    icon: "graduation",
    title: "University Merit Awards",
    body: "Tuition discounts or waivers offered directly by the university based on your academic record. Often applied automatically at admission, sometimes requiring a separate form.",
  },
  {
    icon: "heart",
    title: "Need-Based & Regional Schemes",
    body: "Assessed on family income rather than grades alone, and common in parts of Europe. These usually cover living costs and student services rather than tuition.",
  },
  {
    icon: "search",
    title: "Departmental & Research Funding",
    body: "Assistantships and research funding attached to a specific department or supervisor, mostly at Masters and PhD level. Applying early and contacting the supervisor matters.",
  },
];

const FAQS = [
  {
    q: "Can a consultancy get me a scholarship?",
    a: "No, and be very careful of anyone who says they can. Scholarship decisions are made by awarding bodies on merit or assessed financial need. What we do is identify what you are genuinely eligible for, keep you to the deadlines, and help you write a strong application.",
  },
  {
    q: "When should I start applying for scholarships?",
    a: "Earlier than for admission. Most scholarship deadlines fall months before ordinary university deadlines — sometimes an entire cycle earlier. Working backwards from the scholarship deadline is the only reliable way to plan.",
  },
  {
    q: "Do I need admission before I apply for a scholarship?",
    a: "It varies by scheme. Some require an existing offer, others run their own independent selection and place successful candidates afterwards. We map the correct sequence for each scheme you target.",
  },
  {
    q: "Are full scholarships realistic for Pakistani students?",
    a: "Fully funded scholarships exist and Pakistani students win them every year. They are also highly competitive and demand an excellent academic record with a strong written application. Plan for them; do not build your entire study plan around one.",
  },
  {
    q: "Does a low CGPA rule me out entirely?",
    a: "It rules out the most competitive merit awards, but not everything. Need-based schemes, university discounts and departmental funding weigh other factors. Bring us your actual transcript and we will tell you honestly what remains open.",
  },
  {
    q: "What makes a scholarship application strong?",
    a: "A clear, specific motivation statement, documents that are complete and correctly formatted, references from people who genuinely know your work, and submission well before the deadline. Rushed applications are visible to selection panels.",
  },
];

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Funding your studies"
        title="Scholarships & Funding Explained"
        subtitle="Scholarships are real, and Pakistani students win them every year. They are also competitive, deadline-driven and widely misrepresented. Here is how they actually work — with no invented figures and no promises."
        crumbs={[{ label: "Scholarships", href: "/scholarships" }]}
      />

      {/* ---------------------------------------------------------- types */}
      <section aria-labelledby="types-heading" className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="types-heading"
              eyebrow="Four categories"
              title="The Kinds of Funding That Exist"
              subtitle="Each has different eligibility rules and, critically, different deadlines. Most students only ever hear about the first category."
            />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {TYPES.map((t) => (
              <RevealItem key={t.title}>
                <FeatureCard icon={t.icon} title={t.title} body={t.body} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mx-auto mt-10 max-w-3xl rounded-2xl bg-gold/10 p-6 text-center">
            <p className="text-sm leading-relaxed text-ink/80">
              <strong className="text-navy">
                We do not publish scholarship amounts on this site.
              </strong>{" "}
              Award values, eligibility thresholds and deadlines are revised
              every cycle, and out-of-date figures do students real harm. Ask us
              for the current details of any scheme you are considering.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ strategy */}
      <section aria-labelledby="strategy-heading" className="bg-white py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              id="strategy-heading"
              align="left"
              eyebrow="Getting it right"
              title="How to Actually Improve Your Chances"
            />
            <div className="prose-page mt-6">
              <p>
                Most missed scholarships are not lost at the selection stage.
                They are lost months earlier, when a student was still deciding
                which university to apply to and the funding deadline quietly
                passed.
              </p>
              <p>
                The students who succeed treat the scholarship calendar as the
                real deadline and work everything else around it — English test
                dates, document attestation, reference letters and the
                application itself.
              </p>
            </div>

            <CheckList
              className="mt-8"
              items={[
                "Build your timeline backwards from the scholarship deadline, not the admission deadline",
                "Apply to several schemes — one application is not a strategy",
                "Write a specific motivation statement for each scheme; generic reuse is obvious",
                "Ask referees early and give them your CV and study plan to work from",
                "Get documents attested before the scholarship window opens",
                "Keep a self-funded application running in parallel as your fallback",
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl">Ask about your eligibility</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Tell us your grades and destination and we will identify the
                schemes you can realistically apply to — with their current
                deadlines.
              </p>
              <div className="mt-6">
                <LeadForm variant="compact" source="Scholarships page" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- FAQs */}
      <section aria-labelledby="sch-faq" className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="sch-faq"
              eyebrow="Questions"
              title="Scholarship FAQs"
            />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <Accordion items={FAQS} defaultOpen={0} />
            <p className="mt-6 text-center text-sm text-ink/70">
              See also our{" "}
              <Link
                href="/services/scholarship-assistance"
                className="font-semibold text-gold-dark underline-offset-2 hover:underline"
              >
                scholarship assistance service
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Find Out What You Qualify For"
        body="Bring your transcript. We will tell you which schemes are worth your time and which are not, before you spend weeks on an application."
      />

      <JsonLd
        data={[
          breadcrumbJsonLd([{ label: "Scholarships", href: "/scholarships" }]),
          faqJsonLd(FAQS),
        ]}
      />
    </>
  );
}
