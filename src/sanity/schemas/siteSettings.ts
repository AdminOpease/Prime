import { defineField, defineType } from "sanity";

/**
 * Site-wide settings — there's only ever one of these.
 * The Studio structure pins it as a singleton so the owner can't accidentally
 * create a second copy.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "contact", title: "Contact" },
    { name: "hours", title: "Opening Hours" },
    { name: "social", title: "Social Links" },
    { name: "branding", title: "Branding" },
  ],
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      group: "business",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short phrase used in the header and SEO title.",
      type: "string",
      group: "business",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Transparent PNG or SVG preferred.",
      type: "image",
      group: "branding",
      options: { hotspot: true },
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      description: "Shown in the header and footer.",
      type: "string",
      group: "contact",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Email address",
      description: "Where contact form submissions are sent.",
      type: "string",
      group: "contact",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      group: "contact",
      fields: [
        { name: "line1", title: "Address line 1", type: "string" },
        { name: "line2", title: "Address line 2", type: "string" },
        { name: "city", title: "City / Town", type: "string" },
        { name: "postcode", title: "Postcode", type: "string" },
      ],
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps embed URL",
      description:
        "Open Google Maps → find your location → Share → Embed a map → copy the URL inside src=\"...\" of the iframe.",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "openingHours",
      title: "Opening hours",
      type: "array",
      group: "hours",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
              },
            },
            {
              name: "open",
              title: "Opens",
              type: "string",
              description: "e.g. 08:00",
            },
            {
              name: "close",
              title: "Closes",
              type: "string",
              description: "e.g. 17:30",
            },
            {
              name: "closed",
              title: "Closed all day",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              day: "day",
              open: "open",
              close: "close",
              closed: "closed",
            },
            prepare: ({ day, open, close, closed }) => ({
              title: day ?? "(no day)",
              subtitle: closed ? "Closed" : `${open ?? "?"} – ${close ?? "?"}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social media links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  "Facebook",
                  "Instagram",
                  "Google",
                  "TikTok",
                  "YouTube",
                ],
              },
            },
            { name: "url", title: "URL", type: "url" },
          ],
          preview: {
            select: { platform: "platform", url: "url" },
            prepare: ({ platform, url }) => ({
              title: platform ?? "(no platform)",
              subtitle: url,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
