/*
 * CoffeePourIndicator — Spiked Coffee
 * NotNeutral VERO-inspired cortado glass that fills as you scroll.
 * Features:
 *   - Click-to-top: tapping the glass smooth-scrolls back to the top
 *   - Section color shift: coffee tint changes based on which section is in view
 *     • Coffee sections (hero, story, menu, roasters): espresso brown
 *     • Evening/concept night section: warm amber (beer/wine vibe)
 *     • Vision section (dark): deep burgundy
 *     • Gallery/signup: back to espresso
 *   - Steam wisps at 60%+
 *   - Frosted glass backdrop
 *   - No percentage text
 */
import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// Section color palettes — each defines a 4-stop gradient from light to dark
type Palette = [string, string, string, string];

const SECTION_PALETTES: Record<string, Palette> = {
  coffee: [
    "oklch(0.52 0.07 55)",   // light coffee
    "oklch(0.42 0.07 50)",   // medium roast
    "oklch(0.33 0.06 48)",   // dark roast
    "oklch(0.25 0.05 45)",   // espresso
  ],
  evening: [
    "oklch(0.55 0.09 70)",   // golden amber
    "oklch(0.45 0.10 60)",   // warm amber
    "oklch(0.38 0.09 50)",   // deep amber
    "oklch(0.30 0.07 45)",   // dark amber
  ],
  vision: [
    "oklch(0.45 0.08 15)",   // light burgundy
    "oklch(0.38 0.10 10)",   // medium burgundy
    "oklch(0.30 0.09 8)",    // deep burgundy
    "oklch(0.22 0.06 5)",    // dark burgundy
  ],
};

type PaletteKey = "coffee" | "evening" | "vision";

// Maps section IDs to palette keys
const SECTION_MAP: Record<string, PaletteKey> = {
  concept: "evening",  // The concept section has both day and night — we use evening for the whole thing
  vision: "vision",
  // Everything else defaults to "coffee"
};

function useActiveSection(): PaletteKey {
  const [active, setActive] = useState<PaletteKey>("coffee");

  useEffect(() => {
    // Observe which major section is currently in the viewport center
    const sectionIds = ["concept", "vision"];
    const elements: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) elements.push(el);
    });

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }

        if (bestEntry) {
          const id = bestEntry.target.id;
          setActive(SECTION_MAP[id] || "coffee");
        } else {
          // No tracked section is in view — default to coffee
          // Only reset if none of the tracked sections are intersecting
          const anyIntersecting = entries.some((e) => e.isIntersecting);
          if (!anyIntersecting) {
            setActive("coffee");
          }
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.5],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

// Interpolate between two oklch color strings
function interpolateOklch(a: string, b: string, t: number): string {
  const parse = (s: string) => {
    const m = s.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!m) return [0.4, 0.06, 50];
    return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
  };
  const [aL, aC, aH] = parse(a);
  const [bL, bC, bH] = parse(b);
  const lerp = (x: number, y: number) => x + (y - x) * t;
  return `oklch(${lerp(aL, bL).toFixed(3)} ${lerp(aC, bC).toFixed(3)} ${lerp(aH, bH).toFixed(1)})`;
}

export default function CoffeePourIndicator() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (v) => setProgress(v));

  // Section-based palette
  const activePalette = useActiveSection();
  const [currentPalette, setCurrentPalette] = useState<Palette>(SECTION_PALETTES.coffee);
  const transitionRef = useRef<number | null>(null);
  const prevPaletteRef = useRef(SECTION_PALETTES.coffee);
  const animStartRef = useRef(0);

  // Smoothly transition between palettes over 600ms
  useEffect(() => {
    const targetPalette = SECTION_PALETTES[activePalette];
    const startPalette: Palette = [...currentPalette];
    prevPaletteRef.current = startPalette;
    animStartRef.current = performance.now();

    const duration = 600;

    const animate = (now: number) => {
      const elapsed = now - animStartRef.current;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);

      const interpolated = startPalette.map((c, i) =>
        interpolateOklch(c, targetPalette[i], eased)
      ) as unknown as Palette;
      setCurrentPalette(interpolated);

      if (t < 1) {
        transitionRef.current = requestAnimationFrame(animate);
      }
    };

    transitionRef.current = requestAnimationFrame(animate);
    return () => {
      if (transitionRef.current) cancelAnimationFrame(transitionRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePalette]);

  // Compute fill color based on progress and current palette
  const getFillColor = useCallback(() => {
    const p = progress;
    if (p <= 0) return currentPalette[0];
    if (p >= 1) return currentPalette[3];

    const stops = [0, 0.33, 0.66, 1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (p >= stops[i] && p <= stops[i + 1]) {
        const t = (p - stops[i]) / (stops[i + 1] - stops[i]);
        return interpolateOklch(currentPalette[i], currentPalette[i + 1], t);
      }
    }
    return currentPalette[3];
  }, [progress, currentPalette]);

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

  // Click-to-top handler
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Hover state for visual feedback
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-[10000] select-none ${
            isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
          }`}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-label="Scroll to top"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Frosted glass backdrop */}
          <motion.div
            className={`absolute rounded-xl ${isMobile ? "-inset-1.5" : "-inset-2.5"}`}
            animate={{
              scale: isHovered ? 1.06 : 1,
              boxShadow: isHovered
                ? "0 4px 24px oklch(0.28 0.05 55 / 0.18)"
                : "0 2px 16px oklch(0.28 0.05 55 / 0.1)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: "oklch(0.96 0.012 85 / 0.6)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid oklch(0.92 0.015 85 / 0.35)",
            }}
          />

          <motion.div
            className={`relative mx-auto ${isMobile ? "w-8 h-9" : "w-11 h-12"}`}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
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

              {/* Main glass body */}
              <path
                d="M6 5 L4 42 Q3.5 48 10 48 L34 48 Q40.5 48 40 42 L38 5"
                stroke="oklch(0.30 0.04 55)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Rim */}
              <path
                d="M5 5 Q5 3 7 3 L37 3 Q39 3 39 5"
                stroke="oklch(0.30 0.04 55)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Facet lines */}
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
                    fill: getFillColor(),
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

              {/* Steam wisps */}
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
          </motion.div>

          {/* Subtle up-arrow hint on hover */}
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2"
            animate={{ opacity: isHovered ? 0.6 : 0, y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 7L6 2L11 7" stroke="oklch(0.30 0.04 55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
