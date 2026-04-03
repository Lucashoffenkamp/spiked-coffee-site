/*
 * HeroSection — Spiked Coffee
 * Design: Full-viewport editorial hero with the horizontal logo centered,
 * subtle parallax, and a scroll indicator. Cream background with earthy tones.
 */
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/final_logo_bb84aaaa.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-cream overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative thin lines */}
      <motion.div
        className="absolute top-1/4 left-8 lg:left-16 w-px h-32 bg-espresso/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-8 lg:right-16 w-px h-32 bg-espresso/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Main Logo */}
      <motion.div
        className="relative z-10 px-8 max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={HERO_LOGO}
          alt="Spiked Coffee — Craft Coffee & Fine Beverages"
          className="w-full max-w-3xl mx-auto"
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="relative z-10 mt-10 font-body text-base lg:text-lg text-espresso-light tracking-wide text-center max-w-lg px-6 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Life is short. The coffee is good. The company is better.
      </motion.p>

      {/* Thin horizontal rule */}
      <motion.div
        className="relative z-10 mt-8 w-16 h-px bg-terracotta"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />

      {/* Location hint */}
      <motion.p
        className="relative z-10 mt-6 font-ui text-xs tracking-[0.3em] uppercase text-espresso-light/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        Libertyville &middot; Kenosha &middot; Denver
      </motion.p>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-espresso-light/40 hover:text-espresso-light/70 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="font-ui text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
