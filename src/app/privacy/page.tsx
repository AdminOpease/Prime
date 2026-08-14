import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { getSiteSettings } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Prime Bodywork and Repair collects, uses and protects your personal information.",
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const business = settings.businessName ?? "Prime Bodywork and Repair";
  const email = settings.email ?? "eduard@primebodywork.co.uk";
  const phone = settings.phone;
  const address = [
    settings.address?.line1,
    settings.address?.line2,
    settings.address?.city,
    settings.address?.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  // Kept in sync with the actual site behaviour. Update the "Last updated"
  // date whenever the substance of this policy changes.
  const lastUpdated = "August 2026";

  return (
    <>
      {/* Compact header */}
      <section className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <Container className="py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/70">
            Last updated: {lastUpdated}
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-[var(--color-foreground)]">
            <p>
              This policy explains how {business} (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) collects, uses and protects your personal
              information when you contact us or use our website. We are the
              data controller for the information you provide.
            </p>

            <Section title="Who we are">
              <p>
                {business}
                {address ? `, ${address}.` : "."} You can reach us by phone on{" "}
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="font-medium text-[var(--color-accent)] hover:underline"
                >
                  {phone}
                </a>{" "}
                or by email at{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-[var(--color-accent)] hover:underline"
                >
                  {email}
                </a>
                .
              </p>
            </Section>

            <Section title="What information we collect">
              <p>When you contact us, we may collect:</p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Your name and contact details (phone number and email).</li>
                <li>
                  Vehicle details, including the registration and whether the
                  vehicle is driveable.
                </li>
                <li>
                  Details of the work required, the damage, your preferred
                  timescale and any message you send us.
                </li>
                <li>
                  Any photos you choose to upload of the vehicle or damage, and
                  any insurer or inspection documents you share.
                </li>
              </ul>
              <p className="mt-3">
                We only collect what you choose to give us in order to deal with
                your enquiry. We do not buy personal data from third parties.
              </p>
            </Section>

            <Section title="How we use your information">
              <p>We use your information to:</p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Respond to your enquiry and provide a repair estimate.</li>
                <li>Carry out and manage any repair work you ask us to do.</li>
                <li>
                  Where relevant, liaise with your insurer or their appointed
                  claims handler or assessor to progress a claim.
                </li>
                <li>Keep records for our accounting and legal obligations.</li>
              </ul>
              <p className="mt-3">
                Our lawful bases for processing are taking steps at your request
                before entering into a contract, performing that contract, our
                legitimate interest in responding to enquiries and running our
                business, and complying with our legal obligations.
              </p>
            </Section>

            <Section title="Who we share it with">
              <p>
                We do not sell your personal information. We share it only where
                needed to deal with your enquiry or run our business, for
                example:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>
                  Your insurer or their claims handler, where you have asked us
                  to handle an insurance claim.
                </li>
                <li>
                  Our email provider (Resend), which delivers enquiry
                  notifications to us, and our website host (Cloudflare).
                </li>
                <li>
                  Suppliers, HMRC or professional advisers where we are required
                  to for legal, tax or accounting reasons.
                </li>
              </ul>
            </Section>

            <Section title="How long we keep it">
              <p>
                We keep your enquiry details and any photos for up to 24 months
                after your last contact with us, unless we need to keep them
                longer for a specific job, an insurance claim, a warranty, or a
                legal, tax or accounting reason. When information is no longer
                needed, we delete it securely.
              </p>
            </Section>

            <Section title="Cookies and analytics">
              <p>
                Our website does not use tracking or advertising cookies. If we
                add website analytics or advertising tools in the future, we
                will update this policy and, where required, ask for your
                consent.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                Under UK data protection law you have the right to access the
                personal information we hold about you, ask us to correct or
                delete it, object to or restrict how we use it, and request a
                copy in a portable format. To exercise any of these rights,
                contact us at{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-[var(--color-accent)] hover:underline"
                >
                  {email}
                </a>
                .
              </p>
              <p className="mt-3">
                If you are unhappy with how we have handled your information, you
                can complain to the Information Commissioner&apos;s Office (ICO)
                at{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-[var(--color-accent)] hover:underline"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this policy from time to time. Any changes will be
                posted on this page with a revised &ldquo;last updated&rdquo;
                date.
              </p>
            </Section>
          </div>
        </Container>
      </section>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[var(--color-muted-foreground)]">
        {children}
      </div>
    </div>
  );
}
