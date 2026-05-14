/**
 * Hand-written placeholder content for the 6 services we know the garage
 * offers. Used until the owner publishes real content in Sanity — at which
 * point the live data overrides these.
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
      "Expert collision repair, paint matching and dent removal for all makes and models. Insurance approved.",
    body: [
      "From minor scuffs to major collision damage, our bodyshop restores vehicles to pre-accident condition. We use computerised paint mixing to match every modern factory colour and finish.",
      "We handle the full process for you: estimate, courtesy car arrangement, insurer liaison, and a quality check on every job before it leaves the workshop.",
      "Common work includes panel replacement, paintless dent removal, alloy wheel refurbishment, plastic bumper repair, and full resprays.",
    ],
  },
  {
    slug: "mot-testing",
    category: "mot",
    title: "MOT Testing",
    shortDescription:
      "Class 4 MOT testing in Luton. Quick turnaround, honest results, and we'll fix what's needed in-house.",
    body: [
      "We're an authorised MOT testing station for Class 4 vehicles (cars, small vans). Most tests are completed the same day.",
      "If your vehicle needs work to pass, we'll explain what's required and what it'll cost before doing anything — no surprises.",
      "We can also handle re-tests for free if the work is done by us within the standard window.",
    ],
    priceFrom: "£45",
  },
  {
    slug: "servicing-mechanical-repair",
    category: "servicing",
    title: "Servicing & Mechanical Repair",
    shortDescription:
      "Manufacturer-spec servicing, mechanical repairs, brakes, clutches, and diagnostics for all makes.",
    body: [
      "From interim services to full manufacturer-spec schedules, we maintain your vehicle's service history without invalidating any warranty.",
      "Our workshop is equipped for diagnostics across modern petrol, diesel, and hybrid vehicles. We tackle brakes, suspension, clutches, timing belts, exhausts, and electrical faults.",
      "All work is documented and we use OE-quality parts as standard.",
    ],
  },
  {
    slug: "classic-car-restoration",
    category: "classic",
    title: "Classic Car Restoration",
    shortDescription:
      "Sympathetic restoration and repair for classic vehicles — bodywork, paint, mechanical, and trim.",
    body: [
      "Classics need patience and the right techniques. We work on everything from light recommissioning to full ground-up restorations.",
      "Whether it's rust repair on a Mini, a paint refresh on a Jag, or a complete rebuild, we'll talk you through the process and timeline before quoting.",
      "Photos and updates throughout the project, on request — we know these cars matter to their owners.",
    ],
  },
  {
    slug: "prestige-vehicles",
    category: "prestige",
    title: "Prestige Vehicles",
    shortDescription:
      "Approved bodywork and mechanical service for prestige and luxury marques.",
    body: [
      "Prestige vehicles deserve the right kit and the right care. We have the diagnostic tools, the paint expertise, and the trim techniques modern luxury cars demand.",
      "Common work includes accident repair, scratch and stone-chip touch-up, alloy refurbishment, brake and suspension service, and pre-sale presentation.",
      "Vehicles are kept inside the workshop, never left outside overnight.",
    ],
  },
  {
    slug: "fleet-services",
    category: "fleet",
    title: "Fleet Services",
    shortDescription:
      "Fast-turnaround maintenance and accident repair for company vehicles and fleet operators.",
    body: [
      "We work with local fleet operators to keep vehicles on the road. Same-day estimates, priority bookings, and direct invoicing to your fleet account where required.",
      "Services include MOT, scheduled maintenance, accident repair, tyres, exhausts, and full vehicle inspections.",
      "Get in touch to discuss volume rates and contract arrangements.",
    ],
  },
];

export function findPlaceholderBySlug(slug: string) {
  return servicePlaceholders.find((s) => s.slug === slug);
}

export function findPlaceholderByCategory(category: ServiceCategory) {
  return servicePlaceholders.find((s) => s.category === category);
}
