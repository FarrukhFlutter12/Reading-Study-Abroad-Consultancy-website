import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { countries, inName } from "@/data/countries";
import { legalLinks, quickLinks } from "@/data/nav";
import { disclaimer, site } from "@/data/site";
import { isReady, mapsLink, telLink } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const { facebook, instagram, tiktok } = site.socials;
  const hasSocial =
    isReady(facebook) || isReady(instagram) || isReady(tiktok);

  return (
    <footer className="bg-navy-dark text-white/75">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* About */}
        <div>
          <Logo variant="dark" />
          <p className="mt-5 font-script text-lg italic text-gold-light">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            Study abroad consultants based in Hayatabad, Peshawar. We guide
            Pakistani students through course selection, admissions, financial
            documentation and student visa filing for ten destinations.
          </p>

          {hasSocial && (
            <div className="mt-6 flex items-center gap-3">
              {isReady(facebook) && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on Facebook`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
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
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
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
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Quick links */}
        <nav aria-labelledby="footer-quick">
          <h2
            id="footer-quick"
            className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-white"
          >
            Quick Links
          </h2>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Destinations */}
        <nav aria-labelledby="footer-destinations">
          <h2
            id="footer-destinations"
            className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-white"
          >
            Destinations
          </h2>
          <ul className="space-y-2.5 text-sm">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/destinations/${c.slug}`}
                  className="rounded transition-colors hover:text-gold"
                >
                  Study in {inName(c)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Contact
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={2}
                aria-hidden
              />
              <a
                href={mapsLink(site.address.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded leading-relaxed transition-colors hover:text-gold"
              >
                {site.address.street}
                <br />
                {site.address.city}
                <br />
                {site.address.region}, {site.address.country}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={2}
                aria-hidden
              />
              <span className="flex flex-col gap-1">
                {site.phones.map((p, i) => (
                  <a
                    key={p}
                    href={telLink(p)}
                    className="rounded transition-colors hover:text-gold"
                  >
                    {site.phonesDisplay[i]}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={2}
                aria-hidden
              />
              <a
                href={`mailto:${site.email}`}
                className="break-all rounded transition-colors hover:text-gold"
              >
                {site.email}
              </a>
            </li>
            {isReady(site.officeHours) && (
              <li className="flex gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  strokeWidth={2}
                  aria-hidden
                />
                <span>{site.officeHours}</span>
              </li>
            )}
          </ul>

          <Link
            href="/free-assessment"
            className="btn-gold mt-6 w-full text-sm"
          >
            Free Eligibility Check
          </Link>
        </div>
      </div>

      {/* Disclaimer + legal */}
      <div className="border-t border-white/10">
        <div className="container-page py-6">
          <p className="text-xs leading-relaxed text-white/55">{disclaimer}</p>
          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="rounded transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sitemap.xml"
                  className="rounded transition-colors hover:text-gold"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
