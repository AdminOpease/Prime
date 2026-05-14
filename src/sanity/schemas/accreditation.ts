import { defineField, defineType } from "sanity";

export const accreditation = defineType({
  name: "accreditation",
  title: "Accreditation",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "e.g. BS10125, Good Garage Scheme, IMI",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      title: "Link (optional)",
      description: "URL to the accrediting body.",
      type: "url",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
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
    select: { title: "name", media: "logo" },
  },
});
