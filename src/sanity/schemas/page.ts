import { defineField, defineType } from "sanity";

/** Generic content page — About, Insurance Claims, etc. */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "Used in the URL, e.g. /about → \"about\".",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image (optional)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Body content",
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
      name: "metaTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (r) => r.max(180),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      media: "heroImage",
    },
    prepare: ({ title, slug, media }) => ({
      title,
      subtitle: slug ? `/${slug}` : undefined,
      media,
    }),
  },
});
