/*
 * WhatsBrewingCard — Spiked Coffee
 * "What's Brewing" — featured roaster/blend of the month.
 * Engaging card with rotating seasonal content.
 * Lodge editorial aesthetic.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

const TALA_BAG = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80";

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-warm-white border border-espresso/[0.06] overflow-hidden">
            {/* Left — Image & Badge */}
            <div className="lg:col-span-5 relative bg-gradient-to-br from-cream to-warm-white p-8 lg:p-12 flex items-center justify-center">
              {/* "Now Pouring" badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-terracotta/10 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-terracotta font-medium">
                  Now Pouring
                </span>
              </div>

              <div className="text-center">
                <Coffee size={48} strokeWidth={0.8} className="mx-auto text-espresso/20 mb-4" />
                <h3 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide mb-2">
                  Tala
                </h3>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-espresso-light/60 font-light">
                  Amoret Blend
                </p>
              </div>
            </div>

            {/* Right — Details */}
            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
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
