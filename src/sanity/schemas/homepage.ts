import { defineField, defineType } from "sanity";

/** Singleton — drives the content of the home page. */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "usps", title: "USPs" },
    { name: "services", title: "Featured Services" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero sub-headline",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Primary button label",
      description: "e.g. \"Get a repair estimate\"",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroCtaHref",
      title: "Primary button link",
      description: "e.g. /contact",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "usps",
      title: "Why choose us",
      description:
        "Short strip of selling points (3–4 works best). E.g. Insurance approved, Classic & prestige specialists, Fleet welcome.",
      type: "array",
      group: "usps",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: { title: "title", description: "description" },
            prepare: ({ title, description }) => ({
              title: title ?? "(untitled USP)",
              subtitle: description,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "introHeading",
      title: "Intro section heading",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "introBody",
      title: "Intro section body",
      type: "text",
      rows: 4,
      group: "services",
    }),
    defineField({
      name: "showTestimonials",
      title: "Show testimonials section",
      type: "boolean",
      initialValue: true,
      group: "services",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO title",
      description: "Shown in search results and browser tab.",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO description",
      description: "Shown under the title in Google. Aim for ~150 chars.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) => r.max(180),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
