import Link from "next/link";

import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/types";

/**
 * Brand wordmark.
 *
 * Order of preference:
 *   1. Logo uploaded to Sanity Site Settings → Logo (owner-controlled)
 *   2. /logo.png in the public folder (dropped in by dev — see LOGO_FILE flag)
 *   3. Typographic fallback: "PRIME" in red + "BODYWORK AND REPAIR" in orange
 *      arranged to mirror the actual brand logo colours.
 */

// Flip to `true` once you save the real logo image to /public/logo.png
// (this avoids a broken image icon when the file hasn't been added yet).
const HAS_LOGO_FILE = true;

export function Logo({
  settings,
  variant = "light",
}: {
  settings: SiteSettings;
  variant?: "light" | "dark";
}) {
  // 1. Sanity-hosted logo — highest priority (owner-controlled)
  if (settings.logo) {
    return (
      <Link
        href="/"
        className="inline-flex items-center"
        aria-label={`${settings.businessName} — home`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(settings.logo).width(320).auto("format").url()}
          alt={settings.businessName}
          className="h-11 w-auto"
        />
      </Link>
    );
  }

  // 2. Repo-hosted logo file
  if (HAS_LOGO_FILE) {
    return (
      <Link
        href="/"
        className="inline-flex items-center"
        aria-label={`${settings.businessName} — home`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt={settings.businessName} className="h-11 w-auto" />
      </Link>
    );
  }

  // 3. Typographic fallback — arranged to echo the real logo:
  //    PRIME in red, BODYWORK AND REPAIR in warm gold underneath.
  const primeColor =
    variant === "dark" ? "text-white" : "text-[var(--color-accent)]";
  const sublineColor =
    variant === "dark"
      ? "text-[var(--color-warm)]"
      : "text-[var(--color-warm)]";

  return (
    <Link
      href="/"
      className="inline-flex flex-col leading-none"
      aria-label={`${settings.businessName} — home`}
    >
      <span
        className={`font-black tracking-tight text-2xl sm:text-3xl ${primeColor}`}
      >
        PRIME
      </span>
      <span
        className={`mt-1 text-[9px] font-bold uppercase tracking-[0.15em] ${sublineColor}`}
      >
        Bodywork and Repair
      </span>
    </Link>
  );
}
