"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { countries } from "@/data/countries";
import { site } from "@/data/site";
import { cn, isValidEmail, isValidPkPhone, waLink } from "@/lib/utils";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { WhatsAppIcon } from "./Icon";

const QUALIFICATIONS = [
  "Matric / O-Levels",
  "Intermediate / A-Levels",
  "Bachelors (2 years)",
  "Bachelors (4 years)",
  "Masters",
  "MPhil / PhD",
  "Diploma",
];

const LEVELS = ["Bachelors", "Masters", "PhD", "Diploma", "Language Course"];

const INTAKES = [
  "Next available intake",
  "January / February",
  "March",
  "May",
  "September / October",
  "Still deciding",
];

type Values = {
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  qualification: string;
  level: string;
  intake: string;
  message: string;
  botcheck: string;
};

const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  city: "",
  country: "",
  qualification: "",
  level: "",
  intake: "",
  message: "",
  botcheck: "",
};

export function LeadForm({
  variant = "compact",
  source = "Website",
  presetCountry,
  className,
  onDark = false,
}: {
  variant?: "compact" | "full";
  /** Appears in the notification email so the office knows which page it came from. */
  source?: string;
  presetCountry?: string;
  className?: string;
  onDark?: boolean;
}) {
  const full = variant === "full";
  const [v, setV] = useState<Values>({
    ...EMPTY,
    country: presetCountry ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  const set = (k: keyof Values, val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Values, string>> = {};
    if (v.name.trim().length < 3) e.name = "Please enter your full name.";
    if (!isValidPkPhone(v.phone))
      e.phone = "Enter a valid Pakistani mobile number, e.g. 0314 9659005.";
    if (!isValidEmail(v.email)) e.email = "Enter a valid email address.";
    if (!v.country) e.country = "Please choose a destination.";
    if (!v.qualification)
      e.qualification = "Please select your highest qualification.";
    if (full && v.city.trim().length < 2) e.city = "Please enter your city.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const summary = `New enquiry from ${v.name || "a student"}${
    v.country ? ` — ${v.country}` : ""
  }`;

  const waMessage = `Assalam-o-Alaikum! I have just submitted an enquiry on your website.

Name: ${v.name}
Phone: ${v.phone}
Preferred destination: ${v.country}
Highest qualification: ${v.qualification}${
    full && v.level ? `\nCourse level: ${v.level}` : ""
  }${full && v.intake ? `\nPreferred intake: ${v.intake}` : ""}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("sending");

    const payload: Record<string, string> = {
      "Full name": v.name,
      "Phone (WhatsApp)": v.phone,
      Email: v.email,
      "Preferred destination": v.country,
      "Highest qualification": v.qualification,
      "Form source": source,
    };
    if (full) {
      payload.City = v.city;
      payload["Course level"] = v.level || "Not specified";
      payload["Preferred intake"] = v.intake || "Not specified";
      payload.Message = v.message || "—";
    }

    const res = await submitToWeb3Forms(payload, {
      subject: `${summary} | ${source}`,
      botcheck: v.botcheck,
    });

    if (res.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
      setServerError(res.error);
    }
  }

  /* ------------------------------------------------------------- success */
  if (status === "sent") {
    return (
      <div
        className={cn(
          "rounded-2xl border p-6 text-center sm:p-8",
          onDark
            ? "border-white/15 bg-white/5"
            : "border-navy/10 bg-white shadow-card",
          className,
        )}
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold-dark">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2} aria-hidden />
        </span>
        <h3 className={cn("mt-5 text-xl", onDark && "text-white")}>
          Thank you, {v.name.split(" ")[0]}
        </h3>
        <p
          className={cn(
            "mx-auto mt-2 max-w-sm text-sm leading-relaxed",
            onDark ? "text-white/75" : "text-ink/70",
          )}
        >
          Your enquiry has reached our Hayatabad office. A counsellor will
          contact you within 24 hours. For a faster reply, send us the same
          details on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <a
            href={waLink(site.whatsapp, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] text-white hover:brightness-105"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Continue on WhatsApp
          </a>
          <Link
            href="/destinations"
            className={onDark ? "btn-outline-light" : "btn-outline-navy"}
          >
            Explore destinations
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- form */
  const labelCls = cn("label", onDark && "text-white/85");
  const fieldCls = cn(
    "field",
    onDark &&
      "border-white/20 bg-white/10 text-white placeholder:text-white/45 focus:border-gold",
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-2xl border p-5 sm:p-6",
        onDark
          ? "border-white/15 bg-white/5 backdrop-blur"
          : "border-navy/10 bg-white shadow-card",
        className,
      )}
    >
      {/* Honeypot — visually hidden, never focusable */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`botcheck-${source}`}>Do not fill this field</label>
        <input
          id={`botcheck-${source}`}
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          value={v.botcheck}
          onChange={(e) => set("botcheck", e.target.value)}
        />
      </div>

      <div className={cn("grid gap-4", full && "sm:grid-cols-2")}>
        <Field
          id={`name-${source}`}
          label="Full name"
          error={errors.name}
          labelCls={labelCls}
        >
          <input
            id={`name-${source}`}
            className={fieldCls}
            value={v.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Ahmad Khan"
            autoComplete="name"
            required
          />
        </Field>

        <Field
          id={`phone-${source}`}
          label="Phone (WhatsApp)"
          error={errors.phone}
          labelCls={labelCls}
        >
          <input
            id={`phone-${source}`}
            type="tel"
            inputMode="tel"
            className={fieldCls}
            value={v.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="0314 9659005"
            autoComplete="tel"
            required
          />
        </Field>

        <Field
          id={`email-${source}`}
          label="Email"
          error={errors.email}
          labelCls={labelCls}
        >
          <input
            id={`email-${source}`}
            type="email"
            inputMode="email"
            className={fieldCls}
            value={v.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </Field>

        {full && (
          <Field
            id={`city-${source}`}
            label="City"
            error={errors.city}
            labelCls={labelCls}
          >
            <input
              id={`city-${source}`}
              className={fieldCls}
              value={v.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="Peshawar"
              autoComplete="address-level2"
            />
          </Field>
        )}

        <Field
          id={`country-${source}`}
          label="Preferred destination"
          error={errors.country}
          labelCls={labelCls}
        >
          <select
            id={`country-${source}`}
            className={fieldCls}
            value={v.country}
            onChange={(e) => set("country", e.target.value)}
            required
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — advise me</option>
          </select>
        </Field>

        <Field
          id={`qual-${source}`}
          label="Highest qualification"
          error={errors.qualification}
          labelCls={labelCls}
        >
          <select
            id={`qual-${source}`}
            className={fieldCls}
            value={v.qualification}
            onChange={(e) => set("qualification", e.target.value)}
            required
          >
            <option value="">Select qualification</option>
            {QUALIFICATIONS.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </Field>

        {full && (
          <>
            <Field
              id={`level-${source}`}
              label="Course level"
              labelCls={labelCls}
            >
              <select
                id={`level-${source}`}
                className={fieldCls}
                value={v.level}
                onChange={(e) => set("level", e.target.value)}
              >
                <option value="">Select level</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id={`intake-${source}`}
              label="Preferred intake"
              labelCls={labelCls}
            >
              <select
                id={`intake-${source}`}
                className={fieldCls}
                value={v.intake}
                onChange={(e) => set("intake", e.target.value)}
              >
                <option value="">Select intake</option>
                {INTAKES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </Field>

            <div className="sm:col-span-2">
              <Field
                id={`msg-${source}`}
                label="Anything else we should know?"
                labelCls={labelCls}
              >
                <textarea
                  id={`msg-${source}`}
                  rows={4}
                  className={cn(fieldCls, "resize-y")}
                  value={v.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Your subjects, grades, budget, or any question you have."
                />
              </Field>
            </div>
          </>
        )}
      </div>

      {status === "error" && serverError && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold mt-5 w-full py-3.5 text-base"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Request Free Counselling
          </>
        )}
      </button>

      <p
        className={cn(
          "mt-3 text-center text-xs leading-relaxed",
          onDark ? "text-white/55" : "text-ink/55",
        )}
      >
        We use your details only to respond to this enquiry. See our{" "}
        <Link href="/privacy-policy" className="underline hover:text-gold-dark">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  labelCls,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  labelCls: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
