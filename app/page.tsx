import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import {
  CTABand,
  CheckList,
  EmptyState,
  StepTimeline,
} from "@/components/Blocks";
import {
  CountryCard,
  FeatureCard,
  ServiceCard,
  TestimonialCard,
} from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatCounter } from "@/components/StatCounter";
import { countries } from "@/data/countries";
import { homeFaqs } from "@/data/faqs";
import { processSteps, usps, whyChooseUs } from "@/data/process";
import { services } from "@/data/services";
import { site, statLabels } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { faqJsonLd } from "@/lib/seo";
import { isReady } from "@/lib/utils";

export const dynamic = "force-static";

export default function HomePage() {
  const readyStats = (
    Object.entries(site.stats) as [keyof typeof site.stats, string][]
  ).filter(([, v]) => isReady(v));

  // A single real number is not a stats band — wait until the client supplies more.
  const showStats = readyStats.length >= 2;

  return (
    <>
      <Hero />

      {/* ------------------------------------------------- 2. trust bar */}
      <section aria-labelledby="usp-heading" className="bg-cream pb-4">
        <h2 id="usp-heading" className="sr-only">
          Why students choose Reading Study Abroad
        </h2>
        <div className="container-page">
          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {usps.map((u) => (
              <RevealItem
                key={u.title}
                className="flex flex-col items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-gold">
                  <Icon name={u.icon} className="h-6 w-6" />
                </span>
                <span className="font-display text-[13px] font-semibold uppercase leading-tight tracking-wide text-navy sm:text-sm">
                  {u.title}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* --------------------------------------------- 3. destinations */}
      <section
        aria-labelledby="destinations-heading"
        className="bg-cream py-16 lg:py-20"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="destinations-heading"
              eyebrow="Where you can study"
              title="Ten Destinations, Compared Honestly"
              subtitle="Every country below is one we actively process applications for. Open any destination for entry requirements, intakes, document checklists and the questions students ask most."
            />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {countries.map((c) => (
              <RevealItem key={c.slug}>
                <CountryCard country={c} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <Link href="/destinations" className="btn-outline-navy">
              Compare all destinations
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ 4. why us */}
      <section aria-labelledby="why-heading" className="bg-white py-16 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="why-heading"
              eyebrow="Why Reading Study Abroad"
              title="A Consultancy That Tells You the Truth"
              subtitle="We would rather lose an application fee than send a student into a case we do not believe in."
            />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((w) => (
              <RevealItem key={w.title}>
                <FeatureCard icon={w.icon} title={w.title} body={w.body} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------- 5. process */}
      <section
        aria-labelledby="process-heading"
        className="bg-cream py-16 lg:py-20"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="process-heading"
              eyebrow="How it works"
              title="Your Journey, Step by Step"
              subtitle="From the first counselling session to the week after you land — handled by the same team, so nothing falls between people."
            />
          </Reveal>

          <div className="mt-14">
            <StepTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ 6. services */}
      <section
        aria-labelledby="services-heading"
        className="bg-white py-16 lg:py-20"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="services-heading"
              eyebrow="What we do"
              title="Support at Every Stage"
              subtitle="Ten services covering the full journey — from choosing a course to settling into your new city."
            />
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <Link href="/services" className="btn-outline-navy">
              See all ten services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- 7. stats */}
      {showStats && (
        <section aria-label="Our numbers" className="bg-navy-gradient">
          <div className="container-page py-14 lg:py-16">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {readyStats.map(([key, value]) => (
                <StatCounter
                  key={key}
                  value={value}
                  label={statLabels[key]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------- 8. success stories */}
      <section
        aria-labelledby="stories-heading"
        className="bg-cream py-16 lg:py-20"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="stories-heading"
              eyebrow="Student stories"
              title="Students We Have Guided"
              subtitle={
                testimonials.length
                  ? "Real students, shared with their permission."
                  : undefined
              }
            />
          </Reveal>

          <div className="mt-12">
            {testimonials.length ? (
              <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.slice(0, 3).map((t) => (
                  <RevealItem key={t.id}>
                    <TestimonialCard item={t} />
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : (
              <EmptyState
                icon="sparkles"
                title="Your story could be next"
                body="We publish student stories only with written permission, so this space stays empty until our students are ready to share theirs. Start your own journey with a free counselling session."
                ctaLabel="Start Free Assessment"
              />
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------- 9. inline lead capture */}
      <section
        aria-labelledby="assess-heading"
        className="relative overflow-hidden bg-navy-gradient py-16 lg:py-20"
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-40"
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
              Free eligibility check
            </p>
            <h2 id="assess-heading" className="text-2xl text-white sm:text-3xl">
              Find Out Where You Actually Qualify
            </h2>
            <span
              aria-hidden
              className="mt-4 block h-1 w-14 rounded-full bg-gold"
            />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
              Send us your basic details and a counsellor will come back to you
              within 24 hours with the destinations that realistically match
              your grades and budget.
            </p>

            <CheckList
              className="mt-8 [&_li]:text-white/80"
              items={[
                "No fee and no obligation for the first session",
                "Honest assessment — we will tell you if a plan is unrealistic",
                "Answers in English, Urdu or Pashto",
                "Want the detailed version? Use the four-step assessment.",
              ]}
            />

            <Link
              href="/free-assessment"
              className="btn-outline-light mt-8 inline-flex"
            >
              Open the detailed assessment
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <LeadForm variant="compact" source="Home — inline form" onDark />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- 10. FAQs */}
      <section aria-labelledby="faq-heading" className="bg-white py-16 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="faq-heading"
              eyebrow="Questions students ask"
              title="Frequently Asked Questions"
            />
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <Accordion items={homeFaqs} defaultOpen={0} />
            <p className="mt-6 text-center text-sm text-ink/70">
              More than 25 answers on eligibility, costs, tests and visas —{" "}
              <Link
                href="/faqs"
                className="font-semibold text-gold-dark underline-offset-2 hover:underline"
              >
                read the full FAQ
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------- 11. CTA band */}
      <CTABand />

      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
