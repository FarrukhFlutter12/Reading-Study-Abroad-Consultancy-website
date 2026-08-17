import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onDark = false,
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  onDark?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.18em]",
            onDark ? "text-gold-light" : "text-gold-dark",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-2xl sm:text-3xl lg:text-[2.1rem]",
          onDark && "text-white",
        )}
      >
        {title}
      </h2>
      <span
        aria-hidden
        className={cn(
          "mt-4 block h-1 w-14 rounded-full bg-gold",
          align === "center" && "mx-auto",
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed",
            onDark ? "text-white/75" : "text-ink/70",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** The banner's sweeping curve, used as a section divider. */
export function CurveDivider({
  className,
  flip = false,
  fill = "#FDFBF7",
}: {
  className?: string;
  flip?: boolean;
  fill?: string;
}) {
  return (
    <div className={cn("pointer-events-none leading-none", className)} aria-hidden>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={cn("block h-[52px] w-full sm:h-[70px]", flip && "rotate-180")}
      >
        <path
          d="M0,90 C240,10 480,0 720,22 C960,44 1200,80 1440,54 L1440,90 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
