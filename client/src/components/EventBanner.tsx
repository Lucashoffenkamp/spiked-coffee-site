/*
 * EventBanner — Spiked Coffee
 * Dismissible top-of-page announcement bar for upcoming events.
 * Warm terracotta accent, subtle entrance animation.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar } from "lucide-react";

export default function EventBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem("spiked-banner-dismissed") !== "true";
    } catch {
      return true;
    }
  });

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("spiked-banner-dismissed", "true");
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="bg-espresso text-warm-white relative">
            <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="flex items-center gap-1.5 font-body text-[11px] tracking-[0.2em] uppercase font-light text-warm-white/60">
                  <Calendar size={12} strokeWidth={1.5} />
                  Next Pop-Up
                </span>
                <span className="font-display text-sm tracking-wide">
                  Saturday, April 19th
                </span>
                <span className="hidden sm:inline text-warm-white/30">|</span>
                <span className="flex items-center gap-1.5 font-body text-xs tracking-wide font-light text-warm-white/80">
                  <MapPin size={12} strokeWidth={1.5} />
                  Libertyville Farmers Market
                </span>
                <span className="hidden sm:inline text-warm-white/30">|</span>
                <span className="font-body text-xs tracking-wide font-light text-warm-white/60">
                  7 AM – 1 PM
                </span>
              </div>
              <button
                onClick={dismiss}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-warm-white/40 hover:text-warm-white transition-colors duration-300 z-50"
                aria-label="Dismiss banner"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
