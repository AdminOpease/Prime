import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { getAllServices } from "@/sanity/data";
import { servicePlaceholders } from "@/lib/servicePlaceholders";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bodywork, van & fleet repairs, end-of-hire defleet, and insurance repair work in Luton.",
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
        description="Everything we offer under one roof — accident and body repair for vans and cars, fleet maintenance, end-of-hire prep, and insurance work."
        cta={
          <ButtonLink href="/contact" size="lg">
            Get a repair estimate
          </ButtonLink>
        }
      />

      <section className="py-16">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useFallback
              ? servicePlaceholders.map((s) => (
                  <li key={s.slug}>
                    <ServiceCard
                      service={{
                        _id: s.slug,
                        title: s.title,
                        slug: s.slug,
                        category: s.category,
                        shortDescription: s.shortDescription,
                        priceFrom: s.priceFrom,
                      }}
                    />
                  </li>
                ))
              : services.map((s) => (
                  <li key={s._id}>
                    <ServiceCard service={s} />
                  </li>
                ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
