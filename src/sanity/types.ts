/**
 * Hand-written TypeScript types matching the GROQ queries in queries.ts.
 *
 * We could generate these from the schema via `sanity typegen`, but for a
 * small site keeping them hand-written is clearer to read.
 */

import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type ImageWithAlt = SanityImageSource & { alt?: string };

export type ServiceCategory =
  | "bodywork"
  | "van-fleet"
  | "defleet"
  | "insurance-private";

export type OpeningHour = {
  day: string;
  open?: string;
  close?: string;
  closed?: boolean;
};

export type SocialLink = {
  platform: "Facebook" | "Instagram" | "Google" | "TikTok" | "YouTube";
  url: string;
};

export type SiteSettings = {
  businessName: string;
  tagline?: string;
  logo?: ImageWithAlt;
  phone: string;
  email: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    postcode?: string;
  };
  mapEmbedUrl?: string;
  openingHours?: OpeningHour[];
  socialLinks?: SocialLink[];
};

export type Usp = {
  title: string;
  description?: string;
};

export type Homepage = {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage?: ImageWithAlt;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  usps?: Usp[];
  introHeading?: string;
  introBody?: string;
  showTestimonials?: boolean;
  metaTitle?: string;
  metaDescription?: string;
};

export type ServiceListItem = {
  _id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  heroImage?: ImageWithAlt;
  priceFrom?: string;
};

export type Service = ServiceListItem & {
  body?: PortableTextBlock[];
};

export type GalleryItem = {
  _id: string;
  title: string;
  beforeImage: ImageWithAlt;
  afterImage: ImageWithAlt;
  caption?: string;
  serviceTitle?: string;
  serviceSlug?: string;
};

export type Testimonial = {
  _id: string;
  customerName: string;
  quote: string;
  rating?: number;
  photo?: ImageWithAlt;
  date?: string;
  showOnHomepage?: boolean;
};

export type Accreditation = {
  _id: string;
  name: string;
  logo: ImageWithAlt;
  link?: string;
};

export type ContentPage = {
  _id: string;
  title: string;
  slug: string;
  heroImage?: ImageWithAlt;
  body?: PortableTextBlock[];
  metaTitle?: string;
  metaDescription?: string;
};
