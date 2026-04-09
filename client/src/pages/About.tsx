/*
 * About Page — Spiked Coffee
 * Design: Personal, editorial storytelling about Lucas and Dylan.
 * Warm, human, forward-looking. Cream palette with lifestyle imagery.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";
const SPIKE_REAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/spike_real_bbac0cff.jpg";
const MORNING_RITUAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/about_morning_ritual-9C6iDbb8kCcJ9vk3crD9GW.webp";
const EVENING_GATHERING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/about_evening_gathering-bTSzAskH4RcEdKjazJJ9yJ.webp";
const BROTHERS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/brothers_real_93cd2b18.jpeg";

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

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      {/* Hero — Brothers Photo */}
      <section className="relative pt-20 lg:pt-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden">
              <img
                src={BROTHERS}
                alt="Lucas and Dylan — founders of Spiked Coffee"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
            </div>
          </FadeIn>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center -mt-20 lg:-mt-28 pb-16 lg:pb-20">
          <FadeIn delay={0.1}>
            <div className="w-12 h-px bg-terracotta mx-auto mb-8" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-light text-espresso tracking-wide leading-[1.1]">
              Our Story
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-body text-sm lg:text-base text-espresso-light/60 mt-6 tracking-wide font-light max-w-lg mx-auto">
              Two brothers. One Dalmatian. A belief that the best things in life
              are built around a good cup.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Beginning */}
      <section className="bg-warm-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="relative">
                <img
                  src={MORNING_RITUAL}
                  alt="Morning coffee ritual"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <p className="font-body text-[11px] tracking-[0.3em] uppercase text-espresso-light/50 mb-6 font-light">
                  Where It Started
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide leading-[1.2] mb-6">
                  It started with Folgers.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-5 font-body text-sm lg:text-base text-espresso-light/70 font-light leading-relaxed">
                  <p>
                    Growing up, the first thing we'd hear every morning was the coffee maker.
                    Our dad's Folgers Breakfast Blend — nothing fancy, just consistent. We'd
                    take turns preparing the pot. It was never about the coffee itself. It was
                    about the ritual. The gathering. The start of something.
                  </p>
                  <p>
                    That ritual stuck. As we grew up and moved on — Lucas to the Chicago
                    suburbs, Dylan to Denver — coffee became the thread that kept us connected.
                    A phone call over a morning pour-over. A new roaster discovered on a trip.
                    A bag shipped across state lines with a note that just said "try this."
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="w-12 h-px bg-terracotta mb-10" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide leading-[1.2] mb-8">
              From local shops to micro-roasters around the world.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-5 font-body text-sm lg:text-base text-espresso-light/70 font-light leading-relaxed">
              <p>
                We started supporting local coffee shops wherever we went. Farmers markets
                on Saturday mornings. The tiny roaster tucked behind a bookstore. When we
                traveled — whether across the country or across the world — we'd seek out
                the small craft micro-roasters that most people walk right past.
              </p>
              <p>
                We learned that the best coffee doesn't come from the biggest names. It comes
                from people who care deeply about what they do. People who know the farmer,
                who roast in small batches, who'd rather make something excellent than something
                scalable.
              </p>
              <p>
                That's the standard we want to bring to everything we serve.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Meet Spike */}
      <section className="bg-warm-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <FadeIn delay={0.1}>
                <p className="font-body text-[11px] tracking-[0.3em] uppercase text-espresso-light/50 mb-6 font-light">
                  The Namesake
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide leading-[1.2] mb-6">
                  Meet Spike.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-5 font-body text-sm lg:text-base text-espresso-light/70 font-light leading-relaxed">
                  <p>
                    This is Spike — Dylan and Anna's Dalmatian, and the very good boy behind
                    the name. He's the heart of the brand, the unofficial greeter at every
                    pop-up, and the reason our logo has spots.
                  </p>
                  <p>
                    The original Spike was our dad's best companion — a Dalmatian who was
                    part of the family long before we came along. That legacy lives on.
                    Today's Spike carries the same name, the same spirit, and the same
                    ability to make everyone around him smile.
                  </p>
                  <p>
                    The name "Spiked Coffee" is a nod to all of it — the family history, the
                    Dalmatian lineage, and the dual nature of what we're building. One name,
                    multiple meanings, all of them intentional.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="mt-8 inline-flex items-center gap-3 bg-cream/80 px-5 py-3 border border-espresso/5">
                  <img src={DALMATIAN_ICON} alt="" className="w-6 h-6 object-contain" />
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-espresso-light/50 font-light">
                    Chief Tasting Officer
                  </span>
                </div>
              </FadeIn>
            </div>
            <FadeIn className="order-1 lg:order-2">
              <div className="relative overflow-hidden">
                <img
                  src={SPIKE_REAL}
                  alt="Spike — Dylan and Anna's Dalmatian, the namesake of Spiked Coffee"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-warm-white/60 to-transparent h-24" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="relative">
                <img
                  src={EVENING_GATHERING}
                  alt="Evening at Spiked Coffee"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <p className="font-body text-[11px] tracking-[0.3em] uppercase text-warm-white/30 mb-6 font-light">
                  What We're Building
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-display text-3xl lg:text-4xl font-light text-warm-white tracking-wide leading-[1.2] mb-6">
                  More than a coffee shop.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-5 font-body text-sm lg:text-base text-warm-white/50 font-light leading-relaxed">
                  <p>
                    We believe coffee doesn't signal wealth or status — it's something enjoyed
                    by everyone. It's the great equalizer. A reason to sit down, slow down,
                    and connect with whoever's across the table.
                  </p>
                  <p>
                    Spiked Coffee is our way of building something that lasts. A place where
                    the morning pour-over crowd and the evening craft beer crowd are the same
                    community. Where every roaster on the shelf has a story, and every pour
                    is chosen with care.
                  </p>
                  <p>
                    We're not trying to be the biggest. We're trying to be the one you remember.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-8 h-px bg-terracotta" />
                  <p className="font-accent text-lg text-warm-white/70">
                    Lucas & Dylan
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-terracotta mx-auto mb-8" />
              <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide">
                What We Believe
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Craft Over Scale",
                text: "We'd rather serve one exceptional cup than a thousand mediocre ones. Every roaster we feature, every beer we pour — chosen because it's the best, not the cheapest.",
              },
              {
                title: "Community First",
                text: "Coffee has always been about gathering. We're building a space where strangers become regulars and regulars become friends.",
              },
              {
                title: "Legacy Forward",
                text: "This started with a family ritual and a Dalmatian named Spike. We're building something we can pass on — not just a business, but a tradition.",
              },
              {
                title: "Life Is Good",
                text: "We believe in optimism. In building something with your hands. In the idea that the best things ahead of us are worth working for.",
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="bg-warm-white p-8 border border-espresso/5">
                  <h3 className="font-display text-xl font-light text-espresso mb-3 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-espresso-light/60 font-light leading-relaxed">
                    {value.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
