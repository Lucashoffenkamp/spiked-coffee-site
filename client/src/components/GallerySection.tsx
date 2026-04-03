/*
 * GallerySection — Spiked Coffee
 * Design: Transitioning back from dark to cream. A masonry-style gallery
 * of brand mockups and lifestyle images. Minimal text, let visuals speak.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TRUCK_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/truck_mockup_4_evening_30279b8d.png";
const LIFESTYLE_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/lifestyle_evening_4bc5199f.png";
const CORNER_STORE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/storefront_mockup_3_corner_9e72f991.png";
const MOCKUP_CUPS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/mockup_cups_c8bc09bb.png";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function GallerySection() {
  return (
    <section className="relative">
      {/* Transition from dark to cream */}
      <div className="h-32 lg:h-48 bg-gradient-to-b from-charcoal to-cream" />

      <div className="bg-cream pb-28 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-espresso mb-4">
                A glimpse of what's coming.
              </h2>
              <div className="w-12 h-px bg-terracotta mx-auto" />
            </div>
          </FadeIn>

          {/* Masonry-ish Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <FadeIn className="col-span-2 lg:col-span-2" delay={0.05}>
              <div className="relative group overflow-hidden">
                <img
                  src={TRUCK_EVENING}
                  alt="Spiked Coffee truck at evening"
                  className="w-full h-[280px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeIn>

            <FadeIn className="col-span-2 lg:col-span-1" delay={0.15}>
              <div className="relative group overflow-hidden">
                <img
                  src={LIFESTYLE_EVENING}
                  alt="Evening at Spiked Coffee"
                  className="w-full h-[280px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeIn>

            <FadeIn className="col-span-1" delay={0.1}>
              <div className="relative group overflow-hidden">
                <img
                  src={MOCKUP_CUPS}
                  alt="Spiked Coffee cups"
                  className="w-full h-[200px] lg:h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeIn>

            <FadeIn className="col-span-1 lg:col-span-2" delay={0.2}>
              <div className="relative group overflow-hidden">
                <img
                  src={CORNER_STORE}
                  alt="Spiked Coffee corner storefront concept"
                  className="w-full h-[200px] lg:h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
