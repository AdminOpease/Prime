import Link from "next/link";

import { Container } from "./Container";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { getSiteSettings } from "@/sanity/data";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/insurance-claims", label: "Insurance Claims" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Top-of-page bar with logo, primary nav, and a click-to-call CTA.
 * Phone CTA is the highest-converting element for a local service business —
 * it's repeated in the hero, header, and footer on purpose.
 */
export async function Header() {
  const settings = await getSiteSettings();
  const telHref = `tel:${settings.phone.replace(/\s+/g, "")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg)]/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo settings={settings} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden text-sm font-semibold text-[var(--color-foreground)] hover:text-[var(--color-accent)] sm:inline-flex"
          >
            {settings.phone}
          </a>
          <ButtonLink href="/contact" size="sm" variant="primary">
            Get an estimate
          </ButtonLink>
        </div>
      </Container>

      {/* Mobile-only secondary nav row */}
      <div className="border-t border-[var(--color-border)] md:hidden">
        <Container>
          <nav
            aria-label="Primary (mobile)"
            className="flex gap-4 overflow-x-auto py-2 text-sm"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[var(--color-foreground)] hover:text-[var(--color-accent)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
