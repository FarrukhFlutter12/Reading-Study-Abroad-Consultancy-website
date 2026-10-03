import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import type { Country } from "@/data/countries";
import { countryBySlug } from "@/data/countries";
import { images } from "@/data/images";
import type { Service } from "@/data/services";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { RevealGroup, RevealItem } from "./Reveal";
import { SmartImage } from "./SmartImage";

/* --------------------------------------------------------------- country */

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/destinations/${country.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
    >
      {/* Photo band. Falls back to the brand panel until a photo is supplied. */}
      <span className="relative block aspect-[16/9] w-full">
        <SmartImage
          slot={images.destinations[country.slug].card}
          overlay="soft"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute bottom-3 left-3 h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-chip">
          <Image
            src={country.flag}
            alt={`Flag of ${country.name}`}
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
      </span>

      <div className="flex flex-1 flex-col p-6">
      <h3 className="text-lg transition-colors group-hover:text-gold-dark">
        {country.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
        {country.blurb}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
        Explore
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </span>
      </div>
    </Link>
  );
}

/** Responsive grid of country cards with staggered entrance. */
export function CountryCardGrid({ countries }: { countries: Country[] }) {
  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {countries.map((c) => (
        <RevealItem key={c.slug}>
          <CountryCard country={c} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/* --------------------------------------------------------------- service */

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-brand/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-gold transition-colors group-hover:bg-gold group-hover:text-brand-dark">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>

      <h3 className="mt-5 text-base leading-snug transition-colors group-hover:text-gold-dark sm:text-lg">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
        {service.short}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
        Learn more
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------- feature */

export function FeatureCard({
  icon,
  title,
  body,
  className,
}: {
  icon: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full rounded-2xl border border-brand/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift",
        className,
      )}
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-dark">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base sm:text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{body}</p>
    </div>
  );
}

/* ---------------------------------------------------------- testimonial */

/** Display name for a destination slug that has no page in data/countries.ts. */
export const destinationLabel = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/**
 * Flags for student destinations that aren't one of the ten countries this
 * agency actively promotes (data/countries.ts) and so have no full
 * /destinations page — only a hand-authored flag for the testimonial chip.
 */
const OTHER_DESTINATION_FLAGS: Record<string, string> = {
  belarus: "/flags/belarus.svg",
};

export function TestimonialCard({ item }: { item: Testimonial }) {
  const country = item.country ? countryBySlug(item.country) : undefined;
  const otherDestination =
    !country && item.country ? destinationLabel(item.country) : undefined;
  const meta = [item.city, item.course, item.university, item.intake].filter(
    Boolean,
  );
  const initials = item.name
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift">
      <Quote
        className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 text-gold/[0.08] transition-transform duration-300 group-hover:scale-110"
        strokeWidth={1}
        aria-hidden
      />

      <div className="relative flex items-center gap-4">
        {item.photo ? (
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-[3px] border-white bg-white shadow-chip ring-2 ring-gold/60">
            <Image
              src={item.photo}
              alt={item.name}
              fill
              sizes="80px"
              className="object-contain"
            />
          </span>
        ) : (
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-[3px] border-white bg-brand text-lg font-display font-semibold text-gold shadow-chip ring-2 ring-gold/30">
            {initials}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-brand">
            {item.name}
          </span>
          {meta.length > 0 && (
            <span className="block truncate text-xs text-ink/60">
              {meta.join(" · ")}
            </span>
          )}
        </span>
      </div>

      <blockquote className="relative mt-5 flex-1 text-sm leading-relaxed text-ink/80">
        “{item.quote}”
      </blockquote>

      {(country || otherDestination) && (
        <figcaption className="relative mt-5 flex items-center border-t border-brand/10 pt-4">
          {country && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/10 bg-cream px-3 py-1 text-xs font-medium text-brand">
              <span className="relative h-4 w-4 overflow-hidden rounded-full">
                <Image
                  src={country.flag}
                  alt=""
                  fill
                  sizes="16px"
                  className="object-cover"
                />
              </span>
              {country.name}
            </span>
          )}
          {otherDestination && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/10 bg-cream px-3 py-1 text-xs font-medium text-brand">
              {item.country && OTHER_DESTINATION_FLAGS[item.country] && (
                <span className="relative h-4 w-4 overflow-hidden rounded-full">
                  <Image
                    src={OTHER_DESTINATION_FLAGS[item.country]}
                    alt=""
                    fill
                    sizes="16px"
                    className="object-cover"
                  />
                </span>
              )}
              {otherDestination}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------ post card */

export function PostCard({
  slug,
  title,
  excerpt,
  category,
  dateLabel,
  readingMinutes,
}: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  readingMinutes: number;
}) {
  return (
    <article className="group h-full">
      <Link
        href={`/blog/${slug}`}
        className="flex h-full flex-col rounded-2xl border border-brand/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
      >
        <span className="inline-flex w-fit rounded-full bg-brand/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
          {category}
        </span>
        <h3 className="mt-4 text-lg leading-snug transition-colors group-hover:text-gold-dark">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
          {excerpt}
        </p>
        <p className="mt-5 text-xs text-ink/55">
          {dateLabel} · {readingMinutes} min read
        </p>
      </Link>
    </article>
  );
}
