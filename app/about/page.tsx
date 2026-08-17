import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CTABand, CheckList, PageHero } from "@/components/Blocks";
import { FeatureCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { countries } from "@/data/countries";
import { usps } from "@/data/process";
import { site } from "@/data/site";
import { mission, officePhotos, team, values, vision } from "@/data/team";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { isReady, mapsEmbed, mapsLink } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "Reading Study Abroad is a study abroad consultancy in Hayatabad, Peshawar, guiding Pakistani students to the UK, Europe, Turkey and South Korea.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Peshawar Consultancy That Tells Students the Truth"
        subtitle="We are based in Basharat Market, Hayatabad. Students and their families walk in, sit down with a counsellor, and leave with a realistic plan — whether or not they proceed with us."
        crumbs={[{ label: "About", href: "/about" }]}
      />

      {/* ---------------------------------------------------------- story */}
      <section aria-labelledby="story-heading" className="bg-cream py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              id="story-heading"
              align="left"
              eyebrow="Our story"
              title="Built Around One Frustration"
            />
            <div className="prose-page mt-6">
              <p>
                Anyone who has helped a student apply abroad from Pakistan knows
                the pattern. A student is told a destination is easy. Fees are
                quoted that turn out to be the first year only. A file is
                submitted with a downloaded Statement of Purpose and a bank
                statement in the wrong format. The refusal arrives, and by then
                the intake has closed and the money is gone.
              </p>
              <p>
                Reading Study Abroad was set up to work the other way round. The
                first meeting is an assessment, not a pitch. We look at your
                academic record, your family&rsquo;s realistic budget and the
                entry criteria for the intake you are targeting, then tell you
                where you genuinely stand. Sometimes that means telling a student
                their preferred country is not the right one for them.
              </p>
              <p>
                From there, the work is unglamorous and detailed: choosing a
                course that follows logically from what you have studied,
                assembling documents in the exact format each embassy expects,
                and preparing you properly for an interview. That is where
                applications are won and lost.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/free-assessment" className="btn-gold">
                Book Free Counselling
              </Link>
              <Link href="/services" className="btn-outline-navy">
                See our services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5">
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7">
                <h3 className="text-lg">Our mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {mission}
                </p>
              </div>
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7">
                <h3 className="text-lg">Our vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {vision}
                </p>
              </div>
              <div className="rounded-2xl bg-navy-gradient p-6 text-white sm:p-7">
                <h3 className="text-lg text-white">What we cover</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Ten destinations, processed from one office in Hayatabad:
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {countries.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/destinations/${c.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-gold hover:text-gold"
                      >
                        <span className="relative h-4 w-4 overflow-hidden rounded-full">
                          <Image
                            src={c.flag}
                            alt=""
                            fill
                            sizes="16px"
                            className="object-cover"
                          />
                        </span>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- values */}
      <section aria-labelledby="values-heading" className="bg-white py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="values-heading"
              eyebrow="How we work"
              title="Four Things We Do Not Compromise On"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <FeatureCard icon={v.icon} title={v.title} body={v.body} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ----------------------------------------------------------- USPs */}
      <section aria-labelledby="usp-about" className="bg-cream py-14 lg:py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="usp-about"
              eyebrow="What students get"
              title="Our Five Commitments"
            />
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
            <CheckList items={usps.map((u) => u.title)} />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- team */}
      {team.length > 0 && (
        <section aria-labelledby="team-heading" className="bg-white py-14 lg:py-20">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                id="team-heading"
                eyebrow="Who you will meet"
                title="Our Counsellors"
              />
            </Reveal>
            <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <RevealItem
                  key={m.id}
                  className="rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-card"
                >
                  {m.photo && (
                    <span className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full ring-1 ring-navy/10">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </span>
                  )}
                  <h3 className="mt-4 text-base">{m.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    {m.role}
                  </p>
                  {m.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {m.bio}
                    </p>
                  )}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- gallery */}
      {officePhotos.length > 0 && (
        <section aria-labelledby="office-heading" className="bg-cream py-14 lg:py-20">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                id="office-heading"
                eyebrow="Our office"
                title="Basharat Market, Hayatabad"
              />
            </Reveal>
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {officePhotos.map((p) => (
                <RevealItem
                  key={p.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy/10 shadow-card"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------- map */}
      <section aria-labelledby="visit-heading" className="bg-white py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading
              id="visit-heading"
              align="left"
              eyebrow="Come and see us"
              title="Visit Our Hayatabad Office"
              subtitle="Bring your transcripts and your family. The first counselling session is free, and you will leave with a written plan whether or not you proceed with us."
            />

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="leading-relaxed text-ink/80">
                  {site.address.street}
                  <br />
                  {site.address.city}
                  <br />
                  {site.address.region}, {site.address.country}
                </span>
              </li>
              {isReady(site.officeHours) && (
                <li className="text-ink/80">{site.officeHours}</li>
              )}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mapsLink(site.address.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Open in Google Maps
              </a>
              <Link href="/contact" className="btn-outline-navy">
                Contact details
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-card">
              <iframe
                src={mapsEmbed(site.address.mapsQuery)}
                title={`Map showing ${site.name} in ${site.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[340px] w-full border-0 sm:h-[420px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />

      <JsonLd data={breadcrumbJsonLd([{ label: "About", href: "/about" }])} />
    </>
  );
}
