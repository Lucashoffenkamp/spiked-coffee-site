/*
 * HeroSection — Spiked Coffee
 * Design: Cinematic Chemex pour-over video background with parallax depth.
 * 
 * IMPORTANT: All content renders visible by default (no opacity:0 initial state)
 * so that screenshot captures (Safari share sheet, social crawlers) see the full hero.
 * CSS @keyframes handle the entrance animation for real users on page load.
 * Cormorant Garamond display, Jost Light body.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";
const CHEMEX_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_video_05fb0d7a.mp4";
const CHEMEX_POSTER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chemex_hero_frame-ZbjjNXQKSxZewDGqe9kEWS.webp";

/*
 * Strategy: We use a "shouldAnimate" flag that starts false.
 * On mount (useEffect), we set it to true after a tiny delay.
 * - If JS hasn't run yet (screenshot/crawler): content is fully visible (no animation classes)
 * - If JS has run (real user): we apply animation classes that start from hidden and reveal
 */

function SplitText({
  text,
  baseDelay = 0,
  shouldAnimate = false,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  shouldAnimate?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`} style={{ perspective: 800 }}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block"
          style={{
            transformOrigin: "bottom center",
            ...(shouldAnimate
              ? {
                  opacity: 0,
                  transform: "translateY(40px) rotateX(-50deg)",
                  filter: "blur(8px)",
                  animation: `heroLetterIn 0.8s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * 0.06}s forwards`,
                }
              : {}),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function AnimatedElement({
  children,
  delay,
  shouldAnimate,
  className = "",
  fromY = 12,
}: {
  children: React.ReactNode;
  delay: number;
  shouldAnimate: boolean;
  className?: string;
  fromY?: number;
}) {
  return (
    <div
      className={className}
      style={
        shouldAnimate
          ? {
              opacity: 0,
              transform: `translateY(${fromY}px)`,
              animation: `heroFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
            }
          : {}
      }
    >
      {children}
    </div>
  );
}

function AnimatedLine({
  delay,
  shouldAnimate,
}: {
  delay: number;
  shouldAnimate: boolean;
}) {
  return (
    <div
      className="h-px bg-warm-white/20"
      style={
        shouldAnimate
          ? {
              width: 0,
              animation: `heroLineGrow 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
            }
          : { width: 64 }
      }
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Small delay to ensure we're past the initial render/screenshot capture
    const timer = requestAnimationFrame(() => {
      setShouldAnimate(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.7]);

  return (
    <>
      {/* CSS keyframe animations — injected once */}
      <style>{`
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
          from {
            opacity: 0;
            transform: translateY(var(--hero-from-y, 12px));
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroLineGrow {
          from { width: 0; }
          to { width: 64px; }
        }
        @keyframes heroScaleIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }
          to {
            opacity: 0.9;
            transform: scale(1);
          }
        }
        @keyframes heroDividerGrow {
          from {
            opacity: 0;
            transform: scaleY(0);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        @keyframes heroCardIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

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
          <div
            className="relative bg-espresso/[0.12] backdrop-blur-[6px] border border-warm-white/[0.08] rounded-2xl px-8 sm:px-12 lg:px-16 py-16 sm:py-18 lg:py-20 flex flex-col items-center shadow-[0_8px_60px_rgba(0,0,0,0.15)]"
            style={
              shouldAnimate
                ? {
                    opacity: 0,
                    animation: "heroCardIn 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s forwards",
                  }
                : {}
            }
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-warm-white/[0.05] pointer-events-none" />

            {/* Logo lockup */}
            <div className="flex items-center gap-5 lg:gap-7">
              {/* Dalmatian icon */}
              <img
                src={DALMATIAN_ICON}
                alt=""
                className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 object-contain brightness-0 invert"
                style={
                  shouldAnimate
                    ? {
                        opacity: 0,
                        transform: "scale(0.7)",
                        animation: "heroScaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 1.5s forwards",
                      }
                    : { opacity: 0.9 }
                }
              />

              {/* Divider line */}
              <div
                className="w-px bg-warm-white/20 overflow-hidden"
                style={{
                  transformOrigin: "top center",
                  ...(shouldAnimate
                    ? {
                        opacity: 0,
                        transform: "scaleY(0)",
                        animation: "heroDividerGrow 0.6s cubic-bezier(0.22,1,0.36,1) 1.6s forwards",
                      }
                    : {}),
                }}
              >
                <div className="h-16 sm:h-24 lg:h-32" />
              </div>

              {/* Title — letter-by-letter split animation */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.15em] text-warm-white leading-none">
                <SplitText text="SPIKED" baseDelay={1.8} shouldAnimate={shouldAnimate} />
                <br />
                <SplitText text="COFFEE" baseDelay={2.2} shouldAnimate={shouldAnimate} />
              </h1>
            </div>

            {/* Descriptor line */}
            <AnimatedElement delay={3.0} shouldAnimate={shouldAnimate} className="flex items-center gap-6 mt-7 lg:mt-9">
              <AnimatedLine delay={3.1} shouldAnimate={shouldAnimate} />
              <p className="font-body text-xs lg:text-sm tracking-[0.3em] uppercase text-warm-white/60 font-light">
                Craft Coffee & Fine Beverages
              </p>
              <AnimatedLine delay={3.1} shouldAnimate={shouldAnimate} />
            </AnimatedElement>

            {/* Tagline */}
            <AnimatedElement delay={3.4} shouldAnimate={shouldAnimate} className="mt-8 lg:mt-10">
              <p className="font-accent text-base sm:text-lg lg:text-xl text-warm-white/80 tracking-wide text-center max-w-lg leading-relaxed">
                Coffee by day. Craft by night.
              </p>
            </AnimatedElement>

            {/* Location markers */}
            <AnimatedElement delay={3.7} shouldAnimate={shouldAnimate} className="mt-6 flex items-center gap-3 text-warm-white/50">
              <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">Libertyville</span>
              <span className="text-xs font-semibold">&middot;</span>
              <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">Denver</span>
            </AnimatedElement>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <a
          href="#story"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-warm-white/30 hover:text-warm-white/60 transition-colors duration-500"
          style={
            shouldAnimate
              ? {
                  opacity: 0,
                  animation: "heroFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) 4.0s forwards",
                }
              : {}
          }
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
