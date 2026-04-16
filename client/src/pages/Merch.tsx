/*
 * Merch Page — Spiked Coffee
 * Design: Editorial product showcase with "Coming Soon" vibe.
 * Cormorant Garamond display, Jost body. Lodge aesthetic.
 * Product mockups in a clean grid with notify-me CTA.
 * Includes product detail lightbox modal.
 */
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, Package, Heart, X, Ruler, Palette, Shield, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";

/* ── CDN Assets ── */
const STICKER_PACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_sticker_v2-9qPJ9ELuQTNtuGA8vmMMMj.webp";
const DAD_HAT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_hat_v2-Huc5AWGkotKe6BmVtea9Zq.webp";
const KINTO_TUMBLER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_tumbler_v2-BDyDWryf92d44wWnJMhhJZ.webp";
const TOTE_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_canvas_tote_v2-nC55zf5E6FdW5Wd3ahZZau.webp";
const POCKET_TEE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/merch_pocket_tee_v2-6y5dCCZs3Pu2Ao7bQQuz7T.webp";
const KINTO_MUG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/kinto_mug_v2-EpFowdyUQxLmUbiKJmKeua.webp";

const ease = [0.22, 1, 0.36, 1] as const;

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  badge: string | null;
  specs: { label: string; value: string }[];
  material: string;
  care: string;
}

const products: Product[] = [
  {
    name: "Sticker Pack",
    description: "A set of die-cut vinyl stickers featuring the Dalmatian, coffee cup, paw print, and 'Life is Good' script. Weatherproof and laptop-ready.",
    price: "$8",
    image: STICKER_PACK,
    badge: "Free with first 100 signups",
    specs: [
      { label: "Quantity", value: "6 stickers per pack" },
      { label: "Size", value: "2–3 inches each" },
      { label: "Finish", value: "Matte laminate" },
    ],
    material: "Premium vinyl with UV-resistant matte laminate coating",
    care: "Weatherproof and dishwasher safe. Apply to clean, dry surfaces.",
  },
  {
    name: "The Dad Hat",
    description: "Unstructured cotton twill cap in washed khaki with embroidered Dalmatian logo. Brass buckle closure. One size fits all.",
    price: "$32",
    image: DAD_HAT,
    badge: null,
    specs: [
      { label: "Fit", value: "Unstructured, low profile" },
      { label: "Closure", value: "Brass buckle adjustable" },
      { label: "Size", value: "One size fits all" },
    ],
    material: "100% washed cotton twill, embroidered logo",
    care: "Spot clean recommended. Hand wash cold if needed, air dry.",
  },
  {
    name: "Kinto Travel Tumbler",
    description: "12oz Kinto Travel Tumbler in khaki with engraved Dalmatian logo. Double-wall vacuum insulated stainless steel. Keeps coffee hot for 6 hours.",
    price: "$36",
    image: KINTO_TUMBLER,
    badge: "Most requested",
    specs: [
      { label: "Capacity", value: "12 oz (350ml)" },
      { label: "Insulation", value: "Double-wall vacuum" },
      { label: "Hot retention", value: "6 hours" },
      { label: "Cold retention", value: "12 hours" },
    ],
    material: "18/8 stainless steel interior, powder-coated exterior",
    care: "Hand wash only. Do not microwave or freeze.",
  },
  {
    name: "The Pocket Tee",
    description: "Relaxed-fit heavyweight cotton pocket tee in vintage cream. Embroidered Dalmatian logo on the chest pocket. The kind of shirt you reach for every morning.",
    price: "$38",
    image: POCKET_TEE,
    badge: "New",
    specs: [
      { label: "Fit", value: "Relaxed, slightly oversized" },
      { label: "Weight", value: "6.5 oz heavyweight cotton" },
      { label: "Sizes", value: "S – XXL" },
      { label: "Detail", value: "Embroidered chest pocket logo" },
    ],
    material: "100% combed ring-spun cotton, garment-dyed for a vintage wash feel",
    care: "Machine wash cold, tumble dry low. Will soften beautifully with each wash.",
  },
  {
    name: "Canvas Tote",
    description: "Heavy-weight natural cotton canvas tote with screen-printed Dalmatian logo. Perfect for the farmers market run.",
    price: "$28",
    image: TOTE_BAG,
    badge: null,
    specs: [
      { label: "Dimensions", value: '15" × 16" × 4" gusset' },
      { label: "Strap drop", value: '10" shoulder straps' },
      { label: "Weight", value: "12 oz canvas" },
    ],
    material: "100% natural heavy-weight cotton canvas, screen-printed",
    care: "Machine wash cold, tumble dry low. Print will soften with wear.",
  },
  {
    name: "Kinto Ceramic Mug",
    description: "300ml Kinto CLK-151 stoneware mug with speckled beige glaze and raw clay base. Embossed Dalmatian logo in terracotta. Microwave and dishwasher safe.",
    price: "$30",
    image: KINTO_MUG,
    badge: null,
    specs: [
      { label: "Capacity", value: "300ml (10 oz)" },
      { label: "Height", value: "3.5 inches" },
      { label: "Diameter", value: "3.25 inches" },
      { label: "Weight", value: "9.5 oz" },
    ],
    material: "Porcelain stoneware with speckled beige glaze, unglazed raw clay base",
    care: "Microwave and dishwasher safe. Oven safe to 300°F.",
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

/* ── Product Detail Modal ── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease }}
        className="relative bg-cream w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-cream/80 backdrop-blur-sm border border-espresso/10 hover:border-espresso/30 text-espresso-light/50 hover:text-espresso transition-all duration-300 rounded-full"
          aria-label="Close"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left — Large Image */}
          <div className="relative bg-warm-white">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1.5 bg-terracotta/90 font-body text-[10px] tracking-[0.15em] uppercase text-cream font-light">
                  {product.badge}
                </span>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Right — Details */}
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block px-2.5 py-1 border border-espresso/10 font-body text-[9px] tracking-[0.2em] uppercase text-espresso-light/40 font-light">
                  Coming Soon
                </span>
              </div>

              <h2 className="font-display text-2xl lg:text-3xl font-light text-espresso tracking-wide mb-2">
                {product.name}
              </h2>

              <p className="font-display text-xl font-light text-terracotta/70 tracking-wide mb-6">
                {product.price}
              </p>

              <div className="w-10 h-px bg-espresso/10 mb-6" />

              <p className="font-body text-sm text-espresso-light/60 font-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs Table */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler size={13} strokeWidth={1.5} className="text-terracotta/50" />
                  <span className="font-body text-[10px] tracking-[0.25em] uppercase text-espresso-light/40 font-medium">
                    Specifications
                  </span>
                </div>
                <div className="space-y-0">
                  {product.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between py-2.5 ${
                        i < product.specs.length - 1 ? "border-b border-espresso/[0.06]" : ""
                      }`}
                    >
                      <span className="font-body text-xs text-espresso-light/40 font-light tracking-wide">
                        {spec.label}
                      </span>
                      <span className="font-body text-xs text-espresso/80 font-light tracking-wide">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material & Care */}
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Palette size={13} strokeWidth={1.5} className="text-terracotta/50" />
                    <span className="font-body text-[10px] tracking-[0.25em] uppercase text-espresso-light/40 font-medium">
                      Material
                    </span>
                  </div>
                  <p className="font-body text-xs text-espresso-light/55 font-light leading-relaxed">
                    {product.material}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={13} strokeWidth={1.5} className="text-terracotta/50" />
                    <span className="font-body text-[10px] tracking-[0.25em] uppercase text-espresso-light/40 font-medium">
                      Care
                    </span>
                  </div>
                  <p className="font-body text-xs text-espresso-light/55 font-light leading-relaxed">
                    {product.care}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-espresso text-cream hover:bg-espresso/90 font-body text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-light"
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const el = document.getElementById("merch-notify");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
            >
              <Bell size={12} strokeWidth={1.5} />
              Notify Me When Available
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Product Card ── */
function ProductCard({
  product,
  index,
  onSelect,
}: {
  product: Product;
  index: number;
  onSelect: () => void;
}) {
  return (
    <FadeIn delay={0.1 + index * 0.1}>
      <div className="group cursor-pointer" onClick={onSelect}>
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
          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/[0.06] transition-colors duration-500 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 inline-flex items-center gap-2 px-4 py-2 bg-cream/90 backdrop-blur-sm font-body text-[10px] tracking-[0.2em] uppercase text-espresso font-light rounded-sm shadow-sm">
              <Sparkles size={11} strokeWidth={1.5} />
              View Details
            </span>
          </div>
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
          onClick={(e) => {
            e.stopPropagation();
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

      {/* ── Product Detail Modal (portaled to body to escape transform context) ── */}
      {createPortal(
        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}

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
              <span className="font-body text-sm tracking-[0.3em] uppercase text-terracotta/70 font-light">
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

      {/* ── Product Grid — staggered card entrances ── */}
      <section className="px-6 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20" staggerDelay={0.12}>
            {products.map((product) => (
              <StaggerItem key={product.name}>
                <div className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
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
                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/[0.06] transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 inline-flex items-center gap-2 px-4 py-2 bg-cream/90 backdrop-blur-sm font-body text-[10px] tracking-[0.2em] uppercase text-espresso font-light rounded-sm shadow-sm">
                        <Sparkles size={11} strokeWidth={1.5} />
                        View Details
                      </span>
                    </div>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      const el = document.getElementById("merch-notify");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <Bell size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover/btn:scale-110" />
                    Notify Me
                  </button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
