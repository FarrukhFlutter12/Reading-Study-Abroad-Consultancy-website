"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { countries } from "@/data/countries";
import { resourceLinks } from "@/data/nav";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

type MenuKey = "destinations" | "services" | "resources";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega menu whenever navigation happens.
  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverOpen = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkCls = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active ? "text-gold" : "text-white/90 hover:text-gold",
    );

  const panelMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.18, ease: "easeOut" as const },
      };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-navy/95 shadow-lift backdrop-blur-md"
          : "bg-navy shadow-none",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between transition-all duration-300",
          scrolled ? "h-[64px]" : "h-[76px]",
        )}
      >
        <Logo variant="dark" />

        {/* ------------------------------------------------ desktop nav */}
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <Link href="/" className={linkCls(isActive("/"))}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkCls(isActive("/about"))}>
                About
              </Link>
            </li>

            {/* Destinations mega menu */}
            <li
              className="relative"
              onMouseEnter={() => hoverOpen("destinations")}
              onMouseLeave={hoverClose}
            >
              <button
                type="button"
                aria-expanded={open === "destinations"}
                aria-haspopup="true"
                onClick={() =>
                  setOpen(open === "destinations" ? null : "destinations")
                }
                className={linkCls(isActive("/destinations"))}
              >
                Destinations
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    open === "destinations" && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {open === "destinations" && (
                  <motion.div
                    {...panelMotion}
                    className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-lift">
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                        Ten study destinations
                      </p>
                      <ul className="grid grid-cols-3 gap-1">
                        {countries.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/destinations/${c.slug}`}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream"
                            >
                              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-navy/10 shadow-chip">
                                <Image
                                  src={c.flag}
                                  alt=""
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                />
                              </span>
                              <span className="text-sm font-medium text-navy">
                                {c.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/destinations"
                        className="mt-4 inline-flex items-center gap-1 border-t border-navy/10 pt-4 text-sm font-semibold text-gold-dark hover:text-navy"
                      >
                        Compare all destinations →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Services mega menu */}
            <li
              className="relative"
              onMouseEnter={() => hoverOpen("services")}
              onMouseLeave={hoverClose}
            >
              <button
                type="button"
                aria-expanded={open === "services"}
                aria-haspopup="true"
                onClick={() => setOpen(open === "services" ? null : "services")}
                className={linkCls(isActive("/services"))}
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    open === "services" && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {open === "services" && (
                  <motion.div
                    {...panelMotion}
                    className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-lift">
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                        End-to-end support
                      </p>
                      <ul className="grid grid-cols-2 gap-1">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream"
                            >
                              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-dark">
                                <Icon name={s.icon} className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-medium leading-snug text-navy">
                                {s.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/services"
                        className="mt-4 inline-flex items-center gap-1 border-t border-navy/10 pt-4 text-sm font-semibold text-gold-dark hover:text-navy"
                      >
                        See all services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Resources */}
            <li
              className="relative"
              onMouseEnter={() => hoverOpen("resources")}
              onMouseLeave={hoverClose}
            >
              <button
                type="button"
                aria-expanded={open === "resources"}
                aria-haspopup="true"
                onClick={() =>
                  setOpen(open === "resources" ? null : "resources")
                }
                className={linkCls(
                  resourceLinks.some((r) => isActive(r.href)),
                )}
              >
                Resources
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    open === "resources" && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {open === "resources" && (
                  <motion.div
                    {...panelMotion}
                    className="absolute right-0 top-full w-[340px] pt-3"
                  >
                    <ul className="overflow-hidden rounded-2xl border border-navy/10 bg-white p-2 shadow-lift">
                      {resourceLinks.map((r) => (
                        <li key={r.href}>
                          <Link
                            href={r.href}
                            className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-cream"
                          >
                            <span className="block text-sm font-medium text-navy">
                              {r.label}
                            </span>
                            {r.desc && (
                              <span className="mt-0.5 block text-xs leading-snug text-ink/60">
                                {r.desc}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link href="/contact" className={linkCls(isActive("/contact"))}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/free-assessment"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy-dark shadow-chip transition-all hover:bg-gold-light hover:shadow-lift lg:inline-flex"
          >
            Free Assessment
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
