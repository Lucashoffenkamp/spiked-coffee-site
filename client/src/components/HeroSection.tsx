/*
 * HeroSection — Spiked Coffee
 * Design: Cinematic Chemex pour-over video background with parallax depth.
 * Typographic overlay with Dalmatian icon, film grain texture.
 * Cormorant Garamond display, Jost Light body.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";
const CHEMEX_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_video_05fb0d7a.mp4";
const CHEMEX_POSTER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_frame-ZbjjNXQKSxZewDGqe9kEWS.webp";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: video moves slower, text moves faster
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.7]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Video Background with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y: videoY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={CHEMEX_POSTER}
          className="w-full h-full object-cover"
        >
          <source src={CHEMEX_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay for text readability */}
      <motion.div
        className="absolute inset-0 bg-espresso"
        style={{ opacity: overlayOpacity }}
      />

      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 -mt-12 sm:-mt-10"
        style={{ y: textY }}
      >
        {/* Frosted glass card */}
        <motion.div
          className="relative bg-espresso/[0.12] backdrop-blur-[6px] border border-warm-white/[0.08] rounded-2xl px-8 sm:px-12 lg:px-16 py-16 sm:py-18 lg:py-20 flex flex-col items-center shadow-[0_8px_60px_rgba(0,0,0,0.15)]"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.15, ease }}
        >
          {/* Subtle inner glow on the border */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-warm-white/[0.05] pointer-events-none" />

          {/* Logo lockup */}
          <motion.div
            className="flex items-center gap-5 lg:gap-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
          >
            <img
              src={DALMATIAN_ICON}
              alt=""
              className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 object-contain brightness-0 invert opacity-90"
            />
            <div className="w-px h-16 sm:h-24 lg:h-32 bg-warm-white/20" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.15em] text-warm-white leading-none">
              SPIKED<br />COFFEE
            </h1>
          </motion.div>

          {/* Descriptor line */}
          <motion.div
            className="flex items-center gap-6 mt-7 lg:mt-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease }}
          >
            <div className="w-10 lg:w-16 h-px bg-warm-white/20" />
            <p className="font-body text-[10px] lg:text-xs tracking-[0.3em] uppercase text-warm-white/60 font-light">
              Craft Coffee & Fine Beverages
            </p>
            <div className="w-10 lg:w-16 h-px bg-warm-white/20" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-8 lg:mt-10 font-accent text-base sm:text-lg lg:text-xl text-warm-white/80 tracking-wide text-center max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease }}
          >
            Life is short. The coffee is good.<br />
            The company is better.
          </motion.p>

          {/* Location markers */}
          <motion.div
            className="mt-6 flex items-center gap-3 text-warm-white/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1, ease }}
          >
            <span className="font-body text-[10px] tracking-[0.25em] uppercase font-light">Libertyville</span>
            <span className="text-[8px]">&middot;</span>
            <span className="font-body text-[10px] tracking-[0.25em] uppercase font-light">Denver</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-warm-white/30 hover:text-warm-white/60 transition-colors duration-500"
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
