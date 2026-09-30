/*
 * QuickMenuPreview — Spiked Coffee
 * Horizontal scrolling drink preview with linked cards.
 * The Spike leads, followed by classics, then a seasonal limited-time drink.
 * Lodge editorial aesthetic with scroll-triggered entrance.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ScrollReveal } from "./ScrollAnimations";

const ease = [0.22, 1, 0.36, 1] as const;

const drinks = [
  {
    name: "The Spike",
    subtitle: "Cookies & Cream Latte",
    description: "Our signature. Espresso, Kilgus cream, crushed Oreos, and a Kakao Chocolate Works dark drizzle. Named after the very good boy.",
    image: "/assets/drink_the_spike.jpg",
    tag: "SIGNATURE",
    slug: "the-spike",
  },
  {
    name: "Latte",
    subtitle: null,
    description: "Kilgus Farmstead milk steamed over a double shot. Simple done right. Fairbury, IL in every sip.",
    image: "/assets/drink_latte.jpg",
    tag: null,
    slug: "latte",
  },
  {
    name: "Cappuccino",
    subtitle: null,
    description: "Espresso, steamed Kilgus milk, dense microfoam. Dusted with Saigon cinnamon. A morning ritual.",
    image: "/assets/drink_cappuccino.jpg",
    tag: null,
    slug: "cappuccino",
  },
  {
    name: "Flat White",
    subtitle: null,
    description: "Double ristretto, velvety Kilgus microfoam. The way they drink it in Melbourne — no fuss.",
    image: "/assets/drink_flat_white.jpg",
    tag: null,
    slug: "flat-white",
  },
  {
    name: "Miel",
    subtitle: null,
    description: "Espresso sweetened with Lake County wildflower honey and steamed Kilgus milk. Warm, golden, local.",
    image: "/assets/drink_miel.jpg",
    tag: null,
    slug: "miel",
  },
  {
    name: "Mocha",
    subtitle: null,
    description: "Kakao Chocolate Works dark cocoa meets espresso and Kilgus milk. Indulgent, never too sweet.",
    image: "/assets/drink_mocha.jpg",
    tag: null,
    slug: "mocha",
  },
  {
    name: "Lavender Honey",
    subtitle: "Spring Seasonal",
    description: "House-dried culinary lavender, Lake County wildflower honey, Oatly oat milk. Floral, sweet, fleeting.",
    image: "/assets/drink_lavender_honey.jpg",
    tag: "LIMITED TIME",
    slug: "lavender-honey",
  },
];

function DrinkCard({ drink, index }: { drink: typeof drinks[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      className="flex-shrink-0 w-[260px] sm:w-[280px] group"
    >
      <Link href={`/menu#${drink.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden mb-4 bg-cream aspect-[3/4]">
          {drink.tag && (
            <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 flex items-center gap-1.5 ${drink.tag === "LIMITED TIME" ? "bg-espresso" : "bg-terracotta"}`}>
              {drink.tag === "SIGNATURE" && (
                <span className="text-[10px]">🐾</span>
              )}
              <span className="font-body text-[9px] tracking-[0.2em] uppercase text-warm-white font-medium">
                {drink.tag}
              </span>
            </div>
          )}
          {/* Spike portrait on signature drink */}
          {drink.tag === "SIGNATURE" && (
            <div className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full overflow-hidden border-2 border-warm-white/80 shadow-md">
              <img
                src="/assets/spike_portrait.jpg"
                alt="Spike"
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
          <img
            src={drink.image}
            alt={drink.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-warm-white bg-espresso/70 backdrop-blur-sm px-3 py-1.5">
              View on Menu
            </span>
          </div>
        </div>

        {/* Info */}
        <h3 className="font-display text-xl font-light text-espresso tracking-wide mb-1 group-hover:text-terracotta transition-colors duration-300 flex items-center gap-2">
          {drink.name}
          {drink.tag === "SIGNATURE" && <span className="text-sm">🐾</span>}
        </h3>
        {drink.subtitle && (
          <p className="font-accent text-xs text-terracotta mb-1.5">
            {drink.subtitle}
          </p>
        )}
        <p className="font-body text-xs text-espresso-light/70 leading-relaxed font-light">
          {drink.description}
        </p>
      </Link>
    </motion.div>
  );
}

export default function QuickMenuPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 lg:py-28 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal direction="left" className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-terracotta" />
              <span className="font-body text-sm tracking-[0.3em] uppercase text-terracotta font-light">
                The Drinks
              </span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-light text-espresso tracking-wide leading-tight">
              What We Pour
            </h2>
          </div>

          <Link
            href="/menu"
            className="hidden sm:inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-terracotta hover:text-espresso transition-colors duration-300 font-light group"
          >
            Full Menu
            <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </ScrollReveal>

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {drinks.map((drink, i) => (
            <DrinkCard key={drink.name} drink={drink} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <ScrollReveal delay={0.3} className="sm:hidden mt-8 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-terracotta hover:text-espresso transition-colors duration-300 font-light group"
          >
            See Full Menu
            <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
