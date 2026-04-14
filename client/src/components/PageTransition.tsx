/*
 * PageTransition — Spiked Coffee
 * Design: Premium layered page transition with a subtle fade + upward drift.
 * Uses framer-motion's AnimatePresence (mode="wait") in App.tsx.
 * The exit animation fades out slightly and drifts down, while the enter
 * animation fades in and drifts up — creating a smooth, editorial feel.
 */
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    transition: {
      duration: 0.3,
      ease,
    },
  },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
