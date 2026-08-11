import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { PortableText } from "@/components/PortableText";
import { SanityImage } from "@/components/SanityImage";
import { ServicePlaceholderImage } from "@/components/ServicePlaceholderImage";
import { getServiceBySlug } from "@/sanity/data";
import {
  findPlaceholderBySlug,
  servicePlaceholders,
} from "@/lib/servicePlaceholders";

type Params = { slug: string };

// Pre-generate the known placeholder slugs at build time so they exist
// even before the owner publishes anything in Sanity.
export function generateStaticParams(): Params[] {
  return servicePlaceholders.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const placeholder = findPlaceholderBySlug(slug);
  const title = service?.title ?? placeholder?.title ?? "Service";
  const description =
    service?.shortDescription ?? placeholder?.shortDescription;
  return { title, description };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const placeholder = findPlaceholderBySlug(slug);

  if (!service && !placeholder) {
    notFound();
  }

  const title = service?.title ?? placeholder!.title;
  const description = service?.shortDescription ?? placeholder!.shortDescription;
  const priceFrom = service?.priceFrom ?? placeholder?.priceFrom;
  const hasRealBody = service?.body && service.body.length > 0;
  const category = service?.category ?? placeholder!.category;

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={title}
        description={description}
        cta={
          <>
            <ButtonLink href="/contact" size="lg">
              Get a repair estimate
            </ButtonLink>
            {priceFrom && (
              <span className="inline-flex items-center rounded-md bg-white/10 px-4 text-sm text-white/90">
                From {priceFrom}
              </span>
            )}
          </>
        }
      />

      {/* Hero image (real from Sanity, or branded placeholder) */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)]">
        <Container className="py-6">
          <div className="overflow-hidden rounded-xl">
            {service?.heroImage ? (
              <SanityImage
                source={service.heroImage}
                alt={title}
                width={1600}
                height={720}
                className="h-auto w-full object-cover"
              />
            ) : (
              <ServicePlaceholderImage
                category={category}
                className="h-auto w-full"
              />
            )}
          </div>
        </Container>
      </div>

      <section className="py-16">
        <Container>
          <article className="prose-base mx-auto max-w-3xl">
            {hasRealBody ? (
              <PortableText value={service!.body!} />
            ) : (
              placeholder!.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-4 text-base leading-relaxed text-[var(--color-foreground)]"
                >
                  {paragraph}
                </p>
              ))
            )}

            <div className="mt-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
              <h2 className="text-xl font-semibold">Get a written estimate</h2>
              <p className="mt-2 text-[var(--color-muted-foreground)]">
                Send the vehicle details, a description of the work and a few
                photos and we&apos;ll come back with a written estimate. Or
                call the number in the header.
              </p>
              <div className="mt-4">
                <ButtonLink href="/contact">Get a repair estimate</ButtonLink>
              </div>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
