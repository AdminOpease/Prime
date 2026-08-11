import Link from "next/link";

import { Container } from "./Container";
import { Logo } from "./Logo";
import { getSiteSettings } from "@/sanity/data";

/**
 * Site footer with address, hours, social links, and a Google Maps embed.
 * Pulls everything from Site Settings so the owner controls the content.
 */
export async function Footer() {
  const settings = await getSiteSettings();
  const telHref = `tel:${settings.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${settings.email}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand block */}
        <div className="space-y-3">
          <Logo settings={settings} variant="dark" />
          {settings.tagline && (
            <p className="text-sm text-white/70">{settings.tagline}</p>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a href={telHref} className="hover:text-[var(--color-accent)]">
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={mailHref} className="hover:text-[var(--color-accent)]">
                {settings.email}
              </a>
            </li>
            {settings.address?.line1 && (
              <li className="not-italic">
                <address className="not-italic">
                  {settings.address.line1}
                  {settings.address.line2 && (
                    <>
                      <br />
                      {settings.address.line2}
                    </>
                  )}
                  <br />
                  {settings.address.city}
                  {settings.address.postcode && `, ${settings.address.postcode}`}
                </address>
              </li>
            )}
          </ul>
        </div>

        {/* Hours */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Opening hours
          </h3>
          <ul className="space-y-1 text-sm text-white/80">
            {settings.openingHours?.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span>{row.day}</span>
                <span className="tabular-nums">
                  {row.closed ? "Closed" : `${row.open ?? ""}–${row.close ?? ""}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links + socials */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Quick links
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/services" className="hover:text-[var(--color-accent)]">
                All services
              </Link>
            </li>
            <li>
              <Link href="/insurance-claims" className="hover:text-[var(--color-accent)]">
                Insurance claims
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[var(--color-accent)]">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--color-accent)]">
                Get a repair estimate
              </Link>
            </li>
          </ul>

          {settings.socialLinks && settings.socialLinks.length > 0 && (
            <div className="flex gap-3 pt-2 text-sm">
              {settings.socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-white/70 hover:text-[var(--color-accent)]"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/60 sm:flex-row">
          <p>© {year} {settings.businessName}. All rights reserved.</p>
          <p>
            Website by{" "}
            <a
              href="https://primebodywork.co.uk"
              className="hover:text-[var(--color-accent)]"
            >
              primebodywork.co.uk
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
