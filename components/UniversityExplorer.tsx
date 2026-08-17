"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { countries } from "@/data/countries";
import type { University } from "@/data/universities";
import { cn } from "@/lib/utils";
import { EmptyState } from "./Blocks";

/** Searchable, country-filterable grid. Renders an empty state until the list is supplied. */
export function UniversityExplorer({ items }: { items: University[] }) {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((u) => {
      const matchesCountry = country === "all" || u.country === country;
      const matchesQuery =
        !needle ||
        u.name.toLowerCase().includes(needle) ||
        (u.city ?? "").toLowerCase().includes(needle);
      return matchesCountry && matchesQuery;
    });
  }, [items, q, country]);

  if (items.length === 0) {
    return (
      <EmptyState
        icon="building"
        title="Our university list is being verified"
        body="We only publish institutions we genuinely work with, and each one is being confirmed before it goes on this page. In the meantime, tell us your field and budget and a counsellor will send you a shortlist directly."
        ctaLabel="Request a University Shortlist"
      />
    );
  }

  const countryName = (slug: string) =>
    countries.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div>
      {/* controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden
          />
          <label htmlFor="uni-search" className="sr-only">
            Search universities
          </label>
          <input
            id="uni-search"
            type="search"
            className="field pl-11"
            placeholder="Search by university or city"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="sm:w-64">
          <label htmlFor="uni-country" className="sr-only">
            Filter by country
          </label>
          <select
            id="uni-country"
            className="field"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="all">All destinations</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink/60" aria-live="polite">
        Showing {filtered.length} of {items.length} universities
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-navy/20 p-10 text-center text-sm text-ink/65">
          No universities match that search. Try a different name, or clear the
          country filter.
        </p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u) => (
            <li
              key={u.id}
              className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
            >
              {u.logo && (
                <span className="relative mb-4 block h-12 w-12 overflow-hidden rounded-lg">
                  <Image
                    src={u.logo}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </span>
              )}
              <h3 className="text-base leading-snug">{u.name}</h3>
              <p className="mt-1.5 text-sm text-ink/65">
                {[u.city, countryName(u.country)].filter(Boolean).join(", ")}
              </p>
              {u.note && (
                <p className="mt-3 inline-flex w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">
                  {u.note}
                </p>
              )}
              <div className="mt-auto flex flex-wrap gap-3 pt-5">
                <Link
                  href={`/destinations/${u.country}`}
                  className={cn(
                    "text-sm font-semibold text-gold-dark underline-offset-2 hover:underline",
                  )}
                >
                  Study in {countryName(u.country)} →
                </Link>
                {u.website && (
                  <a
                    href={u.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink/60 underline-offset-2 hover:text-navy hover:underline"
                  >
                    Official site
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
