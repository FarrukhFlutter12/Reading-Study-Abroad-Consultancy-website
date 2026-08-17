"use client";

import { Printer } from "lucide-react";

/** Opens the browser print dialog so students can keep a paper checklist. */
export function PrintButton({
  label = "Print this checklist",
  className = "btn-outline-navy no-print",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
