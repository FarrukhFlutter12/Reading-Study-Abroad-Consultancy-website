import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/Blocks";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { isReady, mapsEmbed, mapsLink, telLink, waLink } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Contact Us",
  description:
    "Contact Reading Study Abroad in Basharat Market, Phase 03, Hayatabad, Peshawar. Call, WhatsApp or email our study abroad counsellors.",
  path: "/contact",
});

const WA_MESSAGE =
  "Assalam-o-Alaikum! I would like to book a free counselling session.";

export default function ContactPage() {
  const { facebook, instagram, tiktok } = site.socials;
  const hasSocial = isReady(facebook) || isReady(instagram) || isReady(tiktok);

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Talk to a Counsellor"
        subtitle="Call, message on WhatsApp, email, or simply walk into our Hayatabad office. The first counselling session is free and carries no obligation."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      {/* -------------------------------------------------- contact cards */}
      <section aria-labelledby="ways-heading" className="bg-cream py-14 lg:py-16">
        <div className="container-page">
          <h2 id="ways-heading" className="sr-only">
            Ways to reach us
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* phones */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold">
                <Phone className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 text-base">Call us</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {site.phones.map((p, i) => (
                  <li key={p}>
                    <a
                      href={telLink(p)}
                      className="rounded font-medium text-navy transition-colors hover:text-gold-dark"
                    >
                      {site.phonesDisplay[i]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* whatsapp */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366] text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base">WhatsApp</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {site.phones.map((p, i) => (
                  <li key={p}>
                    <a
                      href={waLink(p, WA_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded font-medium text-navy transition-colors hover:text-gold-dark"
                    >
                      {site.phonesDisplay[i]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* email */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold">
                <Mail className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 text-base">Email</h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block break-all rounded text-sm font-medium text-navy transition-colors hover:text-gold-dark"
              >
                {site.email}
              </a>
            </div>

            {/* address */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold">
                <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 text-base">Visit</h3>
              <a
                href={mapsLink(site.address.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded text-sm leading-relaxed text-ink/75 transition-colors hover:text-gold-dark"
              >
                {site.address.street}
                <br />
                {site.address.city}
              </a>
            </div>
          </div>

          {(isReady(site.officeHours) || hasSocial) && (
            <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
              {isReady(site.officeHours) && (
                <p className="flex items-center gap-3 text-sm text-ink/80">
                  <Clock
                    className="h-5 w-5 shrink-0 text-gold-dark"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>
                    <span className="font-semibold text-navy">
                      Office hours:{" "}
                    </span>
                    {site.officeHours}
                  </span>
                </p>
              )}

              {hasSocial && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-navy">
                    Follow us
                  </span>
                  {isReady(facebook) && (
                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on Facebook`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                  )}
                  {isReady(instagram) && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on Instagram`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                  )}
                  {isReady(tiktok) && (
                    <a
                      href={tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on TikTok`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      <TikTokIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------- form + map */}
      <section aria-labelledby="form-heading" className="bg-white py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              id="form-heading"
              align="left"
              eyebrow="Send a message"
              title="Tell Us What You Need"
              subtitle="Fill this in and a counsellor will reply within 24 hours. If you would rather answer the full questionnaire, use the free assessment instead."
            />
            <div className="mt-8">
              <LeadForm variant="full" source="Contact page" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              align="left"
              eyebrow="Find us"
              title="Basharat Market, Phase 03"
              subtitle="We are in Hayatabad, Peshawar. Walk-ins are welcome during office hours — no appointment needed for a first counselling session."
            />
            <div className="mt-8 overflow-hidden rounded-2xl border border-navy/10 shadow-card">
              <iframe
                src={mapsEmbed(site.address.mapsQuery)}
                title={`Map showing ${site.name} in ${site.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0 lg:h-[520px]"
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink/55">
              Map pin is approximate. Call us if you need directions on the day.
            </p>
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ label: "Contact", href: "/contact" }])} />
    </>
  );
}
