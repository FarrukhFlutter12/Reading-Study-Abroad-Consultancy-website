/**
 * Development-only guard rail.
 *
 * The forms were once shipped with no Web3Forms access key configured, which
 * meant every enquiry silently failed to reach the office. This banner makes
 * that impossible to miss while developing. It renders nothing in production.
 */
export function DevConfigWarning() {
  if (process.env.NODE_ENV !== "development") return null;
  if (process.env.NEXT_PUBLIC_WEB3FORMS_KEY) return null;

  return (
    <div
      role="alert"
      className="fixed inset-x-0 top-0 z-[100] bg-red-600 px-4 py-2 text-center text-xs font-semibold text-white shadow-lg"
    >
      ⚠️ NEXT_PUBLIC_WEB3FORMS_KEY is missing — forms will not send. Add it to
      .env.local and restart the dev server.
    </div>
  );
}
