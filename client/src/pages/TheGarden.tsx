/*
 * The Garden — Spiked Coffee
 * Design: Immersive editorial page for the Cafe Garden concept.
 * A cafe garden by day, a beer garden by evening — the next evolution
 * of the Spiked Coffee experience. Lush, atmospheric, forward-looking.
 * Warm earth tones with green botanical accents.
 */
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Sun, Moon, TreePine, Leaf, Wine, Coffee, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

/* ─── Image Assets ─── */
const GARDEN_DAY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/garden-day-VwCoBT7bFB5F395HfkqhPq.webp";
const GARDEN_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/garden-evening-NnvkQrFUXkmKafbB4ZsTtM.webp";
const GARDEN_DETAIL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/garden-detail-3F7rKpzfeFuzK9GSkwP3FM.webp";

/* ─── Animation Helpers ─── */
const ease = [0.22, 1, 0.36, 1] as const;

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[115%] object-cover"
        style={{ y }}
      />
    </div>
  );
}

/* ─── Day/Night Toggle Feature Cards ─── */
const gardenFeatures = {
  day: [
    { icon: Coffee, title: "Morning Pour-Overs", desc: "Start the day with single-origin pour-overs under the canopy. Rotating roasters, always fresh." },
    { icon: Leaf, title: "Herb Garden Tables", desc: "Fresh rosemary, lavender, and mint growing right at your table. Pick a sprig for your drink." },
    { icon: Sun, title: "Weekend Brunch", desc: "Local pastries from Beacon Doughnuts, seasonal toasts, and the best cortado in the open air." },
  ],
  evening: [
    { icon: Wine, title: "Craft Taps & Wine", desc: "Six rotating craft taps and a curated wine list. All small-batch, all local, all worth trying." },
    { icon: Moon, title: "String Light Ambiance", desc: "Edison bulbs and candles transform the garden into an intimate evening destination." },
    { icon: TreePine, title: "Live & Local", desc: "Acoustic sets on weekends. Local artists, low volume, good conversation still possible." },
  ],
};

export default function TheGarden() {
  const [activeMode, setActiveMode] = useState<"day" | "evening">("day");

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      {/* ═══════════════════════════════════════════════
          HERO — Full-bleed day image with overlay text
          ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[85vh] lg:h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={GARDEN_DAY}
            alt="The Garden at Spiked Coffee — morning courtyard"
            className="w-full h-[115%] object-cover"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-cream" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/25 to-transparent" />

        {/* Hero content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end pb-20 lg:pb-28 px-6 lg:px-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-warm-white/60" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-warm-white/80 font-light">
                  Future Vision
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-warm-white leading-[0.95] tracking-wide max-w-3xl">
                The
                <br />
                <span className="font-accent text-warm-white/90">Garden.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-body text-base lg:text-lg text-warm-white/75 font-light mt-6 max-w-lg leading-relaxed">
                A cafe garden by morning. A beer garden by evening.
                The next chapter of Spiked Coffee, outdoors.
              </p>
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          INTRO — The concept explained
          ═══════════════════════════════════════════════ */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-terracotta" />
              <span className="font-body text-sm tracking-[0.3em] uppercase text-terracotta font-light">
                The Concept
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-light text-espresso leading-[1.1] tracking-wide mb-8">
              Where the cup meets
              <br />
              <span className="font-accent text-terracotta">the courtyard.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 font-body text-base lg:text-lg text-espresso-light/75 font-light leading-relaxed">
              <p>
                We've always believed the best conversations happen outside. There's something about
                fresh air, dappled sunlight, and a well-made drink that strips away the noise and
                brings people closer together.
              </p>
              <p>
                The Garden is our answer to the question we keep asking ourselves: what if the cafe
                and the beer garden weren't two different places? What if the same courtyard that
                serves your morning cortado also pours your evening IPA — and the transition between
                them felt as natural as the sun going down?
              </p>
              <p>
                Communal tables. Climbing ivy on reclaimed brick. Herbs growing right where you sit.
                String lights that don't turn on until the espresso machine turns off. This is the
                space we've been dreaming about since day one.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DAY-TO-NIGHT — Interactive toggle section
          ═══════════════════════════════════════════════ */}
      <section className="relative">
        {/* Background image crossfade */}
        <div className="relative h-[50vh] lg:h-[65vh] overflow-hidden">
          <motion.img
            src={GARDEN_DAY}
            alt="The Garden — Morning"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: activeMode === "day" ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.img
            src={GARDEN_EVENING}
            alt="The Garden — Evening"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: activeMode === "evening" ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

          {/* Toggle control */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <FadeIn>
              <div className="flex items-center gap-1 bg-charcoal/40 backdrop-blur-md rounded-full p-1 border border-warm-white/15">
                <button
                  onClick={() => setActiveMode("day")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs tracking-[0.15em] uppercase transition-all duration-500 ${
                    activeMode === "day"
                      ? "bg-cream text-espresso shadow-md"
                      : "text-warm-white/70 hover:text-warm-white"
                  }`}
                >
                  <Sun size={14} />
                  Morning
                </button>
                <button
                  onClick={() => setActiveMode("evening")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs tracking-[0.15em] uppercase transition-all duration-500 ${
                    activeMode === "evening"
                      ? "bg-charcoal text-warm-white shadow-md border border-warm-white/10"
                      : "text-warm-white/70 hover:text-warm-white"
                  }`}
                >
                  <Moon size={14} />
                  Evening
                </button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Feature cards that swap with the toggle */}
        <div className={`py-20 lg:py-28 transition-colors duration-1000 ${
          activeMode === "day" ? "bg-cream" : "bg-charcoal"
        }`}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="text-center mb-14">
                <h3 className={`font-display text-3xl lg:text-4xl font-light tracking-wide transition-colors duration-700 ${
                  activeMode === "day" ? "text-espresso" : "text-warm-white"
                }`}>
                  {activeMode === "day" ? "The Morning Garden" : "The Evening Garden"}
                </h3>
                <p className={`font-body text-sm mt-3 font-light transition-colors duration-700 ${
                  activeMode === "day" ? "text-espresso-light/60" : "text-warm-white/60"
                }`}>
                  {activeMode === "day"
                    ? "Sunlight, fresh herbs, and the best coffee in the open air."
                    : "String lights, craft taps, and the kind of night you don't want to end."}
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {gardenFeatures[activeMode].map((feature, i) => (
                <motion.div
                  key={`${activeMode}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className={`p-8 rounded-xl border transition-colors duration-700 ${
                    activeMode === "day"
                      ? "bg-warm-white/60 border-espresso/5"
                      : "bg-warm-white/5 border-warm-white/10"
                  }`}
                >
                  <feature.icon
                    size={24}
                    strokeWidth={1.2}
                    className={`mb-5 transition-colors duration-700 ${
                      activeMode === "day" ? "text-terracotta" : "text-amber-300/80"
                    }`}
                  />
                  <h4 className={`font-display text-xl font-light tracking-wide mb-3 transition-colors duration-700 ${
                    activeMode === "day" ? "text-espresso" : "text-warm-white"
                  }`}>
                    {feature.title}
                  </h4>
                  <p className={`font-body text-sm font-light leading-relaxed transition-colors duration-700 ${
                    activeMode === "day" ? "text-espresso-light/65" : "text-warm-white/65"
                  }`}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DETAIL — The cortado + beer shot with editorial copy
          ═══════════════════════════════════════════════ */}
      <section className="bg-cream py-24 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <FadeIn>
              <ParallaxImage
                src={GARDEN_DETAIL}
                alt="Cortado and craft beer on a garden table"
                className="rounded-lg h-[400px] lg:h-[520px]"
              />
            </FadeIn>

            {/* Copy */}
            <div>
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-terracotta" />
                  <span className="font-body text-sm tracking-[0.3em] uppercase text-terracotta font-light">
                    The Details
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.05}>
                <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso leading-[1.1] tracking-wide mb-8">
                  Same table.
                  <br />
                  <span className="font-accent text-terracotta">Different pour.</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="space-y-5 font-body text-base text-espresso-light/70 font-light leading-relaxed">
                  <p>
                    The garden table you claimed at 8 AM for your pour-over is the same one you'll
                    return to at 7 PM for a local IPA. The herbs growing in the terracotta pot between
                    you haven't moved. The string lights just turned on.
                  </p>
                  <p>
                    We're designing every detail to serve both worlds. Weathered wood that looks as
                    good in morning light as it does by candlelight. A bar that transitions from
                    espresso machine to tap handles. Seating that invites you to stay — whether it's
                    for twenty minutes or the whole evening.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="mt-10 flex flex-wrap gap-3">
                  {["Communal Tables", "Herb Planters", "String Lights", "Craft Taps", "Espresso Bar", "Live Music"].map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs tracking-[0.1em] uppercase text-espresso-light/50 font-light px-4 py-2 border border-espresso/8 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EVENING HERO — Full-bleed evening image
          ═══════════════════════════════════════════════ */}
      <section className="relative h-[50vh] lg:h-[65vh] overflow-hidden">
        <ParallaxImage
          src={GARDEN_EVENING}
          alt="The Garden at Spiked Coffee — evening atmosphere"
          className="absolute inset-0 h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-charcoal/30" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <FadeIn>
            <blockquote className="max-w-2xl">
              <p className="font-display text-2xl lg:text-3xl xl:text-4xl font-light text-warm-white leading-snug tracking-wide">
                "The best places aren't built — they're
                <span className="font-accent text-amber-200/90"> grown.</span>"
              </p>
              <footer className="mt-6 font-body text-xs tracking-[0.2em] uppercase text-warm-white/50 font-light">
                — Lucas &amp; Dylan
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TIMELINE — How The Garden fits into the roadmap
          ═══════════════════════════════════════════════ */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-terracotta" />
              <span className="font-body text-sm tracking-[0.3em] uppercase text-terracotta font-light">
                The Roadmap
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso leading-[1.1] tracking-wide mb-14">
              Growing the
              <br />
              <span className="font-accent text-terracotta">dream.</span>
            </h2>
          </FadeIn>

          {/* Timeline steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-espresso/10" />

            {[
              {
                phase: "01",
                title: "Pop-Up",
                status: "now",
                desc: "Farmers markets, local events, community gatherings. Testing the concept, building the following.",
              },
              {
                phase: "02",
                title: "Mobile",
                status: "next",
                desc: "A custom Airstream build. Taking Spiked Coffee on the road — festivals, neighborhoods, mountain towns.",
              },
              {
                phase: "03",
                title: "Brick & Mortar",
                status: "future",
                desc: "The flagship. A permanent home where the full day-to-night experience comes alive indoors.",
              },
              {
                phase: "04",
                title: "The Garden",
                status: "future",
                desc: "An outdoor extension of the flagship. Communal tables, climbing ivy, herb planters, string lights. The cafe garden by day, the beer garden by night.",
              },
            ].map((step, i) => (
              <FadeIn key={step.phase} delay={i * 0.08}>
                <div className="relative pl-16 pb-12 last:pb-0">
                  {/* Dot on timeline */}
                  <div className={`absolute left-4 top-1 w-4 h-4 rounded-full border-2 ${
                    step.status === "now"
                      ? "bg-terracotta border-terracotta"
                      : step.status === "next"
                      ? "bg-cream border-terracotta"
                      : "bg-cream border-espresso/20"
                  }`} />

                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-body text-[10px] tracking-[0.25em] uppercase text-espresso-light/40 font-light">
                      Phase {step.phase}
                    </span>
                    {step.status === "now" && (
                      <span className="font-body text-[9px] tracking-[0.2em] uppercase text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                    {step.phase === "04" && (
                      <span className="font-body text-[9px] tracking-[0.2em] uppercase text-green-700 bg-green-700/10 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <h4 className={`font-display text-xl lg:text-2xl font-light tracking-wide mb-2 ${
                    step.phase === "04" ? "text-espresso" : "text-espresso/80"
                  }`}>
                    {step.title}
                  </h4>
                  <p className="font-body text-sm text-espresso-light/60 font-light leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Sign up / follow the journey
          ═══════════════════════════════════════════════ */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <FadeIn>
            <TreePine size={32} strokeWidth={1} className="text-warm-white/30 mx-auto mb-8" />
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-display text-3xl lg:text-4xl font-light text-warm-white leading-[1.1] tracking-wide mb-6">
              Be there when
              <br />
              <span className="font-accent text-amber-200/80">it opens.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-body text-base text-warm-white/60 font-light leading-relaxed mb-10 max-w-lg mx-auto">
              The Garden is still growing. Sign up to follow the journey and be the first
              to know when we break ground.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-warm-white border border-warm-white/20 hover:border-warm-white/40 px-8 py-4 rounded-full transition-all duration-300 hover:bg-warm-white/5 group"
            >
              Join the Journey
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
