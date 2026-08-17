import { site } from "@/data/site";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Posts a lead to Web3Forms.
 *
 * `payload` should contain only the human-readable fields you want to appear in
 * the notification email — access_key, subject, from_name and the honeypot are
 * added here.
 */
export async function submitToWeb3Forms(
  payload: Record<string, string>,
  opts: { subject: string; botcheck?: string },
): Promise<SubmitResult> {
  // Honeypot tripped — pretend it worked and drop the submission.
  if (opts.botcheck) return { ok: true };

  if (!site.web3formsKey) {
    return {
      ok: false,
      error:
        "The form is not connected yet. Please call or WhatsApp us and we will take your details directly.",
    };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: site.web3formsKey,
        subject: opts.subject,
        from_name: "Reading Study Abroad Website",
        ...payload,
      }),
    });

    const data: { success?: boolean; message?: string } = await res
      .json()
      .catch(() => ({}));

    if (res.ok && data.success) return { ok: true };

    return {
      ok: false,
      error:
        data.message ??
        "We could not send your enquiry. Please try again, or contact us on WhatsApp.",
    };
  } catch {
    return {
      ok: false,
      error:
        "Network error. Please check your connection and try again, or contact us on WhatsApp.",
    };
  }
}
