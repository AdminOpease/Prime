import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { PortableText } from "@/components/PortableText";
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

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={title}
        description={description}
        cta={
          <>
            <ButtonLink href="/contact" size="lg">
              Get a quote for this
            </ButtonLink>
            {priceFrom && (
              <span className="inline-flex items-center rounded-md bg-white/10 px-4 text-sm text-white/90">
                From {priceFrom}
              </span>
            )}
          </>
        }
      />

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
              <h2 className="text-xl font-semibold">Ready to book this in?</h2>
              <p className="mt-2 text-[var(--color-muted-foreground)]">
                Send us a few details and we&apos;ll call you back with a quote.
                Or call us directly on the number in the header.
              </p>
              <div className="mt-4">
                <ButtonLink href="/contact">Request a quote</ButtonLink>
              </div>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
