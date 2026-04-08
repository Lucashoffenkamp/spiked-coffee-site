/*
 * QuickMenuPreview — Spiked Coffee
 * Horizontal scrolling drink preview with linked cards.
 * The Spot leads, followed by classics, then a seasonal limited-time drink.
 * Lodge editorial aesthetic with scroll-triggered entrance.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const ease = [0.22, 1, 0.36, 1] as const;

const drinks = [
  {
    name: "The Spot",
    subtitle: "Cookies & Cream Latte",
    description: "Our signature. Espresso, cream, crushed cookies, and a chocolate drizzle. Named after the dog.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/drink_the_spot_hero-7Q6t2HPSXHUoHPCFkUZne8.webp",
    tag: "SIGNATURE",
    slug: "the-spot",
  },
  {
    name: "Latte",
    subtitle: null,
    description: "Silky steamed milk over a double shot. Classic, comforting, always right.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/drink_latte-UFNRAJ9MbJ452dXQtnN7tz.webp",
    tag: null,
    slug: "latte",
  },
  {
    name: "Cappuccino",
    subtitle: null,
    description: "Equal parts espresso, steamed milk, and velvety microfoam. A morning ritual.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/drink_cappuccino-H3zhusfs67NMF5DvLuo5tB.webp",
    tag: null,
    slug: "cappuccino",
  },
  {
    name: "Flat White",
    subtitle: null,
    description: "Bold espresso with a thin layer of microfoam. Strong, smooth, no fuss.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/drink_flat_white-Uez4yPBMo5tEWALSX7PkU5.webp",
    tag: null,
    slug: "flat-white",
  },
  {
    name: "Miel",
    subtitle: null,
    description: "Espresso sweetened with honey and steamed milk. Warm, golden, a little different.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/drink_miel-PCQeqoqhDzKqgweku4twDf.webp",
    tag: null,
    slug: "miel",
  },
  {
    name: "Mocha",
    subtitle: null,
    description: "Rich chocolate meets espresso and steamed milk. Indulgent but never too sweet.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/drink_mocha-Lwt2YfZE3kNvPYyN3JNhXp.webp",
    tag: null,
    slug: "mocha",
  },
  {
    name: "Lavender Honey",
    subtitle: "Spring Seasonal",
    description: "Espresso with house-made lavender syrup, local honey, and steamed oat milk. Floral, sweet, fleeting.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/drink_seasonal_lavender-8tseL9msh5bbrLA7LWCU72.webp",
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
            <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 ${drink.tag === "LIMITED TIME" ? "bg-espresso" : "bg-terracotta"}`}>
              <span className="font-body text-[9px] tracking-[0.2em] uppercase text-warm-white font-medium">
                {drink.tag}
              </span>
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
        <h3 className="font-display text-xl font-light text-espresso tracking-wide mb-1 group-hover:text-terracotta transition-colors duration-300">
          {drink.name}
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
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-terracotta" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-terracotta font-light">
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
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {drinks.map((drink, i) => (
            <DrinkCard key={drink.name} drink={drink} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="sm:hidden mt-8 text-center"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-terracotta hover:text-espresso transition-colors duration-300 font-light group"
          >
            See Full Menu
            <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
