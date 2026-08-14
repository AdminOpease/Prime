import { Container } from "./Container";

/**
 * Short strip of credibility badges shown immediately under the hero.
 * Designed to be reassuring without being kitschy — clean labels, no chrome
 * or checkered flags. When real accreditations are added in Sanity they'll
 * appear below this strip on the About page.
 */
export function TrustStrip() {
  const items = [
    { label: "Insurance welcome", sub: "We liaise with your insurer" },
    { label: "Vans, cars & fleet", sub: "All makes and models" },
    { label: "DSP & fleet welcome", sub: "Fast turnaround, priority booking" },
    { label: "Free written estimates", sub: "No obligation" },
  ];

  return (
    <section
      aria-label="Why customers choose us"
      className="border-y border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <Container className="grid grid-cols-2 divide-x divide-[var(--color-border)] md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="px-4 py-6 sm:px-6 sm:py-8">
            <p className="text-sm font-semibold tracking-tight sm:text-base">
              {item.label}
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted-foreground)] sm:text-sm">
              {item.sub}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
