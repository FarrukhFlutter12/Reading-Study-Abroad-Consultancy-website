import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { countries } from "@/data/countries";
import { site } from "@/data/site";
import { waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./Icon";

/**
 * Deliberately a server component with CSS-only entrance animation.
 *
 * The hero holds the LCP element, so it must never wait for Framer Motion to
 * hydrate before painting — on a mid-range Android over 3G that costs seconds.
 * Framer is used for the below-the-fold scroll reveals instead (see Reveal.tsx).
 * `prefers-reduced-motion` is handled globally in globals.css.
 */

const WA_MESSAGE =
  "Assalam-o-Alaikum! I saw your website and would like to know more about studying abroad.";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      {/* world-map dot pattern */}
      <span
        aria-hidden
        className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-50"
      />
      <span
        aria-hidden
        className="absolute -left-40 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-gold/[0.07] blur-3xl"
      />

      <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:py-24">
        {/* ------------------------------------------------------ copy */}
        <div>
          <p
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light"
            style={{ animationDelay: "60ms" }}
          >
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            Hayatabad, Peshawar
          </p>

          <h1 className="mt-6 text-[2.15rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.06]">
            Study Abroad with{" "}
            <span className="relative whitespace-nowrap text-gold">
              Confidence
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-gold/50"
              >
                <path
                  d="M2 9C40 3 90 2 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="mt-7 animate-fade-up font-script text-xl italic text-gold-light sm:text-2xl"
            style={{ animationDelay: "140ms" }}
          >
            {site.tagline}
          </p>

          <p
            className="mt-5 max-w-xl animate-fade-up text-[15px] leading-relaxed text-white/75 sm:text-base"
            style={{ animationDelay: "220ms" }}
          >
            Personalised counselling, university applications, financial
            documentation and student visa guidance — for ten destinations
            across the UK, Europe, Turkey and South Korea. Start with a free
            eligibility check.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/free-assessment"
              className="btn-gold px-7 py-3.5 text-base"
            >
              Free Eligibility Check
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={waLink(site.whatsapp, WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light px-7 py-3.5 text-base"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>

          <p
            className="mt-6 animate-fade-up text-xs leading-relaxed text-white/50"
            style={{ animationDelay: "380ms" }}
          >
            Free counselling · No obligation · Reply within 24 hours
          </p>
        </div>

        {/* --------------------------------------------------- flag chips */}
        <ul
          aria-label="Study destinations we work with"
          className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 lg:grid-cols-4 lg:gap-4"
        >
          {countries.map((c, i) => (
            <li
              key={c.slug}
              className={`animate-fade-up ${i % 4 === 1 ? "lg:translate-y-5" : ""}`}
              style={{ animationDelay: `${420 + i * 60}ms` }}
            >
              <Link
                href={`/destinations/${c.slug}`}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-white/10 sm:p-4"
              >
                <span className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/80 shadow-chip sm:h-12 sm:w-12">
                  <Image
                    src={c.flag}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                    priority={i < 5}
                  />
                </span>
                <span className="rounded-full bg-navy-dark/70 px-2.5 py-1 text-center text-[9.5px] font-bold uppercase leading-tight tracking-wider text-white transition-colors group-hover:bg-gold group-hover:text-navy-dark sm:text-[10px]">
                  {c.name === "United Kingdom" ? "UK" : c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* sweeping curve into the next section */}
      <div aria-hidden className="pointer-events-none leading-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-[46px] w-full sm:h-[70px]"
        >
          <path
            d="M0,90 C240,10 480,0 720,22 C960,44 1200,80 1440,54 L1440,90 Z"
            fill="#FDFBF7"
          />
        </svg>
      </div>
    </section>
  );
}
