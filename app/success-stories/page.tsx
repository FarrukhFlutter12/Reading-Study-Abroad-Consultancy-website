import { CTABand, PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StoryExplorer } from "@/components/StoryExplorer";
import { testimonials } from "@/data/testimonials";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Student Success Stories",
  description:
    "Students from Peshawar and across Pakistan who travelled abroad with support from Reading Study Abroad. Published only with written permission.",
  path: "/success-stories",
});

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Student stories"
        title="Students We Have Guided"
        subtitle="Every story on this page is published with the student's written permission, in their own words. We do not invent testimonials, and we do not use stock photos of people who were never our students."
        crumbs={[{ label: "Success Stories", href: "/success-stories" }]}
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <StoryExplorer items={testimonials} />
        </div>
      </section>

      <section aria-labelledby="policy-heading" className="bg-white py-14 lg:py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="policy-heading"
              eyebrow="Why this page may look sparse"
              title="Our Testimonial Policy"
              subtitle="Plenty of consultancy websites carry glowing quotes with stock photographs attached. We would rather this page stayed empty than fill it that way."
            />
          </Reveal>

          <Reveal className="mx-auto mt-10 max-w-3xl rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
            <ul className="space-y-4 text-sm leading-relaxed text-ink/80">
              <li>
                <strong className="text-navy">Written consent first.</strong> No
                student&rsquo;s name, photo or story appears here without their
                explicit written permission, which they can withdraw at any time.
              </li>
              <li>
                <strong className="text-navy">Their words, not ours.</strong> We
                do not write testimonials on students&rsquo; behalf or edit them
                into marketing copy.
              </li>
              <li>
                <strong className="text-navy">No stock photography.</strong> If
                a student prefers not to share a photo, their story appears
                without one.
              </li>
              <li>
                <strong className="text-navy">No numbers we cannot prove.</strong>{" "}
                We do not publish success percentages or placement counts we
                cannot evidence.
              </li>
            </ul>

            <p className="mt-6 border-t border-navy/10 pt-5 text-sm leading-relaxed text-ink/70">
              Are you a former student happy to share your experience? Get in
              touch — we would be glad to feature you, with your permission and
              on your terms.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Start Your Own Story"
        body="Book a free counselling session and find out where your grades and budget can realistically take you."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Success Stories", href: "/success-stories" },
        ])}
      />
    </>
  );
}
