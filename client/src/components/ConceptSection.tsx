/*
 * ConceptSection — Spiked Coffee
 * Design: The day-to-night transition. Two side-by-side panels showing
 * the dual concept: craft coffee by day, craft beer & wine by evening.
 * Enhanced with: scroll reveals, image curtain wipes, parallax, stagger.
 */
import { Sun, Moon, Coffee, Wine } from "lucide-react";
import { ScrollReveal, ImageReveal, ParallaxLayer, StaggerContainer, StaggerItem } from "./ScrollAnimations";

const INTERIOR_DAY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/interior_day_v2-CaJjhxHj7Extup3Wvvm3xV.webp";
const INTERIOR_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/interior_evening_v2-gkEfLdpWRvchgDTR8QQq9e.webp";

export default function ConceptSection() {
  return (
    <section id="concept" className="relative">
      {/* DAY Section — Cream background */}
      <div className="bg-cream py-28 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal direction="left">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-px bg-terracotta" />
              <span className="font-body text-sm tracking-[0.3em] uppercase text-terracotta font-light">
                The Concept
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.05}>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-espresso leading-[1.1] mb-6 max-w-3xl tracking-wide">
              One space.
              <br />
              <span className="font-accent">Two worlds.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed max-w-2xl mb-20 font-light">
              Spiked Coffee is a dual-concept experience. By morning, we're your
              neighborhood craft coffee bar — featuring rotating micro-roasters from
              around the world. By evening, the lights dim, the candles come out, and
              we become a curated craft beer and wine destination.
            </p>
          </ScrollReveal>

          {/* Day/Night Split — with curtain wipe images */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-0" staggerDelay={0.2}>
            {/* Day Panel */}
            <StaggerItem>
              <div className="relative group overflow-hidden">
                <ImageReveal
                  src={INTERIOR_DAY}
                  alt="Spiked Coffee — Daytime"
                  curtainColor="bg-cream"
                  aspectClass="w-full h-[400px] lg:h-[550px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun size={18} className="text-warm-white/80" />
                    <span className="font-body text-xs tracking-[0.25em] uppercase text-warm-white/70 font-light">
                      Morning — Afternoon
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-light text-warm-white mb-2 tracking-wide">
                    Craft Coffee
                  </h3>
                  <p className="font-body text-sm text-warm-white/80 max-w-sm leading-relaxed font-light">
                    Rotating single-origin beans from the world's finest micro-roasters.
                    Pour-overs, espresso, cold brew — every cup sourced with intention.
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Night Panel */}
            <StaggerItem>
              <div className="relative group overflow-hidden">
                <ImageReveal
                  src={INTERIOR_EVENING}
                  alt="Spiked Coffee — Evening"
                  curtainColor="bg-charcoal"
                  aspectClass="w-full h-[400px] lg:h-[550px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Moon size={18} className="text-warm-white/80" />
                    <span className="font-body text-xs tracking-[0.25em] uppercase text-warm-white/70 font-light">
                      Evening
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-light text-warm-white mb-2 tracking-wide">
                    Fine Beverages
                  </h3>
                  <p className="font-body text-sm text-warm-white/80 max-w-sm leading-relaxed font-light">
                    Local craft beers on tap and curated wines by the glass. Small-batch,
                    independent producers only. The same philosophy, after dark.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      {/* Transition gradient from cream to charcoal */}
      <div className="h-32 lg:h-48 bg-gradient-to-b from-cream to-charcoal" />

      {/* NIGHT Section — Dark background */}
      <div className="bg-charcoal py-28 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-light text-warm-white leading-[1.15] mb-6 tracking-wide">
                  All craft.
                  <br />
                  <span className="font-accent text-terracotta">All local.</span>
                </h3>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.1}>
                <p className="font-body text-base text-warm-white/70 leading-relaxed mb-8 font-light">
                  We don't roast our own beans — we champion the people who do. Every
                  featured roaster is a small, independent operation we've discovered
                  and believe in. Same goes for the beer and wine. If it's on our menu,
                  we've met the maker.
                </p>
              </ScrollReveal>
              <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.15}>
                <StaggerItem>
                  <div className="border border-warm-white/10 p-5">
                    <Coffee size={20} className="text-terracotta mb-3" />
                    <p className="font-body text-xs tracking-[0.15em] uppercase text-warm-white/50 mb-1 font-light">Coffee</p>
                    <p className="font-display text-lg text-warm-white font-light tracking-wide">Micro-Roasters</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="border border-warm-white/10 p-5">
                    <Wine size={20} className="text-terracotta mb-3" />
                    <p className="font-body text-xs tracking-[0.15em] uppercase text-warm-white/50 mb-1 font-light">Evening</p>
                    <p className="font-display text-lg text-warm-white font-light tracking-wide">Craft Beer & Wine</p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div className="lg:col-span-7">
              <ParallaxLayer speed={-0.06}>
                <ImageReveal
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/coffee_bag_v2-jjbFxkXQWDkAbynFEWpceR.webp"
                  alt="Spiked Coffee featured roaster bag"
                  curtainColor="bg-charcoal"
                  aspectClass="w-full h-[400px] lg:h-[500px]"
                />
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
