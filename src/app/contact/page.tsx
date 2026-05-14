import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { getSiteSettings } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prime Bodywork and Repair in Luton. Call us or send a message and we'll call you back.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const telHref = `tel:${settings.phone.replace(/\s+/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Send us a message — we'll call you back"
        description="Tell us a bit about your vehicle and what you need. We aim to come back to every enquiry within the working day."
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Form */}
            <div>
              <h2 className="text-xl font-semibold">Request a quote</h2>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                Required fields are marked. We&apos;ll only use your details to
                reply to your enquiry.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            {/* Aside: contact details + map */}
            <aside className="space-y-8">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Prefer to talk?
                </h3>
                <a
                  href={telHref}
                  className="mt-3 block text-2xl font-bold text-[var(--color-accent)]"
                >
                  {settings.phone}
                </a>
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                  Or email{" "}
                  <a
                    href={`mailto:${settings.email}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {settings.email}
                  </a>
                </p>
              </div>

              <div className="rounded-lg border border-[var(--color-border)] p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Find us
                </h3>
                <address className="mt-3 not-italic text-base leading-relaxed">
                  {settings.address?.line1}
                  {settings.address?.line2 && (
                    <>
                      <br />
                      {settings.address.line2}
                    </>
                  )}
                  <br />
                  {settings.address?.city}
                  {settings.address?.postcode && `, ${settings.address.postcode}`}
                </address>
              </div>

              {settings.mapEmbedUrl && (
                <div className="overflow-hidden rounded-lg border border-[var(--color-border)]">
                  <iframe
                    src={settings.mapEmbedUrl}
                    title="Map"
                    width="100%"
                    height="280"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block"
                  />
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
