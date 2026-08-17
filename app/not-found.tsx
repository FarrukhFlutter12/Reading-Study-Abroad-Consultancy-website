import Link from "next/link";
import { countries } from "@/data/countries";

export default function NotFound() {
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

      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-[5rem] font-bold leading-none text-gold sm:text-[7rem]">
          404
        </p>
        <h1 className="mt-4 text-2xl text-white sm:text-3xl">
          This page took a different flight
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/75">
          The page you are looking for does not exist, or has moved. Try one of
          the links below — or ask us directly and we will point you to it.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-gold px-7 py-3.5 text-base">
            Back to home
          </Link>
          <Link
            href="/free-assessment"
            className="btn-outline-light px-7 py-3.5 text-base"
          >
            Free Eligibility Check
          </Link>
        </div>

        <div className="mt-12 w-full max-w-3xl border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            Popular destinations
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/destinations/${c.slug}`}
                  className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-gold hover:text-gold"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
