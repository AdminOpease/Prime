/**
 * Cached data fetchers — these are the only thing components should call.
 * Each one wraps a GROQ query with sensible defaults so pages don't crash
 * when the owner hasn't filled in the Studio yet.
 */

import { unstable_cache } from "next/cache";

import { sanityClient } from "./client";
import {
  accreditationsQuery,
  allServicesQuery,
  featuredServicesQuery,
  galleryQuery,
  homepageQuery,
  homepageTestimonialsQuery,
  pageBySlugQuery,
  serviceBySlugQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "./queries";
import type {
  Accreditation,
  ContentPage,
  GalleryItem,
  Homepage,
  Service,
  ServiceListItem,
  SiteSettings,
  Testimonial,
} from "./types";

/**
 * Hard-coded fallback so the live site still works when Site Settings is
 * empty in Sanity. Real values come from the Studio once the owner publishes.
 */
const fallbackSiteSettings: SiteSettings = {
  businessName: "Prime Bodywork and Repair",
  tagline: "Bodywork, MOT & Servicing in Luton",
  phone: "01582 000000",
  email: "info@primebodywork.co.uk",
  address: {
    line1: "Unit 6",
    line2: "196 Camford Way",
    city: "Luton",
    postcode: "LU3 3AN",
  },
  openingHours: [
    { day: "Monday", open: "08:00", close: "17:30" },
    { day: "Tuesday", open: "08:00", close: "17:30" },
    { day: "Wednesday", open: "08:00", close: "17:30" },
    { day: "Thursday", open: "08:00", close: "17:30" },
    { day: "Friday", open: "08:00", close: "17:30" },
    { day: "Saturday", open: "09:00", close: "13:00" },
    { day: "Sunday", closed: true },
  ],
  socialLinks: [],
};

/* -------------------------------------------------------------------------- */
/*  Site Settings (used by header + footer on every page)                      */
/* -------------------------------------------------------------------------- */

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const data = await sanityClient.fetch<SiteSettings | null>(
      siteSettingsQuery,
    );
    if (!data) return fallbackSiteSettings;
    return { ...fallbackSiteSettings, ...data };
  },
  ["siteSettings"],
  { revalidate: 60, tags: ["siteSettings"] },
);

/* -------------------------------------------------------------------------- */
/*  Homepage                                                                   */
/* -------------------------------------------------------------------------- */

export const getHomepage = unstable_cache(
  async (): Promise<Homepage | null> =>
    sanityClient.fetch<Homepage | null>(homepageQuery),
  ["homepage"],
  { revalidate: 60, tags: ["homepage"] },
);

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export const getFeaturedServices = unstable_cache(
  async (): Promise<ServiceListItem[]> =>
    sanityClient.fetch<ServiceListItem[]>(featuredServicesQuery),
  ["featuredServices"],
  { revalidate: 60, tags: ["service"] },
);

export const getAllServices = unstable_cache(
  async (): Promise<ServiceListItem[]> =>
    sanityClient.fetch<ServiceListItem[]>(allServicesQuery),
  ["allServices"],
  { revalidate: 60, tags: ["service"] },
);

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<Service | null> =>
    sanityClient.fetch<Service | null>(serviceBySlugQuery, { slug }),
  ["serviceBySlug"],
  { revalidate: 60, tags: ["service"] },
);

/* -------------------------------------------------------------------------- */
/*  Gallery / Testimonials / Accreditations                                    */
/* -------------------------------------------------------------------------- */

export const getGallery = unstable_cache(
  async (): Promise<GalleryItem[]> =>
    sanityClient.fetch<GalleryItem[]>(galleryQuery),
  ["gallery"],
  { revalidate: 60, tags: ["galleryItem"] },
);

export const getAllTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> =>
    sanityClient.fetch<Testimonial[]>(testimonialsQuery),
  ["testimonials"],
  { revalidate: 60, tags: ["testimonial"] },
);

export const getHomepageTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> =>
    sanityClient.fetch<Testimonial[]>(homepageTestimonialsQuery),
  ["homepageTestimonials"],
  { revalidate: 60, tags: ["testimonial"] },
);

export const getAccreditations = unstable_cache(
  async (): Promise<Accreditation[]> =>
    sanityClient.fetch<Accreditation[]>(accreditationsQuery),
  ["accreditations"],
  { revalidate: 60, tags: ["accreditation"] },
);

/* -------------------------------------------------------------------------- */
/*  Generic pages                                                              */
/* -------------------------------------------------------------------------- */

export const getPageBySlug = unstable_cache(
  async (slug: string): Promise<ContentPage | null> =>
    sanityClient.fetch<ContentPage | null>(pageBySlugQuery, { slug }),
  ["pageBySlug"],
  { revalidate: 60, tags: ["page"] },
);
