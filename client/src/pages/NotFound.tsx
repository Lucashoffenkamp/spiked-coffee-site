/*
 * 404 Page — "Spike Wandered Off"
 * Design: Warm cream background, real Spike photo, playful copy
 * Matches lodge aesthetic with Cormorant Garamond + Jost
 */
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SPIKE_REAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/spike_real_bbac0cff.jpg";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Spike's Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto mb-8 w-64 h-64 md:w-80 md:h-80"
          >
            {/* Decorative circle behind */}
            <div className="absolute inset-0 rounded-full bg-[#C4956A]/15 scale-110" />
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#C4956A]/30">
              <img
                src={SPIKE_REAL}
                alt="Spike the Dalmatian looking curious"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Paw prints scattered */}
            <motion.span
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-4 -right-2 text-4xl"
              aria-hidden="true"
            >
              🐾
            </motion.span>
            <motion.span
              initial={{ opacity: 0, rotate: 15 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-2 -left-4 text-3xl rotate-[-30deg]"
              aria-hidden="true"
            >
              🐾
            </motion.span>
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1
              className="font-['Cormorant_Garamond'] text-8xl md:text-9xl font-light text-[#C4956A]/40 leading-none mb-2"
            >
              404
            </h1>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2
              className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#3C2415] mb-4"
            >
              Looks like Spike wandered off...
            </h2>
            <p className="font-['Jost'] text-[#6B5744] text-lg max-w-md mx-auto mb-10 leading-relaxed">
              He probably caught a scent of fresh espresso somewhere.
              Let's get you back on the trail.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#3C2415] text-[#FAF6F1] font-['Jost'] text-sm tracking-[0.15em] uppercase rounded-none hover:bg-[#C4956A] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back Home
            </button>
            <button
              onClick={() => setLocation("/menu")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3C2415] text-[#3C2415] font-['Jost'] text-sm tracking-[0.15em] uppercase rounded-none hover:bg-[#3C2415] hover:text-[#FAF6F1] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View Menu
            </button>
            <button
              onClick={() => setLocation("/find-us")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3C2415] text-[#3C2415] font-['Jost'] text-sm tracking-[0.15em] uppercase rounded-none hover:bg-[#3C2415] hover:text-[#FAF6F1] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Find Us
            </button>
          </motion.div>

          {/* Fun footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 font-['Cormorant_Garamond'] italic text-[#C4956A] text-base"
          >
            "Life is short. The coffee is good. This page, however, does not exist."
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
