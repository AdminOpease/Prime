import { defineField, defineType } from "sanity";

/** Top-level service offered by the garage. */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "Used in the page URL, e.g. /services/bodywork",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Bodywork & Accident Repair", value: "bodywork" },
          { title: "MOT Testing", value: "mot" },
          { title: "Servicing & Mechanical Repair", value: "servicing" },
          { title: "Classic Car Restoration", value: "classic" },
          { title: "Prestige Vehicles", value: "prestige" },
          { title: "Fleet Services", value: "fleet" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "1–2 sentences shown on service tiles and the homepage.",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "body",
      title: "Detail page content",
      description:
        "Full content of the service page. Add headings, paragraphs, lists, and images as needed.",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      description: "Top image on the service detail page.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "priceFrom",
      title: "Price from (optional)",
      description: "e.g. \"£45\". Leave blank if quote-only.",
      type: "string",
    }),
    defineField({
      name: "featuredOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      description: "Lower numbers show first.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "heroImage",
    },
    prepare: ({ title, category, media }) => ({
      title,
      subtitle: category,
      media,
    }),
  },
});
