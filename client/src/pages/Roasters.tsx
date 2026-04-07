/*
 * Roasters Page — Spiked Coffee
 * Design: Editorial showcase of featured micro-roasters.
 * Cormorant Garamond display, Jost Light body.
 * Lodge editorial aesthetic — warm, earthy, intentional.
 */
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/all_roasters_station-R5yH5RqxGRscA8pLkBmfSJ.webp";

const roasters = [
  {
    name: "Tala",
    fullName: "Tala Coffee Roasters",
    location: "Libertyville, IL",
    founded: "2017",
    philosophy: "Sweet, beautiful coffee made accessible to all. What started at a summer farmers market in Northern Illinois has grown into a beloved small-batch roastery with cafés across the North Shore. Tala sources with care and roasts with precision — every bag is an invitation to slow down.",
    signature: "Known for approachable, clean-tasting single origins and seasonal blends that highlight sweetness and balance.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_station-SeEpqmuTDy5zieuhsxceXW.webp",
    website: "https://talacoffeeroasters.com",
    accent: "bg-[#C4A882]",
  },
  {
    name: "Chromatic",
    fullName: "Chromatic Coffee Roasters",
    location: "San Jose, CA",
    founded: "2012",
    philosophy: "Micro-lots, novel cultivars, and producer-direct trade from emerging and traditional origins. Founded by Hiver van Geenhoven, Chromatic has spent over a decade sourcing some of the rarest and most exciting coffees on the planet — from a café that feels more like an art gallery than a coffee shop.",
    signature: "Specialized in rare micro-lots, experimental processing methods, and direct relationships with producers worldwide. Winner of Metro's 'Best Coffee Roaster' in Silicon Valley.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_station-XBQx3AjeA9n83PuXFjyVfd.webp",
    website: "https://www.chromaticcoffee.com",
    accent: "bg-[#8B4513]",
  },
  {
    name: "Ruby",
    fullName: "Ruby Coffee Roasters",
    location: "Nelsonville, WI",
    founded: "2013",
    philosophy: "Colorful coffees roasted in rural Wisconsin. Jared and Deanna Linzmeier started Ruby in a garage in Portage County — population 154. What began as a passion project has become one of the Midwest's most respected specialty roasters, proving that world-class coffee can come from the most unexpected places.",
    signature: "Award-winning seasonal offerings, organic sourcing from caring producers, and their beloved Creamery Blend. Their café in Stevens Point is a destination.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_station-DxjfjX9yCWJhcGHDPigNBA.webp",
    website: "https://rubycoffeeroasters.com",
    accent: "bg-[#9B2335]",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Roasters() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Our Featured Roasters station"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/40 to-espresso/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="text-center"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-cream/60 font-light mb-4">
              Curated with intention
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-[0.1em] text-cream leading-none">
              Our Roasters
            </h1>
            <div className="flex items-center gap-6 mt-6 justify-center">
              <div className="w-12 lg:w-20 h-px bg-cream/20" />
              <p className="font-body text-xs tracking-[0.25em] uppercase text-cream/50 font-light">
                Small Batch &middot; Craft Sourced &middot; Always Rotating
              </p>
              <div className="w-12 lg:w-20 h-px bg-cream/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-espresso-light/50 font-light mb-6">
              The Spiked Standard
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide leading-relaxed mb-8">
              We don't roast our own beans. That's by design.
            </h2>
            <p className="font-body text-base lg:text-lg text-espresso-light/70 font-light leading-relaxed max-w-2xl mx-auto">
              There are people who have dedicated their lives to the craft of roasting — sourcing from the right farms, 
              perfecting profiles, building relationships with producers across the world. We believe in celebrating that work, 
              not replicating it. Every bag on our shelf is a roaster we believe in, a story worth sharing, and a cup worth savoring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roaster Cards */}
      <section className="pb-20 lg:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {roasters.map((roaster, index) => (
            <motion.div
              key={roaster.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16 items-center mb-24 lg:mb-32 last:mb-0`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-sm group">
                  <img
                    src={roaster.image}
                    alt={`${roaster.fullName} featured at Spiked Coffee`}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Accent bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${roaster.accent}`} />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-2 h-2 rounded-full ${roaster.accent}`} />
                  <span className="font-body text-[11px] tracking-[0.25em] uppercase text-espresso-light/50 font-light">
                    Featured Roaster
                  </span>
                </div>

                <h3 className="font-display text-4xl lg:text-5xl font-light text-espresso tracking-wide mb-2">
                  {roaster.name}
                </h3>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1.5 text-espresso-light/50">
                    <MapPin size={12} strokeWidth={1.5} />
                    <span className="font-body text-xs tracking-wide font-light">
                      {roaster.location}
                    </span>
                  </div>
                  <span className="text-espresso-light/20 text-xs">&middot;</span>
                  <span className="font-body text-xs tracking-wide font-light text-espresso-light/50">
                    Est. {roaster.founded}
                  </span>
                </div>

                <p className="font-body text-sm lg:text-base text-espresso-light/70 font-light leading-relaxed mb-6">
                  {roaster.philosophy}
                </p>

                <div className="border-l border-espresso/10 pl-5 mb-8">
                  <p className="font-accent text-sm lg:text-base text-espresso-light/60 italic leading-relaxed">
                    {roaster.signature}
                  </p>
                </div>

                <a
                  href={roaster.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-espresso-light/60 hover:text-terracotta transition-colors duration-300 font-light group"
                >
                  Visit {roaster.name}
                  <ExternalLink size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Closing */}
      <section className="py-20 lg:py-28 bg-espresso">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-cream/40 font-light mb-6">
              Always Rotating
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-light text-cream tracking-wide leading-relaxed mb-8">
              The shelf changes. The standard doesn't.
            </h2>
            <p className="font-body text-base text-cream/50 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Our roster of roasters evolves with the seasons. We're always tasting, always searching, always 
              connecting with the people behind the beans. If you're a roaster who shares our values — or a coffee 
              lover who knows one — we'd love to hear from you.
            </p>
            <a
              href="/#signup"
              className="inline-block border border-cream/20 px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-cream/70 hover:text-cream hover:border-cream/40 transition-all duration-300 font-light"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 bg-cream border-t border-espresso/5">
        <div className="max-w-6xl mx-auto px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-espresso-light/50 hover:text-espresso transition-colors duration-300 font-light group"
          >
            <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
