/*
 * CoffeePourIndicator — Spiked Coffee
 * Design: NotNeutral VERO-inspired cortado glass — squat, slightly tapered
 * tumbler with faceted sides and rounded edges. No handle, no saucer.
 * The glass fills with espresso as the user scrolls.
 * Steam wisps animate in once nearly full.
 * No percentage text — just the quiet fill.
 * Frosted glass backdrop for visibility on all backgrounds.
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (v) => setProgress(v));

  // Coffee color darkens as it fills
  const fillColor = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [
      "oklch(0.52 0.07 55)",   // light coffee
      "oklch(0.42 0.07 50)",   // medium roast
      "oklch(0.33 0.06 48)",   // dark roast
      "oklch(0.25 0.05 45)",   // espresso
    ]
  );

  // Fill rises from bottom (y=48) to near top (y=8) of the glass interior
  const fillY = useTransform(smoothProgress, [0, 1], [48, 8]);

  // Steam — visible when > 60% full
  const steamOpacity = useTransform(smoothProgress, [0.55, 0.7], [0, 1]);

  // Shimmer at liquid surface
  const shimmerOpacity = useTransform(smoothProgress, [0, 0.05], [0, 0.5]);

  const isVisible = progress > 0.01;

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
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-hidden="true"
        >
          {/* Frosted glass backdrop */}
          <div
            className={`absolute rounded-xl ${isMobile ? "-inset-1.5" : "-inset-2.5"}`}
            style={{
              background: "oklch(0.96 0.012 85 / 0.6)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid oklch(0.92 0.015 85 / 0.35)",
              boxShadow: "0 2px 16px oklch(0.28 0.05 55 / 0.1)",
            }}
          />

          <div className={`relative mx-auto ${isMobile ? "w-8 h-9" : "w-11 h-12"}`}>
            <svg
              viewBox="0 0 44 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible"
            >
              <defs>
                {/* Clip path matching the glass interior */}
                <clipPath id="veroInterior">
                  <path d="M7 7 L5.5 42 Q5 47 10 47 L34 47 Q39 47 38.5 42 L37 7 Z" />
                </clipPath>

                {/* Surface shimmer */}
                <linearGradient id="veroShimmer" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.6 0.05 55)" stopOpacity="0" />
                  <stop offset="35%" stopColor="oklch(0.6 0.05 55)" stopOpacity="0.45" />
                  <stop offset="65%" stopColor="oklch(0.6 0.05 55)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="oklch(0.6 0.05 55)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/*
                VERO glass silhouette — squat tumbler, slightly wider at top,
                faceted sides suggested by subtle vertex points, rounded bottom
              */}

              {/* Main glass body — slightly tapered, rounded bottom corners */}
              <path
                d="M6 5 L4 42 Q3.5 48 10 48 L34 48 Q40.5 48 40 42 L38 5"
                stroke="oklch(0.30 0.04 55)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Rim — slightly wider than body */}
              <path
                d="M5 5 Q5 3 7 3 L37 3 Q39 3 39 5"
                stroke="oklch(0.30 0.04 55)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Facet lines — subtle vertical ridges like the VERO glass */}
              <line x1="12" y1="8" x2="10.5" y2="44" stroke="oklch(0.30 0.04 55)" strokeWidth="0.5" opacity="0.25" />
              <line x1="22" y1="8" x2="22" y2="46" stroke="oklch(0.30 0.04 55)" strokeWidth="0.5" opacity="0.2" />
              <line x1="32" y1="8" x2="33.5" y2="44" stroke="oklch(0.30 0.04 55)" strokeWidth="0.5" opacity="0.25" />

              {/* Coffee fill — clipped to glass interior */}
              <g clipPath="url(#veroInterior)">
                <motion.rect
                  x="3"
                  width="38"
                  height="42"
                  rx="1"
                  style={{
                    fill: fillColor,
                    y: fillY,
                  }}
                />

                {/* Surface shimmer */}
                <motion.rect
                  x="8"
                  width="28"
                  height="1.2"
                  rx="0.6"
                  fill="url(#veroShimmer)"
                  style={{
                    y: fillY,
                    opacity: shimmerOpacity,
                  }}
                />
              </g>

              {/* Steam wisps — delicate, only when nearly full */}
              <motion.g style={{ opacity: steamOpacity }}>
                <motion.path
                  d="M15 2 Q13.5 -2 15 -5 Q16.5 -8 15 -11"
                  stroke="oklch(0.40 0.03 55)"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.3"
                  animate={{
                    d: [
                      "M15 2 Q13.5 -2 15 -5 Q16.5 -8 15 -11",
                      "M15 2 Q16.5 -1.5 15 -4.5 Q13.5 -7.5 15 -10.5",
                      "M15 2 Q13.5 -2 15 -5 Q16.5 -8 15 -11",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M22 1.5 Q20.5 -2.5 22 -5.5 Q23.5 -8.5 22 -12"
                  stroke="oklch(0.40 0.03 55)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.35"
                  animate={{
                    d: [
                      "M22 1.5 Q20.5 -2.5 22 -5.5 Q23.5 -8.5 22 -12",
                      "M22 1.5 Q23.5 -2 22 -5 Q20.5 -8 22 -11.5",
                      "M22 1.5 Q20.5 -2.5 22 -5.5 Q23.5 -8.5 22 -12",
                    ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.path
                  d="M29 2 Q27.5 -1.5 29 -4.5 Q30.5 -7.5 29 -10.5"
                  stroke="oklch(0.40 0.03 55)"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.3"
                  animate={{
                    d: [
                      "M29 2 Q27.5 -1.5 29 -4.5 Q30.5 -7.5 29 -10.5",
                      "M29 2 Q30.5 -1 29 -4 Q27.5 -7 29 -10",
                      "M29 2 Q27.5 -1.5 29 -4.5 Q30.5 -7.5 29 -10.5",
                    ],
                  }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                />
              </motion.g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
