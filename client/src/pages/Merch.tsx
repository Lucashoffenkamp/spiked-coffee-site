/*
 * Merch Page — Spiked Coffee
 * Design: Editorial product showcase with "Coming Soon" vibe.
 * Cormorant Garamond display, Jost body. Lodge aesthetic.
 * Product mockups in a clean grid with notify-me CTA.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bell, Package, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

/* ── CDN Assets ── */
const STICKER_PACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_sticker_v2-9qPJ9ELuQTNtuGA8vmMMMj.webp";
const DAD_HAT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_hat_v2-Huc5AWGkotKe6BmVtea9Zq.webp";
const KINTO_TUMBLER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_tumbler_v2-BDyDWryf92d44wWnJMhhJZ.webp";
const TOTE_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_tote_v2-mC5bMyWTuyPQY3XQRCogkC.webp";

const ease = [0.22, 1, 0.36, 1] as const;

const products = [
  {
    name: "Sticker Pack",
    description: "A set of die-cut vinyl stickers featuring the Dalmatian, coffee cup, paw print, and 'Life is Good' script. Weatherproof and laptop-ready.",
    price: "$8",
    image: STICKER_PACK,
    badge: "Free with first 100 signups",
  },
  {
    name: "The Dad Hat",
    description: "Unstructured cotton twill cap in washed khaki with embroidered Dalmatian logo. Brass buckle closure. One size fits all.",
    price: "$32",
    image: DAD_HAT,
    badge: null,
  },
  {
    name: "Kinto Travel Tumbler",
    description: "12oz Kinto Travel Tumbler in khaki with engraved Dalmatian logo. Double-wall vacuum insulated stainless steel. Keeps coffee hot for 6 hours.",
    price: "$36",
    image: KINTO_TUMBLER,
    badge: "Most requested",
  },
  {
    name: "Canvas Tote",
    description: "Heavy-weight natural cotton canvas tote with screen-printed Dalmatian logo. Perfect for the farmers market run.",
    price: "$28",
    image: TOTE_BAG,
    badge: null,
  },
];

/* ── Fade-in wrapper ── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ── Product Card ── */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <FadeIn delay={0.1 + index * 0.1}>
      <div className="group">
        {/* Image container */}
        <div className="relative overflow-hidden bg-warm-white mb-6">
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3 py-1.5 bg-terracotta/90 font-body text-[10px] tracking-[0.15em] uppercase text-cream font-light">
                {product.badge}
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-block px-3 py-1.5 border border-espresso/10 bg-cream/80 backdrop-blur-sm font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/50 font-light">
              Coming Soon
            </span>
          </div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Product info */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-xl lg:text-2xl font-light text-espresso tracking-wide">
            {product.name}
          </h3>
          <span className="font-display text-lg font-light text-espresso-light/50 tracking-wide">
            {product.price}
          </span>
        </div>
        <p className="font-body text-sm text-espresso-light/55 font-light leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Notify button */}
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-espresso/12 hover:border-espresso/30 hover:bg-espresso/[0.03] font-body text-[10px] tracking-[0.2em] uppercase text-espresso-light/50 hover:text-espresso transition-all duration-300 font-light group/btn"
          onClick={() => {
            const el = document.getElementById("merch-notify");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Bell size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover/btn:scale-110" />
          Notify Me
        </button>
      </div>
    </FadeIn>
  );
}

/* ── Main Page ── */
export default function Merch() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />
      <Navigation />

      {/* ── Hero Section ── */}
      <section className="pt-32 lg:pt-40 pb-20 lg:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-terracotta/60" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-terracotta/70 font-light">
                The Goods
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light tracking-[0.08em] text-espresso leading-[1.05] mb-6">
              Wear the <span className="font-accent italic">brand.</span>
            </h1>

            <p className="font-body text-base lg:text-lg text-espresso-light/55 font-light leading-relaxed max-w-2xl">
              We're building a small collection of goods that carry the Spiked Coffee spirit beyond the cup.
              Every piece is designed with the same intention we put into our coffee — craft, quality, and a little personality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Coming Soon Banner ── */}
      <FadeIn>
        <section className="bg-espresso/[0.03] py-10 px-6 mb-16">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <Package size={20} strokeWidth={1.5} className="text-terracotta/60" />
            <p className="font-body text-sm text-espresso-light/60 font-light tracking-wide">
              Our merch line is currently in production. Sign up below to be the first to know when it drops.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ── Product Grid ── */}
      <section className="px-6 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
            {products.map((product, i) => (
              <ProductCard key={product.name} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Notify Section ── */}
      <section id="merch-notify" className="bg-espresso/[0.03] py-24 lg:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-px bg-espresso/10" />
              <Heart size={16} strokeWidth={1.5} className="text-terracotta/50" />
              <div className="w-12 h-px bg-espresso/10" />
            </div>

            <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide mb-4">
              Get first <span className="font-accent italic">dibs.</span>
            </h2>

            <p className="font-body text-sm text-espresso-light/50 font-light leading-relaxed mb-10 max-w-md mx-auto">
              Drop your email and we'll let you know the moment our merch goes live. Early supporters get first access and exclusive colorways.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6"
              >
                <p className="font-display text-xl text-espresso tracking-wide mb-2">You're on the list.</p>
                <p className="font-body text-sm text-espresso-light/50 font-light">
                  We'll reach out when the goods are ready.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3 bg-cream border border-espresso/10 font-body text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-espresso/30 transition-colors font-light tracking-wide"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-espresso text-cream font-body text-xs tracking-[0.2em] uppercase hover:bg-espresso/90 transition-colors duration-300 font-light"
                >
                  Notify Me
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
