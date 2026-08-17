import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import type { Country } from "@/data/countries";
import type { Service } from "@/data/services";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { RevealGroup, RevealItem } from "./Reveal";

/* --------------------------------------------------------------- country */

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/destinations/${country.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
    >
      <span className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-chip ring-1 ring-navy/10">
        <Image
          src={country.flag}
          alt={`Flag of ${country.name}`}
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>

      <h3 className="mt-5 text-lg transition-colors group-hover:text-gold-dark">
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
      className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy-dark">
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
        "h-full rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift",
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

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
      <Quote className="h-7 w-7 text-gold" strokeWidth={1.5} aria-hidden />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-navy/10 pt-5">
        {item.photo && (
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-navy/10">
            <Image
              src={item.photo}
              alt={item.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
        )}
        <span>
          <span className="block text-sm font-semibold text-navy">
            {item.name}
          </span>
          <span className="block text-xs text-ink/60">
            {[item.course, item.university, item.intake]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </span>
      </figcaption>
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
        className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
      >
        <span className="inline-flex w-fit rounded-full bg-navy/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">
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
