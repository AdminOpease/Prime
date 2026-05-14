import Link from "next/link";

import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/types";

/**
 * Brand wordmark.
 * - If the owner has uploaded a logo to Site Settings → Logo in Sanity,
 *   render that image.
 * - Otherwise, render a typographic wordmark inspired by the real logo:
 *   "PRIME" in royal blue, "BODYWORK & REPAIR" in red, on one row.
 */
export function Logo({
  settings,
  variant = "light",
}: {
  settings: SiteSettings;
  variant?: "light" | "dark";
}) {
  const hasLogo = Boolean(settings.logo);

  if (hasLogo) {
    return (
      <Link
        href="/"
        className="inline-flex items-center"
        aria-label={`${settings.businessName} — home`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(settings.logo!).width(280).auto("format").url()}
          alt={settings.businessName}
          className="h-10 w-auto"
        />
      </Link>
    );
  }

  // Typographic fallback so the brand still feels real before Sanity is populated.
  // On dark backgrounds (footer) we flip the "BODYWORK" red to a warmer accent
  // so it stays legible without losing the two-tone effect.
  const primeColor =
    variant === "dark" ? "text-white" : "text-[var(--color-primary)]";
  const sublineColor =
    variant === "dark"
      ? "text-[var(--color-warm)]"
      : "text-[var(--color-accent)]";

  return (
    <Link
      href="/"
      className="inline-flex items-baseline gap-2 font-bold tracking-tight"
      aria-label={`${settings.businessName} — home`}
    >
      <span className={`text-xl sm:text-2xl ${primeColor}`}>PRIME</span>
      <span
        className={`hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${sublineColor}`}
      >
        Bodywork &amp; Repair
      </span>
    </Link>
  );
}
