/*
 * StorySection — Spiked Coffee
 * Design: Editorial asymmetric layout. Text on left, lifestyle image on right.
 * Tells the origin story: dad, Spike, brothers, coffee as connection.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LIFESTYLE_MORNING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/lifestyle_morning_cde0ba61.png";
const MOCKUP_CUPS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/mockup_cups_c8bc09bb.png";

function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function StorySection() {
  return (
    <section id="story" className="relative py-28 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Label */}
        <FadeInSection>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-terracotta" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-terracotta font-light">
              Our Story
            </span>
          </div>
        </FadeInSection>

        {/* Main Content — Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Text Column */}
          <div className="lg:col-span-5 lg:pt-8">
            <FadeInSection>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-espresso leading-[1.1] mb-8 tracking-wide">
                Rooted in
                <br />
                <span className="font-accent text-terracotta">connection.</span>
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-6 font-light">
                It started with Folgers. Our dad's breakfast blend, brewed every morning
                in a kitchen that smelled like possibility. We'd prepare the pots before
                school — two brothers learning, without knowing it, that coffee was never
                really about the coffee.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.25}>
              <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-6 font-light">
                That ritual stuck with us. From local shops to farmers markets,
                from micro-roasters in Portland to tiny cafés in Lisbon — we chased
                the cup that brought people together. Coffee became our constant.
                Our fuel for every good thing ahead.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.35}>
              <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-8 font-light">
                "Spike" was our dad's best friend — a Dalmatian who was family before
                we were born. That legacy carries on through Dylan's Dalmatian, who
                bears the same name and the same spirit. It felt right that our dream
                would too.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.45}>
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-espresso/20" />
                <p className="font-accent text-lg text-espresso/50">
                  Lucas & Dylan
                </p>
              </div>
            </FadeInSection>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-7 relative">
            <FadeInSection delay={0.2}>
              <div className="relative">
                <img
                  src={LIFESTYLE_MORNING}
                  alt="Morning coffee at Spiked Coffee"
                  className="w-full h-[500px] lg:h-[650px] object-cover"
                />
                {/* Overlay caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-8">
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-warm-white/80 font-light">
                    Every cup tells a story
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* Offset smaller image */}
            <FadeInSection delay={0.4}>
              <div className="hidden lg:block absolute -bottom-16 -left-16 w-64 h-64 shadow-2xl">
                <img
                  src={MOCKUP_CUPS}
                  alt="Spiked Coffee cups"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}
