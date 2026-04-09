/*
 * WhatsBrewingCard — Spiked Coffee
 * "What's Brewing" — featured roaster/blend of the month.
 * Now featuring the actual Tala Coffee Roasters logo.
 * Lodge editorial aesthetic.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

const TALA_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_logo_7f6c1f39.png";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhatsBrewingCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

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
              This Month
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
            {/* Left — Tala Logo Feature Panel */}
            <div className="lg:col-span-5 relative overflow-hidden">
              {/* Dark slate background matching the Tala brand color */}
              <div className="bg-[#2d4a5a] h-full min-h-[320px] lg:min-h-[400px] relative flex flex-col items-center justify-center p-8 lg:p-12">
                {/* Subtle texture overlay */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                {/* "Now Pouring" badge — top left */}
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/90 font-medium">
                    Now Pouring
                  </span>
                </div>

                {/* Tala Logo — centered and prominent */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.3, ease }}
                  className="relative z-10"
                >
                  <img
                    src={TALA_LOGO}
                    alt="Tala Coffee Roasters"
                    className="w-56 lg:w-64 h-auto object-contain"
                  />
                </motion.div>

                {/* Blend name below logo */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5, ease }}
                  className="mt-6 text-center relative z-10"
                >
                  <div className="w-10 h-px bg-white/20 mx-auto mb-3" />
                  <p className="font-body text-[11px] tracking-[0.25em] uppercase text-white/50 font-light">
                    Featuring
                  </p>
                  <p className="font-display text-lg text-white/90 tracking-wide mt-1 font-light">
                    Amoret Blend
                  </p>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 font-light mt-1">
                    Libertyville, IL
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right — Details */}
            <div className="lg:col-span-7 bg-warm-white border border-espresso/[0.06] border-l-0 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="font-display text-2xl lg:text-3xl font-light text-espresso tracking-wide mb-4 leading-snug">
                What's Brewing
              </h2>

              <p className="font-body text-sm lg:text-base text-espresso-light leading-relaxed font-light mb-6 max-w-lg">
                This month we're pouring Tala's Amoret blend — a single-origin
                Guatemalan coffee with notes of dark chocolate, fig, and toasted
                almond. Roasted in small batches in Libertyville. Sweet, balanced,
                and built for conversation.
              </p>

              {/* Tasting Notes */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Dark Chocolate", "Fig", "Toasted Almond", "Caramel"].map((note) => (
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
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-espresso-light/40 font-light mb-1">Origin</p>
                  <p className="font-body text-xs text-espresso font-light">Guatemala</p>
                </div>
                <div>
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-espresso-light/40 font-light mb-1">Process</p>
                  <p className="font-body text-xs text-espresso font-light">Washed</p>
                </div>
                <div>
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-espresso-light/40 font-light mb-1">Roast</p>
                  <p className="font-body text-xs text-espresso font-light">Medium</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/roasters"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-terracotta hover:text-espresso transition-colors duration-300 font-light group"
              >
                Meet the Roaster
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
