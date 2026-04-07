/*
 * LoadingScreen — Spiked Coffee
 * Design: Dalmatian spots scatter and converge into the brand mark,
 * then the screen lifts to reveal the site. Cream background, espresso spots.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";

const ease = [0.22, 1, 0.36, 1] as const;

// Spot positions — scattered then converge
const spots = [
  { x: -180, y: -120, size: 18, delay: 0 },
  { x: 140, y: -90, size: 14, delay: 0.05 },
  { x: -60, y: 130, size: 20, delay: 0.1 },
  { x: 200, y: 60, size: 12, delay: 0.08 },
  { x: -200, y: 40, size: 16, delay: 0.12 },
  { x: 80, y: -160, size: 10, delay: 0.03 },
  { x: -120, y: -30, size: 22, delay: 0.15 },
  { x: 160, y: 140, size: 15, delay: 0.07 },
  { x: -40, y: -150, size: 13, delay: 0.11 },
  { x: 100, y: 100, size: 17, delay: 0.06 },
  { x: -160, y: 110, size: 11, delay: 0.09 },
  { x: 50, y: -50, size: 19, delay: 0.04 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"spots" | "logo" | "exit">("spots");

  useEffect(() => {
    // Phase 1: spots scatter (0-600ms)
    // Phase 2: spots converge + logo appears (600-1600ms)
    const logoTimer = setTimeout(() => setPhase("logo"), 600);
    // Phase 3: exit (1600-2200ms)
    const exitTimer = setTimeout(() => setPhase("exit"), 1800);
    const completeTimer = setTimeout(() => onComplete(), 2400);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Scattered spots */}
          {spots.map((spot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-espresso"
              style={{ width: spot.size, height: spot.size }}
              initial={{
                x: spot.x * 2,
                y: spot.y * 2,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: phase === "logo" ? 0 : spot.x,
                y: phase === "logo" ? 0 : spot.y,
                opacity: phase === "logo" ? 0 : 1,
                scale: phase === "logo" ? 0 : 1,
              }}
              transition={{
                duration: phase === "logo" ? 0.8 : 0.5,
                delay: spot.delay,
                ease,
              }}
            />
          ))}

          {/* Logo appears after spots converge */}
          <motion.div
            className="absolute flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase === "logo" ? 1 : 0,
              scale: phase === "logo" ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, delay: phase === "logo" ? 0.3 : 0, ease }}
          >
            <img
              src={DALMATIAN_ICON}
              alt=""
              className="h-16 w-16 object-contain"
            />
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-espresso/30" />
              <span className="font-display text-lg tracking-[0.2em] text-espresso font-light">
                SPIKED COFFEE
              </span>
              <div className="w-8 h-px bg-espresso/30" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
