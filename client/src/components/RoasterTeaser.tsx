/*
 * RoasterTeaser — Spiked Coffee
 * Design: Editorial product showcase row with transparent cutout bags
 * on a clean cream background. Each bag floats with a subtle shadow,
 * roaster logo + name below in tracked uppercase. Links to /roasters page.
 * Shop CTA links to each roaster's online store.
 * Typography: Cormorant Garamond display + Jost body
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ShoppingBag } from "lucide-react";

const TALA_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_nobg_35789949.png";
const CHROMATIC_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_nobg_13e96922.png";
const RUBY_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_creamery_clean_9b02d404.png";

const TALA_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_logo_7f6c1f39.png";
const CHROMATIC_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_logo_7679ace5.png";
const RUBY_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_logo_4d0b335f.png";

const roasters = [
  {
    name: "Tala",
    location: "Libertyville, IL",
    blend: "Amoret Espresso",
    image: TALA_BAG,
    logo: TALA_LOGO,
    logoBg: "bg-[#2d4a5a]",
    shopUrl: "https://talacoffeeroasters.com",
  },
  {
    name: "Chromatic",
    location: "San Jose, CA",
    blend: "Gamut Blend",
    image: CHROMATIC_BAG,
    logo: CHROMATIC_LOGO,
    logoBg: "bg-[#f0ebe4]",
    shopUrl: "https://www.chromaticcoffee.com",
  },
  {
    name: "Ruby",
    location: "Nelsonville, WI",
    blend: "Creamery Seasonal",
    image: RUBY_BAG,
    logo: RUBY_LOGO,
    logoBg: "bg-[#f5f0ed]",
    shopUrl: "https://rubycoffeeroasters.com",
  },
];

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function RoasterTeaser() {
  return (
    <section className="bg-cream py-28 lg:py-36 relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-espresso/10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-forest" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-forest font-light">
              On the Shelf
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-light text-espresso leading-[1.1] tracking-wide mb-4 lg:mb-0">
              Featured <span className="font-accent">Roasters</span>
            </h2>
            <Link href="/roasters" className="group flex items-center gap-3 font-body text-sm tracking-[0.15em] uppercase text-espresso/60 hover:text-espresso transition-colors font-light">
              View all roasters
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        {/* Bag showcase row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {roasters.map((roaster, i) => (
            <FadeIn key={roaster.name} delay={0.1 + i * 0.12}>
              <div className="group block text-center">
                {/* Roaster Logo */}
                <div className={`flex justify-center items-center py-4 mb-6 rounded-sm ${roaster.logoBg}`}>
                  <img
                    src={roaster.logo}
                    alt={`${roaster.name} logo`}
                    className="h-10 lg:h-12 w-auto object-contain"
                  />
                </div>

                {/* Bag image — links to roasters page */}
                <Link href="/roasters" className="block">
                  <div className="relative mb-8 flex items-center justify-center h-[320px] lg:h-[380px]">
                    <img
                      src={roaster.image}
                      alt={`${roaster.name} — ${roaster.blend}`}
                      className="h-full w-auto max-w-full object-contain drop-shadow-lg transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:drop-shadow-xl"
                    />
                  </div>
                </Link>

                {/* Thin rule */}
                <div className="w-10 h-px bg-espresso/15 mx-auto mb-5" />

                {/* Roaster info */}
                <Link href="/roasters" className="block">
                  <h3 className="font-display text-2xl lg:text-3xl font-light text-espresso tracking-wide mb-2">
                    {roaster.name}
                  </h3>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-espresso/40 mb-1.5 font-light">
                    {roaster.location}
                  </p>
                  <p className="font-accent text-sm text-espresso/50 italic">
                    {roaster.blend}
                  </p>
                </Link>

                {/* Shop CTA */}
                <a
                  href={roaster.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 border border-espresso/15 hover:border-espresso/40 hover:bg-espresso/[0.03] font-body text-[10px] tracking-[0.2em] uppercase text-espresso-light/60 hover:text-espresso transition-all duration-300 font-light group/shop"
                >
                  <ShoppingBag size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover/shop:scale-110" />
                  Shop {roaster.name}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom accent */}
        <FadeIn delay={0.5}>
          <div className="mt-20 text-center">
            <p className="font-body text-sm text-espresso/40 tracking-[0.15em] uppercase font-light">
              The shelf rotates. The standard doesn't.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
