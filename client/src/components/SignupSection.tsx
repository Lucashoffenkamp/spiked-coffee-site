/*
 * SignupSection — Spiked Coffee
 * Design: Clean cream section with a centered CTA. Email capture for early supporters.
 * Dalmatian watermark in background. Elegant, editorial feel.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
        <FadeIn>
          <div className="w-12 h-px bg-terracotta mx-auto mb-10" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-espresso leading-[1.1] mb-6">
            Be part of
            <br />
            <span className="italic font-normal text-terracotta">the beginning.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-body text-base lg:text-lg text-espresso-light leading-relaxed mb-12 max-w-lg mx-auto">
            We're building something special. Sign up to follow the journey — from
            our first pop-up to the day we open the doors.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3.5 bg-warm-white border border-espresso/15 font-ui text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-terracotta transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-espresso text-cream font-ui text-sm tracking-wide hover:bg-espresso-light transition-colors duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Join</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className="font-ui text-[11px] text-espresso/30 mt-4 tracking-wide">
                No spam. Just updates on pop-ups, openings, and featured roasters.
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
              <p className="font-display text-xl text-espresso">
                Welcome to the pack.
              </p>
              <p className="font-body text-sm text-espresso-light">
                We'll keep you posted on everything Spiked.
              </p>
            </motion.div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
