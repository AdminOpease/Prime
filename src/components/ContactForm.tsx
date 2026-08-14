"use client";

import Script from "next/script";
import { useState, useRef, type ChangeEvent, type FormEvent } from "react";

import { Button } from "./Button";

// Cloudflare Turnstile site key (public). When unset, the widget doesn't
// render and the server skips verification — so the form works unchanged
// until Turnstile is configured.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const WORK_TYPES = [
  "Accident / body damage",
  "Dent or scratch repair",
  "Bumper repair",
  "Paintwork",
  "Fleet repair",
  "End-of-hire / defleet preparation",
  "Insurance claim",
  "Other",
] as const;

const DAMAGE_LOCATIONS = [
  "Front",
  "Rear",
  "Driver side",
  "Passenger side",
  "Roof",
  "Multiple areas",
] as const;

const TIMESCALES = [
  "Urgent",
  "Within 7 days",
  "Within 30 days",
  "Flexible",
] as const;

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    setFileError(null);

    if (selected.length + files.length > MAX_FILES) {
      setFileError(
        `You can upload up to ${MAX_FILES} photos total (you had ${files.length}, tried to add ${selected.length}).`,
      );
      return;
    }

    const oversized = selected.find((f) => f.size > MAX_FILE_BYTES);
    if (oversized) {
      setFileError(
        `"${oversized.name}" is over 10 MB. Please pick a smaller version.`,
      );
      return;
    }

    const notImage = selected.find((f) => !f.type.startsWith("image/"));
    if (notImage) {
      setFileError(
        `"${notImage.name}" isn't an image. Only JPG, PNG or HEIC please.`,
      );
      return;
    }

    setFiles((prev) => [...prev, ...selected]);
    // Reset the input so re-selecting the same file re-triggers onChange
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Attach files under a repeatable "photos" key
    files.forEach((file) => formData.append("photos", file));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = (await res
          .json()
          .catch(() => ({ error: "Something went wrong" }))) as {
          error?: string;
        };
        throw new Error(err.error ?? `Request failed (${res.status})`);
      }

      setStatus({ kind: "success" });
      form.reset();
      setFiles([]);
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Couldn't send your enquiry",
      });
      // Turnstile tokens are single-use — reset so a retry gets a fresh one.
      if (TURNSTILE_SITE_KEY) {
        (
          window as unknown as { turnstile?: { reset: () => void } }
        ).turnstile?.reset();
      }
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
        <h3 className="text-lg font-semibold">
          Thanks — your estimate request is on its way
        </h3>
        <p className="mt-2 text-[var(--color-muted-foreground)]">
          We&apos;ll come back to you within the working day with a written
          estimate. If it&apos;s urgent, please also give us a call.
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

  const input =
    "block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-base outline-none focus:border-[var(--color-accent)]";
  const select = `${input} appearance-none pr-9`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot — bots fill this, humans don't see it. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Section: Contact details */}
      <Section title="Contact details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" required>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              className={input}
            />
          </Field>
          <Field label="Phone" required>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={input}
            />
          </Field>
        </div>
        <Field label="Email" hint="Optional — we'll only use it to reply.">
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={input}
          />
        </Field>
      </Section>

      {/* Section: Vehicle */}
      <Section title="Vehicle">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <Field
            label="Vehicle registration"
            hint="e.g. AB12 CDE — helps us look up the exact vehicle."
            required
          >
            <input
              name="registration"
              type="text"
              required
              autoCapitalize="characters"
              className={`${input} uppercase`}
              placeholder="AB12 CDE"
            />
          </Field>
          <Field label="Driveable?" required>
            <div className="flex h-10 items-center gap-4 pt-1">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="driveable"
                  value="Yes"
                  defaultChecked
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="driveable"
                  value="No"
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </Field>
        </div>
      </Section>

      {/* Section: Work type */}
      <Section title="What kind of work?">
        <Field label="Type of work" required>
          <div className="relative">
            <select name="workType" required defaultValue="" className={select}>
              <option value="" disabled>
                Choose one…
              </option>
              {WORK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </Field>
      </Section>

      {/* Section: Damage location */}
      <Section title="Damage location">
        <Field
          label="Where's the damage?"
          hint="Tick all that apply."
          required
        >
          <div className="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-3">
            {DAMAGE_LOCATIONS.map((loc) => (
              <label
                key={loc}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm hover:border-[var(--color-accent)]"
              >
                <input
                  type="checkbox"
                  name="damageLocation"
                  value={loc}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                {loc}
              </label>
            ))}
          </div>
        </Field>
      </Section>

      {/* Section: Photos */}
      <Section title="Photos">
        <Field
          label="Add up to 5 photos"
          hint="Full vehicle, close-up of damage, wider shot of the panel, registration plate, plus any insurer/inspection report. This is the biggest thing that helps us give an accurate estimate."
        >
          <div className="mt-1 space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              className="block w-full text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--color-primary-foreground)] hover:file:bg-[var(--color-primary)]/90"
            />
            {fileError && (
              <p className="text-sm text-red-700">{fileError}</p>
            )}
            {files.length > 0 && (
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {files.map((file, i) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <li
                      key={`${file.name}-${i}`}
                      className="group relative aspect-square overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={file.name}
                        className="h-full w-full object-cover"
                        onLoad={() => URL.revokeObjectURL(url)}
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        aria-label={`Remove ${file.name}`}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                      >
                        ×
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {files.length} of {MAX_FILES} photos added. Max 10 MB each.
            </p>
          </div>
        </Field>
      </Section>

      {/* Section: Timing */}
      <Section title="Timing">
        <Field label="Preferred timescale" required>
          <div className="relative">
            <select
              name="timescale"
              required
              defaultValue=""
              className={select}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {TIMESCALES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </Field>
      </Section>

      {/* Section: Additional details */}
      <Section title="Anything else?">
        <Field
          label="Additional details"
          hint="Optional — anything else that would help us estimate."
        >
          <textarea
            name="message"
            rows={4}
            className={input}
            placeholder="Insurer name, claim reference, specific concerns, etc."
          />
        </Field>
      </Section>

      {status.kind === "error" && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {status.message}
        </p>
      )}

      {/* Cloudflare Turnstile — renders only once a site key is configured. */}
      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="auto"
          />
        </>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status.kind === "sending"} size="lg">
          {status.kind === "sending" ? "Sending…" : "Send my estimate request"}
        </Button>
        <p className="text-xs text-[var(--color-muted-foreground)]">
          By submitting you agree to be contacted about your enquiry. See our{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:text-[var(--color-accent)]"
          >
            Privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small subcomponents                                                        */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-warm)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-[var(--color-accent)]"> *</span>}
      </span>
      {hint && (
        <span className="mt-0.5 block text-xs text-[var(--color-muted-foreground)]">
          {hint}
        </span>
      )}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
