"use client";

import { useMemo, useState } from "react";
import { countries } from "@/data/countries";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { EmptyState } from "./Blocks";
import { TestimonialCard } from "./Cards";

/** Country-filterable story grid. Safe when the list is empty. */
export function StoryExplorer({ items }: { items: Testimonial[] }) {
  const [country, setCountry] = useState("all");

  const available = useMemo(
    () => countries.filter((c) => items.some((t) => t.country === c.slug)),
    [items],
  );

  const filtered = useMemo(
    () =>
      country === "all" ? items : items.filter((t) => t.country === country),
    [items, country],
  );

  if (items.length === 0) {
    return (
      <EmptyState
        icon="sparkles"
        title="Your story could be next"
        body="We publish student stories only with written permission, so this page stays empty until our students are ready to share theirs. We would rather show you nothing than show you something invented."
        ctaLabel="Start Your Own Journey"
      />
    );
  }

  return (
    <div>
      {available.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCountry("all")}
            aria-pressed={country === "all"}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              country === "all"
                ? "border-gold bg-gold/15 text-navy"
                : "border-navy/15 bg-white text-ink/75 hover:border-gold/50",
            )}
          >
            All destinations
          </button>
          {available.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCountry(c.slug)}
              aria-pressed={country === c.slug}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                country === c.slug
                  ? "border-gold bg-gold/15 text-navy"
                  : "border-navy/15 bg-white text-ink/75 hover:border-gold/50",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <li key={t.id}>
            <TestimonialCard item={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
