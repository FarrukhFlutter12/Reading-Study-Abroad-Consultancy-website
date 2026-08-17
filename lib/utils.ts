/**
 * Shared helpers. The `isReady` guard is central to the project rule:
 * placeholder content must never reach the page.
 */

export const PLACEHOLDER = "REPLACE_ME";

/** True only when a data value is real, client-supplied content. */
export function isReady(v?: string | null): v is string {
  if (typeof v !== "string") return false;
  const t = v.trim();
  return t.length > 0 && t.toUpperCase() !== PLACEHOLDER;
}

/** Small classname joiner (keeps us off a clsx dependency). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Pakistani mobile numbers: 03xxxxxxxxx or +923xxxxxxxxx. */
export const PK_PHONE_REGEX = /^(\+92|0092|92|0)?3\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function isValidPkPhone(v: string) {
  return PK_PHONE_REGEX.test(v.replace(/[\s-()]/g, ""));
}

export function isValidEmail(v: string) {
  return EMAIL_REGEX.test(v.trim());
}

/** wa.me deep link with a pre-filled message. */
export function waLink(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbed(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Turns "12,000+" / "98%" into a number for the count-up animation. */
export function numericPart(v: string) {
  const n = Number(v.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function suffixPart(v: string) {
  return v.replace(/[\d.,\s]/g, "");
}
