/*
 * HeroSection — Spiked Coffee
 * Design: Pure typographic hero inspired by Spike & Co. editorial direction.
 * Cormorant Garamond display, Jost Light body, thin rules, Dalmatian icon mark.
 * No boxed logo image — everything is live typography.
 */
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-cream overflow-hidden">
      {/* Subtle paper texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative thin vertical lines */}
      <motion.div
        className="absolute top-1/4 left-8 lg:left-20 w-px h-32 bg-espresso/8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.8, ease }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-8 lg:right-20 w-px h-32 bg-espresso/8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 1.0, ease }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Main content block */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo lockup: Dalmatian | vertical line | SPIKED COFFEE */}
        <motion.div
          className="flex items-center gap-5 lg:gap-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        >
          <img
            src={DALMATIAN_ICON}
            alt=""
            className="h-20 w-20 sm:h-28 sm:w-28 lg:h-36 lg:w-36 object-contain"
          />
          <div className="w-px h-16 sm:h-24 lg:h-28 bg-espresso/20" />
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.15em] text-espresso leading-none">
            SPIKED<br />COFFEE
          </h1>
        </motion.div>

        {/* Thin horizontal rule with descriptor */}
        <motion.div
          className="flex items-center gap-6 mt-8 lg:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease }}
        >
          <div className="w-12 lg:w-20 h-px bg-espresso/20" />
          <p className="font-body text-xs lg:text-sm tracking-[0.3em] uppercase text-espresso-light font-light">
            Craft Coffee & Fine Beverages
          </p>
          <div className="w-12 lg:w-20 h-px bg-espresso/20" />
        </motion.div>

        {/* Tagline — clean, no italic */}
        <motion.p
          className="mt-10 lg:mt-12 font-body text-sm lg:text-base text-espresso-light/70 tracking-wide text-center max-w-md font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease }}
        >
          Started on the side. Built to last.<br />
          Every cup sourced with intention. Every pour chosen with care.
        </motion.p>

        {/* Location markers */}
        <motion.div
          className="mt-8 flex items-center gap-3 text-espresso-light/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease }}
        >
          <span className="font-body text-[11px] tracking-[0.25em] uppercase font-light">Libertyville</span>
          <span className="text-[8px]">&middot;</span>
          <span className="font-body text-[11px] tracking-[0.25em] uppercase font-light">Kenosha</span>
          <span className="text-[8px]">&middot;</span>
          <span className="font-body text-[11px] tracking-[0.25em] uppercase font-light">Denver</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-espresso-light/30 hover:text-espresso-light/60 transition-colors duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} strokeWidth={1} />
        </motion.div>
      </motion.a>
    </section>
  );
}
