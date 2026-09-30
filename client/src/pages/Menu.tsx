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

const DALMATIAN_ICON = "/assets/dalmatian-dark.png";
const MENU_COFFEE_HERO = "/assets/menu_hero_coffee.jpg";
const EVENING_GATHERING = "/assets/about_evening_gathering.jpg";

// Beacon Doughnuts assets
const BEACON_LOGO = "/assets/beacon_logo.png";
const BEACON_GLAZED = "/assets/beacon_glazed.jpg";
const BEACON_CRUMB = "/assets/beacon_crumb.jpg";
const BEACON_POWDERED = "/assets/beacon_powdered.jpg";
const BEACON_CHOCOLATE = "/assets/beacon_chocolate.jpg";

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
      { name: "Espresso", description: "Double shot, rotating single-origin. This week: Tala's Amoret — Guatemala, dark chocolate & fig", price: "4" },
      { name: "Cortado", description: "Equal parts espresso and Kilgus Farmstead whole milk from Fairbury, IL. Balanced, honest, no hiding", price: "5" },
      { name: "Flat White", description: "Double ristretto, velvety Kilgus microfoam. The way they drink it in Melbourne — strong, smooth, no fuss", price: "5.50" },
      { name: "Latte", description: "Silky Kilgus Farmstead milk steamed over a double shot. Simple done right. Oat, almond, or coconut available", price: "5.50", tag: "Popular" },
      { name: "Cappuccino", description: "Traditional thirds — espresso, steamed Kilgus milk, dense microfoam. Dusted with Saigon cinnamon", price: "5.50" },
      { name: "Americano", description: "Espresso lengthened with filtered water. Clean, bright, lets the roaster's work speak", price: "4.50" },
    ],
  },
  {
    category: "Brewed",
    items: [
      { name: "Pour Over", description: "Single cup Chemex, featured roaster of the week. Hand-poured, timed bloom, no shortcuts", price: "5.50", tag: "Signature" },
      { name: "Batch Brew", description: "House blend by Chromatic Coffee, brewed fresh every 45 minutes. Never sitting, never stale", price: "3.50" },
      { name: "Cold Brew", description: "Coarse-ground Ruby beans steeped 24 hours in cold filtered water. Smooth, chocolatey, zero bitterness", price: "5" },
      { name: "Nitro Cold Brew", description: "Our cold brew infused with nitrogen on tap. Cascading, creamy, no dairy needed", price: "6" },
    ],
  },
  {
    category: "Specialty",
    items: [
      { name: "Lavender Honey Latte", description: "Lake County wildflower honey, house-dried culinary lavender, Kilgus milk or Oatly oat", price: "6.50" },
      { name: "Brown Sugar Shaken Espresso", description: "Double shot shaken with Demerara brown sugar and vanilla bean, poured over Oatly oat milk", price: "6" },
      { name: "Matcha Latte", description: "Ceremonial-grade Ippodo matcha from Kyoto, whisked to order with your choice of milk", price: "6" },
      { name: "Chai Latte", description: "House-spiced concentrate — cardamom, clove, black pepper, Ceylon cinnamon — simmered with local honey", price: "5.50" },
    ],
  },
  {
    category: "Spiked Signatures",
    items: [
      { name: "The Spike", description: "Cookies & cream latte — espresso, Kilgus cream, crushed Oreos, Kakao Chocolate Works dark drizzle. Named after the very good boy 🐾", price: "7", tag: "Signature" },
      { name: "Lavender Honey", description: "House-made lavender syrup, Lake County wildflower honey, Oatly oat milk, double espresso", price: "6.50", tag: "Seasonal" },
    ],
  },
  {
    category: "Pastries & Bites — feat. Beacon Doughnuts",
    items: [
      { name: "Beacon Glazed", description: "Classic raised glaze from Beacon Doughnuts, Chicago. Pillowy, golden, perfectly simple. The one that started it all", price: "4.50", tag: "Beacon" },
      { name: "Beacon Crumb Cake", description: "Brown butter crumb with vanilla bean glaze. Dense, cakey, absurdly good with a cortado", price: "5", tag: "Popular" },
      { name: "Beacon Chocolate Old Fashioned", description: "Rich dark chocolate cake donut, crackled glaze. Pairs with our cold brew like it was meant to", price: "5" },
      { name: "Beacon Powdered Bomboloni", description: "Italian-style filled doughnuts dusted in powdered sugar. Rotating cream fillings — ask your barista", price: "5.50", tag: "Seasonal" },
      { name: "Almond Croissant", description: "European-style butter croissant with house almond frangipane, toasted almonds, powdered sugar", price: "4.50" },
      { name: "Granola Bowl", description: "House-made granola with local honey, Kilgus yogurt, and seasonal fruit from Prairie Crossing Farm", price: "7" },
    ],
  },
];

const eveningMenu: { category: string; items: MenuItem[] }[] = [
  {
    category: "Draft Beer",
    items: [
      { name: "Rotating IPA", description: "This week: Half Acre Daisy Cutter — Chicago-brewed, piney, citrus-forward. Changes weekly", price: "8", tag: "Rotating" },
      { name: "Session Lager", description: "Metropolitan Krankshaft Kölsch from Rockford, IL. Clean, crisp, dangerously easy drinking", price: "7" },
      { name: "Hazy Pale Ale", description: "Mikerphone Smells Like a Safety Meeting — juicy, tropical, pillowy soft. Elk Grove Village, IL", price: "8" },
      { name: "Stout", description: "Revolution Brewing Eugene Porter — chocolate, toffee, coffee undertones. Ask your barista for the current rotation", price: "8" },
    ],
  },
  {
    category: "Wine",
    items: [
      { name: "House Red", description: "Rotating natural selection. This week: Les Lunes Carignan — biodynamic, Mendocino County, dark fruit & earth", price: "10" },
      { name: "House White", description: "Rotating natural selection. This week: Broc Cellars Love White — Mendocino blend, citrus & stone fruit, unfiltered", price: "10" },
      { name: "Rosé", description: "Scribe Winery, Sonoma — dry, mineral-driven, Provençal style. Served slightly chilled", price: "11" },
      { name: "Orange Wine", description: "Pheasant's Tears Rkatsiteli — Georgian skin-contact, amber, honeyed, wildly complex", price: "13", tag: "Adventurous" },
    ],
  },
  {
    category: "Non-Alcoholic",
    items: [
      { name: "NA Craft Beer", description: "Athletic Brewing Run Wild IPA — brewed in CT, full-flavored, zero compromise. 70 calories", price: "6" },
      { name: "Sparkling Water", description: "Topo Chico mineral water from Monterrey, Mexico. The only sparkling water that matters", price: "3" },
      { name: "Kombucha", description: "NessAlla Kombucha from Madison, WI — small-batch, rotating seasonal flavors, naturally effervescent", price: "6" },
    ],
  },
  {
    category: "Evening Bites",
    items: [
      { name: "Cheese Board", description: "Prairie Fruits Farm chèvre, Marieke Gouda, Lake County honeycomb, marcona almonds, seasonal fruit", price: "14", tag: "Shareable" },
      { name: "Charcuterie", description: "Smoking Goose sopressata & coppa from Indianapolis, house pickles, whole grain mustard, grilled bread", price: "16" },
      { name: "Mixed Olives", description: "Castelvetrano & Kalamata, warmed with rosemary, chili flake, and cold-pressed olive oil", price: "6" },
      { name: "Hummus & Flatbread", description: "House-made with tahini from Soom Foods, Urfa biber, za'atar, extra virgin olive oil, warm flatbread", price: "8" },
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

          {/* Beacon Doughnuts Spotlight — daytime only */}
          {activeTab === "day" && (
            <FadeIn delay={0.2}>
              <div className="mt-16 mb-8">
                <div className="relative bg-cream rounded-xl overflow-hidden border border-espresso/5">
                  {/* Header with logo */}
                  <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#7c3aed] flex items-center justify-center p-1.5 shadow-md">
                      <img src={BEACON_LOGO} alt="Beacon Doughnuts" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-espresso font-light">Beacon Doughnuts</h3>
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-espresso-light/50 font-light">Chicago, IL &middot; Our Pastry Partner</p>
                    </div>
                  </div>
                  <p className="px-6 pb-4 font-body text-sm text-espresso-light/60 font-light leading-relaxed max-w-2xl">
                    Hand-crafted small-batch doughnuts from one of Chicago's best. Every donut delivered fresh for each pop-up — glazed, crumbed, filled, and frosted with real ingredients and zero shortcuts.
                  </p>
                  {/* Photo grid */}
                  <div className="grid grid-cols-4 gap-1 px-1 pb-1">
                    <div className="aspect-square overflow-hidden rounded-bl-lg">
                      <img src={BEACON_GLAZED} alt="Beacon glazed donut" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square overflow-hidden">
                      <img src={BEACON_CRUMB} alt="Beacon crumb cake donut" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square overflow-hidden">
                      <img src={BEACON_POWDERED} alt="Beacon powdered bomboloni" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square overflow-hidden rounded-br-lg">
                      <img src={BEACON_CHOCOLATE} alt="Beacon chocolate old fashioned" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Disclaimer */}
          <FadeIn delay={0.3}>
            <div className={`mt-16 pt-8 border-t ${
              activeTab === "evening" ? "border-warm-white/10" : "border-espresso/10"
            }`}>
              <p className={`font-body text-xs font-light tracking-wide text-center ${
                activeTab === "evening" ? "text-warm-white/30" : "text-espresso-light/40"
              }`}>
                {activeTab === "day"
                  ? "All milk from Kilgus Farmstead, Fairbury IL. Oat (Oatly), almond, and coconut milk available (+$0.75). Honey sourced from Lake County apiaries. Roasters and seasonal specials rotate — ask your barista what's new."
                  : "Draft selections rotate weekly — all from independent Midwest breweries. Wine sourced from natural, biodynamic, and small-production winemakers. Cheeses and charcuterie from regional farms and artisan producers. Must be 21+ for alcohol service after 5 PM."
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
