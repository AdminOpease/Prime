import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SanityImage } from "@/components/SanityImage";
import { getGallery } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Before-and-after photos of real work from Prime Bodywork and Repair in Luton.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHero
        eyebrow="Real work, real results"
        title="Before & after"
        description="A small selection of recent repairs. More photos added as work goes through the workshop."
        cta={
          <ButtonLink href="/contact" size="lg">
            Get your quote
          </ButtonLink>
        }
      />

      <section className="py-16">
        <Container>
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-muted)] p-10 text-center">
              <h2 className="text-xl font-semibold">Gallery coming soon</h2>
              <p className="mt-2 text-[var(--color-muted-foreground)]">
                We&apos;re photographing recent jobs as they come through.
                Check back soon — or get in touch for examples in the meantime.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact">Request examples</ButtonLink>
              </div>
            </div>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item._id}
                  className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]"
                >
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-square">
                      <span className="absolute left-2 top-2 z-10 rounded bg-black/70 px-2 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                        Before
                      </span>
                      <SanityImage
                        source={item.beforeImage}
                        alt={`Before — ${item.title}`}
                        width={600}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="relative aspect-square">
                      <span className="absolute left-2 top-2 z-10 rounded bg-[var(--color-accent)] px-2 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-foreground)]">
                        After
                      </span>
                      <SanityImage
                        source={item.afterImage}
                        alt={`After — ${item.title}`}
                        width={600}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    {item.caption && (
                      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                        {item.caption}
                      </p>
                    )}
                    {item.serviceTitle && item.serviceSlug && (
                      <p className="mt-3 text-xs uppercase tracking-widest text-[var(--color-accent)]">
                        {item.serviceTitle}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
