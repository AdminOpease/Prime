import { ButtonLink } from "./Button";
import { Container } from "./Container";

/**
 * Homepage hero — dark, confident, photography-ready.
 *
 * Visual notes:
 *  - The hero is intentionally typography-led, not stock-photo-led. Real
 *    workshop photography drops in once the owner provides it (the radial
 *    gradient becomes a subtle vignette over the photo).
 *  - "From" text uses a hairline divider line on either side, which is a
 *    classic editorial cue that the eye keys into.
 *  - Two CTAs: primary (quote) and secondary (call). Call CTA is slightly
 *    de-emphasised on desktop because we expect most desktop visitors to
 *    fill the form, but elevated on mobile where tap-to-call wins.
 */
export function HomeHero({
  town,
  phone,
}: {
  town: string;
  phone: string;
}) {
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      {/* Decorative background: subtle radial vignette + diagonal lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,1) 0 1px, transparent 1px 14px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(245,158,11,0.18) 0%, transparent 60%)",
        }}
      />

      <Container className="relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
            {town} · Bodyshop &amp; Garage
          </p>
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
          Bodywork, MOT &amp; servicing —{" "}
          <span className="text-[var(--color-accent)]">done properly.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          Accident repair, MOT testing, mechanical work, classic restoration,
          and fleet maintenance — all under one roof on Camford Way. Insurance
          approved.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact" size="lg">
            Get a free quote
          </ButtonLink>
          <ButtonLink
            href={telHref}
            size="lg"
            variant="ghost"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Call {phone}
          </ButtonLink>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
          <Stat label="Service categories" value="6" />
          <Stat label="Insurance work" value="Yes" />
          <Stat label="Quote turnaround" value="24 hrs" />
        </dl>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-white/60">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {value}
      </dd>
    </div>
  );
}
