/*
 * PageTransition — Spiked Coffee
 * Design: Smooth fade + subtle slide for page transitions.
 * Wraps page content with framer-motion AnimatePresence.
 */
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  );
}
