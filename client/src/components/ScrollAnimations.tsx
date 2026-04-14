/*
 * ScrollAnimations — Spiked Coffee
 * Reusable animation primitives:
 *   - ParallaxLayer: scroll-linked vertical offset for depth
 *   - ScrollReveal: scroll-linked opacity + translate (not just in-view toggle)
 *   - ImageReveal: curtain wipe that reveals an image underneath
 *   - StaggerContainer / StaggerItem: staggered card entrances
 */
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Parallax Layer ─── */
interface ParallaxProps {
  children: ReactNode;
  speed?: number; // negative = slower (background), positive = faster (foreground)
  className?: string;
}

export function ParallaxLayer({ children, speed = -0.15, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Scroll-Linked Reveal ─── */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initialX = direction === "left" ? -60 : direction === "right" ? 60 : 0;
  const initialY = direction === "up" ? 50 : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: initialX, y: initialY, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Image Curtain Reveal ─── */
interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  curtainColor?: string; // tailwind bg class
  aspectClass?: string;
}

export function ImageReveal({
  src,
  alt,
  className = "",
  curtainColor = "bg-terracotta",
  aspectClass = "h-[500px] lg:h-[650px]",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${aspectClass} ${className}`}>
      {/* The image underneath */}
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.4, ease }}
      />
      {/* Curtain wipe overlay */}
      <motion.div
        className={`absolute inset-0 ${curtainColor} origin-left`}
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        style={{ transformOrigin: "right" }}
      />
    </div>
  );
}

/* ─── Stagger Container + Item ─── */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
