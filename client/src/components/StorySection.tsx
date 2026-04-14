/*
 * StorySection — Spiked Coffee
 * Design: Editorial asymmetric layout. Text on left, lifestyle image on right.
 * Enhanced with: parallax depth, scroll-linked reveals (text slides from left),
 * and image curtain wipe animation.
 */
import { ParallaxLayer, ScrollReveal, ImageReveal } from "./ScrollAnimations";

const LIFESTYLE_MORNING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/lifestyle_morning_v2-ALiGG6DxzyeYpc6hvXv4A4.webp";
const MOCKUP_CUPS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/mockup_cups_v2-539R8ew2fbVvZEYvpifzLm.webp";

export default function StorySection() {
  return (
    <section id="story" className="relative py-28 lg:py-40 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Label */}
        <ScrollReveal direction="left">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-terracotta" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-terracotta font-light">
              Our Story
            </span>
          </div>
        </ScrollReveal>

        {/* Main Content — Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Text Column — slides in from left */}
          <div className="lg:col-span-5 lg:pt-8">
            <ScrollReveal direction="left">
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-espresso leading-[1.1] mb-8 tracking-wide">
                Rooted in
                <br />
                <span className="font-accent text-terracotta">connection.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-6 font-light">
                It started with Folgers. Our dad's breakfast blend, brewed every morning
                in a kitchen that smelled like possibility. We'd prepare the pots before
                school — two brothers learning, without knowing it, that coffee was never
                really about the coffee.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-6 font-light">
                That ritual stuck with us. From local shops to farmers markets,
                from micro-roasters in Portland to tiny cafés in Lisbon — we chased
                the cup that brought people together. Coffee became our constant.
                Our fuel for every good thing ahead.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.3}>
              <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-8 font-light">
                "Spike" was our dad's best friend — a Dalmatian who was family before
                we were born. That legacy carries on through Dylan's Dalmatian, who
                bears the same name and the same spirit. It felt right that our dream
                would too.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.4}>
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-espresso/20" />
                <p className="font-accent text-lg text-espresso/50">
                  Lucas & Dylan
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Image Column — curtain wipe + parallax */}
          <div className="lg:col-span-7 relative">
            <ParallaxLayer speed={-0.08}>
              <ImageReveal
                src={LIFESTYLE_MORNING}
                alt="Morning coffee at Spiked Coffee"
                curtainColor="bg-espresso"
              />
              {/* Overlay caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-8 z-10">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-warm-white/80 font-light">
                  Every cup tells a story
                </p>
              </div>
            </ParallaxLayer>

            {/* Offset smaller image */}
            <ScrollReveal delay={0.5}>
              <div className="hidden lg:block absolute -bottom-16 -left-16 w-64 h-64 shadow-2xl z-20">
                <ImageReveal
                  src={MOCKUP_CUPS}
                  alt="Spiked Coffee cups"
                  curtainColor="bg-terracotta"
                  aspectClass="w-full h-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
