/*
 * RoasterTeaser — Spiked Coffee
 * Design: Premium stacked card carousel. Cards are layered on top of each other
 * and the user swipes/clicks through them. Each card shows the roaster's bag,
 * logo, info, and shop CTA. Smooth spring animations for card transitions.
 * 
 * Interaction: Swipe left/right on mobile, click arrows or dots on desktop.
 * Cards stack with a subtle offset and scale effect for depth.
 */
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

const TALA_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_nobg_35789949.png";
const CHROMATIC_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_nobg_13e96922.png";
const RUBY_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_creamery_clean_9b02d404.png";

const TALA_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_logo_7f6c1f39.png";
const CHROMATIC_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_logo_7679ace5.png";
const RUBY_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_logo_4d0b335f.png";

const roasters = [
  {
    name: "Tala",
    location: "Libertyville, IL",
    blend: "Amoret Espresso",
    desc: "Small-batch roasters from our hometown. The Amoret blend is dark chocolate, fig, and toasted almond — sweet, balanced, and built for conversation.",
    image: TALA_BAG,
    logo: TALA_LOGO,
    logoBg: "#2d4a5a",
    accent: "#2d4a5a",
    shopUrl: "https://talacoffeeroasters.com",
  },
  {
    name: "Chromatic",
    location: "San Jose, CA",
    blend: "Gamut Blend",
    desc: "Silicon Valley's specialty scene at its finest. Stone fruit sweetness, dark chocolate depth, and a caramel finish. Bold, complex, always evolving.",
    image: CHROMATIC_BAG,
    logo: CHROMATIC_LOGO,
    logoBg: "#f0ebe4",
    accent: "#8b6f4e",
    shopUrl: "https://www.chromaticcoffee.com",
  },
  {
    name: "Ruby",
    location: "Nelsonville, WI",
    blend: "Creamery Seasonal",
    desc: "Wisconsin's finest. The Creamery Seasonal rotates with the harvest — right now it's bright citrus, honeycomb, and a clean buttery finish.",
    image: RUBY_BAG,
    logo: RUBY_LOGO,
    logoBg: "#7a1f2e",
    accent: "#7a1f2e",
    shopUrl: "https://rubycoffeeroasters.com",
  },
];

const SWIPE_THRESHOLD = 40;
const SWIPE_VELOCITY = 300;

export default function RoasterTeaser() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return roasters.length - 1;
      if (next >= roasters.length) return 0;
      return next;
    });
  }, []);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    const swipeByDistance = Math.abs(info.offset.x) > SWIPE_THRESHOLD;
    const swipeByVelocity = Math.abs(info.velocity.x) > SWIPE_VELOCITY;
    if (swipeByDistance || swipeByVelocity) {
      if (info.offset.x < 0 || info.velocity.x < -SWIPE_VELOCITY) {
        paginate(1);
      } else {
        paginate(-1);
      }
    }
  }, [paginate]);

  const activeRoaster = roasters[activeIndex];

  // Card variants for stacked effect
  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { type: "spring" as const, stiffness: 300, damping: 30 },
        rotateY: { type: "spring" as const, stiffness: 300, damping: 30 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir < 0 ? 8 : -8,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Drag-based tilt
  const dragRotate = useTransform(dragX, [-200, 0, 200], [-5, 0, 5]);

  return (
    <section className="bg-cream py-16 lg:py-36 relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-espresso/10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <ScrollReveal direction="left">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-forest" />
            <span className="font-body text-sm tracking-[0.3em] uppercase text-forest font-light">
              On the Shelf
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.05}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 lg:mb-16">
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-light text-espresso leading-[1.1] tracking-wide mb-4 lg:mb-0">
              Featured <span className="font-accent">Roasters</span>
            </h2>
            <Link href="/roasters" className="group flex items-center gap-3 font-body text-sm tracking-[0.15em] uppercase text-espresso/60 hover:text-espresso transition-colors font-light">
              View all roasters
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {/* ─── Stacked Card Carousel ─── */}
        <div className="relative" ref={containerRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center min-h-[340px] lg:min-h-[550px]">
            
            {/* Left: Card with bag image */}
            <div className="relative h-[280px] lg:h-[500px] flex items-center justify-center" style={{ perspective: "1200px" }}>
              {/* Background stack indicators */}
              {roasters.map((_, i) => {
                const offset = i - activeIndex;
                if (offset === 0 || Math.abs(offset) > 2) return null;
                const behind = offset > 0 ? offset : roasters.length + offset;
                if (behind > 2) return null;
                return (
                  <div
                    key={i}
                    className="absolute inset-4 lg:inset-8 rounded-2xl border border-espresso/8 bg-warm-white/60"
                    style={{
                      transform: `translateY(${behind * 12}px) scale(${1 - behind * 0.04})`,
                      opacity: 1 - behind * 0.3,
                      zIndex: -behind,
                    }}
                  />
                );
              })}

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 0.97, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                  style={{ x: dragX, rotateY: dragRotate, touchAction: "pan-y" }}
                  className="absolute inset-0 lg:inset-4 bg-warm-white rounded-2xl border border-espresso/8 shadow-lg cursor-grab active:cursor-grabbing flex flex-col items-center justify-center p-4 lg:p-12 select-none"
                >
                  {/* Bag image */}
                  <div className="flex-1 flex items-center justify-center w-full max-h-[200px] lg:max-h-[340px]">
                    <img
                      src={activeRoaster.image}
                      alt={`${activeRoaster.name} — ${activeRoaster.blend}`}
                      className="h-full w-auto max-w-full object-contain drop-shadow-lg"
                      draggable={false}
                    />
                  </div>

                  {/* Swipe hint on mobile */}
                  <div className="lg:hidden mt-2 flex items-center gap-2 text-espresso/25">
                    <ArrowLeft size={12} />
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase font-light">
                      Swipe
                    </span>
                    <ArrowRight size={12} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Roaster info + controls */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Counter */}
                  <div className="flex items-center gap-3 mb-3 lg:mb-6">
                    <span className="font-body text-xs tracking-[0.2em] uppercase text-espresso/30 font-light">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(roasters.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-3xl lg:text-5xl xl:text-6xl font-light text-espresso tracking-wide mb-1 lg:mb-2 leading-[1]">
                    {activeRoaster.name}
                  </h3>

                  {/* Location + Blend */}
                  <div className="flex items-center gap-3 mb-3 lg:mb-6">
                    <span className="font-body text-xs tracking-[0.2em] uppercase text-espresso/40 font-light">
                      {activeRoaster.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-espresso/20" />
                    <span className="font-accent text-sm text-espresso/50 italic">
                      {activeRoaster.blend}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-px mb-3 lg:mb-6" style={{ backgroundColor: activeRoaster.accent + "40" }} />

                  {/* Description */}
                  <p className="font-body text-sm lg:text-lg text-espresso-light/70 font-light leading-relaxed mb-5 lg:mb-8 max-w-md">
                    {activeRoaster.desc}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={activeRoaster.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-espresso text-cream font-body text-xs tracking-[0.2em] uppercase font-light hover:bg-espresso-light transition-colors duration-300 group"
                    >
                      <ShoppingBag size={13} strokeWidth={1.5} />
                      Shop {activeRoaster.name}
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <Link
                      href="/roasters"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-espresso/15 hover:border-espresso/40 font-body text-xs tracking-[0.2em] uppercase text-espresso/60 hover:text-espresso font-light transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls */}
              <div className="flex items-center gap-6 mt-6 lg:mt-12">
                {/* Prev/Next arrows */}
                <button
                  onClick={() => paginate(-1)}
                  className="w-11 h-11 rounded-full border border-espresso/15 hover:border-espresso/40 flex items-center justify-center text-espresso/50 hover:text-espresso transition-all duration-300 hover:bg-espresso/[0.03]"
                  aria-label="Previous roaster"
                >
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-3">
                  {roasters.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > activeIndex ? 1 : -1);
                        setActiveIndex(i);
                      }}
                      className="relative w-8 h-1 rounded-full overflow-hidden bg-espresso/10 transition-all duration-300"
                      aria-label={`View ${roasters[i].name}`}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: activeRoaster.accent }}
                        initial={false}
                        animate={{
                          scaleX: i === activeIndex ? 1 : 0,
                          originX: 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(1)}
                  className="w-11 h-11 rounded-full border border-espresso/15 hover:border-espresso/40 flex items-center justify-center text-espresso/50 hover:text-espresso transition-all duration-300 hover:bg-espresso/[0.03]"
                  aria-label="Next roaster"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 text-center">
            <p className="font-body text-sm text-espresso/40 tracking-[0.15em] uppercase font-light">
              The shelf rotates. The standard doesn't.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
