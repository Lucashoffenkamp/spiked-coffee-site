/**
 * GardenTeaser — Parallax interlude teasing The Garden page.
 * Full-bleed evening garden image with editorial overlay text
 * and a CTA linking to /the-garden. Sits between VisionSection
 * and GallerySection on the homepage.
 *
 * Design: Dark, atmospheric, cinematic. The evening garden image
 * scrolls at a slower rate (parallax) while the text stays sharp.
 * Minimal copy — just enough to intrigue.
 */
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const GARDEN_EVENING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/garden-hero-night-v4-kEYP5EWustx52tbavataa2.webp";

export default function GardenTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "70vh", minHeight: "500px" }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{
          y,
          height: "130%",
          top: "-15%",
        }}
      >
        <img
          src={GARDEN_EVENING}
          alt="The Garden at Spiked Coffee — evening"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Subtle gradient at top and bottom for blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <span
            className="inline-block text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Coming Soon
          </span>

          {/* Headline */}
          <h2
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-4"
            style={{ color: "#fff" }}
          >
            Same table.
            <br />
            <em className="italic" style={{ color: "rgba(255,255,255,0.7)" }}>
              Different pour.
            </em>
          </h2>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg font-light leading-relaxed mb-8 max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            A cafe garden by morning. A beer garden by evening.
            The next chapter of Spiked Coffee, outdoors.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="/the-garden"
              className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 group"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white/70 transition-colors duration-300">
                Explore The Garden
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
