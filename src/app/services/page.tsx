import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { getAllServices } from "@/sanity/data";
import { servicePlaceholders } from "@/lib/servicePlaceholders";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bodywork, MOT, servicing, classic, prestige and fleet vehicle services in Luton.",
};

export default async function ServicesIndexPage() {
  const services = await getAllServices();
  // If the owner hasn't published anything yet, show placeholder cards
  // built from servicePlaceholders so the page never looks empty.
  const useFallback = services.length === 0;

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Our services"
        description="Everything we offer under one roof — bodywork, MOT, servicing, and specialist work for classic, prestige and fleet vehicles."
        cta={
          <ButtonLink href="/contact" size="lg">
            Get a free quote
          </ButtonLink>
        }
      />

      <section className="py-16">
        <Container>
          {useFallback ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicePlaceholders.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block h-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] transition-shadow hover:shadow-lg"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center bg-[var(--color-muted)] text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                      Photo to be added
                    </div>
                    <div className="space-y-2 p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                        {s.category}
                      </p>
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                      <p className="line-clamp-2 text-sm text-[var(--color-muted-foreground)]">
                        {s.shortDescription}
                      </p>
                      {s.priceFrom && (
                        <p className="pt-2 text-sm font-medium">
                          From{" "}
                          <span className="text-[var(--color-accent)]">
                            {s.priceFrom}
                          </span>
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s._id}>
                  <ServiceCard service={s} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
