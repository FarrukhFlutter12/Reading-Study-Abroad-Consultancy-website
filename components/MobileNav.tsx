"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { countries } from "@/data/countries";
import { resourceLinks } from "@/data/nav";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn, telLink, waLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./Icon";

type Group = "destinations" | "services" | "resources";

export function MobileNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (g: Group) => setGroup(group === g ? null : g);

  const rowCls =
    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium text-white transition-colors hover:bg-white/10";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white transition-colors hover:border-gold hover:text-gold xl:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-[60] xl:hidden"
            initial={reduce ? {} : { opacity: 0 }}
            animate={reduce ? {} : { opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* Click-away backdrop. Deliberately not a button and not labelled:
                it would otherwise duplicate the close button's accessible name.
                Keyboard users close the drawer with Escape or the X button. */}
            <div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-navy-dark/70 backdrop-blur-sm"
            />

            <motion.div
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-navy-gradient shadow-lift"
              initial={reduce ? {} : { x: "100%" }}
              animate={reduce ? {} : { x: 0 }}
              exit={reduce ? {} : { x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <Logo variant="dark" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="flex-1 overflow-y-auto px-3 py-4"
              >
                <ul className="space-y-1">
                  <li>
                    <Link href="/" className={rowCls}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className={rowCls}>
                      About
                    </Link>
                  </li>

                  {/* Destinations */}
                  <li>
                    <button
                      type="button"
                      onClick={() => toggle("destinations")}
                      aria-expanded={group === "destinations"}
                      className={rowCls}
                    >
                      Destinations
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform",
                          group === "destinations" && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    <SubPanel open={group === "destinations"} reduce={!!reduce}>
                      <ul className="space-y-0.5 pb-2 pl-2 pt-1">
                        {countries.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/destinations/${c.slug}`}
                              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/25">
                                <Image
                                  src={c.flag}
                                  alt=""
                                  fill
                                  sizes="24px"
                                  className="object-cover"
                                />
                              </span>
                              {c.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/destinations"
                            className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-gold"
                          >
                            All destinations →
                          </Link>
                        </li>
                      </ul>
                    </SubPanel>
                  </li>

                  {/* Services */}
                  <li>
                    <button
                      type="button"
                      onClick={() => toggle("services")}
                      aria-expanded={group === "services"}
                      className={rowCls}
                    >
                      Services
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform",
                          group === "services" && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    <SubPanel open={group === "services"} reduce={!!reduce}>
                      <ul className="space-y-0.5 pb-2 pl-2 pt-1">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="block rounded-lg px-4 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </SubPanel>
                  </li>

                  {/* Resources */}
                  <li>
                    <button
                      type="button"
                      onClick={() => toggle("resources")}
                      aria-expanded={group === "resources"}
                      className={rowCls}
                    >
                      Resources
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform",
                          group === "resources" && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    <SubPanel open={group === "resources"} reduce={!!reduce}>
                      <ul className="space-y-0.5 pb-2 pl-2 pt-1">
                        {resourceLinks.map((r) => (
                          <li key={r.href}>
                            <Link
                              href={r.href}
                              className="block rounded-lg px-4 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {r.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </SubPanel>
                  </li>

                  <li>
                    <Link href="/apply" className={rowCls}>
                      Apply Now
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className={rowCls}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Pinned actions */}
              <div className="space-y-2 border-t border-white/10 bg-navy-dark/60 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
                <Link
                  href="/free-assessment"
                  className="btn-gold w-full py-3.5 text-base"
                >
                  Free Eligibility Check
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={telLink(site.phones[0])}
                    className="btn-outline-light py-3"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    Call
                  </a>
                  <a
                    href={waLink(
                      site.whatsapp,
                      `Assalam-o-Alaikum, I would like to know more about studying abroad with ${site.name}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-light py-3"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SubPanel({
  open,
  reduce,
  children,
}: {
  open: boolean;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={reduce ? {} : { height: 0, opacity: 0 }}
          animate={reduce ? {} : { height: "auto", opacity: 1 }}
          exit={reduce ? {} : { height: 0, opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
