import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { getSiteSettings } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for vehicle repair, bodywork and paint services from Prime Bodywork and Repair Ltd.",
};

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const email = settings.email ?? "eduard@primebodywork.co.uk";
  const phone = settings.phone;
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
            Terms &amp; Conditions
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
              These terms and conditions govern the supply of vehicle repair,
              bodywork, paint and related services by Prime Bodywork and Repair
              Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;the
              Company&rdquo;) to you (&ldquo;the Customer&rdquo;). By leaving
              your vehicle with us and/or authorising us to carry out work, you
              accept these terms.
            </p>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-5 text-sm">
              <p>
                <strong>Your statutory rights.</strong> Nothing in these terms
                affects your legal rights as a consumer under the Consumer
                Rights Act 2015 — including your right to have services carried
                out with reasonable care and skill, within a reasonable time,
                and for a reasonable price where one hasn&apos;t been agreed in
                advance. Where anything in these terms conflicts with your
                statutory rights, your statutory rights take precedence.
              </p>
            </div>

            <Section title="1. Estimates and quotations">
              <p>
                An <strong>estimate</strong> is a good-faith indication of the
                likely cost based on the information available at the time. It
                may change once work begins and the full extent of the damage or
                fault becomes clear.
              </p>
              <p className="mt-3">
                A <strong>quotation</strong> is a fixed price for clearly
                defined work and, once accepted by you, forms a binding
                agreement for that work.
              </p>
              <p className="mt-3">
                If we discover additional faults or damage while carrying out
                the work, we will contact you first. We will not carry out any
                additional work, or incur any additional cost, without your
                authorisation (given verbally or in writing).
              </p>
            </Section>

            <Section title="2. Payment and our right to retain the vehicle">
              <p>
                Unless we agree otherwise in writing, all invoices are payable
                in full, by an accepted payment method, before the vehicle
                leaves our premises.
              </p>
              <p className="mt-3">
                We reserve the right to retain possession of the vehicle (a
                &ldquo;lien&rdquo;) until all sums due — for diagnostics, labour,
                parts, storage and any related charges — have been paid in full.
              </p>
            </Section>

            <Section title="3. Collection and storage of vehicles">
              <p>
                We will let you know when the work is complete and your vehicle
                is ready for collection.
              </p>
              <p className="mt-3">
                If the vehicle is not collected within{" "}
                <strong>1 week (7 days)</strong> of us notifying you that it is
                ready, we reserve the right to charge a storage fee of{" "}
                <strong>£30 per day</strong> (or part day) for each day the
                vehicle remains with us thereafter.
              </p>
            </Section>

            <Section title="4. Uncollected and abandoned vehicles">
              <p>
                If a vehicle remains uncollected and charges remain unpaid, we
                will attempt to contact you in writing at the details you have
                provided.
              </p>
              <p className="mt-3">
                Where a vehicle remains uncollected for <strong>3 months</strong>{" "}
                despite written notice, we reserve the right — in accordance with
                the Torts (Interference with Goods) Act 1977 — to sell or
                otherwise dispose of the vehicle to recover unpaid repair,
                storage and related costs. Any balance remaining after deducting
                the sums owed to us will be returned to you.
              </p>
            </Section>

            <Section title="5. Parts, materials and guarantees">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Our workmanship.</strong> We stand behind our work. If
                  a repair fails because of the way we carried it out, we will
                  put it right. This is in addition to your statutory right under
                  the Consumer Rights Act 2015 to have work performed with
                  reasonable care and skill. We do not offer a fixed-period
                  workmanship guarantee; the exclusions below apply.
                </li>
                <li>
                  <strong>Parts.</strong> Any warranty on parts we supply is
                  confirmed by us at the time of the work — we do not offer a
                  blanket parts warranty. Where a part carries a
                  manufacturer&apos;s or supplier&apos;s warranty, we pass on the
                  benefit of that warranty to you where possible. Some parts —
                  for example certain used, reconditioned or specially-ordered
                  items — may carry no warranty at all. Where that is the case,
                  no warranty applies to that part, and we will tell you before
                  it is fitted wherever practical.
                </li>
                <li>
                  <strong>Exclusions.</strong> Our guarantee does not cover fair
                  wear and tear, or damage caused by accident, misuse, neglect,
                  track or motorsport use, or any subsequent modification or
                  repair carried out by anyone other than us.
                </li>
                <li>
                  <strong>Customer-supplied parts.</strong> Where you supply your
                  own parts, we accept no responsibility or warranty for those
                  parts. If a customer-supplied part is faulty or fails, any
                  further work required (including removing and refitting a
                  replacement) will be charged at our standard labour rates.
                </li>
              </ul>
            </Section>

            <Section title="6. Liability">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Vehicles and belongings.</strong> Vehicles and their
                  contents are left with us at the owner&apos;s risk. Please
                  remove all valuables and personal belongings before leaving
                  your vehicle — we are not responsible for items left in it.
                </li>
                <li>
                  <strong>Indirect losses.</strong> We are not liable for
                  indirect or consequential losses, including loss of earnings,
                  loss of use, missed appointments, or the cost of alternative
                  transport arising from any delay in completing the work.
                </li>
                <li>
                  <strong>What we cannot exclude.</strong> Nothing in these terms
                  excludes or limits our liability for death or personal injury
                  caused by our negligence, for fraud, or for anything else that
                  cannot lawfully be excluded.
                </li>
              </ul>
            </Section>

            <Section title="7. General">
              <p>
                These terms are governed by the law of England and Wales, and
                any dispute will be subject to the exclusive jurisdiction of the
                courts of England and Wales.
              </p>
              <p className="mt-3">
                We may update these terms from time to time. The version in
                force is the one published on this page.
              </p>
              <p className="mt-3">
                If you have any questions about these terms, contact us on{" "}
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="font-medium text-[var(--color-accent)] hover:underline"
                >
                  {phone}
                </a>{" "}
                or at{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-[var(--color-accent)] hover:underline"
                >
                  {email}
                </a>
                .
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
