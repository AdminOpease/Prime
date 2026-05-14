import type { ReactNode } from "react";

import { Container } from "./Container";

/**
 * Compact hero used on every page except the homepage.
 * The homepage has a bigger, more visual hero.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: ReactNode;
}) {
  return (
    <section className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <Container className="py-14 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            {description}
          </p>
        )}
        {cta && <div className="mt-6 flex flex-wrap gap-3">{cta}</div>}
      </Container>
    </section>
  );
}
