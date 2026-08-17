import { Accordion } from "@/components/Accordion";
import { CTABand, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { allFaqs, faqGroups } from "@/data/faqs";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "Answers on eligibility, English tests, costs, scholarships, student visas and post-arrival support for Pakistani students planning to study abroad.",
  path: "/faqs",
});

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${allFaqs.length} answers`}
        title="Frequently Asked Questions"
        subtitle="Everything students and parents ask us most, grouped by stage. If your question is not here, send it to us — we will answer it and add it to this page."
        crumbs={[{ label: "FAQs", href: "/faqs" }]}
      >
        <nav aria-label="FAQ categories" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <li key={g.category}>
                <a
                  href={`#${slug(g.category)}`}
                  className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-gold hover:text-gold"
                >
                  {g.category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page space-y-14">
          {faqGroups.map((g) => (
            <Reveal key={g.category}>
              <div id={slug(g.category)} className="scroll-mt-28">
                <SectionHeading
                  align="left"
                  eyebrow={`${g.items.length} question${g.items.length > 1 ? "s" : ""}`}
                  title={g.category}
                />
                <Accordion className="mt-6" items={g.items} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        title="Still Have a Question?"
        body="Ask a counsellor directly. The first session is free, and we answer in English, Urdu or Pashto."
        secondary={{ label: "Contact Us", href: "/contact" }}
      />

      <JsonLd
        data={[
          breadcrumbJsonLd([{ label: "FAQs", href: "/faqs" }]),
          faqJsonLd(allFaqs),
        ]}
      />
    </>
  );
}
