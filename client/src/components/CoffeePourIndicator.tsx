/*
 * CoffeePourIndicator — Spiked Coffee
 * Design: Minimal line-art coffee cup fixed in the bottom-right corner.
 * The cup fills with espresso-brown liquid as the user scrolls down the page.
 * Steam wisps animate in once the cup is nearly full.
 * A frosted glass backdrop ensures visibility on both light and dark sections.
 * Uses Framer Motion useScroll + useTransform for buttery smooth tracking.
 * Hidden on mobile (< 768px) to avoid clutter on small screens.
 * Color palette: espresso brown, terracotta accent, cream background.
 */
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export default function CoffeePourIndicator() {
  const { scrollYProgress } = useScroll();

  // Smooth spring for the fill level
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Track progress value for percentage display
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (v) => setProgress(v));

  // Coffee color shifts from light brown to deep espresso as it fills
  const fillColor = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [
      "oklch(0.55 0.08 55)",   // light coffee
      "oklch(0.45 0.08 50)",   // medium roast
      "oklch(0.35 0.07 48)",   // dark roast
      "oklch(0.28 0.05 55)",   // espresso
    ]
  );

  // Fill rectangle Y position — rises from bottom to top of cup
  const fillY = useTransform(smoothProgress, [0, 1], [62, 14]);

  // Opacity: fade in after a tiny scroll so it doesn't appear on load
  const containerOpacity = useTransform(smoothProgress, [0, 0.02, 0.05], [0, 0, 1]);

  // Steam opacity — only visible when cup is > 60% full
  const steamOpacity = useTransform(smoothProgress, [0.55, 0.7], [0, 1]);

  // Surface shimmer opacity
  const shimmerOpacity = useTransform(smoothProgress, [0, 0.05], [0, 0.6]);

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9998] pointer-events-none select-none"
      style={{ opacity: containerOpacity }}
      aria-hidden="true"
    >
      {/* Frosted glass backdrop for visibility on dark sections */}
      <div
        className="absolute -inset-3 rounded-2xl"
        style={{
          background: "oklch(0.96 0.015 85 / 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid oklch(0.96 0.015 85 / 0.3)",
          boxShadow: "0 4px 24px oklch(0.28 0.05 55 / 0.08)",
        }}
      />

      <div className="relative">
        {/* Percentage label */}
        <div className="text-center mb-1 font-body text-[10px] tracking-[0.15em] uppercase font-light tabular-nums"
          style={{ color: "oklch(0.38 0.05 55 / 0.6)" }}
        >
          {Math.round(progress * 100)}%
        </div>

        <div className="relative w-14 h-[4.5rem] mx-auto">
          <svg
            viewBox="-2 -12 56 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            {/* Definitions */}
            <defs>
              {/* Clip path for the cup interior — slightly tapered */}
              <clipPath id="cupInterior">
                <path d="M8 16 L10 58 Q11 62 15 62 L33 62 Q37 62 38 58 L40 16 Z" />
              </clipPath>

              {/* Subtle surface shimmer gradient */}
              <linearGradient id="surfaceShimmer" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.65 0.06 55)" stopOpacity="0" />
                <stop offset="40%" stopColor="oklch(0.65 0.06 55)" stopOpacity="0.5" />
                <stop offset="60%" stopColor="oklch(0.65 0.06 55)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.65 0.06 55)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Cup body — outline */}
            <path
              d="M6 14 L8.5 58 Q9.5 64 16 64 L32 64 Q38.5 64 39.5 58 L42 14"
              stroke="oklch(0.28 0.05 55)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Cup rim */}
            <path
              d="M4 14 L44 14"
              stroke="oklch(0.28 0.05 55)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Handle */}
            <path
              d="M42 22 Q50 22 50 32 Q50 42 42 42"
              stroke="oklch(0.28 0.05 55)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Saucer / base plate */}
            <ellipse
              cx="24"
              cy="65"
              rx="18"
              ry="2.5"
              stroke="oklch(0.28 0.05 55)"
              strokeWidth="1.4"
              fill="none"
            />

            {/* Coffee fill — clipped to cup interior */}
            <g clipPath="url(#cupInterior)">
              {/* The fill rectangle rises from the bottom */}
              <motion.rect
                x="6"
                width="36"
                height="48"
                rx="1"
                style={{
                  fill: fillColor,
                  y: fillY,
                }}
              />

              {/* Surface shimmer line — sits at the top of the liquid */}
              <motion.rect
                x="10"
                width="28"
                height="1.5"
                rx="0.75"
                fill="url(#surfaceShimmer)"
                style={{
                  y: fillY,
                  opacity: shimmerOpacity,
                }}
              />
            </g>

            {/* Steam wisps — three wavy lines, only visible when cup is filling */}
            <motion.g style={{ opacity: steamOpacity }}>
              {/* Left wisp */}
              <motion.path
                d="M16 12 Q14 6 16 2 Q18 -2 16 -6"
                stroke="oklch(0.38 0.04 55)"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
                animate={{
                  d: [
                    "M16 12 Q14 6 16 2 Q18 -2 16 -6",
                    "M16 12 Q18 7 16 3 Q14 -1 16 -5",
                    "M16 12 Q14 6 16 2 Q18 -2 16 -6",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Center wisp */}
              <motion.path
                d="M24 11 Q22 5 24 0 Q26 -4 24 -8"
                stroke="oklch(0.38 0.04 55)"
                strokeWidth="0.9"
                strokeLinecap="round"
                fill="none"
                opacity="0.45"
                animate={{
                  d: [
                    "M24 11 Q22 5 24 0 Q26 -4 24 -8",
                    "M24 11 Q26 6 24 1 Q22 -3 24 -7",
                    "M24 11 Q22 5 24 0 Q26 -4 24 -8",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
              {/* Right wisp */}
              <motion.path
                d="M32 12 Q30 7 32 3 Q34 -1 32 -5"
                stroke="oklch(0.38 0.04 55)"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
                animate={{
                  d: [
                    "M32 12 Q30 7 32 3 Q34 -1 32 -5",
                    "M32 12 Q34 8 32 4 Q30 0 32 -4",
                    "M32 12 Q30 7 32 3 Q34 -1 32 -5",
                  ],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
            </motion.g>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
