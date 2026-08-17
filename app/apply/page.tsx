import Link from "next/link";
import { CheckList, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/data/process";
import { disclaimer, site } from "@/data/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { telLink } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Apply Now",
  description:
    "Start your study abroad application with Reading Study Abroad, Peshawar. Send your details and a counsellor will open your file within 24 hours.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Start your application"
        title="Apply Now"
        subtitle="Ready to move? Send us your details and a counsellor will open your file, confirm your shortlist and give you a document checklist within 24 hours."
        crumbs={[{ label: "Apply", href: "/apply" }]}
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-14">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Application enquiry"
                title="Tell Us About Your Plan"
                subtitle="Fill in as much as you can. Nothing here commits you to anything — it simply lets a counsellor prepare properly before calling you."
              />
            </Reveal>

            <Reveal className="mt-8">
              <LeadForm variant="full" source="Apply Now page" />
            </Reveal>

            <Reveal className="mt-10 rounded-2xl bg-gold/10 p-6">
              <p className="text-sm leading-relaxed text-ink/80">
                <strong className="text-navy">
                  Want a fuller assessment first?
                </strong>{" "}
                The{" "}
                <Link
                  href="/free-assessment"
                  className="font-semibold text-gold-dark underline-offset-2 hover:underline"
                >
                  four-step free assessment
                </Link>{" "}
                collects your academic record, English test status and budget,
                so we can give you a far more specific answer on the first call.
              </p>
            </Reveal>
          </div>

          {/* --------------------------------------------- sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <h2 className="text-lg">What we will need</h2>
              <CheckList
                className="mt-4"
                items={[
                  "Academic transcripts and certificates",
                  "Passport, or its application status",
                  "English test result, if you have one",
                  "A realistic budget figure from your family",
                  "Any previous visa refusal, declared honestly",
                ]}
              />
              <p className="mt-5 border-t border-navy/10 pt-4 text-xs leading-relaxed text-ink/60">
                Do not send documents by email until a counsellor asks you to.
                We will tell you exactly what to send, and how.
              </p>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <h2 className="text-lg">What happens after this</h2>
              <ol className="mt-4 space-y-3">
                {processSteps.slice(0, 4).map((s) => (
                  <li key={s.number} className="flex gap-3">
                    <span className="font-display text-xs font-bold text-gold-dark">
                      {s.number}
                    </span>
                    <span className="text-sm leading-relaxed text-ink/75">
                      {s.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-navy-gradient p-6 text-white">
              <h2 className="text-lg text-white">In a hurry?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Intake deadlines move fast. Call us directly and we will start
                your file today.
              </p>
              <a
                href={telLink(site.phones[0])}
                className="btn-gold mt-4 w-full text-sm"
              >
                {site.phonesDisplay[0]}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-ink/55">
            {disclaimer}
          </p>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ label: "Apply", href: "/apply" }])} />
    </>
  );
}
