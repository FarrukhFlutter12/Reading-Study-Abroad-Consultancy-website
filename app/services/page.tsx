import { CTABand, PageHero, StepTimeline } from "@/components/Blocks";
import { ServiceCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/data/process";
import { services } from "@/data/services";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Our Services",
  description:
    "Counselling, university applications, SOP support, financial documentation, visa filing, test prep and post-arrival help for Pakistani students in Peshawar.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ten services"
        title="Support at Every Stage of Your Application"
        subtitle="From the first counselling session to your first week abroad — handled by one team, so nothing falls between people. Every service below is described in full on its own page."
        crumbs={[{ label: "Services", href: "/services" }]}
      />

      <section aria-labelledby="all-services" className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="all-services"
              eyebrow="What we do"
              title="Everything We Handle for You"
              subtitle="You are not obliged to take all of it. Many students come to us for one stage — a visa file review, or an SOP — and that is fine."
            />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="bg-white py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="how-heading"
              eyebrow="How it fits together"
              title="The Order We Work In"
              subtitle="Each service maps to a stage of the journey. Skipping a stage is usually what creates problems later."
            />
          </Reveal>
          <div className="mt-14">
            <StepTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      <CTABand />

      <JsonLd data={breadcrumbJsonLd([{ label: "Services", href: "/services" }])} />
    </>
  );
}
