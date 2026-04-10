/*
 * BeaconTeaser — Spiked Coffee
 * Homepage spotlight for Beacon Doughnuts, Chicago IL — our pastry partner.
 * Uses real photos provided by the brand. Purple accent from their logo.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const BEACON_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/beacon_logo_81d3d982.png";
const BEACON_GLAZED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/beacon_glazed_mural_e3629680.jpg";
const BEACON_CRUMB = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/beacon_crumb_donut_4d38ae32.jpg";
const BEACON_POWDERED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/beacon_powdered_stack_829b8446.jpg";
const BEACON_CHOCOLATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/beacon_chocolate_donut_0bdf709f.jpg";

const photos = [BEACON_GLAZED, BEACON_CRUMB, BEACON_POWDERED, BEACON_CHOCOLATE];
const captions = ["Classic Glazed", "Crumb Cake", "Powdered Bomboloni", "Chocolate Old Fashioned"];

const ease = [0.22, 1, 0.36, 1] as const;

export default function BeaconTeaser() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-cream overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div className="w-12 h-px bg-[#7c3aed]/40" />
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#7c3aed]/60 font-light">
            Our Pastry Partner
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Photo showcase */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            {/* Main rotating photo */}
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
              {photos.map((photo, i) => (
                <motion.img
                  key={i}
                  src={photo}
                  alt={captions[i]}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{ opacity: activePhoto === i ? 1 : 0 }}
                  transition={{ duration: 0.8, ease }}
                />
              ))}
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-5">
                <motion.p
                  key={activePhoto}
                  className="font-body text-xs tracking-[0.2em] uppercase text-white/80 font-light"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {captions[activePhoto]}
                </motion.p>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    activePhoto === i ? "bg-[#7c3aed] w-6" : "bg-espresso/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            {/* Logo + name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#7c3aed] flex items-center justify-center p-2 shadow-lg border-2 border-[#7c3aed]/20">
                <img src={BEACON_LOGO} alt="Beacon Doughnuts" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display text-2xl lg:text-3xl text-espresso font-light tracking-wide">
                  Beacon Doughnuts
                </h3>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-espresso-light/50 font-light mt-0.5">
                  Chicago, IL
                </p>
              </div>
            </div>

            <div className="w-10 h-px bg-[#7c3aed]/30 mb-6" />

            <p className="font-body text-sm lg:text-base text-espresso-light/70 font-light leading-relaxed mb-6">
              Every pop-up deserves a great doughnut. Beacon Doughnuts hand-crafts small batches out of Chicago using real butter, local eggs, and zero artificial anything. Their glazed is legendary. Their crumb cake pairs with a cortado like nothing else.
            </p>

            <p className="font-body text-sm lg:text-base text-espresso-light/70 font-light leading-relaxed mb-8">
              We bring them fresh to every Spiked Coffee event — because craft coffee and craft doughnuts just belong together.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Small Batch", "Chicago Made", "Real Ingredients", "Fresh Each Pop-Up"].map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-[#7c3aed]/8 text-[#7c3aed]/70 border border-[#7c3aed]/10 rounded-sm font-light"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/menu"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-[#7c3aed] hover:text-[#6d28d9] font-light transition-colors duration-300 group"
            >
              <span>See the full menu</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
