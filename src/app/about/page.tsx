import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import {
  getAccreditations,
  getPageBySlug,
  getSiteSettings,
} from "@/sanity/data";

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

  return (
    <>
      <PageHero
        eyebrow={`Based in ${settings.address?.city ?? "Luton"}`}
        title={page?.title ?? "About Prime Bodywork and Repair"}
        description={
          page?.metaDescription ??
          "A specialist body repair centre in Luton. We work with delivery service partners, fleet operators, leasing customers, insurers and private customers."
        }
        cta={
          <ButtonLink href="/contact" size="lg">
            Get in touch
          </ButtonLink>
        }
      />

      <section className="py-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {page?.body && page.body.length > 0 ? (
              <PortableText value={page.body} />
            ) : (
              <>
                <p className="mt-4 text-base leading-relaxed">
                  Prime Bodywork and Repair is a specialist body repair centre
                  based at Unit 6, 196 Camford Way, Luton.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  We specialise in commercial vans and work closely with
                  delivery service partners, fleet operators and leasing
                  customers who need reliable repairs, clear communication and
                  fast turnaround to keep vehicles on the road.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Our services include accident damage repair, dent and panel
                  repairs, paintwork, bumper repairs, end-of-hire repairs and
                  defleet preparation. We help bring vehicles up to the required
                  return standard and reduce the risk of unnecessary damage
                  charges at the end of a lease or hire period.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  We also welcome private customers, walk-in enquiries and
                  insurance work. Where an insurance claim is involved, we can
                  communicate directly with the insurer and help manage the
                  repair process from assessment through to completion.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Whether you operate a fleet or need repairs to your own
                  vehicle, our focus is straightforward: practical advice,
                  quality repairs and getting vehicles back on the road as
                  quickly as possible.
                </p>
              </>
            )}
          </article>
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
                  <img
                    src={logoUrl}
                    alt={a.name}
                    className="max-h-16 w-auto"
                  />
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
