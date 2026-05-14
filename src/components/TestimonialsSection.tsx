import { Container } from "./Container";
import type { Testimonial } from "@/sanity/types";

/**
 * Testimonials section.
 * If real testimonials exist in Sanity, show those.
 * Otherwise show a single "Reviews coming soon" placeholder so the section
 * doesn't sit empty during launch.
 */
export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              Customer reviews
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Real feedback, coming soon
            </h2>
            <p className="mt-3 text-[var(--color-muted-foreground)]">
              We&apos;re pulling together recent Google reviews and customer
              quotes here. In the meantime, ask anyone who&apos;s used us —
              or get in touch directly.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Customer reviews
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What customers say
          </h2>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t._id}
              className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
            >
              <Stars rating={t.rating ?? 5} />
              <blockquote className="text-base leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="mt-auto text-sm font-semibold">
                — {t.customerName}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={
            i < rating
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-border)]"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}
