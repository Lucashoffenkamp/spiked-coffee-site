/*
 * VisionSection — Spiked Coffee
 * Design: Dark background continuing from concept section. Shows the phased
 * roadmap: pop-up → mobile truck → brick & mortar. Uses the truck and storefront mockups.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Truck, Building2 } from "lucide-react";

const TRUCK_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/truck_mockup_2_9241bba5.png";
const STOREFRONT_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/storefront_mockup_2_evening_0f60c9cc.png";
const CORNER_STORE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/storefront_mockup_3_corner_9e72f991.png";

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
  },
  {
    icon: Truck,
    phase: "Phase 02",
    title: "Mobile",
    description: "A custom Airstream or truck build. Taking Spiked Coffee on the road — festivals, neighborhoods, mountain towns.",
    status: "Next",
  },
  {
    icon: Building2,
    phase: "Phase 03",
    title: "Brick & Mortar",
    description: "The flagship. A permanent home where the full day-to-night experience comes alive. Reclaimed wood, Edison bulbs, the works.",
    status: "The Dream",
  },
];

export default function VisionSection() {
  return (
    <section id="vision" className="relative bg-charcoal py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-terracotta" />
            <span className="font-ui text-xs tracking-[0.3em] uppercase text-terracotta">
              The Vision
            </span>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-warm-white leading-[1.1] mb-6 max-w-3xl">
            Built to
            <br />
            <span className="italic font-normal text-terracotta">grow.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="font-body text-base lg:text-lg text-warm-white/60 leading-relaxed max-w-2xl mb-20">
            Spiked Coffee isn't just a café — it's a movement. We're building this
            in phases, each one bringing us closer to the flagship experience.
          </p>
        </FadeIn>

        {/* Phase Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-24">
          {phases.map((phase, i) => (
            <FadeIn key={phase.phase} delay={i * 0.15}>
              <div className="border border-warm-white/10 p-8 lg:p-10 h-full group hover:border-terracotta/30 transition-colors duration-500">
                <div className="flex items-center justify-between mb-6">
                  <phase.icon size={24} className="text-terracotta" />
                  <span className="font-ui text-[10px] tracking-[0.3em] uppercase text-terracotta/70 border border-terracotta/30 px-3 py-1">
                    {phase.status}
                  </span>
                </div>
                <p className="font-ui text-xs tracking-[0.2em] uppercase text-warm-white/40 mb-2">
                  {phase.phase}
                </p>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-warm-white mb-4">
                  {phase.title}
                </h3>
                <p className="font-body text-sm text-warm-white/50 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Vision Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <FadeIn className="lg:col-span-7">
            <div className="relative group overflow-hidden">
              <img
                src={TRUCK_MOCKUP}
                alt="Spiked Coffee Airstream"
                className="w-full h-[350px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-6">
                <p className="font-ui text-xs tracking-[0.2em] uppercase text-warm-white/70">
                  The Mobile Experience
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5" delay={0.15}>
            <div className="relative group overflow-hidden h-full">
              <img
                src={STOREFRONT_EVENING}
                alt="Spiked Coffee Storefront"
                className="w-full h-[350px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-6">
                <p className="font-ui text-xs tracking-[0.2em] uppercase text-warm-white/70">
                  The Flagship
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
