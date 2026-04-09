/*
 * WhatsBrewingCard — Spiked Coffee
 * "What's Brewing" — featured roaster/blend rotation card.
 * Cycles through all three partner roasters with their real logos,
 * tasting notes, origin details, and brand-matched color panels.
 * Lodge editorial aesthetic.
 */
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const TALA_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_logo_7f6c1f39.png";
const CHROMATIC_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_logo_7679ace5.png";
const RUBY_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_logo_4d0b335f.png";

interface RoasterFeature {
  name: string;
  fullName: string;
  logo: string;
  blend: string;
  location: string;
  description: string;
  tastingNotes: string[];
  origin: string;
  process: string;
  roast: string;
  panelBg: string;
  panelTextLight: boolean; // true = white text on dark bg, false = dark text on light bg
  logoSize: string; // Tailwind width classes for the logo
}

const roasterFeatures: RoasterFeature[] = [
  {
    name: "Tala",
    fullName: "Tala Coffee Roasters",
    logo: TALA_LOGO,
    blend: "Amoret Blend",
    location: "Libertyville, IL",
    description:
      "This month we're pouring Tala's Amoret blend — a single-origin Guatemalan coffee with notes of dark chocolate, fig, and toasted almond. Roasted in small batches in Libertyville. Sweet, balanced, and built for conversation.",
    tastingNotes: ["Dark Chocolate", "Fig", "Toasted Almond", "Caramel"],
    origin: "Guatemala",
    process: "Washed",
    roast: "Medium",
    panelBg: "bg-[#2d4a5a]",
    panelTextLight: true,
    logoSize: "w-56 lg:w-64",
  },
  {
    name: "Chromatic",
    fullName: "Chromatic Coffee Co.",
    logo: CHROMATIC_LOGO,
    blend: "Gamut Blend",
    location: "San Jose, CA",
    description:
      "Chromatic's Gamut blend brings the best of Silicon Valley's specialty scene to our bar — rotating micro-lots with stone fruit sweetness, dark chocolate depth, and a caramel finish. Bold, complex, and always evolving.",
    tastingNotes: ["Stone Fruit", "Dark Chocolate", "Caramel", "Brown Sugar"],
    origin: "Rotating Lots",
    process: "Varied",
    roast: "Medium-Light",
    panelBg: "bg-[#f0ebe4]",
    panelTextLight: false,
    logoSize: "w-56 lg:w-64",
  },
  {
    name: "Ruby",
    fullName: "Ruby Coffee Roasters",
    logo: RUBY_LOGO,
    blend: "Creamery Seasonal",
    location: "Nelsonville, WI",
    description:
      "Ruby's Creamery Seasonal blend is a Midwest treasure — sourced from Peru, Colombia, and Mexico, with layered notes of fig, almond, cherry, and dark chocolate. Roasted in rural Wisconsin with award-winning precision.",
    tastingNotes: ["Fig", "Almond", "Cherry", "Dark Chocolate"],
    origin: "Peru, Colombia",
    process: "Washed",
    roast: "Medium",
    panelBg: "bg-[#7a1f2e]",
    panelTextLight: true,
    logoSize: "w-40 lg:w-48",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const ROTATION_INTERVAL = 14000; // 14 seconds per roaster

export default function WhatsBrewingCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoRotation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % roasterFeatures.length);
    }, ROTATION_INTERVAL);
  }, []);

  useEffect(() => {
    startAutoRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoRotation]);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    startAutoRotation(); // reset timer on manual nav
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + roasterFeatures.length) % roasterFeatures.length);
    startAutoRotation();
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % roasterFeatures.length);
    startAutoRotation();
  };

  const current = roasterFeatures[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
    }),
  };

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-terracotta/[0.03] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-px bg-terracotta" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-terracotta font-light flex items-center gap-2">
              <Sparkles size={12} strokeWidth={1.5} />
              Now Pouring
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
            {/* Left — Logo Feature Panel */}
            <div className="lg:col-span-5 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.name}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease }}
                  className={`${current.panelBg} h-full min-h-[320px] lg:min-h-[400px] relative flex flex-col items-center justify-center p-8 lg:p-12 rounded-l-lg`}
                >
                  {/* Subtle texture overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${current.panelTextLight ? "%23ffffff" : "%23000000"}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* "Now Pouring" badge — top left */}
                  <div
                    className={`absolute top-5 left-5 flex items-center gap-2 ${
                      current.panelTextLight
                        ? "bg-white/10 border-white/10"
                        : "bg-espresso/5 border-espresso/10"
                    } backdrop-blur-sm px-3 py-1.5 rounded-full border`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span
                      className={`font-body text-[10px] tracking-[0.2em] uppercase font-medium ${
                        current.panelTextLight ? "text-white/90" : "text-espresso/70"
                      }`}
                    >
                      Now Pouring
                    </span>
                  </div>

                  {/* Logo — centered and prominent */}
                  <div className="relative z-10 rounded-lg border-2 border-white/20 shadow-md bg-white/5 p-4 lg:p-5">
                    <img
                      src={current.logo}
                      alt={current.fullName}
                      className={`${current.logoSize} h-auto object-contain`}
                    />
                  </div>

                  {/* Blend name below logo */}
                  <div className="mt-6 text-center relative z-10">
                    <div
                      className={`w-10 h-px mx-auto mb-3 ${
                        current.panelTextLight ? "bg-white/20" : "bg-espresso/15"
                      }`}
                    />
                    <p
                      className={`font-body text-[11px] tracking-[0.25em] uppercase font-light ${
                        current.panelTextLight ? "text-white/50" : "text-espresso/40"
                      }`}
                    >
                      Featuring
                    </p>
                    <p
                      className={`font-display text-lg tracking-wide mt-1 font-light ${
                        current.panelTextLight ? "text-white/90" : "text-espresso/90"
                      }`}
                    >
                      {current.blend}
                    </p>
                    <p
                      className={`font-body text-[10px] tracking-[0.2em] uppercase font-light mt-1 ${
                        current.panelTextLight ? "text-white/40" : "text-espresso/40"
                      }`}
                    >
                      {current.location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — Details */}
            <div className="lg:col-span-7 bg-warm-white border border-espresso/[0.06] lg:border-l-0 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.name + "-details"}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, delay: 0.05, ease }}
                >
                  <h2 className="font-display text-2xl lg:text-3xl font-light text-espresso tracking-wide mb-4 leading-snug">
                    What's Brewing
                  </h2>

                  <p className="font-body text-sm lg:text-base text-espresso-light leading-relaxed font-light mb-6 max-w-lg">
                    {current.description}
                  </p>

                  {/* Tasting Notes */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {current.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/70 border border-espresso/10 px-3 py-1.5 font-light"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Origin & Roast Info */}
                  <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-t border-b border-espresso/[0.06]">
                    <div>
                      <p className="font-body text-[9px] tracking-[0.2em] uppercase text-espresso-light/40 font-light mb-1">
                        Origin
                      </p>
                      <p className="font-body text-xs text-espresso font-light">
                        {current.origin}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.2em] uppercase text-espresso-light/40 font-light mb-1">
                        Process
                      </p>
                      <p className="font-body text-xs text-espresso font-light">
                        {current.process}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.2em] uppercase text-espresso-light/40 font-light mb-1">
                        Roast
                      </p>
                      <p className="font-body text-xs text-espresso font-light">
                        {current.roast}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/roasters"
                    className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-terracotta hover:text-espresso transition-colors duration-300 font-light group"
                  >
                    Meet the Roaster
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls — bottom right */}
              <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-10 flex items-center gap-3">
                {/* Prev / Next arrows */}
                <button
                  onClick={goPrev}
                  className="w-8 h-8 flex items-center justify-center border border-espresso/10 hover:border-espresso/30 text-espresso/40 hover:text-espresso transition-all duration-300"
                  aria-label="Previous roaster"
                >
                  <ChevronLeft size={14} strokeWidth={1.5} />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                  {roasterFeatures.map((r, i) => (
                    <button
                      key={r.name}
                      onClick={() => goTo(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === activeIndex
                          ? "w-6 h-1.5 bg-terracotta"
                          : "w-1.5 h-1.5 bg-espresso/15 hover:bg-espresso/30"
                      }`}
                      aria-label={`View ${r.name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  className="w-8 h-8 flex items-center justify-center border border-espresso/10 hover:border-espresso/30 text-espresso/40 hover:text-espresso transition-all duration-300"
                  aria-label="Next roaster"
                >
                  <ChevronRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
