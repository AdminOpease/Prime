import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import {
  getAccreditations,
  getPageBySlug,
  getSiteSettings,
} from "@/sanity/data";
import { servicePlaceholders } from "@/lib/servicePlaceholders";

export const metadata: Metadata = {
  title: "About",
  description:
    "Prime Bodywork and Repair is a specialist body repair centre in Luton. We work with delivery service partners, fleet operators, leasing customers, insurers and private customers.",
};

export default async function AboutPage() {
  const [page, accreditations, settings] = await Promise.all([
    getPageBySlug("about"),
    getAccreditations(),
    getSiteSettings(),
  ]);

  const city = settings.address?.city ?? "Luton";
  const telHref = `tel:${settings.phone.replace(/\s+/g, "")}`;

  const facts: [string, string][] = [
    [
      "Based in",
      [settings.address?.line2, city, settings.address?.postcode]
        .filter(Boolean)
        .join(", "),
    ],
    ["Specialism", "Van, fleet & commercial bodywork"],
    ["We work with", "DSPs, fleet operators, leasing, insurers & private"],
    ["Opening hours", "Mon–Fri · 8am–6pm"],
  ];

  return (
    <>
      {/* Compact header */}
      <section className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <Container className="py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            About us
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {page?.title ?? "Specialist body repair for vans, fleets & drivers"}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            {page?.metaDescription ??
              `A specialist body repair centre in ${city}, working with delivery service partners, fleet operators, leasing customers, insurers and private customers.`}
          </p>
        </Container>
      </section>

      {/* Story + at-a-glance sidebar */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div className="max-w-2xl space-y-5 text-base leading-relaxed">
              {page?.body && page.body.length > 0 ? (
                <PortableText value={page.body} />
              ) : (
                <>
                  <p className="text-lg leading-relaxed text-[var(--color-foreground)]">
                    Prime Bodywork and Repair is a specialist body repair centre
                    based at {settings.address?.line1 ?? "Unit 6"},{" "}
                    {settings.address?.line2 ?? "196 Camford Way"}, {city}.
                  </p>
                  <p>
                    We specialise in commercial vans and work closely with
                    delivery service partners, fleet operators and leasing
                    customers who need reliable repairs, clear communication and
                    fast turnaround to keep vehicles on the road.
                  </p>
                  <p>
                    Our services include accident damage repair, dent and panel
                    repairs, paintwork, bumper repairs, end-of-hire repairs and
                    defleet preparation. We help bring vehicles up to the
                    required return standard and reduce the risk of unnecessary
                    damage charges at the end of a lease or hire period.
                  </p>
                  <p>
                    We also welcome private customers, walk-in enquiries and
                    insurance work. Where an insurance claim is involved, we can
                    communicate directly with the insurer and help manage the
                    repair process from assessment through to completion.
                  </p>
                  <p>
                    Whether you operate a fleet or need repairs to your own
                    vehicle, our focus is straightforward: practical advice,
                    quality repairs and getting vehicles back on the road as
                    quickly as possible.
                  </p>
                </>
              )}
            </div>

            {/* At a glance */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm)]">
                  At a glance
                </h2>
                <dl className="mt-4 space-y-4">
                  {facts.map(([term, value]) => (
                    <div key={term}>
                      <dt className="text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                        {term}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
                  <ButtonLink href="/contact" size="lg">
                    Get a repair estimate
                  </ButtonLink>
                  <a
                    href={telHref}
                    className="text-center text-sm font-semibold text-[var(--color-foreground)] hover:text-[var(--color-accent)]"
                  >
                    Or call {settings.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)] py-14 sm:py-16">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)]">
            What we do
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Our services
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicePlaceholders.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 transition-all hover:border-[var(--color-primary)] hover:shadow-md"
                >
                  <div>
                    <h3 className="text-base font-bold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                      {s.shortDescription}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-warm)] transition-transform group-hover:translate-x-0.5">
                    Read more →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA band */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--color-primary)] px-8 py-10 text-[var(--color-primary-foreground)] sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Got a vehicle that needs work?
              </h2>
              <p className="mt-2 max-w-xl text-white/80">
                Send a few photos and the details — we&apos;ll come back with a
                written estimate, usually the same working day.
              </p>
            </div>
            <ButtonLink href="/contact" size="lg" className="shrink-0">
              Get a repair estimate
            </ButtonLink>
          </div>
        </Container>
      </section>

      {accreditations.length > 0 && (
        <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)] py-16">
          <Container>
            <h2 className="text-2xl font-bold sm:text-3xl">Accreditations</h2>
            <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {accreditations.map((a) => {
                const logoUrl = urlFor(a.logo).width(280).auto("format").url();
                const inner = (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt={a.name} className="max-h-16 w-auto" />
                );
                return (
                  <li
                    key={a._id}
                    className="flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
                  >
                    {a.link ? (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        title={a.name}
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
