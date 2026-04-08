/*
 * Menu Page — Spiked Coffee
 * Design: Editorial split — coffee on the left (cream), evening on the right (charcoal).
 * Cormorant Garamond display, Jost Light body. Thin rules as dividers.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Coffee, Wine, Sun, Moon } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";
const MENU_COFFEE_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/menu_hero_coffee-f6vyGFntTM2wPo7YfSeuEc.webp";
const EVENING_GATHERING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/about_evening_gathering-bTSzAskH4RcEdKjazJJ9yJ.webp";

const ease = [0.22, 1, 0.36, 1] as const;

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

const coffeeMenu: { category: string; items: MenuItem[] }[] = [
  {
    category: "Espresso",
    items: [
      { name: "Espresso", description: "Double shot, rotating single origin", price: "4" },
      { name: "Cortado", description: "Equal parts espresso and steamed milk", price: "5" },
      { name: "Flat White", description: "Velvety microfoam, double ristretto", price: "5.50" },
      { name: "Latte", description: "Espresso with steamed milk, light foam", price: "5.50", tag: "Popular" },
      { name: "Cappuccino", description: "Traditional thirds — espresso, milk, foam", price: "5.50" },
      { name: "Americano", description: "Espresso lengthened with hot water", price: "4.50" },
    ],
  },
  {
    category: "Brewed",
    items: [
      { name: "Pour Over", description: "Single cup, featured roaster of the week", price: "5.50", tag: "Signature" },
      { name: "Batch Brew", description: "House blend, always fresh", price: "3.50" },
      { name: "Cold Brew", description: "24-hour steeped, smooth and bold", price: "5" },
      { name: "Nitro Cold Brew", description: "Cascading, creamy, on tap", price: "6" },
    ],
  },
  {
    category: "Specialty",
    items: [
      { name: "Lavender Honey Latte", description: "Local honey, dried lavender, oat milk", price: "6.50" },
      { name: "Brown Sugar Shaken Espresso", description: "Double shot, brown sugar, oat milk", price: "6" },
      { name: "Matcha Latte", description: "Ceremonial grade, steamed milk", price: "6" },
      { name: "Chai Latte", description: "House-spiced concentrate, steamed milk", price: "5.50" },
    ],
  },
  {
    category: "Spiked Signatures",
    items: [
      { name: "The Spot", description: "Cookies & cream latte — espresso, cream, crushed cookies, chocolate drizzle", price: "7", tag: "Signature" },
      { name: "Lavender Honey", description: "House-made lavender syrup, local honey, oat milk, espresso", price: "6.50", tag: "Seasonal" },
    ],
  },
  {
    category: "Pastries & Bites",
    items: [
      { name: "Local Craft Donut", description: "Rotating selection, sourced daily", price: "4", tag: "Local" },
      { name: "Almond Croissant", description: "Butter croissant, almond frangipane", price: "4.50" },
      { name: "Banana Bread", description: "House recipe, toasted with butter", price: "3.50" },
      { name: "Granola Bowl", description: "House granola, yogurt, seasonal fruit", price: "7" },
    ],
  },
];

const eveningMenu: { category: string; items: MenuItem[] }[] = [
  {
    category: "Draft Beer",
    items: [
      { name: "Rotating IPA", description: "Local craft, changes weekly", price: "8", tag: "Rotating" },
      { name: "Session Lager", description: "Clean, crisp, easy drinking", price: "7" },
      { name: "Hazy Pale Ale", description: "Juicy, tropical, low bitterness", price: "8" },
      { name: "Stout", description: "Chocolate, coffee notes — ask your barista", price: "8" },
    ],
  },
  {
    category: "Wine",
    items: [
      { name: "House Red", description: "Rotating natural wine selection", price: "10" },
      { name: "House White", description: "Rotating natural wine selection", price: "10" },
      { name: "Ros\u00e9", description: "Dry, crisp, seasonal pick", price: "11" },
      { name: "Orange Wine", description: "Skin-contact, funky and complex", price: "13", tag: "Adventurous" },
    ],
  },
  {
    category: "Non-Alcoholic",
    items: [
      { name: "NA Craft Beer", description: "Athletic Brewing or similar", price: "6" },
      { name: "Sparkling Water", description: "Topo Chico or local equivalent", price: "3" },
      { name: "Kombucha", description: "Local craft, rotating flavors", price: "6" },
    ],
  },
  {
    category: "Evening Bites",
    items: [
      { name: "Cheese Board", description: "Local cheeses, crackers, honey, fruit", price: "14", tag: "Shareable" },
      { name: "Charcuterie", description: "Cured meats, pickles, mustard, bread", price: "16" },
      { name: "Mixed Olives", description: "Marinated, warm, herbs", price: "6" },
      { name: "Hummus & Flatbread", description: "House-made, olive oil, za'atar", price: "8" },
    ],
  },
];

function MenuSection({ category, items, isDark = false, delay = 0 }: { category: string; items: MenuItem[]; isDark?: boolean; delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="mb-12 last:mb-0">
        <h3 className={`font-body text-[11px] tracking-[0.3em] uppercase mb-6 font-light ${isDark ? "text-warm-white/40" : "text-espresso-light/50"}`}>
          {category}
        </h3>
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.name} id={slugify(item.name)} className="group transition-all duration-500 rounded-sm px-2 -mx-2 py-1 -my-1">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h4 className={`font-display text-lg lg:text-xl font-light ${isDark ? "text-warm-white" : "text-espresso"}`}>
                    {item.name}
                  </h4>
                  {item.tag && (
                    <span className={`font-body text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 font-light ${
                      isDark
                        ? "bg-warm-white/10 text-warm-white/50"
                        : "bg-terracotta/10 text-terracotta"
                    }`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className={`flex-shrink-0 font-display text-base font-light ${isDark ? "text-warm-white/60" : "text-espresso-light/60"}`}>
                  {item.price}
                </div>
              </div>
              <p className={`font-body text-sm font-light mt-1 ${isDark ? "text-warm-white/40" : "text-espresso-light/50"}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<"day" | "evening">("day");

  // Scroll to anchor on mount (from homepage drink cards)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // Small delay to let the page render
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Briefly highlight the item
        el.classList.add("ring-2", "ring-terracotta/30", "bg-terracotta/5");
        setTimeout(() => el.classList.remove("ring-2", "ring-terracotta/30", "bg-terracotta/5"), 2000);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-20 bg-cream overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] opacity-[0.02] pointer-events-none">
          <img src={DALMATIAN_ICON} alt="" className="w-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-12 h-px bg-terracotta mx-auto mb-8" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-light text-espresso tracking-wide leading-[1.1]">
              The Menu
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-sm lg:text-base text-espresso-light/60 mt-6 tracking-wide font-light max-w-lg mx-auto">
              Craft coffee from sunrise to sunset. Fine beer and wine when the lights go low.
              Every item sourced with intention.
            </p>
          </FadeIn>

          {/* Day / Evening Toggle */}
          <FadeIn delay={0.3}>
            <div className="flex items-center justify-center gap-1 mt-10 bg-warm-white p-1 mx-auto w-fit">
              <button
                onClick={() => setActiveTab("day")}
                className={`flex items-center gap-2 px-6 py-3 font-body text-xs tracking-[0.15em] uppercase font-light transition-all duration-500 ${
                  activeTab === "day"
                    ? "bg-espresso text-cream"
                    : "text-espresso-light/50 hover:text-espresso"
                }`}
              >
                <Sun size={14} strokeWidth={1.5} />
                Daytime
              </button>
              <button
                onClick={() => setActiveTab("evening")}
                className={`flex items-center gap-2 px-6 py-3 font-body text-xs tracking-[0.15em] uppercase font-light transition-all duration-500 ${
                  activeTab === "evening"
                    ? "bg-charcoal text-cream"
                    : "text-espresso-light/50 hover:text-espresso"
                }`}
              >
                <Moon size={14} strokeWidth={1.5} />
                Evening
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Menu Content */}
      <motion.section
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className={`relative py-16 lg:py-24 transition-colors duration-700 ${
          activeTab === "evening" ? "bg-charcoal" : "bg-warm-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {/* Atmospheric image */}
          <FadeIn>
            <div className="relative w-full h-48 lg:h-72 mb-16 overflow-hidden">
              <img
                src={activeTab === "day" ? MENU_COFFEE_HERO : EVENING_GATHERING}
                alt={activeTab === "day" ? "Spiked Coffee daytime interior" : "Spiked Coffee evening interior"}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${
                activeTab === "evening"
                  ? "bg-gradient-to-t from-charcoal/60 to-transparent"
                  : "bg-gradient-to-t from-warm-white/40 to-transparent"
              }`} />
            </div>
          </FadeIn>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {(activeTab === "day" ? coffeeMenu : eveningMenu).map((section, i) => (
              <MenuSection
                key={section.category}
                category={section.category}
                items={section.items}
                isDark={activeTab === "evening"}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <FadeIn delay={0.3}>
            <div className={`mt-16 pt-8 border-t ${
              activeTab === "evening" ? "border-warm-white/10" : "border-espresso/10"
            }`}>
              <p className={`font-body text-xs font-light tracking-wide text-center ${
                activeTab === "evening" ? "text-warm-white/30" : "text-espresso-light/40"
              }`}>
                {activeTab === "day"
                  ? "Prices are approximate. Featured roasters and seasonal specials rotate regularly. Oat, almond, and coconut milk available (+$0.75)."
                  : "Prices are approximate. Draft selections rotate weekly. All beer and wine sourced from independent craft producers. Must be 21+ for alcohol service after 5pm."
                }
              </p>
            </div>
          </FadeIn>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
