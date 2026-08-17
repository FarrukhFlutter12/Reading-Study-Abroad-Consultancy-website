import { CTABand, CheckList, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { UniversityExplorer } from "@/components/UniversityExplorer";
import { universities } from "@/data/universities";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Universities",
  description:
    "Universities we work with across the UK, Europe, Turkey and South Korea. Search by name or filter by destination, or ask us for a personalised shortlist.",
  path: "/universities",
});

export default function UniversitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Institutions"
        title="Universities We Work With"
        subtitle="We list only institutions we genuinely process applications for, and each one is verified before it appears here. If your target university is not listed, ask us — we may still be able to help you apply."
        crumbs={[{ label: "Universities", href: "/universities" }]}
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <UniversityExplorer items={universities} />
        </div>
      </section>

      <section aria-labelledby="choose-heading" className="bg-white py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              id="choose-heading"
              align="left"
              eyebrow="Before you pick"
              title="How to Judge a University Properly"
              subtitle="Ranking is the least useful signal for most students. These are the checks that actually matter."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
              <CheckList
                items={[
                  "Accreditation — is the institution recognised by its national authority, and will your degree be recognised back home?",
                  "Course content — read the actual module list, not the marketing page",
                  "Total cost — tuition for the full programme plus living costs in that specific city",
                  "Entry requirements — do you meet them now, or would you be applying on hope?",
                  "Language of instruction — fully English, or partly in the local language?",
                  "Location — a capital city and a regional town differ enormously in cost",
                  "Student support — what help exists for international students on arrival?",
                  "Scholarship policy — does the university itself offer merit discounts?",
                ]}
              />
              <p className="mt-6 border-t border-navy/10 pt-5 text-sm leading-relaxed text-ink/70">
                We will go through every one of these with you for each
                university on your shortlist, and tell you where an option is
                weaker than it looks.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Want a Shortlist Built Around Your Profile?"
        body="Send us your grades, your field and your budget. We will come back with universities you can realistically get into — ambitious, matched and safe."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Universities", href: "/universities" },
        ])}
      />
    </>
  );
}
