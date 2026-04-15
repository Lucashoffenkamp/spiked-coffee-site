/*
 * CoffeePourIndicator — Spiked Coffee
 * Design: Line-art coffee cup fixed in the bottom-right corner.
 * The cup fills with espresso-brown liquid as the user scrolls down the page.
 * Steam wisps animate in once the cup is nearly full.
 * A frosted glass backdrop ensures visibility on both light and dark sections.
 * Uses Framer Motion useScroll + useTransform for buttery smooth tracking.
 * Responsive: larger on desktop, compact on mobile.
 * z-index 10000 to sit above the grain overlay (9999).
 */
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

export default function CoffeePourIndicator() {
  const { scrollYProgress } = useScroll();

  // Smooth spring for the fill level
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Track progress value for percentage display and visibility
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

  // Steam opacity — only visible when cup is > 60% full
  const steamOpacity = useTransform(smoothProgress, [0.55, 0.7], [0, 1]);

  // Surface shimmer opacity
  const shimmerOpacity = useTransform(smoothProgress, [0, 0.05], [0, 0.6]);

  // Show the cup once user has scrolled at least 1%
  const isVisible = progress > 0.01;

  // Responsive size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-[10000] pointer-events-none select-none ${
            isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
          }`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          {/* Frosted glass backdrop for visibility on all backgrounds */}
          <div
            className={`absolute rounded-2xl ${isMobile ? "-inset-2" : "-inset-3"}`}
            style={{
              background: "oklch(0.96 0.015 85 / 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid oklch(0.90 0.02 85 / 0.4)",
              boxShadow: "0 4px 24px oklch(0.28 0.05 55 / 0.12), 0 1px 3px oklch(0.28 0.05 55 / 0.06)",
            }}
          />

          <div className="relative">
            {/* Percentage label */}
            <div
              className={`text-center font-body tracking-[0.15em] uppercase font-medium tabular-nums ${
                isMobile ? "text-[9px] mb-0.5" : "text-[11px] mb-1"
              }`}
              style={{ color: "oklch(0.35 0.05 55 / 0.7)" }}
            >
              {Math.round(progress * 100)}%
            </div>

            <div className={`relative mx-auto ${isMobile ? "w-10 h-14" : "w-[4.5rem] h-[5.5rem]"}`}>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

                {/* Cup rim */}
                <path
                  d="M4 14 L44 14"
                  stroke="oklch(0.28 0.05 55)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Handle */}
                <path
                  d="M42 22 Q50 22 50 32 Q50 42 42 42"
                  stroke="oklch(0.28 0.05 55)"
                  strokeWidth="2"
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
                  strokeWidth="1.6"
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

                {/* Steam wisps — three wavy lines */}
                <motion.g style={{ opacity: steamOpacity }}>
                  {/* Left wisp */}
                  <motion.path
                    d="M16 12 Q14 6 16 2 Q18 -2 16 -6"
                    stroke="oklch(0.38 0.04 55)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
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
                    strokeWidth="1"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
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
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
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
      )}
    </AnimatePresence>
  );
}
