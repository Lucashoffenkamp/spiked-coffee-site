/*
 * SignupSection — Spiked Coffee
 * Design: Clean cream section with a centered CTA. Email capture for early supporters.
 * Dalmatian watermark in background. Elegant, editorial feel.
 * Enhanced with: scroll reveals.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

const DALMATIAN_ICON = "/assets/dalmatian-dark.png";

export default function SignupSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="signup" className="relative bg-cream py-28 lg:py-40 overflow-hidden">
      {/* Dalmatian watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] lg:w-[700px] opacity-[0.03] pointer-events-none">
        <img src={DALMATIAN_ICON} alt="" className="w-full" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <ScrollReveal>
          <div className="w-12 h-px bg-terracotta mx-auto mb-10" />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-espresso leading-[1.1] mb-6 tracking-wide">
            Be part of
            <br />
            <span className="font-accent text-terracotta">the beginning.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-6 max-w-lg mx-auto font-light">
            We're building something special. Sign up to follow the journey — from
            our first pop-up to the day we open the doors.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="inline-flex items-center gap-3 bg-terracotta/8 border border-terracotta/15 px-5 py-2.5 mb-12">
            <span className="font-body text-xs tracking-[0.1em] uppercase text-terracotta font-light">
              First 100 signups get a free Spiked Coffee sticker pack
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3.5 bg-warm-white border border-espresso/15 font-body text-sm font-light text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-terracotta transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-espresso text-cream font-body text-sm tracking-[0.15em] uppercase font-light hover:bg-espresso-light transition-colors duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Join</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className="font-body text-[11px] text-espresso/30 mt-4 tracking-wide font-light">
                No spam. Just updates on pop-ups, openings, and featured roasters.
                Sticker packs ship free to the first 100.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
                <Check size={20} className="text-forest" />
              </div>
              <p className="font-accent text-2xl text-espresso">
                Welcome to the pack.
              </p>
              <p className="font-body text-sm text-espresso-light font-light">
                We'll keep you posted on everything Spiked.
              </p>
            </motion.div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
