import { CTABand, PageHero } from "@/components/Blocks";
import { CountryCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { countries } from "@/data/countries";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Study Abroad Destinations",
  description:
    "Compare ten study abroad destinations for Pakistani students — the UK, Cyprus, Bulgaria, Italy, Lithuania, Malta, South Korea, Hungary, France and Turkey.",
  path: "/destinations",
});

const REGIONS = ["United Kingdom", "Europe", "Asia"] as const;

const REGION_COPY: Record<(typeof REGIONS)[number], string> = {
  "United Kingdom":
    "The most established destination for Pakistani students, with compact postgraduate programmes and English-medium teaching throughout.",
  Europe:
    "Seven EU and Mediterranean destinations covering the full range — from subsidised public universities to some of the lowest living costs in Europe.",
  Asia: "Two destinations offering strong technology and engineering faculties, active scholarship cultures, and a shorter, cheaper flight home.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Ten destinations"
        title="Where Could You Study?"
        subtitle="Each destination below is one we actively process applications for. Open any country for entry requirements, intake months, document checklists and honest notes on what it is actually like to study there."
        crumbs={[{ label: "Destinations", href: "/destinations" }]}
      />

      {REGIONS.map((region, ri) => {
        const list = countries.filter((c) => c.region === region);
        if (!list.length) return null;

        return (
          <section
            key={region}
            aria-labelledby={`region-${ri}`}
            className={ri % 2 === 0 ? "bg-cream py-14 lg:py-16" : "bg-white py-14 lg:py-16"}
          >
            <div className="container-page">
              <Reveal>
                <SectionHeading
                  id={`region-${ri}`}
                  align="left"
                  eyebrow={`${list.length} destination${list.length > 1 ? "s" : ""}`}
                  title={region}
                  subtitle={REGION_COPY[region]}
                />
              </Reveal>

              <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((c) => (
                  <RevealItem key={c.slug}>
                    <CountryCard country={c} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      <section className="bg-cream pb-16 lg:pb-20">
        <div className="container-page">
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl">Not sure which one fits you?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
              Almost every student arrives with a country already in mind, and a
              good number change it once they see the entry requirements and the
              total cost side by side. Send us your grades and budget and we
              will map your realistic options across all ten — including the
              ones you had not considered.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Compare Your Options with a Counsellor"
        body="Bring your transcripts and your budget. We will show you where you genuinely qualify across all ten destinations."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Destinations", href: "/destinations" },
        ])}
      />
    </>
  );
}
