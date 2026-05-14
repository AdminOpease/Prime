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
    "About Prime Bodywork and Repair — a bodywork and mechanical workshop based in Luton.",
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
          "A bodyshop and mechanical workshop serving Luton and the surrounding area. Insurance approved, classic and prestige experienced, fleet welcome."
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
                  Prime Bodywork and Repair is a local workshop offering full
                  bodywork, MOT, servicing, and specialist work for classic,
                  prestige, and fleet vehicles. We&apos;re based at Unit 6, 196
                  Camford Way in Luton.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Customers come to us for honest advice, careful work, and a
                  straightforward process — especially with insurance claims,
                  where we&apos;ll deal with the insurer directly so you
                  don&apos;t have to chase paperwork.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  This section will be replaced with the owner&apos;s real story
                  and team photos once they&apos;re published in the Studio.
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
