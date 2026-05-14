import Link from "next/link";

import { SanityImage } from "./SanityImage";
import type { ServiceListItem } from "@/sanity/types";

const categoryLabels: Record<ServiceListItem["category"], string> = {
  bodywork: "Bodywork",
  mot: "MOT",
  servicing: "Servicing",
  classic: "Classic",
  prestige: "Prestige",
  fleet: "Fleet",
};

export function ServiceCard({ service }: { service: ServiceListItem }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[var(--color-muted)]">
        {service.heroImage ? (
          <SanityImage
            source={service.heroImage}
            alt={service.title}
            width={600}
            height={450}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Photo to be added
          </div>
        )}
      </div>
      <div className="space-y-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          {categoryLabels[service.category] ?? service.category}
        </p>
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="line-clamp-2 text-sm text-[var(--color-muted-foreground)]">
          {service.shortDescription}
        </p>
        {service.priceFrom && (
          <p className="pt-2 text-sm font-medium">
            From <span className="text-[var(--color-accent)]">{service.priceFrom}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
