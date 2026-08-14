/**
 * Hand-entered customer reviews shown until the owner adds testimonials in
 * Sanity. Mirrors the servicePlaceholders pattern: real published
 * testimonials override these (see src/app/page.tsx).
 *
 * These are genuine Google reviews supplied by the owner. Quotes are kept
 * verbatim; reviewer names weren't captured, so they're attributed as
 * "Google review" rather than inventing names. Swap in real first names in
 * Sanity when available.
 */

import type { Testimonial } from "@/sanity/types";

export const testimonialFallbacks: Testimonial[] = [
  {
    _id: "review-1",
    customerName: "Google review",
    rating: 5,
    quote:
      "Absolutely outstanding service from Prime Bodywork and Repair! I took my car in for dent repairs, polishing, and paintwork, and the results completely exceeded my expectations. The finish is nothing short of perfection — you genuinely wouldn't know the car ever had any damage. The paint match is spot on, the bodywork is flawless, and the level of detail is next level. It's rare to find this kind of craftsmanship and pride in work these days. If you want your car looking better than new, this is the place to go. 100% recommend — top quality work!",
  },
  {
    _id: "review-2",
    customerName: "Google review",
    rating: 5,
    quote:
      "Such a good experience with this bodywork garage. I'm very happy with the job done on my car. From start to finish they offer such a nice service, and Edy is the guy who makes everything happen to keep all the customers happy. You can tell from far away that they do a very good job. I highly recommend this garage.",
  },
  {
    _id: "review-3",
    customerName: "Google review",
    rating: 5,
    quote:
      "The team did an absolutely excellent job — the quality of the work was outstanding and my car looks perfect again. They were professional, friendly, honest, and kept me updated throughout the process. You can tell they genuinely care about their work and their customers. The attention to detail was impressive and everything was finished to a very high standard. Highly recommend them to anyone looking for reliable and high-quality bodywork repairs.",
  },
  {
    _id: "review-4",
    customerName: "Google review",
    rating: 5,
    quote:
      "Just had my car repaired. The work was completed quickly and the quality was fantastic. They did an incredible job — the whole car looks brand new. They even washed the car afterwards, which was a great touch. I would highly recommend the garage.",
  },
  {
    _id: "review-5",
    customerName: "Google review",
    rating: 5,
    quote:
      "I took my BMW to Prime Bodywork and Repair for some paintwork, and I am very happy with the result. The finish looks excellent, the work was completed to a very high standard, and the price was very reasonable. The team was friendly, professional, and reliable. I would definitely recommend them for bodywork and paint repairs.",
  },
];
