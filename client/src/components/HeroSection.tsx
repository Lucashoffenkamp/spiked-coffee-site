/*
 * HeroSection — Spiked Coffee
 * Design: Cinematic Chemex pour-over video background with parallax depth.
 * Typographic overlay with Dalmatian icon, film grain texture.
 * Letter-by-letter split animation on "SPIKED COFFEE" title.
 * Cormorant Garamond display, Jost Light body.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";
const CHEMEX_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_video_05fb0d7a.mp4";
const CHEMEX_POSTER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_frame-ZbjjNXQKSxZewDGqe9kEWS.webp";

const ease = [0.22, 1, 0.36, 1] as const;

/* Letter animation variants */
const letterContainer = {
  hidden: {},
  visible: (startDelay: number) => ({
    transition: {
      staggerChildren: 0.045,
      delayChildren: startDelay,
    },
  }),
};

const letterChild = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -40,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

function SplitText({
  text,
  startDelay = 0,
  className = "",
}: {
  text: string;
  startDelay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={letterContainer}
      initial="hidden"
      animate="visible"
      custom={startDelay}
      style={{ perspective: 600 }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={letterChild}
          className="inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

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
          <div className="flex items-center gap-5 lg:gap-7">
            {/* Dalmatian icon — fades in */}
            <motion.img
              src={DALMATIAN_ICON}
              alt=""
              className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 object-contain brightness-0 invert opacity-90"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease }}
            />

            {/* Divider line — grows in */}
            <motion.div
              className="w-px bg-warm-white/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              style={{ minHeight: 0 }}
            >
              <div className="h-16 sm:h-24 lg:h-32" />
            </motion.div>

            {/* Title — letter-by-letter split animation */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.15em] text-warm-white leading-none">
              <SplitText text="SPIKED" startDelay={0.5} />
              <br />
              <SplitText text="COFFEE" startDelay={0.8} />
            </h1>
          </div>

          {/* Descriptor line */}
          <motion.div
            className="flex items-center gap-6 mt-7 lg:mt-9"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease }}
          >
            <motion.div
              className="h-px bg-warm-white/20"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 1.5, ease }}
            />
            <p className="font-body text-xs lg:text-sm tracking-[0.3em] uppercase text-warm-white/60 font-light">
              Craft Coffee & Fine Beverages
            </p>
            <motion.div
              className="h-px bg-warm-white/20"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 1.5, ease }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-8 lg:mt-10 font-accent text-base sm:text-lg lg:text-xl text-warm-white/80 tracking-wide text-center max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease }}
          >
            Coffee by day. Craft by night.
          </motion.p>

          {/* Location markers */}
          <motion.div
            className="mt-6 flex items-center gap-3 text-warm-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.9, ease }}
          >
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">Libertyville</span>
            <span className="text-xs font-semibold">&middot;</span>
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">Denver</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-warm-white/30 hover:text-warm-white/60 transition-colors duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase font-light">Scroll</span>
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
