import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { disclaimer, site } from "@/data/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms on which Reading Study Abroad provides educational counselling and application support to students.",
  path: "/terms",
});

const UPDATED = "18 August 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle={`The basis on which we provide counselling and application support. Last updated ${UPDATED}.`}
        crumbs={[{ label: "Terms", href: "/terms" }]}
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-9">
            <div className="prose-page">
              <div className="mb-8 rounded-xl border-l-4 border-gold bg-gold/10 p-5">
                <p className="text-sm font-medium text-navy">{disclaimer}</p>
              </div>

              <h2 className="text-xl">1. About these terms</h2>
              <p>
                These terms govern your use of this website and the counselling
                and application support services provided by {site.legalName},{" "}
                {site.address.street}, {site.address.city}. Where you engage us
                for paid services, a separate written service agreement takes
                precedence over anything on this page.
              </p>

              <h2 className="mt-8 text-xl">2. What we do</h2>
              <p>
                We provide educational counselling, university and course
                selection guidance, application processing support, guidance on
                documentation, and assistance preparing student visa
                applications. We also provide pre-departure and post-arrival
                guidance where we are able to.
              </p>

              <h2 className="mt-8 text-xl">3. What we cannot do</h2>
              <p>
                We are not a university and we are not an immigration authority.
                We do not grant admissions and we do not issue visas.
              </p>
              <ul className="mb-4 mt-3 list-disc space-y-2 pl-5">
                <li>
                  Admission decisions rest solely with the university you apply
                  to.
                </li>
                <li>
                  Visa decisions rest solely with the embassy or immigration
                  authority of the destination country.
                </li>
                <li>
                  Scholarship decisions rest solely with the awarding body.
                </li>
                <li>
                  We do not guarantee admission, a visa, a scholarship, a
                  particular processing time, or employment during or after your
                  studies.
                </li>
              </ul>
              <p>
                Any person — inside or outside this organisation — who offers
                you a guaranteed visa is misleading you. Please tell us if that
                happens.
              </p>

              <h2 className="mt-8 text-xl">4. Your responsibilities</h2>
              <ul className="mb-4 mt-3 list-disc space-y-2 pl-5">
                <li>
                  Give us accurate and complete information, including any
                  previous visa refusal.
                </li>
                <li>
                  Provide genuine documents. We will not knowingly submit
                  fraudulent, altered or fabricated documents, and we will end
                  our engagement immediately if we discover them.
                </li>
                <li>
                  Meet the deadlines we set for documents, payments to
                  universities and appointments. Missed deadlines can cost an
                  entire intake.
                </li>
                <li>
                  Read and understand any offer letter, financial requirement or
                  visa condition before you accept it.
                </li>
                <li>
                  Comply with the immigration laws and visa conditions of your
                  destination country.
                </li>
              </ul>

              <h2 className="mt-8 text-xl">5. Fees</h2>
              <p>
                The initial counselling and profile assessment is free. Where a
                service carries a charge, it is explained to you in writing
                before you commit, along with what it covers and what it does
                not. Fees payable to third parties — universities, embassies,
                test centres, attestation bodies, translators — are separate,
                are set by those bodies, and are paid directly by you.
              </p>

              <h2 className="mt-8 text-xl">6. Refunds</h2>
              <p>
                Refund terms are set out in your written service agreement. Fees
                paid to third parties are governed by that third party&rsquo;s
                own refund policy and are outside our control. An unsuccessful
                admission or visa outcome does not by itself create a right to a
                refund of work already carried out.
              </p>

              <h2 className="mt-8 text-xl">7. Information on this website</h2>
              <p>
                The information on this site is general guidance for Pakistani
                students and is written to remain accurate over time. Entry
                requirements, financial thresholds, fees and processing times
                are set by universities and governments and change regularly —
                which is why we deliberately do not publish them here. Always
                confirm current specifics with us, or directly with the
                institution or embassy, before acting.
              </p>

              <h2 className="mt-8 text-xl">8. Third-party links</h2>
              <p>
                Where we link to a university, embassy or other external website,
                we do not control that site&rsquo;s content or its privacy
                practices, and a link is not an endorsement of everything on it.
              </p>

              <h2 className="mt-8 text-xl">9. Intellectual property</h2>
              <p>
                The text, layout and design of this website belong to{" "}
                {site.legalName}. You are welcome to read, print and share our
                guides for personal use. Republishing our content commercially
                without permission is not permitted.
              </p>

              <h2 className="mt-8 text-xl">10. Limitation of liability</h2>
              <p>
                To the extent permitted by law, our liability is limited to the
                fees you have paid us for the service in question. We are not
                liable for decisions made by universities, embassies, awarding
                bodies or other third parties, nor for losses arising from
                inaccurate information you have supplied to us.
              </p>

              <h2 className="mt-8 text-xl">11. Governing law</h2>
              <p>
                These terms are governed by the laws of the Islamic Republic of
                Pakistan, and the courts of Peshawar have jurisdiction over any
                dispute.
              </p>

              <h2 className="mt-8 text-xl">12. Contact</h2>
              <p>
                Questions about these terms? Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>{" "}
                or see our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  contact page
                </Link>
                . See also our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ label: "Terms", href: "/terms" }])} />
    </>
  );
}
