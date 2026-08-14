import { ButtonLink } from "./Button";
import { Container } from "./Container";

/**
 * Mid-page CTA reassuring customers we handle insurance claims directly.
 * Bodywork sites convert hardest on customers who've just had an accident
 * and don't know what to do — leading with "we deal with the insurer" is
 * usually the strongest message.
 */
export function InsuranceCta({ phone }: { phone: string }) {
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  return (
    <section className="bg-[var(--color-primary)] py-20 text-[var(--color-primary-foreground)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)]">
              Had an accident?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              We&apos;ll deal with the insurer
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              No chasing paperwork, no being passed between departments. Send
              us a few photos and your insurer details — we&apos;ll handle the
              estimate, the claim, and the repair.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
            <ButtonLink href="/services/insurance-private-work" size="lg">
              How it works
            </ButtonLink>
            <ButtonLink
              href={telHref}
              variant="ghost"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Call {phone}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
