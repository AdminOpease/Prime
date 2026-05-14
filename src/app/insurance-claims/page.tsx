import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getSiteSettings } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Insurance Claims",
  description:
    "Insurance approved bodyshop in Luton. We deal with your insurer so you don't have to.",
};

const steps = [
  {
    title: "Get in touch",
    body: "Call us or send a message with your insurer details and a quick description of what's happened. We'll guide you on what to do next.",
  },
  {
    title: "We deal with the insurer",
    body: "We liaise directly with your insurer or claims handler — estimates, assessor visits, photo evidence, the lot. You don't need to chase anything.",
  },
  {
    title: "Bring the car in",
    body: "We book the vehicle in at a time that suits you, complete the repair to manufacturer standards, and let you know as soon as it's ready.",
  },
  {
    title: "Drive away",
    body: "Quality-checked, valeted, and signed off. We back the work with a written guarantee.",
  },
];

export default async function InsuranceClaimsPage() {
  const settings = await getSiteSettings();
  const telHref = `tel:${settings.phone.replace(/\s+/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow="No-hassle claims"
        title="Insurance claims, handled for you"
        description="We're an established repairer in Luton. Whether you're claiming on your own insurance or a third party's, we'll handle the paperwork and keep you informed."
        cta={
          <>
            <ButtonLink href="/contact" size="lg">
              Start a claim
            </ButtonLink>
            <ButtonLink href={telHref} variant="ghost" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Call {settings.phone}
            </ButtonLink>
          </>
        }
      />

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
            <ol className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--color-accent)] font-bold text-[var(--color-accent-foreground)]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[var(--color-muted-foreground)]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-lg bg-[var(--color-primary)] p-8 text-[var(--color-primary-foreground)]">
            <h2 className="text-2xl font-bold">Already had an accident?</h2>
            <p className="mt-2 text-white/80">
              The sooner we know, the sooner we can help. Take a few photos
              (damage, registration plates, any other vehicles involved) and get
              in touch — we&apos;ll handle the rest.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Start a claim</ButtonLink>
              <ButtonLink
                href={telHref}
                variant="ghost"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Call {settings.phone}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
