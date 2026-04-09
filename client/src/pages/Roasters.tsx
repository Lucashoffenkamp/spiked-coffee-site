/*
 * Roasters Page — Spiked Coffee
 * Design: Deep editorial partnership showcase.
 * Cormorant Garamond display, Jost Light body.
 * Lodge editorial aesthetic — warm, earthy, intentional.
 * Each roaster gets a full-spread treatment with real product imagery,
 * origin story, tasting notes, and "why we chose them."
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, MapPin, ExternalLink, Coffee, Leaf, Award, Heart, ShoppingBag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

/* ── CDN Assets ── */
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/all_roasters_station-R5yH5RqxGRscA8pLkBmfSJ.webp";

const TALA_STATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_station-SeEpqmuTDy5zieuhsxceXW.webp";
const CHROMATIC_STATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_station-XBQx3AjeA9n83PuXFjyVfd.webp";
const RUBY_STATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_station-DxjfjX9yCWJhcGHDPigNBA.webp";

const TALA_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_nobg_35789949.png";
const CHROMATIC_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_nobg_13e96922.png";
const RUBY_BAG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_creamery_clean_9b02d404.png";

const TALA_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_logo_7f6c1f39.png";
const CHROMATIC_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_logo_7679ace5.png";
const RUBY_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_logo_4d0b335f.png";

/* ── Roaster Data ── */
const roasters = [
  {
    name: "Tala",
    fullName: "Tala Coffee Roasters",
    location: "Libertyville, IL",
    founded: "2017",
    bagImage: TALA_BAG,
    logo: TALA_LOGO,
    logoBg: "bg-[#2d4a5a]",
    stationImage: TALA_STATION,
    website: "https://talacoffeeroasters.com",
    instagram: "@talacoffeeroasters",
    accentColor: "#1B4D6E",
    accentBg: "bg-[#1B4D6E]",
    featured: "Amoret Espresso Blend",
    origins: "Guatemala, Honduras & Costa Rica",
    tastingNotes: ["Semi-Sweet Chocolate", "Cream", "Almond"],
    story: "What started at a summer farmers market in Northern Illinois has grown into one of the North Shore's most beloved small-batch roasteries. Tala was born from a simple belief: that sweet, beautiful coffee should be accessible to everyone. Their team sources with care and roasts with precision, building direct relationships with farms across Central and South America.",
    whyWeChoseThem: "Tala is home. They're our neighbors in Libertyville, and they represent exactly what Spiked Coffee is about — craft without pretension, quality without gatekeeping. Their Amoret espresso blend is the kind of cup that makes you close your eyes and just be present. When we imagined what would anchor our espresso bar, Tala was the first call we made.",
    philosophy: "Sweet, beautiful coffee made accessible to all.",
  },
  {
    name: "Chromatic",
    fullName: "Chromatic Coffee Roasters",
    location: "San Jose, CA",
    founded: "2012",
    bagImage: CHROMATIC_BAG,
    logo: CHROMATIC_LOGO,
    logoBg: "bg-[#f0ebe4]",
    stationImage: CHROMATIC_STATION,
    website: "https://www.chromaticcoffee.com",
    instagram: "@chromaticcoffee",
    accentColor: "#8B4513",
    accentBg: "bg-[#8B4513]",
    featured: "Gamut Blend",
    origins: "Rotating micro-lots worldwide",
    tastingNotes: ["Stone Fruit", "Dark Chocolate", "Caramel"],
    story: "Founded in 2012 by Hiver van Geenhoven, Chromatic has spent over a decade sourcing some of the rarest and most exciting coffees on the planet. Operating from a café in San Jose's Willow Glen neighborhood that feels more like an art gallery than a coffee shop, they specialize in micro-lots, novel cultivars, and producer-direct trade from both emerging and traditional origins.",
    whyWeChoseThem: "Chromatic is the roaster that pushes us. They source coffees most people will never encounter — rare cultivars, experimental processing methods, single-farm micro-lots. Their Gamut blend is our way of bringing Silicon Valley's best-kept secret to the Midwest. When someone asks what makes Spiked Coffee different, we hand them a cup of Chromatic.",
    philosophy: "Micro-lots, novel cultivars, producer-direct trade.",
  },
  {
    name: "Ruby",
    fullName: "Ruby Coffee Roasters",
    location: "Nelsonville, WI",
    founded: "2013",
    bagImage: RUBY_BAG,
    logo: RUBY_LOGO,
    logoBg: "bg-[#7a1f2e]",
    stationImage: RUBY_STATION,
    website: "https://rubycoffeeroasters.com",
    instagram: "@rubyroasters",
    accentColor: "#9B2335",
    accentBg: "bg-[#9B2335]",
    featured: "Creamery Seasonal Blend",
    origins: "Peru, Colombia & Mexico",
    tastingNotes: ["Fig", "Almond", "Cherry", "Dark Chocolate"],
    story: "Jared and Deanna Linzmeier started Ruby in a garage in Portage County, Wisconsin — population 154. What began as a passion project in one of the most unexpected places has become one of the Midwest's most respected specialty roasters. Their café in Stevens Point is a destination, and their commitment to organic sourcing and seasonal offerings has earned them national recognition.",
    whyWeChoseThem: "Ruby proves that world-class coffee doesn't need a big-city zip code. They're roasting award-winning beans in rural Wisconsin, and that underdog spirit is exactly what resonates with us. Their Creamery blend — fig, almond, cherry, dark chocolate — is the kind of coffee that makes people stop mid-conversation and ask what they're drinking. That's the reaction we want at every Spiked Coffee counter.",
    philosophy: "Colorful coffees from the most unexpected places.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

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

/* ── Individual Roaster Spread ── */
function RoasterSpread({ roaster, index }: { roaster: typeof roasters[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="mb-0">
      {/* ── Full-width station image banner ── */}
      <FadeIn>
        <div className="relative overflow-hidden h-[50vh] lg:h-[65vh]">
          <img
            src={roaster.stationImage}
            alt={`${roaster.fullName} featured at Spiked Coffee`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/20 to-transparent" />

          {/* Roaster number overlay */}
          <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
            <span className="font-display text-6xl lg:text-8xl font-light text-cream/15 leading-none">
              0{index + 1}
            </span>
          </div>
        </div>
      </FadeIn>

      {/* ── Content section ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-20 relative z-10">
        <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-start`}>

          {/* Product bag + quick facts */}
          <FadeIn delay={0.1} className="w-full lg:w-5/12">
            <div className="bg-warm-white rounded-sm p-8 lg:p-12 shadow-sm">
              {/* Roaster Logo */}
              <div className={`flex justify-center items-center py-6 mb-6 rounded-sm ${roaster.logoBg}`}>
                <img
                  src={roaster.logo}
                  alt={`${roaster.fullName} logo`}
                  className="h-14 lg:h-16 w-auto object-contain"
                />
              </div>

              {/* Bag image */}
              <div className="flex justify-center mb-8">
                <img
                  src={roaster.bagImage}
                  alt={`${roaster.fullName} — ${roaster.featured}`}
                  className="h-[280px] lg:h-[340px] w-auto object-contain drop-shadow-md"
                />
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-espresso/10 mx-auto mb-6" />

              {/* Featured blend */}
              <div className="text-center mb-8">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-espresso-light/40 font-light mb-2">
                  Currently Featuring
                </p>
                <h4 className="font-display text-2xl font-light text-espresso tracking-wide">
                  {roaster.featured}
                </h4>
                <p className="font-body text-xs text-espresso-light/50 font-light mt-1">
                  {roaster.origins}
                </p>
              </div>

              {/* Tasting notes */}
              <div className="mb-8">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-espresso-light/40 font-light mb-3 text-center">
                  Tasting Notes
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {roaster.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1.5 border border-espresso/8 font-body text-xs text-espresso-light/60 font-light tracking-wide"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-espresso/5">
                <div className="flex items-center gap-2">
                  <MapPin size={12} strokeWidth={1.5} className="text-espresso-light/40" />
                  <span className="font-body text-xs text-espresso-light/60 font-light">{roaster.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee size={12} strokeWidth={1.5} className="text-espresso-light/40" />
                  <span className="font-body text-xs text-espresso-light/60 font-light">Est. {roaster.founded}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Story + Partnership */}
          <FadeIn delay={0.2} className="w-full lg:w-7/12 pt-4 lg:pt-24">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${roaster.accentBg}`} />
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-espresso-light/40 font-light">
                Featured Partner
              </span>
            </div>

            <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-espresso tracking-wide mb-2 leading-[1.05]">
              {roaster.fullName}
            </h3>

            <p className="font-accent text-lg lg:text-xl text-espresso-light/50 mb-10">
              "{roaster.philosophy}"
            </p>

            {/* Origin Story */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Leaf size={14} strokeWidth={1.5} className="text-forest/60" />
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-forest/60 font-light">
                  The Origin
                </span>
              </div>
              <p className="font-body text-sm lg:text-base text-espresso-light/70 font-light leading-[1.85]">
                {roaster.story}
              </p>
            </div>

            {/* Why We Chose Them */}
            <div className="mb-10 bg-espresso/[0.03] p-6 lg:p-8 border-l-2" style={{ borderColor: roaster.accentColor }}>
              <div className="flex items-center gap-3 mb-4">
                <Heart size={14} strokeWidth={1.5} className="text-terracotta/70" />
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-terracotta/70 font-light">
                  Why We Chose Them
                </span>
              </div>
              <p className="font-body text-sm lg:text-base text-espresso-light/75 font-light leading-[1.85]">
                {roaster.whyWeChoseThem}
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={roaster.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 border border-espresso/20 hover:border-espresso/50 hover:bg-espresso/[0.04] font-body text-xs tracking-[0.15em] uppercase text-espresso-light/70 hover:text-espresso transition-all duration-300 font-light group"
              >
                <ShoppingBag size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:scale-110" />
                Shop {roaster.name}
              </a>
              <a
                href={roaster.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-espresso-light/50 hover:text-terracotta transition-colors duration-300 font-light group"
              >
                Visit Website
                <ExternalLink size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-espresso-light/15">|</span>
              <span className="font-body text-xs tracking-wide text-espresso-light/40 font-light">
                {roaster.instagram}
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Spacer between roasters */}
      {index < roasters.length - 1 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="w-full h-px bg-espresso/5" />
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function Roasters() {
  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />
      <Navigation />

      {/* ── Hero Section ── */}
      <section className="relative h-[60vh] lg:h-[75vh] overflow-hidden">
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
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-light tracking-[0.1em] text-cream leading-none">
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

      {/* ── Philosophy Intro ── */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="w-12 h-px bg-espresso/10" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-espresso-light/40 font-light">
                The Spiked Standard
              </span>
              <div className="w-12 h-px bg-espresso/10" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl lg:text-5xl font-light text-espresso tracking-wide leading-[1.2] text-center mb-10">
              We don't roast our own beans.
              <br />
              <span className="font-accent text-espresso-light/60">That's by design.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="font-body text-base lg:text-lg text-espresso-light/70 font-light leading-[1.9] text-center">
                There are people who have dedicated their lives to the craft of roasting — sourcing from the right farms,
                perfecting profiles, building relationships with producers across the world. We believe in celebrating that work,
                not replicating it.
              </p>
              <p className="font-body text-base lg:text-lg text-espresso-light/70 font-light leading-[1.9] text-center">
                Every bag on our shelf is a roaster we've personally visited, a team we've sat down with, and a cup we've
                tasted dozens of times before it ever reaches your hands. This isn't wholesale. It's partnership.
              </p>
            </div>
          </FadeIn>

          {/* Partnership values */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-espresso/5">
              <div className="text-center">
                <Award size={20} strokeWidth={1.2} className="text-terracotta/60 mx-auto mb-3" />
                <h4 className="font-display text-lg font-light text-espresso tracking-wide mb-2">Quality First</h4>
                <p className="font-body text-xs text-espresso-light/50 font-light leading-relaxed">
                  Every roaster on our shelf has been vetted through blind tastings, farm visits, and long conversations about craft.
                </p>
              </div>
              <div className="text-center">
                <Heart size={20} strokeWidth={1.2} className="text-terracotta/60 mx-auto mb-3" />
                <h4 className="font-display text-lg font-light text-espresso tracking-wide mb-2">Real Relationships</h4>
                <p className="font-body text-xs text-espresso-light/50 font-light leading-relaxed">
                  We know the founders by name. We visit their roasteries. We understand their sourcing and share their values.
                </p>
              </div>
              <div className="text-center">
                <Leaf size={20} strokeWidth={1.2} className="text-terracotta/60 mx-auto mb-3" />
                <h4 className="font-display text-lg font-light text-espresso tracking-wide mb-2">Always Rotating</h4>
                <p className="font-body text-xs text-espresso-light/50 font-light leading-relaxed">
                  Our shelf evolves with the seasons. New roasters, new origins, new reasons to come back and discover something different.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Roaster Spreads ── */}
      <section className="pb-8 lg:pb-16">
        {roasters.map((roaster, index) => (
          <RoasterSpread key={roaster.name} roaster={roaster} index={index} />
        ))}
      </section>

      {/* ── Closing Philosophy ── */}
      <section className="py-24 lg:py-32 bg-espresso">
        <div className="max-w-3xl mx-auto text-center px-6">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-cream/40 font-light mb-6">
              Always Rotating
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-light text-cream tracking-wide leading-[1.2] mb-8">
              The shelf changes.
              <br />
              <span className="font-accent text-cream/60">The standard doesn't.</span>
            </h2>
            <p className="font-body text-base text-cream/50 font-light leading-[1.9] max-w-xl mx-auto mb-6">
              Our roster of roasters evolves with the seasons. We're always tasting, always searching, always
              connecting with the people behind the beans.
            </p>
            <p className="font-body text-base text-cream/50 font-light leading-[1.9] max-w-xl mx-auto mb-12">
              If you're a roaster who shares our values — or a coffee
              lover who knows one — we'd love to hear from you.
            </p>
            <a
              href="/#signup"
              className="inline-block border border-cream/20 px-10 py-3.5 font-body text-xs tracking-[0.2em] uppercase text-cream/70 hover:text-cream hover:border-cream/40 transition-all duration-300 font-light"
            >
              Become a Partner
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Back to Home ── */}
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
