import { AssessmentForm } from "@/components/AssessmentForm";
import { CheckList, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Free Eligibility Assessment",
  description:
    "Check which study abroad destinations you qualify for. Free four-step assessment for Pakistani students — a Peshawar counsellor replies within 24 hours.",
  path: "/free-assessment",
});

export default function FreeAssessmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Free & no obligation"
        title="Free Eligibility Assessment"
        subtitle="Four short steps. Tell us your grades, budget and preferences, and a counsellor will come back within 24 hours with the destinations that genuinely fit your profile — and the ones that do not."
        crumbs={[{ label: "Free Assessment", href: "/free-assessment" }]}
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-12">
          <AssessmentForm />

          {/* --------------------------------------------- sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <h2 className="text-lg">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {[
                  {
                    t: "We read your profile",
                    b: "A counsellor checks your grades and budget against real entry criteria for the destinations you chose.",
                  },
                  {
                    t: "We call you within 24 hours",
                    b: "On the number you provide. If you prefer WhatsApp, say so in the message box.",
                  },
                  {
                    t: "You get a shortlist and a timeline",
                    b: "Including what to prepare first, and what it will actually cost.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/20 font-display text-xs font-bold text-gold-dark">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-navy">
                        {s.t}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink/70">
                        {s.b}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <h2 className="text-lg">Have your details ready</h2>
              <CheckList
                className="mt-4"
                items={[
                  "Your highest qualification and year of completion",
                  "Your grade, percentage or CGPA",
                  "Any English test result you already hold",
                  "A rough budget your family can commit",
                  "Any previous visa refusal, honestly declared",
                ]}
              />
            </div>

            <div className="rounded-2xl bg-navy-gradient p-6 text-white">
              <h2 className="text-lg text-white">Prefer to talk first?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Walk into our Hayatabad office or call us. The first counselling
                session is free either way.
              </p>
              <a
                href={`tel:${site.phones[0]}`}
                className="btn-gold mt-4 w-full text-sm"
              >
                {site.phonesDisplay[0]}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Free Assessment", href: "/free-assessment" },
        ])}
      />
    </>
  );
}
