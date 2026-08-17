"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { numericPart, suffixPart } from "@/lib/utils";

/** Counts up to the numeric part of `value` when scrolled into view. */
export function StatCounter({
  value,
  label,
  duration = 1600,
}: {
  value: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const target = numericPart(value);
  const suffix = suffixPart(value);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce || target === 0) {
      setShown(target);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reduce]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl font-bold text-gold sm:text-4xl lg:text-[2.6rem]">
        {shown.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-white/70 sm:text-sm sm:tracking-[0.1em]">
        {label}
      </p>
    </div>
  );
}
