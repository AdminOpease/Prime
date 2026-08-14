import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PortableText } from "@/components/PortableText";
import { SanityImage } from "@/components/SanityImage";
import { ServicePlaceholderImage } from "@/components/ServicePlaceholderImage";
import { getServiceBySlug, getSiteSettings } from "@/sanity/data";
import {
  findPlaceholderBySlug,
  servicePlaceholders,
} from "@/lib/servicePlaceholders";

type Params = { slug: string };

const CATEGORY_LABELS: Record<string, string> = {
  bodywork: "Bodywork",
  "van-fleet": "Van & Fleet",
  defleet: "End-of-Hire",
  "insurance-private": "Insurance & Private",
};

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
  const [service, settings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ]);
  const placeholder = findPlaceholderBySlug(slug);

  if (!service && !placeholder) {
    notFound();
  }

  const title = service?.title ?? placeholder!.title;
  const description = service?.shortDescription ?? placeholder!.shortDescription;
  const priceFrom = service?.priceFrom ?? placeholder?.priceFrom;
  const hasRealBody = service?.body && service.body.length > 0;
  const category = service?.category ?? placeholder!.category;
  const telHref = `tel:${settings.phone.replace(/\s+/g, "")}`;
  const others = servicePlaceholders.filter((s) => s.slug !== slug);

  return (
    <>
      {/* Compact header with breadcrumb — no more oversized hero */}
      <section className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <Container className="py-10 sm:py-12">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-white/60"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/90">{title}</span>
          </nav>

          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {CATEGORY_LABELS[category] ?? "Service"}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
            {description}
          </p>
        </Container>
      </section>

      {/* Two-column body: content + sticky estimate/nav sidebar */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
            {/* Main content */}
            <article>
              <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                <div className="aspect-[16/9]">
                  {service?.heroImage ? (
                    <SanityImage
                      source={service.heroImage}
                      alt={title}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ServicePlaceholderImage
                      category={category}
                      className="h-full w-full"
                    />
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {hasRealBody ? (
                  <PortableText value={service!.body!} />
                ) : (
                  placeholder!.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-[var(--color-foreground)]"
                    >
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
                <h2 className="text-lg font-semibold">Get a repair estimate</h2>
                {priceFrom && (
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    From{" "}
                    <span className="font-semibold text-[var(--color-accent)]">
                      {priceFrom}
                    </span>
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  Send the vehicle details and a few photos and we&apos;ll come
                  back with a written estimate — usually the same working day.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <ButtonLink href="/contact" size="lg">
                    Get a repair estimate
                  </ButtonLink>
                  <ButtonLink href={telHref} variant="ghost" size="lg">
                    Call {settings.phone}
                  </ButtonLink>
                </div>
                <ul className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-5 text-sm">
                  {[
                    "Free written estimates",
                    "Vans, fleet & private welcome",
                    "We liaise with your insurer",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckIcon />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other services */}
              <nav
                aria-label="Other services"
                className="mt-6 rounded-xl border border-[var(--color-border)] p-6"
              >
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                  Other services
                </h2>
                <ul className="mt-3 space-y-1">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-[var(--color-muted)]"
                      >
                        <span>{s.title}</span>
                        <span
                          aria-hidden
                          className="text-[var(--color-warm)] transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
