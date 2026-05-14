import Link from "next/link";

import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/types";

/**
 * Renders the business logo if present, otherwise a clean text wordmark.
 * Keeps the header looking professional even before the owner uploads a logo.
 */
export function Logo({
  settings,
  variant = "light",
}: {
  settings: SiteSettings;
  variant?: "light" | "dark";
}) {
  const hasLogo = Boolean(settings.logo);
  const textColor =
    variant === "dark" ? "text-[var(--color-primary-foreground)]" : "text-[var(--color-foreground)]";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 font-bold tracking-tight ${textColor}`}
      aria-label={`${settings.businessName} — home`}
    >
      {hasLogo ? (
        // Using a plain <img> so it works whether the logo is PNG, SVG, or JPG.
        // Sanity's CDN already optimises and we get caching for free.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(settings.logo!).width(240).auto("format").url()}
          alt={settings.businessName}
          className="h-10 w-auto"
        />
      ) : (
        <span className="text-xl sm:text-2xl">
          <span className="text-[var(--color-accent)]">Prime</span> Bodywork
        </span>
      )}
    </Link>
  );
}
