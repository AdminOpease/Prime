import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Customer name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      title: "Star rating (1–5)",
      type: "number",
      validation: (r) => r.min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: "photo",
      title: "Customer photo (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "customerName",
      subtitle: "quote",
      media: "photo",
    },
  },
});
