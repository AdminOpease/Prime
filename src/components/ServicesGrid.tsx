import Link from "next/link";

import { Container } from "./Container";
import { servicePlaceholders } from "@/lib/servicePlaceholders";

/**
 * Service grid used on the homepage. Reads from the placeholder catalogue
 * so the homepage feels complete before the owner has published anything
 * in Sanity. When real services exist in Sanity, the /services index page
 * uses those instead.
 */
export function ServicesGrid() {
  return (
    <section className="bg-[var(--color-bg)] py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)]">
              What we do
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Bodywork for vans, cars and fleets
            </h2>
            <p className="mt-3 text-base text-[var(--color-muted-foreground)] sm:text-lg">
              One workshop, every job — from a stone chip touch-up to full
              accident repair, fleet maintenance and end-of-hire prep.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden text-sm font-semibold text-[var(--color-warm)] hover:underline sm:inline-flex"
          >
            See all services →
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicePlaceholders.map((service, i) => (
            <li
              key={service.slug}
              className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 transition-all hover:border-[var(--color-primary)] hover:shadow-md"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-warm)]">
                    {labelFor(service.category)}
                  </p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  {service.priceFrom ? (
                    <p className="text-sm font-medium">
                      From{" "}
                      <span className="text-[var(--color-warm)]">
                        {service.priceFrom}
                      </span>
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-sm font-semibold text-[var(--color-foreground)] transition-transform group-hover:translate-x-0.5">
                    Read more →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 sm:hidden">
          <Link
            href="/services"
            className="inline-flex text-sm font-semibold text-[var(--color-warm)] hover:underline"
          >
            See all services →
          </Link>
        </div>
      </Container>
    </section>
  );
}

function labelFor(category: string): string {
  return (
    {
      bodywork: "Bodywork",
      "van-fleet": "Van & Fleet",
      defleet: "End-of-Hire",
      "insurance-private": "Insurance & Private",
    } as Record<string, string>
  )[category] ?? category;
}
