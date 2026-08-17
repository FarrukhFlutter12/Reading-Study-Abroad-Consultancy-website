import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, GraduationCap, Languages } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs, CTABand, CheckList } from "@/components/Blocks";
import { CountryCardGrid } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PrintButton } from "@/components/PrintButton";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { countries, countryBySlug, inName } from "@/data/countries";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = countryBySlug(params.slug);
  if (!c) return {};

  return pageMeta({
    title: `Study in ${inName(c)} from Pakistan`,
    description: `${c.blurb} Entry requirements, intakes, documents and visa guidance for Pakistani students — from Reading Study Abroad, Peshawar.`,
    path: `/destinations/${c.slug}`,
  });
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const c = countryBySlug(params.slug);
  if (!c) notFound();

  const related = countries
    .filter((x) => x.slug !== c.slug && x.region === c.region)
    .slice(0, 4);
  const fallbackRelated = countries.filter((x) => x.slug !== c.slug).slice(0, 4);
  const relatedList = related.length >= 2 ? related : fallbackRelated;

  return (
    <>
      {/* --------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-navy-gradient">
        <span
          aria-hidden
          className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-40"
        />
        <span
          aria-hidden
          className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        />

        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs
            onDark
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: c.name, href: `/destinations/${c.slug}` },
            ]}
          />

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white/90 shadow-lift sm:h-24 sm:w-24">
              <Image
                src={c.flag}
                alt={`Flag of ${c.name}`}
                fill
                sizes="96px"
                priority
                className="object-cover"
              />
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                {c.region}
              </p>
              <h1 className="mt-2 text-3xl text-white sm:text-4xl lg:text-[2.85rem]">
                Study in {inName(c)}
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75">
                {c.blurb}
              </p>
            </div>
          </div>

          {/* quick facts */}
          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: <Languages className="h-5 w-5" aria-hidden />,
                label: "Language of instruction",
                value: c.languageOfInstruction,
              },
              {
                icon: <Calendar className="h-5 w-5" aria-hidden />,
                label: "Main intakes",
                value: c.intakes.join(" · "),
              },
              {
                icon: <GraduationCap className="h-5 w-5" aria-hidden />,
                label: "Popular fields",
                value: c.popularCourses.slice(0, 3).join(", "),
              },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-light">
                  {f.icon}
                  {f.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-white/85">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------ body + sidebar */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-14">
          <div className="min-w-0 space-y-14">
            {/* intro */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Overview"
                title={`Why Pakistani students choose ${inName(c)}`}
              />
              <div className="prose-page mt-6">
                {c.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* highlights */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="At a glance"
                title="Key highlights"
              />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {c.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-2xl border border-navy/10 bg-white p-5 text-sm leading-relaxed text-ink/80 shadow-card"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* courses */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Fields of study"
                title="Popular courses"
                subtitle="Programme availability differs between universities — ask us which institutions currently run the course you want."
              />
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {c.popularCourses.map((course) => (
                  <li
                    key={course}
                    className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy shadow-card"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* intakes */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Timing"
                title="Intakes"
                subtitle="Applications open months before the intake month, and scholarship deadlines usually fall earlier still. Plan backwards from the deadline, not forwards from today."
              />
              <ol className="mt-6 grid gap-4 sm:grid-cols-3">
                {c.intakes.map((intake, i) => (
                  <li
                    key={intake}
                    className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.18em] text-gold-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1.5 font-display text-base font-semibold text-navy">
                      {intake}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* requirements */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Eligibility"
                title="Admission requirements"
              />
              <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7">
                <CheckList items={c.requirements} />
              </div>
              <p className="mt-4 rounded-xl bg-gold/10 p-4 text-sm leading-relaxed text-ink/75">
                <strong className="text-navy">Note on specifics:</strong>{" "}
                {c.tuitionNote} Requirements change each intake —{" "}
                <Link
                  href="/free-assessment"
                  className="font-semibold text-gold-dark underline-offset-2 hover:underline"
                >
                  book a free counselling session
                </Link>{" "}
                for the current criteria.
              </p>
            </Reveal>

            {/* documents */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Paperwork"
                title="Document checklist"
                subtitle="Start attestation and legalisation early — it is the stage that most often costs students an intake."
              />
              <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7">
                <CheckList items={c.documents} columns={2} />
                <div className="mt-6 border-t border-navy/10 pt-5">
                  <PrintButton label={`Print the ${inName(c)} checklist`} />
                </div>
              </div>
            </Reveal>

            {/* process */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Step by step"
                title={`How we process a ${inName(c)} application`}
              />
              <ol className="mt-6 space-y-4">
                {c.processSteps.map((s, i) => (
                  <li
                    key={s}
                    className="flex gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-card"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <span className="pt-1.5 text-sm leading-relaxed text-ink/80">
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* faqs */}
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Questions"
                title={`${c.name} FAQs`}
              />
              <Accordion className="mt-6" items={c.faqs} defaultOpen={0} />
            </Reveal>
          </div>

          {/* ------------------------------------------------- sidebar */}
          <aside className="no-print space-y-5 lg:sticky lg:top-28">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                Free counselling
              </p>
              <h2 className="mb-4 text-xl">
                Ask about studying in {inName(c)}
              </h2>
              <LeadForm
                variant="compact"
                source={`Destination — ${c.name}`}
                presetCountry={c.name}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------------- related */}
      <section
        aria-labelledby="related-heading"
        className="bg-white py-14 lg:py-16"
      >
        <div className="container-page">
          <SectionHeading
            id="related-heading"
            align="left"
            eyebrow="Keep comparing"
            title="Other destinations to consider"
          />
          <div className="mt-8">
            <CountryCardGrid countries={relatedList} />
          </div>
          <Link
            href="/destinations"
            className="btn-outline-navy mt-8 inline-flex"
          >
            All ten destinations
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <CTABand
        title={`Ready to Apply to ${inName(c)}?`}
        body="Start with the free assessment. We will confirm whether you meet the current entry criteria before you spend anything."
      />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { label: "Destinations", href: "/destinations" },
            { label: c.name, href: `/destinations/${c.slug}` },
          ]),
          faqJsonLd(c.faqs),
        ]}
      />
    </>
  );
}
