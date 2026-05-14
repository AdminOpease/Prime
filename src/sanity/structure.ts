import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio structure:
 *   - Pin singletons (Site Settings, Homepage) at the top so there's only
 *     ever one of each and they're easy to find.
 *   - List multi-entry types underneath.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("accreditation").title("Accreditations"),
      S.documentTypeListItem("page").title("Pages"),
    ]);
