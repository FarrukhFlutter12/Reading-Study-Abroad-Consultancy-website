"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { countries } from "@/data/countries";
import { site } from "@/data/site";
import { cn, isValidEmail, isValidPkPhone, waLink } from "@/lib/utils";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { WhatsAppIcon } from "./Icon";

/* ------------------------------------------------------------- options */

const QUALIFICATIONS = [
  "Matric / O-Levels",
  "Intermediate / A-Levels",
  "Bachelors (2 years)",
  "Bachelors (4 years)",
  "Masters",
  "MPhil / PhD",
  "Diploma",
];

const ENGLISH_TESTS = ["IELTS", "PTE", "Duolingo", "TOEFL", "None yet"];

const LEVELS = ["Bachelors", "Masters", "PhD", "Diploma", "Language Course"];

const INTAKES = [
  "Next available intake",
  "January / February 2027",
  "March 2027",
  "May 2027",
  "September / October 2027",
  "Still deciding",
];

const BUDGETS = [
  "Lowest possible — affordability is my main constraint",
  "Moderate — I can manage mid-range European costs",
  "Flexible — cost is not the deciding factor",
  "I need a scholarship to make this work",
  "Not sure yet — please advise",
];

const PASSPORT = [
  "I have a valid passport",
  "Applied, waiting for it",
  "Not applied yet",
];

const SOURCES = [
  "Facebook",
  "Instagram",
  "TikTok",
  "Google search",
  "Friend or family",
  "Walk-in / office visit",
  "Other",
];

const STEPS = ["Personal", "Academic", "Preferences", "Final details"];

/* --------------------------------------------------------------- state */

type Values = {
  name: string;
  phone: string;
  email: string;
  city: string;

  qualification: string;
  fieldOfStudy: string;
  completionYear: string;
  grade: string;
  englishTest: string;
  englishScore: string;

  destinations: string[];
  intake: string;
  level: string;
  budget: string;

  passport: string;
  refusal: string;
  refusalDetails: string;
  sponsor: string;
  source: string;
  message: string;

  botcheck: string;
};

const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  city: "",
  qualification: "",
  fieldOfStudy: "",
  completionYear: "",
  grade: "",
  englishTest: "",
  englishScore: "",
  destinations: [],
  intake: "",
  level: "",
  budget: "",
  passport: "",
  refusal: "",
  refusalDetails: "",
  sponsor: "",
  source: "",
  message: "",
  botcheck: "",
};

type Errors = Partial<Record<keyof Values, string>>;

export function AssessmentForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const toggleDestination = (name: string) => {
    setV((p) => ({
      ...p,
      destinations: p.destinations.includes(name)
        ? p.destinations.filter((d) => d !== name)
        : [...p.destinations, name],
    }));
    if (errors.destinations)
      setErrors((p) => ({ ...p, destinations: undefined }));
  };

  function validateStep(s: number): boolean {
    const e: Errors = {};

    if (s === 0) {
      if (v.name.trim().length < 3) e.name = "Please enter your full name.";
      if (!isValidPkPhone(v.phone))
        e.phone = "Enter a valid Pakistani mobile number, e.g. 0314 9659005.";
      if (!isValidEmail(v.email)) e.email = "Enter a valid email address.";
      if (v.city.trim().length < 2) e.city = "Please enter your city.";
    }

    if (s === 1) {
      if (!v.qualification)
        e.qualification = "Select your highest completed qualification.";
      if (v.fieldOfStudy.trim().length < 2)
        e.fieldOfStudy = "Tell us what you studied, e.g. Pre-Medical.";
      if (!/^\d{4}$/.test(v.completionYear.trim()))
        e.completionYear = "Enter a four-digit year, e.g. 2024.";
      if (!v.englishTest) e.englishTest = "Select one option.";
      if (v.englishTest && v.englishTest !== "None yet" && !v.englishScore.trim())
        e.englishScore = "Enter your score, or write 'awaiting result'.";
    }

    if (s === 2) {
      if (v.destinations.length === 0)
        e.destinations = "Choose at least one destination.";
      if (!v.level) e.level = "Select the course level you want.";
      if (!v.intake) e.intake = "Select your preferred intake.";
    }

    if (s === 3) {
      if (!v.passport) e.passport = "Select your passport status.";
      if (!v.refusal) e.refusal = "Please answer this — honesty matters here.";
      if (v.refusal === "Yes" && v.refusalDetails.trim().length < 5)
        e.refusalDetails =
          "Tell us which country and roughly when, so we can advise properly.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const next = () => {
    if (!validateStep(step)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollToTop();
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
    scrollToTop();
  };

  const scrollToTop = () => {
    document
      .getElementById("assessment-top")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const waSummary = `Assalam-o-Alaikum! I have submitted the free assessment form on your website.

Name: ${v.name}
City: ${v.city}
Qualification: ${v.qualification} (${v.fieldOfStudy}, ${v.completionYear})
English test: ${v.englishTest}${v.englishScore ? ` — ${v.englishScore}` : ""}
Interested in: ${v.destinations.join(", ")}
Course level: ${v.level}
Preferred intake: ${v.intake}

Please guide me on the next steps.`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validateStep(3)) return;

    setStatus("sending");

    const res = await submitToWeb3Forms(
      {
        "Full name": v.name,
        "Phone (WhatsApp)": v.phone,
        Email: v.email,
        City: v.city,

        "Highest qualification": v.qualification,
        "Field of study": v.fieldOfStudy,
        "Completion year": v.completionYear,
        "Grade / percentage": v.grade || "Not provided",
        "English test": v.englishTest,
        "English score": v.englishScore || "—",

        "Preferred destinations": v.destinations.join(", "),
        "Course level": v.level,
        "Preferred intake": v.intake,
        "Budget range": v.budget || "Not specified",

        "Passport status": v.passport,
        "Previous visa refusal": v.refusal,
        "Refusal details": v.refusalDetails || "—",
        Sponsor: v.sponsor || "Not specified",
        "Heard about us via": v.source || "Not specified",
        Message: v.message || "—",

        "Form source": "Free Assessment (4-step)",
      },
      {
        subject: `New Free Assessment — ${v.name} — ${
          v.destinations.join(", ") || "No destination selected"
        }`,
        botcheck: v.botcheck,
      },
    );

    if (res.ok) {
      setStatus("sent");
      scrollToTop();
    } else {
      setStatus("error");
      setServerError(res.error);
    }
  }

  /* ------------------------------------------------------------ success */
  if (status === "sent") {
    return (
      <div
        id="assessment-top"
        className="rounded-2xl border border-navy/10 bg-white p-7 text-center shadow-card sm:p-10"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold-dark">
          <CheckCircle2 className="h-9 w-9" strokeWidth={2} aria-hidden />
        </span>

        <h2 className="mt-6 text-2xl sm:text-3xl">
          Assessment received, {v.name.split(" ")[0]}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink/75">
          Your details have reached our Hayatabad office. A counsellor will
          review your academic profile against your chosen destinations and
          contact you <strong className="text-navy">within 24 hours</strong> on{" "}
          <span className="whitespace-nowrap font-medium text-navy">
            {v.phone}
          </span>
          .
        </p>

        <div className="mx-auto mt-6 max-w-lg rounded-xl bg-cream p-4 text-left text-sm text-ink/75">
          <p className="font-semibold text-navy">Keep this for reference</p>
          <p className="mt-1.5 leading-relaxed">
            We do not issue reference numbers — your phone number and email are
            how we locate your file. If you contact us before we reach you,
            quote the name and phone number you submitted above.
          </p>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waLink(site.whatsapp, waSummary)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] px-7 py-3.5 text-base text-white hover:brightness-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Send the same details on WhatsApp
          </a>
        </div>

        <div className="mt-10 border-t border-navy/10 pt-8">
          <p className="text-sm font-semibold text-navy">
            While you wait, read up on your destinations
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {(v.destinations.length
              ? countries.filter((c) => v.destinations.includes(c.name))
              : countries
            ).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/destinations/${c.slug}`}
                  className="inline-flex rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-gold hover:bg-gold/10"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------- form */
  const slide = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div id="assessment-top">
      {/* progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink/60">
          <span>
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          className="mt-2.5 h-2 overflow-hidden rounded-full bg-navy/10"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Assessment progress"
        >
          <motion.div
            className="h-full rounded-full bg-gold"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
          />
        </div>

        <ol className="mt-4 hidden grid-cols-4 gap-2 sm:grid">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={cn(
                "border-t-2 pt-2 text-xs font-medium transition-colors",
                i <= step
                  ? "border-gold text-navy"
                  : "border-navy/10 text-ink/45",
              )}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card sm:p-8"
      >
        {/* honeypot */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="assess-botcheck">Do not fill this field</label>
          <input
            id="assess-botcheck"
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            value={v.botcheck}
            onChange={(e) => set("botcheck", e.target.value)}
          />
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={reduce ? undefined : slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* ------------------------------------------- step 1 */}
            {step === 0 && (
              <fieldset>
                <legend className="mb-1 font-display text-xl font-semibold text-navy">
                  Tell us about yourself
                </legend>
                <p className="mb-6 text-sm text-ink/65">
                  We need a working phone number and email — that is how a
                  counsellor will reach you.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <F id="a-name" label="Full name" error={errors.name} required>
                    <input
                      id="a-name"
                      className="field"
                      value={v.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Ahmad Khan"
                      autoComplete="name"
                    />
                  </F>

                  <F
                    id="a-phone"
                    label="Phone (WhatsApp)"
                    error={errors.phone}
                    required
                  >
                    <input
                      id="a-phone"
                      type="tel"
                      inputMode="tel"
                      className="field"
                      value={v.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="0314 9659005"
                      autoComplete="tel"
                    />
                  </F>

                  <F id="a-email" label="Email" error={errors.email} required>
                    <input
                      id="a-email"
                      type="email"
                      inputMode="email"
                      className="field"
                      value={v.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </F>

                  <F id="a-city" label="City" error={errors.city} required>
                    <input
                      id="a-city"
                      className="field"
                      value={v.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Peshawar"
                      autoComplete="address-level2"
                    />
                  </F>
                </div>
              </fieldset>
            )}

            {/* ------------------------------------------- step 2 */}
            {step === 1 && (
              <fieldset>
                <legend className="mb-1 font-display text-xl font-semibold text-navy">
                  Your academic background
                </legend>
                <p className="mb-6 text-sm text-ink/65">
                  Be accurate rather than optimistic — this is what determines
                  where you genuinely qualify.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <F
                    id="a-qual"
                    label="Highest completed qualification"
                    error={errors.qualification}
                    required
                  >
                    <select
                      id="a-qual"
                      className="field"
                      value={v.qualification}
                      onChange={(e) => set("qualification", e.target.value)}
                    >
                      <option value="">Select qualification</option>
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </F>

                  <F
                    id="a-field"
                    label="Field of study"
                    error={errors.fieldOfStudy}
                    required
                  >
                    <input
                      id="a-field"
                      className="field"
                      value={v.fieldOfStudy}
                      onChange={(e) => set("fieldOfStudy", e.target.value)}
                      placeholder="e.g. Pre-Medical, Computer Science"
                    />
                  </F>

                  <F
                    id="a-year"
                    label="Year of completion"
                    error={errors.completionYear}
                    required
                  >
                    <input
                      id="a-year"
                      inputMode="numeric"
                      maxLength={4}
                      className="field"
                      value={v.completionYear}
                      onChange={(e) => set("completionYear", e.target.value)}
                      placeholder="2024"
                    />
                  </F>

                  <F
                    id="a-grade"
                    label="Grade / percentage / CGPA"
                    hint="Optional, but it makes our assessment far more useful"
                  >
                    <input
                      id="a-grade"
                      className="field"
                      value={v.grade}
                      onChange={(e) => set("grade", e.target.value)}
                      placeholder="e.g. 78% or 3.2 CGPA"
                    />
                  </F>

                  <F
                    id="a-test"
                    label="English test taken"
                    error={errors.englishTest}
                    required
                  >
                    <select
                      id="a-test"
                      className="field"
                      value={v.englishTest}
                      onChange={(e) => set("englishTest", e.target.value)}
                    >
                      <option value="">Select one</option>
                      {ENGLISH_TESTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </F>

                  {v.englishTest && v.englishTest !== "None yet" && (
                    <F
                      id="a-score"
                      label={`${v.englishTest} score`}
                      error={errors.englishScore}
                      required
                    >
                      <input
                        id="a-score"
                        className="field"
                        value={v.englishScore}
                        onChange={(e) => set("englishScore", e.target.value)}
                        placeholder="e.g. 6.5 overall"
                      />
                    </F>
                  )}
                </div>
              </fieldset>
            )}

            {/* ------------------------------------------- step 3 */}
            {step === 2 && (
              <fieldset>
                <legend className="mb-1 font-display text-xl font-semibold text-navy">
                  Where would you like to study?
                </legend>
                <p className="mb-6 text-sm text-ink/65">
                  Pick as many as you are open to. Comparing two or three
                  destinations usually produces a better decision than fixing on
                  one.
                </p>

                <div>
                  <span className="label">
                    Preferred destinations{" "}
                    <span className="font-normal text-ink/50">
                      (select one or more)
                    </span>
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {countries.map((c) => {
                      const on = v.destinations.includes(c.name);
                      return (
                        <button
                          key={c.slug}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleDestination(c.name)}
                          className={cn(
                            "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all",
                            on
                              ? "border-gold bg-gold/15 text-navy"
                              : "border-navy/15 bg-white text-ink/75 hover:border-gold/50 hover:bg-cream",
                          )}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                  {errors.destinations && (
                    <p className="mt-2 text-xs font-medium text-red-600" role="alert">
                      {errors.destinations}
                    </p>
                  )}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <F
                    id="a-level"
                    label="Course level"
                    error={errors.level}
                    required
                  >
                    <select
                      id="a-level"
                      className="field"
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
                  </F>

                  <F
                    id="a-intake"
                    label="Preferred intake"
                    error={errors.intake}
                    required
                  >
                    <select
                      id="a-intake"
                      className="field"
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
                  </F>

                  <div className="sm:col-span-2">
                    <F
                      id="a-budget"
                      label="Budget expectation"
                      hint="This helps us rule out destinations that would not be realistic"
                    >
                      <select
                        id="a-budget"
                        className="field"
                        value={v.budget}
                        onChange={(e) => set("budget", e.target.value)}
                      >
                        <option value="">Select a range</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </F>
                  </div>
                </div>
              </fieldset>
            )}

            {/* ------------------------------------------- step 4 */}
            {step === 3 && (
              <fieldset>
                <legend className="mb-1 font-display text-xl font-semibold text-navy">
                  A few final details
                </legend>
                <p className="mb-6 text-sm text-ink/65">
                  Answer the refusal question honestly. A declared refusal can
                  be worked with; a hidden one cannot.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <F
                    id="a-passport"
                    label="Passport status"
                    error={errors.passport}
                    required
                  >
                    <select
                      id="a-passport"
                      className="field"
                      value={v.passport}
                      onChange={(e) => set("passport", e.target.value)}
                    >
                      <option value="">Select status</option>
                      {PASSPORT.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </F>

                  <F
                    id="a-refusal"
                    label="Any previous visa refusal?"
                    error={errors.refusal}
                    required
                  >
                    <select
                      id="a-refusal"
                      className="field"
                      value={v.refusal}
                      onChange={(e) => set("refusal", e.target.value)}
                    >
                      <option value="">Select one</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </F>

                  {v.refusal === "Yes" && (
                    <div className="sm:col-span-2">
                      <F
                        id="a-refusal-details"
                        label="Which country, and roughly when?"
                        error={errors.refusalDetails}
                        required
                      >
                        <input
                          id="a-refusal-details"
                          className="field"
                          value={v.refusalDetails}
                          onChange={(e) =>
                            set("refusalDetails", e.target.value)
                          }
                          placeholder="e.g. UK student visa, early 2025"
                        />
                      </F>
                    </div>
                  )}

                  <F id="a-sponsor" label="Who will sponsor your studies?">
                    <input
                      id="a-sponsor"
                      className="field"
                      value={v.sponsor}
                      onChange={(e) => set("sponsor", e.target.value)}
                      placeholder="e.g. Father, self-funded, sibling"
                    />
                  </F>

                  <F id="a-source" label="How did you hear about us?">
                    <select
                      id="a-source"
                      className="field"
                      value={v.source}
                      onChange={(e) => set("source", e.target.value)}
                    >
                      <option value="">Select one</option>
                      {SOURCES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </F>

                  <div className="sm:col-span-2">
                    <F id="a-message" label="Anything else we should know?">
                      <textarea
                        id="a-message"
                        rows={4}
                        className="field resize-y"
                        value={v.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Study gaps, specific universities you have in mind, family circumstances, or any question."
                      />
                    </F>
                  </div>
                </div>

                <p className="mt-5 rounded-xl bg-cream p-4 text-xs leading-relaxed text-ink/65">
                  By submitting, you agree that we may contact you about your
                  enquiry by phone, WhatsApp or email. We do not sell or share
                  your data. See our{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium underline hover:text-gold-dark"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {status === "error" && serverError && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {serverError}
          </p>
        )}

        {/* ----------------------------------------------- navigation */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn-outline-navy">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="btn-gold px-7 py-3.5 text-base"
            >
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold px-7 py-3.5 text-base"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden />
                  Submit Assessment
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* --------------------------------------------------------------- field */

function F({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {required && (
          <span className="ml-1 text-gold-dark" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink/55">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
