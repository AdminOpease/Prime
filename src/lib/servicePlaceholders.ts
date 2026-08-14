/**
 * Hand-written placeholder content for the 4 services the garage offers.
 * Used until the owner publishes real content in Sanity — at which point
 * live data overrides these.
 *
 * Ordering matches the owner's requested homepage flow:
 *   Bodywork → Van & Fleet → Defleet → Insurance & Private
 */

import type { ServiceCategory } from "@/sanity/types";

export type ServicePlaceholder = {
  slug: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  body: string[];
  priceFrom?: string;
};

export const servicePlaceholders: ServicePlaceholder[] = [
  {
    slug: "bodywork-accident-repair",
    category: "bodywork",
    title: "Bodywork & Accident Repair",
    shortDescription:
      "Panel repairs, dents, scratches, bumpers and paintwork for vans and cars, with accurate colour matching and quality finishes.",
    body: [
      "From minor scuffs to major collision damage, our bodyshop restores vehicles to a high standard. We use computerised paint mixing to match every modern factory colour and finish.",
      "Common work includes accident damage repair, paintless dent removal, plastic bumper repair, scratch and stone-chip touch-up, alloy wheel refurbishment, and full resprays across all makes and models.",
      "We estimate the work in writing before starting so there are no surprises — get in touch with a few photos and we'll come back with a repair estimate.",
    ],
  },
  {
    slug: "van-fleet-repairs",
    category: "van-fleet",
    title: "Van & Fleet Repairs",
    shortDescription:
      "Specialist repairs for delivery service partners, fleet operators and commercial vans, with clear estimates and fast turnaround to reduce vehicle downtime.",
    body: [
      "We work with delivery service partners, fleet operators and leasing customers who need reliable repairs, clear communication, and fast turnaround to keep vehicles earning.",
      "Typical work includes accident and body damage repair, panel replacement, paintwork, bumper repair, and cosmetic tidy-ups. We're set up for volume and can prioritise vehicles by operational need.",
      "Get in touch about volume rates, direct invoicing to your fleet account, and priority booking arrangements.",
    ],
  },
  {
    slug: "end-of-hire-defleet",
    category: "defleet",
    title: "End-of-Hire & Defleet",
    shortDescription:
      "Vehicle inspections, damage repairs and return preparation to help meet leasing standards and reduce avoidable end-of-contract charges.",
    body: [
      "Leasing and hire contracts have strict return standards — anything outside the return guide can lead to unnecessary damage charges. We help you meet the required standard before the vehicle goes back.",
      "The process: we inspect the vehicle against BVRLA-style fair-wear-and-tear criteria, quote for the repairs that make economic sense to fix in-house, and turn the vehicle round quickly so you can hand it back clean.",
      "Common work includes bumper scuffs, alloy refurbishment, panel dents, minor paint damage, and interior tidy-ups. We can also produce a written inspection report if useful for your records.",
    ],
  },
  {
    slug: "insurance-private-work",
    category: "insurance-private",
    title: "Insurance & Private Work",
    shortDescription:
      "Insurance claims and private repairs welcome. We liaise directly with insurers and manage the repair from assessment to completion.",
    body: [
      "Whether you're claiming on your own insurance, a third party's, or paying privately, we make the process as straightforward as possible.",
      "For insurance work we can communicate directly with the insurer or claims handler — estimates, assessor visits, photo evidence, and final invoicing. You don't need to chase paperwork.",
      "For private and walk-in customers we provide a clear written estimate up front, do the work to a proper standard, and stand behind it. Get in touch with a few photos and we'll come back to you.",
    ],
  },
];

export function findPlaceholderBySlug(slug: string) {
  return servicePlaceholders.find((s) => s.slug === slug);
}

export function findPlaceholderByCategory(category: ServiceCategory) {
  return servicePlaceholders.find((s) => s.category === category);
}
