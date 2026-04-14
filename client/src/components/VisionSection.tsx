/*
 * VisionSection — Spiked Coffee
 * Design: Dark background continuing from concept section. Shows the phased
 * roadmap: pop-up → mobile truck → brick & mortar. Each phase card has its
 * corresponding image. A vertical progress line fills as you scroll through.
 * Enhanced with: scroll reveals (alternating left/right), image curtain wipes,
 * and staggered text entrance.
 */
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Truck, Building2 } from "lucide-react";
import { ScrollReveal, ImageReveal } from "./ScrollAnimations";

const POPUP_MARKET = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/popup_farmers_market_v2-CgoheYfRyrJhoZ58h57R4Z.webp";
const POPUP_CARSHOW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/popup_carshow_v2-Wu8F2uT2LKcxRwYHgbyYc5.webp";
const TRUCK_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/airstream_final-4PHSK9RVtcGWDfkqSS9rvV.webp";
const STOREFRONT_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/storefront_phase03-Z3iRz5m3cxmHPWojrTAWKi.webp";

function PhaseDot({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 z-10"
      style={{ top: `${(index / 2) * 100}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-4 h-4 rounded-full bg-terracotta border-[3px] border-charcoal shadow-[0_0_12px_rgba(196,109,71,0.4)]" />
    </motion.div>
  );
}

function PhaseImageCarousel({ images }: { images: { src: string; alt: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative group overflow-hidden">
      <div className="relative h-[280px] lg:h-[380px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-6 flex items-end justify-between">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-warm-white/70 font-light">
          {images[current].caption}
        </p>
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === current ? "bg-warm-white w-4" : "bg-warm-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
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
    images: [
      { src: POPUP_MARKET, alt: "Spiked Coffee pop-up at a farmers market", caption: "The Farmers Market" },
      { src: POPUP_CARSHOW, alt: "Spiked Coffee pop-up at the Libertyville classic car show", caption: "The Classic Car Show" },
    ],
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="vision" className="relative bg-charcoal py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal direction="left">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-terracotta" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-terracotta font-light">
              The Vision
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.05}>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-warm-white leading-[1.1] mb-6 max-w-3xl tracking-wide">
            Built to
            <br />
            <span className="font-accent text-terracotta">grow.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-body text-base lg:text-lg text-warm-white/60 leading-relaxed max-w-2xl mb-20 font-light">
            Spiked Coffee isn't just a café — it's a movement. We're building this
            in phases, each one bringing us closer to the flagship experience.
          </p>
        </ScrollReveal>

        {/* Timeline with vertical progress line */}
        <div ref={timelineRef} className="relative">
          {/* Vertical progress track — hidden on mobile, visible on lg */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            {/* Background track */}
            <div className="absolute inset-0 bg-warm-white/8" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-terracotta via-terracotta to-terracotta/40 origin-top"
              style={{ height: lineHeight }}
            />
            {/* Phase dots */}
            {phases.map((_, i) => (
              <PhaseDot key={i} index={i} />
            ))}
          </div>

          {/* Phase entries */}
          <div className="space-y-24 lg:space-y-32">
            {phases.map((phase, i) => (
              <div key={phase.phase} className="relative">
                {/* Desktop: alternating layout around the center line */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                  {/* Text Card — alternates left/right direction */}
                  <ScrollReveal
                    direction={i % 2 === 0 ? "left" : "right"}
                    className={i % 2 === 0 ? "lg:order-1 lg:pr-12" : "lg:order-2 lg:pl-12"}
                  >
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
                  </ScrollReveal>

                  {/* Image — curtain wipe for single images, carousel for multi */}
                  <ScrollReveal
                    direction={i % 2 === 0 ? "right" : "left"}
                    delay={0.1}
                    className={i % 2 === 0 ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"}
                  >
                    {phase.images ? (
                      <PhaseImageCarousel images={phase.images} />
                    ) : (
                      <div className="relative group overflow-hidden">
                        <ImageReveal
                          src={phase.image!}
                          alt={phase.imageAlt!}
                          curtainColor="bg-charcoal"
                          aspectClass="w-full h-[280px] lg:h-[380px]"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-6 z-10">
                          <p className="font-body text-xs tracking-[0.2em] uppercase text-warm-white/70 font-light">
                            {phase.imageCaption}
                          </p>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>
                </div>

                {/* Mobile-only phase connector */}
                {i < phases.length - 1 && (
                  <div className="lg:hidden flex items-center justify-center gap-3 pt-10">
                    <div className="w-8 h-px bg-warm-white/10" />
                    <div className="w-2 h-2 rounded-full bg-terracotta/50" />
                    <div className="w-8 h-px bg-warm-white/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
