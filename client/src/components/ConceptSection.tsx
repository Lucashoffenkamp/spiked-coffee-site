/*
 * ConceptSection — Spiked Coffee
 * Design: The day-to-night transition. Two side-by-side panels showing
 * the dual concept: craft coffee by day, craft beer & wine by evening.
 * Background transitions from cream to charcoal.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sun, Moon, Coffee, Wine } from "lucide-react";

const INTERIOR_DAY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/interior_mockup_day_665164dd.png";
const INTERIOR_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/interior_mockup_evening_b1141a09.png";

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

export default function ConceptSection() {
  return (
    <section id="concept" className="relative">
      {/* DAY Section — Cream background */}
      <div className="bg-cream py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-px bg-terracotta" />
              <span className="font-ui text-xs tracking-[0.3em] uppercase text-terracotta">
                The Concept
              </span>
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-espresso leading-[1.1] mb-6 max-w-3xl">
              One space.
              <br />
              <span className="italic font-normal">Two worlds.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed max-w-2xl mb-20">
              Spiked Coffee is a dual-concept experience. By morning, we're your
              neighborhood craft coffee bar — featuring rotating micro-roasters from
              around the world. By evening, the lights dim, the candles come out, and
              we become a curated craft beer and wine destination.
            </p>
          </FadeIn>

          {/* Day/Night Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Day Panel */}
            <FadeIn delay={0.1}>
              <div className="relative group overflow-hidden">
                <img
                  src={INTERIOR_DAY}
                  alt="Spiked Coffee — Daytime"
                  className="w-full h-[400px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun size={18} className="text-warm-white/80" />
                    <span className="font-ui text-xs tracking-[0.25em] uppercase text-warm-white/70">
                      Morning — Afternoon
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-warm-white mb-2">
                    Craft Coffee
                  </h3>
                  <p className="font-body text-sm text-warm-white/80 max-w-sm leading-relaxed">
                    Rotating single-origin beans from the world's finest micro-roasters.
                    Pour-overs, espresso, cold brew — every cup sourced with intention.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Night Panel */}
            <FadeIn delay={0.25}>
              <div className="relative group overflow-hidden">
                <img
                  src={INTERIOR_EVENING}
                  alt="Spiked Coffee — Evening"
                  className="w-full h-[400px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Moon size={18} className="text-warm-white/80" />
                    <span className="font-ui text-xs tracking-[0.25em] uppercase text-warm-white/70">
                      Evening
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-warm-white mb-2">
                    Fine Beverages
                  </h3>
                  <p className="font-body text-sm text-warm-white/80 max-w-sm leading-relaxed">
                    Local craft beers on tap and curated wines by the glass. Small-batch,
                    independent producers only. The same philosophy, after dark.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Transition gradient from cream to charcoal */}
      <div className="h-32 lg:h-48 bg-gradient-to-b from-cream to-charcoal" />

      {/* NIGHT Section — Dark background */}
      <div className="bg-charcoal py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <FadeIn>
                <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-warm-white leading-[1.15] mb-6">
                  All craft.
                  <br />
                  <span className="italic font-normal text-terracotta">All local.</span>
                </h3>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="font-body text-base text-warm-white/70 leading-relaxed mb-8">
                  We don't roast our own beans — we champion the people who do. Every
                  featured roaster is a small, independent operation we've discovered
                  and believe in. Same goes for the beer and wine. If it's on our menu,
                  we've met the maker.
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-warm-white/10 p-5">
                    <Coffee size={20} className="text-terracotta mb-3" />
                    <p className="font-ui text-xs tracking-[0.15em] uppercase text-warm-white/50 mb-1">Coffee</p>
                    <p className="font-display text-lg text-warm-white">Micro-Roasters</p>
                  </div>
                  <div className="border border-warm-white/10 p-5">
                    <Wine size={20} className="text-terracotta mb-3" />
                    <p className="font-ui text-xs tracking-[0.15em] uppercase text-warm-white/50 mb-1">Evening</p>
                    <p className="font-display text-lg text-warm-white">Craft Beer & Wine</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.2}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/mockup_coffee_bag_f9438da1.png"
                  alt="Spiked Coffee featured roaster bag"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
