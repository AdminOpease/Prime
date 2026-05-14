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

export default async function HomePage() {
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getHomepageTestimonials(),
  ]);

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
