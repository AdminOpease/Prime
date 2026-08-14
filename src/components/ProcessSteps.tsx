import { Container } from "./Container";

/**
 * "How it works" strip — four numbered steps reassuring visitors that
 * getting a quote is low-effort. Especially important after an accident
 * when people are stressed and looking for a clear next step.
 */
export function ProcessSteps() {
  const steps = [
    {
      title: "Tell us about it",
      body: "Send a message or call. A few details about the vehicle and what's happened is all we need.",
    },
    {
      title: "Free written estimate",
      body: "We assess the work and give you an honest quote — usually within one working day.",
    },
    {
      title: "Quality repair",
      body: "Booked in at a time that suits you. Done to manufacturer standards, kept inside the workshop.",
    },
    {
      title: "Ready to collect",
      body: "Quality-checked, valeted, and signed off. We back our work with a written guarantee.",
    },
  ];

  return (
    <section className="bg-[var(--color-muted)] py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)]">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Quick, honest, no surprises
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-[var(--color-primary-foreground)]">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
