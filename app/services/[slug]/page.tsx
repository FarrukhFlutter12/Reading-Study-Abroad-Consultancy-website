import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs, CTABand, CheckList } from "@/components/Blocks";
import { ServiceCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { serviceBySlug, services } from "@/data/services";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMeta,
  serviceJsonLd,
} from "@/lib/seo";

export const dynamic = "force-static";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  if (!s) return {};

  return pageMeta({
    title: s.title,
    description: s.short,
    path: `/services/${s.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  if (!s) notFound();

  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

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
          className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs
            onDark
            items={[
              { label: "Services", href: "/services" },
              { label: s.title, href: `/services/${s.slug}` },
            ]}
          />

          <span className="mt-8 grid h-14 w-14 place-items-center rounded-2xl bg-gold text-navy-dark shadow-chip">
            <Icon name={s.icon} className="h-7 w-7" strokeWidth={2} />
          </span>

          <h1 className="mt-6 max-w-3xl text-3xl text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
            {s.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            {s.short}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-assessment" className="btn-gold px-7 py-3.5">
              Book a Free Session
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn-outline-light px-7 py-3.5">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ body + sidebar */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-14">
          <div className="min-w-0 space-y-14">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Overview"
                title="What this actually involves"
              />
              <div className="prose-page mt-6">
                {s.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Included"
                title="What you get"
              />
              <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7">
                <CheckList items={s.included} />
              </div>
            </Reveal>

            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Right for you?"
                title="Who this is for"
              />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {s.forWhom.map((w) => (
                  <li
                    key={w}
                    className="rounded-2xl border border-navy/10 bg-white p-5 text-sm leading-relaxed text-ink/80 shadow-card"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Process"
                title="How it works"
              />
              <ol className="mt-6 space-y-4">
                {s.steps.map((st, i) => (
                  <li
                    key={st.title}
                    className="flex gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-card sm:p-6"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold text-navy">
                        {st.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink/75">
                        {st.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Questions"
                title="Frequently asked"
              />
              <Accordion className="mt-6" items={s.faqs} defaultOpen={0} />
            </Reveal>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                Free counselling
              </p>
              <h2 className="mb-4 text-xl">Talk to a counsellor</h2>
              <LeadForm variant="compact" source={`Service — ${s.title}`} />
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------- other services */}
      <section
        aria-labelledby="other-services"
        className="bg-white py-14 lg:py-16"
      >
        <div className="container-page">
          <SectionHeading
            id="other-services"
            align="left"
            eyebrow="Also available"
            title="Other ways we can help"
          />
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <RevealItem key={o.slug}>
                <ServiceCard service={o} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Link href="/services" className="btn-outline-navy mt-8 inline-flex">
            All ten services
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <CTABand />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { label: "Services", href: "/services" },
            { label: s.title, href: `/services/${s.slug}` },
          ]),
          serviceJsonLd({
            name: s.title,
            description: s.short,
            path: `/services/${s.slug}`,
          }),
          faqJsonLd(s.faqs),
        ]}
      />
    </>
  );
}
