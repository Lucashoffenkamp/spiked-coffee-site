/*
 * VisionSection — Spiked Coffee
 * Design: Dark background continuing from concept section. Shows the phased
 * roadmap: pop-up → mobile truck → brick & mortar. Each phase card has its
 * corresponding image directly below it so the story flows naturally.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Truck, Building2 } from "lucide-react";

const POPUP_MARKET = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/vision_popup_market-2VcW5KtNUB3NiiWfnPryVf.webp";
const TRUCK_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/truck_mockup_v2-3WsvisTyfm49Fov5WKUt8Z.webp";
const STOREFRONT_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/storefront_evening_v2-VATNhtDuFtd3uQhnwcSVMT.webp";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const phases = [
  {
    icon: MapPin,
    phase: "Phase 01",
    title: "Pop-Up",
    description: "Farmers markets, local events, and community gatherings. Testing the concept, building the following, perfecting the craft.",
    status: "Now",
    image: POPUP_MARKET,
    imageAlt: "Spiked Coffee pop-up at a farmers market",
    imageCaption: "The Pop-Up Experience",
  },
  {
    icon: Truck,
    phase: "Phase 02",
    title: "Mobile",
    description: "A custom Airstream or truck build. Taking Spiked Coffee on the road — festivals, neighborhoods, mountain towns.",
    status: "Next",
    image: TRUCK_MOCKUP,
    imageAlt: "Spiked Coffee Airstream mobile truck",
    imageCaption: "The Mobile Experience",
  },
  {
    icon: Building2,
    phase: "Phase 03",
    title: "Brick & Mortar",
    description: "The flagship. A permanent home where the full day-to-night experience comes alive. Reclaimed wood, Edison bulbs, the works.",
    status: "The Dream",
    image: STOREFRONT_EVENING,
    imageAlt: "Spiked Coffee flagship storefront at evening",
    imageCaption: "The Flagship",
  },
];

export default function VisionSection() {
  return (
    <section id="vision" className="relative bg-charcoal py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-terracotta" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-terracotta font-light">
              The Vision
            </span>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-warm-white leading-[1.1] mb-6 max-w-3xl tracking-wide">
            Built to
            <br />
            <span className="font-accent text-terracotta">grow.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="font-body text-base lg:text-lg text-warm-white/60 leading-relaxed max-w-2xl mb-20 font-light">
            Spiked Coffee isn't just a café — it's a movement. We're building this
            in phases, each one bringing us closer to the flagship experience.
          </p>
        </FadeIn>

        {/* Phases — each card paired with its image */}
        <div className="space-y-20 lg:space-y-28">
          {phases.map((phase, i) => (
            <div key={phase.phase} className="space-y-8">
              {/* Phase Card + Image side by side on desktop, stacked on mobile */}
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                {/* Text Card — alternates left/right on desktop */}
                <FadeIn className={i % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                  <div className="border border-warm-white/10 p-8 lg:p-10 group hover:border-terracotta/30 transition-colors duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <phase.icon size={24} className="text-terracotta" />
                      <span className="font-body text-[10px] tracking-[0.3em] uppercase text-terracotta/70 border border-terracotta/30 px-3 py-1 font-light">
                        {phase.status}
                      </span>
                    </div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-warm-white/40 mb-2 font-light">
                      {phase.phase}
                    </p>
                    <h3 className="font-display text-2xl lg:text-3xl font-light text-warm-white mb-4 tracking-wide">
                      {phase.title}
                    </h3>
                    <p className="font-body text-sm text-warm-white/50 leading-relaxed font-light">
                      {phase.description}
                    </p>
                  </div>
                </FadeIn>

                {/* Image */}
                <FadeIn className={i % 2 === 1 ? "lg:order-1" : "lg:order-2"} delay={0.15}>
                  <div className="relative group overflow-hidden">
                    <img
                      src={phase.image}
                      alt={phase.imageAlt}
                      className="w-full h-[280px] lg:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-6">
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-warm-white/70 font-light">
                        {phase.imageCaption}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Divider between phases (except after last) */}
              {i < phases.length - 1 && (
                <FadeIn delay={0.2}>
                  <div className="flex items-center justify-center gap-3 pt-4">
                    <div className="w-16 h-px bg-warm-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta/40" />
                    <div className="w-16 h-px bg-warm-white/10" />
                  </div>
                </FadeIn>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
