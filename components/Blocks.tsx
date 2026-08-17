import Link from "next/link";
import { ChevronRight, Inbox } from "lucide-react";
import type { ProcessStep } from "@/data/process";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { RevealGroup, RevealItem } from "./Reveal";

/* --------------------------------------------------------- breadcrumbs */

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  onDark = false,
}: {
  items: Crumb[];
  onDark?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-xs sm:text-sm",
          onDark ? "text-white/65" : "text-ink/60",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "rounded transition-colors",
              onDark ? "hover:text-gold" : "hover:text-gold-dark",
            )}
          >
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
            {c.href && i < items.length - 1 ? (
              <Link
                href={c.href}
                className={cn(
                  "rounded transition-colors",
                  onDark ? "hover:text-gold" : "hover:text-gold-dark",
                )}
              >
                {c.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={onDark ? "text-white" : "text-navy"}
              >
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------- step timeline */

export function StepTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <RevealGroup className="relative">
      {/* connector line — horizontal on large screens, vertical below */}
      <span
        aria-hidden
        className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent sm:block lg:hidden"
      />
      <span
        aria-hidden
        className="absolute left-0 top-[27px] hidden h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block"
      />

      <ol className="relative grid gap-6 sm:gap-7 lg:grid-cols-6 lg:gap-4">
        {steps.map((s) => (
          <RevealItem as="li" key={s.number} className="lg:text-center">
            <div className="flex gap-4 lg:flex-col lg:items-center lg:gap-0">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-gold bg-white text-navy shadow-chip">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <div className="lg:mt-4">
                <p className="font-display text-xs font-bold tracking-[0.18em] text-gold-dark">
                  {s.number}
                </p>
                <h3 className="mt-1 text-base leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {s.body}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </ol>
    </RevealGroup>
  );
}

/* ------------------------------------------------------------ CTA band */

export function CTABand({
  title = "Book Your Free Counselling Session",
  body = "Bring your transcripts and your budget. We will tell you honestly which destinations fit your profile — and which do not.",
  primary = { label: "Start Free Assessment", href: "/free-assessment" },
  secondary = { label: "Contact Us", href: "/contact" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <span
        aria-hidden
        className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-40"
      />
      <span
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="container-page relative py-16 text-center lg:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
          Free &amp; no obligation
        </p>
        <h2 className="mx-auto max-w-2xl text-2xl text-white sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
          {body}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={primary.href} className="btn-gold px-8 py-3.5 text-base">
            {primary.label}
          </Link>
          <Link
            href={secondary.href}
            className="btn-outline-light px-8 py-3.5 text-base"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- empty state */

export function EmptyState({
  title,
  body,
  ctaLabel = "Book Free Counselling",
  ctaHref = "/free-assessment",
  icon = "sparkles",
}: {
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: string;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-navy/20 bg-white/60 p-8 text-center sm:p-12">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold-dark">
        {icon === "inbox" ? (
          <Inbox className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        ) : (
          <Icon name={icon} className="h-6 w-6" />
        )}
      </span>
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
        {body}
      </p>
      <Link href={ctaHref} className="btn-gold mt-6">
        {ctaLabel}
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------ page hero */

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <span
        aria-hidden
        className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-40"
      />
      <span
        aria-hidden
        className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} onDark />
        {eyebrow && (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- checklist ul */

export function CheckList({
  items,
  className,
  columns = 1,
}: {
  items: string[];
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3",
        columns === 2 && "sm:grid-cols-2 sm:gap-x-8",
        className,
      )}
    >
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-sm leading-relaxed text-ink/80">
          <span
            aria-hidden
            className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}
