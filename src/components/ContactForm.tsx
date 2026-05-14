"use client";

import { useState } from "react";

import { Button } from "./Button";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errBody = (await res
          .json()
          .catch(() => ({ error: "Something went wrong" }))) as {
          error?: string;
        };
        throw new Error(errBody.error ?? `Request failed (${res.status})`);
      }

      setStatus({ kind: "success" });
      form.reset();
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Couldn't send your message",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
        <h3 className="text-lg font-semibold">Thanks — message received</h3>
        <p className="mt-2 text-[var(--color-muted-foreground)]">
          We&apos;ve got your enquiry and will call you back as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-4 text-sm font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  const inputCls =
    "block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-base outline-none focus:border-[var(--color-accent)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — bots fill this, humans don't see it. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Your name *</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-1 ${inputCls}`}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Phone *</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={`mt-1 ${inputCls}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">
          Email <span className="text-[var(--color-muted-foreground)]">(optional)</span>
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={`mt-1 ${inputCls}`}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">
          Vehicle make / model{" "}
          <span className="text-[var(--color-muted-foreground)]">(optional)</span>
        </span>
        <input
          name="vehicle"
          type="text"
          className={`mt-1 ${inputCls}`}
          placeholder="e.g. 2018 Volkswagen Golf"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">What do you need? *</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`mt-1 ${inputCls}`}
          placeholder="A quick description of the job is fine — we'll call you to discuss details."
        />
      </label>

      {status.kind === "error" && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {status.message}
        </p>
      )}

      <Button type="submit" disabled={status.kind === "sending"} size="lg">
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </Button>

      <p className="text-xs text-[var(--color-muted-foreground)]">
        By submitting you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}
