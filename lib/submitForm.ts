/**
 * The ONLY place in this codebase that talks to Web3Forms.
 *
 * No form component may call fetch() directly — route everything through
 * submitForm() so the access key, subject, reply-to address, honeypot handling
 * and error messages stay consistent across every form on the site.
 *
 * The access key is read from NEXT_PUBLIC_WEB3FORMS_KEY. Next.js inlines
 * NEXT_PUBLIC_* variables at BUILD time, so changing the value in Vercel
 * requires a redeploy — editing the variable alone does nothing to a build that
 * already shipped.
 */

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/** True when the site has an access key configured. Used by the dev banner. */
export const hasFormKey = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

const WHATSAPP_FALLBACK =
  "Please try again, or send us the same details on WhatsApp.";

export async function submitForm(
  /**
   * Flat, human-readable fields. Web3Forms prints the keys verbatim in the
   * notification email, so use labels like "Preferred Country", not camelCase.
   */
  payload: Record<string, unknown>,
  /** Inbox triage line, e.g. "APPLICATION — Ahmad Khan — Turkey". */
  subject: string,
  opts?: {
    /**
     * Honeypot value. If a bot filled the hidden field we drop the submission
     * and report success, so the bot gets no signal that it was caught.
     */
    botcheck?: string;
  },
): Promise<SubmitResult> {
  if (opts?.botcheck) return { ok: true };

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!accessKey) {
    console.error(
      "[submitForm] Missing NEXT_PUBLIC_WEB3FORMS_KEY — the form cannot send. " +
        "Add it to .env.local locally, and to Vercel env vars + redeploy for production.",
    );
    return {
      ok: false,
      error:
        "This form is not connected yet. Please call or WhatsApp us and we will take your details directly.",
    };
  }

  const email = typeof payload.Email === "string" ? payload.Email : undefined;

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "Reading Study Abroad Website",
        // Lets the office hit Reply in Gmail and land in the student's inbox.
        ...(email ? { replyto: email } : {}),
        ...payload,
      }),
    });

    const data: { success?: boolean; message?: string } = await res
      .json()
      .catch(() => ({}));

    if (res.ok && data.success) return { ok: true };

    console.error("[submitForm] Web3Forms rejected the submission:", data);
    return {
      ok: false,
      error: data.message
        ? `${data.message} ${WHATSAPP_FALLBACK}`
        : `We could not send your enquiry. ${WHATSAPP_FALLBACK}`,
    };
  } catch (err) {
    console.error("[submitForm] Network error:", err);
    return {
      ok: false,
      error: `Network error — please check your connection. ${WHATSAPP_FALLBACK}`,
    };
  }
}

/* --------------------------------------------------------------- subjects */

/**
 * Subject-line builders. Keeping them here means the office inbox stays
 * sortable no matter which page a lead came from.
 */
export const subjectFor = {
  application: (name: string, country: string) =>
    `APPLICATION — ${name} — ${country || "No country selected"}`,
  assessment: (name: string, country: string) =>
    `FREE ASSESSMENT — ${name} — ${country || "No country selected"}`,
  contact: (name: string) => `CONTACT — ${name}`,
  quick: (name: string) => `QUICK LEAD — ${name}`,
  destination: (name: string, country: string) =>
    `LEAD (${country}) — ${name}`,
  general: (name: string, source: string) => `LEAD — ${name} — ${source}`,
};
