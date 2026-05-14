import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { getSiteSettings } from "@/sanity/data";

/**
 * Placeholder homepage — fully built in step 7 once base layout is verified.
 * Reads from Site Settings so it already feels real even before the owner
 * fills anything in (fallbacks live in src/sanity/data.ts).
 */
export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <Container className="py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {settings.address?.city ?? "Luton"} bodywork specialists
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {settings.tagline ?? "Bodywork, MOT & Servicing"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Insurance approved repairs, classic restoration, MOT testing and
            mechanical servicing — all under one roof in Luton.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              Get a free quote
            </ButtonLink>
            <ButtonLink
              href={`tel:${settings.phone.replace(/\s+/g, "")}`}
              size="lg"
              variant="ghost"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Call {settings.phone}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Placeholder "what we do" strip */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold sm:text-3xl">What we do</h2>
          <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
            A real services grid and gallery preview drop in here next. For now
            this page proves the header, footer, fonts, and Sanity data are
            wired up.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Bodywork & Accident Repair",
              "MOT Testing",
              "Servicing & Mechanical Repair",
              "Classic Car Restoration",
              "Prestige Vehicles",
              "Fleet Services",
            ].map((label) => (
              <li
                key={label}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-5"
              >
                <p className="font-semibold">{label}</p>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  Coming soon — content will be pulled from Sanity.
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
