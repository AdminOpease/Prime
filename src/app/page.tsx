import { HomeHero } from "@/components/HomeHero";
import { InsuranceCta } from "@/components/InsuranceCta";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustStrip } from "@/components/TrustStrip";
import {
  getHomepageTestimonials,
  getSiteSettings,
} from "@/sanity/data";
import { testimonialFallbacks } from "@/lib/testimonials";

export default async function HomePage() {
  const [settings, publishedTestimonials] = await Promise.all([
    getSiteSettings(),
    getHomepageTestimonials(),
  ]);

  // Show real Sanity testimonials once published; until then fall back to
  // the owner-supplied Google reviews so the section isn't empty at launch.
  const testimonials =
    publishedTestimonials.length > 0
      ? publishedTestimonials
      : testimonialFallbacks;

  return (
    <>
      <HomeHero
        town={settings.address?.city ?? "Luton"}
        phone={settings.phone}
      />
      <TrustStrip />
      <ServicesGrid />
      <InsuranceCta phone={settings.phone} />
      <ProcessSteps />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
