/*
 * HeroSection — Spiked Coffee
 * Design: Cinematic Chemex pour-over video background with parallax depth.
 * 
 * ANIMATION STRATEGY:
 * All hero content is FULLY VISIBLE by default via normal CSS.
 * A tiny inline <script> in index.html adds .js-animate to <html> after 1.5s.
 * All entrance animations are scoped under html.js-animate, so:
 *   - Screenshot captures (share sheet, crawlers) → see full visible content
 *   - Real users → see the letter-by-letter reveal after 1.5s
 * 
 * Cormorant Garamond display, Jost Light body.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";
const CHEMEX_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_video_05fb0d7a.mp4";
const CHEMEX_POSTER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_frame-ZbjjNXQKSxZewDGqe9kEWS.webp";

/*
 * All animations are defined in a <style> block scoped under html.js-animate.
 * Each element gets a data-hero-anim class. Without .js-animate on <html>,
 * these classes do nothing — content stays fully visible.
 */

const HERO_STYLES = `
  /* ===== KEYFRAMES ===== */
  @keyframes heroLetterIn {
    from {
      opacity: 0;
      transform: translateY(40px) rotateX(-50deg);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0deg);
      filter: blur(0px);
    }
  }
  @keyframes heroFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroLineGrow {
    from { width: 0; }
    to { width: 64px; }
  }
  @keyframes heroScaleIn {
    from { opacity: 0; transform: scale(0.7); }
    to { opacity: 0.9; transform: scale(1); }
  }
  @keyframes heroDividerGrow {
    from { opacity: 0; transform: scaleY(0); }
    to { opacity: 1; transform: scaleY(1); }
  }
  @keyframes heroCardIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* ===== ANIMATION CLASSES — only active under html.js-animate ===== */
  html.js-animate .hero-card {
    opacity: 0;
    animation: heroCardIn 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
  }
  html.js-animate .hero-icon {
    opacity: 0;
    transform: scale(0.7);
    animation: heroScaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
  }
  html.js-animate .hero-divider {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top center;
    animation: heroDividerGrow 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s forwards;
  }
  html.js-animate .hero-descriptor {
    opacity: 0;
    transform: translateY(12px);
    animation: heroFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) 1.8s forwards;
  }
  html.js-animate .hero-line {
    width: 0 !important;
    animation: heroLineGrow 0.6s cubic-bezier(0.22,1,0.36,1) 1.9s forwards;
  }
  html.js-animate .hero-tagline {
    opacity: 0;
    transform: translateY(12px);
    animation: heroFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) 2.2s forwards;
  }
  html.js-animate .hero-locations {
    opacity: 0;
    transform: translateY(12px);
    animation: heroFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) 2.5s forwards;
  }
  html.js-animate .hero-scroll {
    opacity: 0;
    animation: heroFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) 2.8s forwards;
  }
`;

/* Generate per-letter animation CSS rules */
function generateLetterCSS(word: string, className: string, baseDelay: number): string {
  return word
    .split("")
    .map(
      (_, i) =>
        `html.js-animate .${className}-${i} {
          opacity: 0;
          transform: translateY(40px) rotateX(-50deg);
          filter: blur(8px);
          transform-origin: bottom center;
          animation: heroLetterIn 0.8s cubic-bezier(0.22,1,0.36,1) ${(baseDelay + i * 0.06).toFixed(2)}s forwards;
        }`
    )
    .join("\n");
}

function SplitText({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <span className="inline-block" style={{ perspective: 800 }}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`inline-block ${className}-${i}`}
          style={{ transformOrigin: "bottom center" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.7]);

  return (
    <>
      {/* All animation CSS — only activates when html.js-animate is present */}
      <style>{HERO_STYLES}</style>
      <style>{generateLetterCSS("SPIKED", "hero-spiked", 0.6)}</style>
      <style>{generateLetterCSS("COFFEE", "hero-coffee", 1.0)}</style>

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
          {/* Frosted glass card — visible by default, animated only under .js-animate */}
          <div className="hero-card relative bg-espresso/[0.12] backdrop-blur-[6px] border border-warm-white/[0.08] rounded-2xl px-8 sm:px-12 lg:px-16 py-16 sm:py-18 lg:py-20 flex flex-col items-center shadow-[0_8px_60px_rgba(0,0,0,0.15)]">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-warm-white/[0.05] pointer-events-none" />

            {/* Logo lockup */}
            <div className="flex items-center gap-5 lg:gap-7">
              {/* Dalmatian icon */}
              <img
                src={DALMATIAN_ICON}
                alt=""
                className="hero-icon h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 object-contain brightness-0 invert"
                style={{ opacity: 0.9 }}
              />

              {/* Divider line */}
              <div className="hero-divider w-px bg-warm-white/20 overflow-hidden" style={{ transformOrigin: "top center" }}>
                <div className="h-16 sm:h-24 lg:h-32" />
              </div>

              {/* Title — letter-by-letter split animation */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.15em] text-warm-white leading-none">
                <SplitText text="SPIKED" className="hero-spiked" />
                <br />
                <SplitText text="COFFEE" className="hero-coffee" />
              </h1>
            </div>

            {/* Descriptor line */}
            <div className="hero-descriptor flex items-center gap-6 mt-7 lg:mt-9">
              <div className="hero-line h-px bg-warm-white/20" style={{ width: 64 }} />
              <p className="font-body text-xs lg:text-sm tracking-[0.3em] uppercase text-warm-white/60 font-light">
                Craft Coffee & Fine Beverages
              </p>
              <div className="hero-line h-px bg-warm-white/20" style={{ width: 64 }} />
            </div>

            {/* Tagline */}
            <div className="hero-tagline mt-8 lg:mt-10">
              <p className="font-accent text-base sm:text-lg lg:text-xl text-warm-white/80 tracking-wide text-center max-w-lg leading-relaxed">
                Coffee by day. Craft by night.
              </p>
            </div>

            {/* Location markers */}
            <div className="hero-locations mt-6 flex items-center gap-3 text-warm-white/50">
              <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">Libertyville</span>
              <span className="text-xs font-semibold">&middot;</span>
              <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">Denver</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <a
          href="#story"
          className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-warm-white/30 hover:text-warm-white/60 transition-colors duration-500"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase font-light">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={14} strokeWidth={1} />
          </motion.div>
        </a>
      </section>
    </>
  );
}
