import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Reading Study Abroad collects, uses, stores and deletes the personal information you submit through this website.",
  path: "/privacy-policy",
});

const UPDATED = "18 August 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`How we handle the information you send us. Last updated ${UPDATED}.`}
        crumbs={[{ label: "Privacy Policy", href: "/privacy-policy" }]}
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-9">
            <div className="prose-page">
              <h2 className="text-xl">Who we are</h2>
              <p>
                {site.legalName} is a study abroad consultancy based at{" "}
                {site.address.street}, {site.address.city},{" "}
                {site.address.region}, {site.address.country}. This policy
                explains what happens to the personal information you submit
                through this website.
              </p>

              <h2 className="mt-8 text-xl">What we collect</h2>
              <p>
                We only collect what you type into a form on this site. Depending
                on the form, that may include:
              </p>
              <ul className="mb-4 mt-3 list-disc space-y-2 pl-5">
                <li>Your name, phone number, email address and city</li>
                <li>
                  Your academic background — qualification, field of study, year
                  of completion and grades
                </li>
                <li>Your English test status and score, where you provide it</li>
                <li>
                  Your preferred destinations, course level, intake and budget
                  range
                </li>
                <li>
                  Your passport status, sponsor details and any previous visa
                  refusal you choose to declare
                </li>
                <li>Anything you write in a free-text message field</li>
              </ul>
              <p>
                We do not run advertising trackers, we do not build behavioural
                profiles, and we do not ask for documents through this website.
                A counsellor will tell you separately how to share documents when
                the time comes.
              </p>

              <h2 className="mt-8 text-xl">How your information reaches us</h2>
              <p>
                Form submissions on this site are delivered by a third-party form
                service (Web3Forms) which forwards the contents of the form to
                our office email address,{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>
                . The service acts purely as a delivery mechanism — it transmits
                your message to our inbox. Your enquiry is then held in that
                email account and in our internal records.
              </p>

              <h2 className="mt-8 text-xl">Why we use it</h2>
              <ul className="mb-4 mt-3 list-disc space-y-2 pl-5">
                <li>To respond to your enquiry and arrange counselling</li>
                <li>
                  To assess which destinations and universities suit your profile
                </li>
                <li>
                  To prepare applications and documentation on your behalf, if
                  you choose to proceed with us
                </li>
                <li>To keep a record of the advice we have given you</li>
              </ul>
              <p>
                We do not sell your information, and we do not share it for
                marketing purposes. Where you ask us to apply on your behalf, we
                share the necessary details with the universities and, where
                required, the relevant embassy — that is the purpose of the
                application.
              </p>

              <h2 className="mt-8 text-xl">How long we keep it</h2>
              <p>
                We keep enquiry records for as long as they are useful for
                advising you, and longer where we have processed an application
                and may need the file for reference. If you would like your
                information removed sooner, ask us and we will do it.
              </p>

              <h2 className="mt-8 text-xl">Requesting deletion or a copy</h2>
              <p>
                You can ask us at any time to tell you what we hold about you, to
                correct it, or to delete it. Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${site.phones[0]}`}
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  {site.phonesDisplay[0]}
                </a>{" "}
                with the name and phone number you originally submitted, so we
                can locate your record. We will confirm once it is done.
              </p>
              <p>
                Where we are mid-way through an application on your behalf,
                deleting your file may mean we can no longer continue that
                application. We will tell you if that applies before acting.
              </p>

              <h2 className="mt-8 text-xl">Cookies and analytics</h2>
              <p>
                This website does not set advertising or tracking cookies. Pages
                that embed a Google Map load content from Google, which may set
                its own cookies under Google&rsquo;s policies. Nothing on this
                site profiles you for advertising.
              </p>

              <h2 className="mt-8 text-xl">Children</h2>
              <p>
                Our services are aimed at students at or above secondary school
                completion. If a student under 18 submits a form, we expect a
                parent or guardian to be involved in the counselling process.
              </p>

              <h2 className="mt-8 text-xl">Security</h2>
              <p>
                Form submissions are transmitted over an encrypted connection.
                Access to our office email and records is limited to our staff.
                No system is completely secure, so please do not send passwords,
                bank credentials or scanned documents through the website forms.
              </p>

              <h2 className="mt-8 text-xl">Changes to this policy</h2>
              <p>
                If we change how we handle your information, we will update this
                page and the date at the top.
              </p>

              <h2 className="mt-8 text-xl">Contact</h2>
              <p>
                Questions about this policy? Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>
                , call us, or visit the office. See our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-gold-dark underline-offset-2 hover:underline"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Privacy Policy", href: "/privacy-policy" },
        ])}
      />
    </>
  );
}
