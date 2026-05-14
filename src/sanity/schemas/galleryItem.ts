import { defineField, defineType } from "sanity";

/** Before/after pair shown on the gallery page. */
export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Internal label so you can find this entry later.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "beforeImage",
      title: "Before image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "afterImage",
      title: "After image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "service",
      title: "Related service (optional)",
      type: "reference",
      to: [{ type: "service" }],
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
      media: "afterImage",
      caption: "caption",
    },
    prepare: ({ title, media, caption }) => ({
      title,
      subtitle: caption,
      media,
    }),
  },
});
