/*
 * GallerySection — Spiked Coffee
 * Design: Transitioning back from dark to cream. A masonry-style gallery
 * of brand mockups and lifestyle images. Minimal text, let visuals speak.
 * Enhanced with: staggered card entrances and image curtain wipe reveals.
 */
import { ScrollReveal, ImageReveal, StaggerContainer, StaggerItem } from "./ScrollAnimations";

const TRUCK_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/truck_evening_v2-Y72vH9WTk7dhtFNUvpg8dF.webp";
const LIFESTYLE_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/lifestyle_evening_v2-CbyLbAKLvKQkCjGccdLDxC.webp";
const CORNER_STORE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/corner_store_v2-HE5DMx9biAnQBGWXZyfBxR.webp";
const MOCKUP_CUPS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/mockup_cups_v2-539R8ew2fbVvZEYvpifzLm.webp";

export default function GallerySection() {
  return (
    <section className="relative">
      {/* Transition from dark to cream */}
      <div className="h-32 lg:h-48 bg-gradient-to-b from-charcoal to-cream" />

      <div className="bg-cream pb-28 lg:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso mb-4 tracking-wide">
                A glimpse of what's coming.
              </h2>
              <div className="w-12 h-px bg-terracotta mx-auto" />
            </div>
          </ScrollReveal>

          {/* Masonry-ish Grid — staggered entrance */}
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" staggerDelay={0.12}>
            <StaggerItem className="col-span-2 lg:col-span-2">
              <div className="relative group overflow-hidden">
                <ImageReveal
                  src={TRUCK_EVENING}
                  alt="Spiked Coffee truck at evening"
                  curtainColor="bg-cream"
                  aspectClass="w-full h-[280px] lg:h-[400px]"
                />
              </div>
            </StaggerItem>

            <StaggerItem className="col-span-2 lg:col-span-1">
              <div className="relative group overflow-hidden">
                <ImageReveal
                  src={LIFESTYLE_EVENING}
                  alt="Evening at Spiked Coffee"
                  curtainColor="bg-terracotta"
                  aspectClass="w-full h-[280px] lg:h-[400px]"
                />
              </div>
            </StaggerItem>

            <StaggerItem className="col-span-1">
              <div className="relative group overflow-hidden">
                <ImageReveal
                  src={MOCKUP_CUPS}
                  alt="Spiked Coffee cups"
                  curtainColor="bg-espresso"
                  aspectClass="w-full h-[200px] lg:h-[300px]"
                />
              </div>
            </StaggerItem>

            <StaggerItem className="col-span-1 lg:col-span-2">
              <div className="relative group overflow-hidden">
                <ImageReveal
                  src={CORNER_STORE}
                  alt="Spiked Coffee corner storefront concept"
                  curtainColor="bg-cream"
                  aspectClass="w-full h-[200px] lg:h-[300px]"
                />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
