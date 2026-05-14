/**
 * Centralised GROQ queries.
 * Keeping them in one place makes them easy to find, test, and reuse.
 */

import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  businessName,
  tagline,
  logo,
  phone,
  email,
  address,
  mapEmbedUrl,
  openingHours[]{day, open, close, closed},
  socialLinks[]{platform, url}
}`;

export const homepageQuery = groq`*[_type == "homepage"][0]{
  heroHeadline,
  heroSubheadline,
  heroImage,
  heroCtaLabel,
  heroCtaHref,
  usps[]{title, description},
  introHeading,
  introBody,
  showTestimonials,
  metaTitle,
  metaDescription
}`;

export const featuredServicesQuery = groq`
  *[_type == "service" && featuredOnHomepage == true] | order(displayOrder asc){
    _id,
    title,
    "slug": slug.current,
    category,
    shortDescription,
    heroImage,
    priceFrom
  }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(displayOrder asc){
    _id,
    title,
    "slug": slug.current,
    category,
    shortDescription,
    heroImage,
    priceFrom
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    shortDescription,
    body,
    heroImage,
    priceFrom
  }
`;

export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(displayOrder asc){
    _id,
    title,
    beforeImage,
    afterImage,
    caption,
    "serviceTitle": service->title,
    "serviceSlug": service->slug.current
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(date desc){
    _id,
    customerName,
    quote,
    rating,
    photo,
    date,
    showOnHomepage
  }
`;

export const homepageTestimonialsQuery = groq`
  *[_type == "testimonial" && showOnHomepage == true] | order(date desc)[0...6]{
    _id,
    customerName,
    quote,
    rating,
    photo,
    date
  }
`;

export const accreditationsQuery = groq`
  *[_type == "accreditation"] | order(displayOrder asc){
    _id,
    name,
    logo,
    link
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    heroImage,
    body,
    metaTitle,
    metaDescription
  }
`;
