/*
 * NominateRoaster Page — Spiked Coffee
 * Design: Community-driven roaster sourcing form. Clean editorial layout.
 * Users can suggest their favorite micro-roasters for consideration.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check, Coffee } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";

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

export default function NominateRoaster() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    roasterName: "",
    location: "",
    website: "",
    whyLoveThem: "",
    yourName: "",
    yourEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.roasterName.trim() && formData.whyLoveThem.trim()) {
      setSubmitted(true);
    }
  };

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
              Nominate a Roaster
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-sm lg:text-base text-espresso-light/60 mt-6 tracking-wide font-light max-w-lg mx-auto">
              Know a craft micro-roaster we should feature? We're always looking for
              the next great partnership — and the best leads come from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-warm-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          {!submitted ? (
            <>
              <FadeIn>
                <div className="mb-12">
                  <h2 className="font-display text-2xl lg:text-3xl font-light text-espresso tracking-wide mb-4">
                    Tell us about them.
                  </h2>
                  <p className="font-body text-sm text-espresso-light/50 font-light leading-relaxed">
                    We look for small-batch roasters who care about sourcing, quality, and craft.
                    If you've found someone special, we want to hear about it.
                  </p>
                </div>
              </FadeIn>

              <form onSubmit={handleSubmit} className="space-y-8">
                <FadeIn delay={0.1}>
                  <div>
                    <label className="font-body text-[11px] tracking-[0.2em] uppercase text-espresso-light/50 font-light mb-2 block">
                      Roaster Name *
                    </label>
                    <input
                      type="text"
                      name="roasterName"
                      value={formData.roasterName}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Onyx Coffee Lab"
                      className="w-full px-5 py-3.5 bg-cream border border-espresso/10 font-body text-sm font-light text-espresso placeholder:text-espresso/25 focus:outline-none focus:border-terracotta/40 transition-colors"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <div>
                    <label className="font-body text-[11px] tracking-[0.2em] uppercase text-espresso-light/50 font-light mb-2 block">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State or Country"
                      className="w-full px-5 py-3.5 bg-cream border border-espresso/10 font-body text-sm font-light text-espresso placeholder:text-espresso/25 focus:outline-none focus:border-terracotta/40 transition-colors"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div>
                    <label className="font-body text-[11px] tracking-[0.2em] uppercase text-espresso-light/50 font-light mb-2 block">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://"
                      className="w-full px-5 py-3.5 bg-cream border border-espresso/10 font-body text-sm font-light text-espresso placeholder:text-espresso/25 focus:outline-none focus:border-terracotta/40 transition-colors"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.25}>
                  <div>
                    <label className="font-body text-[11px] tracking-[0.2em] uppercase text-espresso-light/50 font-light mb-2 block">
                      Why do you love them? *
                    </label>
                    <textarea
                      name="whyLoveThem"
                      value={formData.whyLoveThem}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="What makes their coffee special? A favorite blend? A story worth sharing?"
                      className="w-full px-5 py-3.5 bg-cream border border-espresso/10 font-body text-sm font-light text-espresso placeholder:text-espresso/25 focus:outline-none focus:border-terracotta/40 transition-colors resize-none"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="pt-4 border-t border-espresso/5">
                    <p className="font-body text-[11px] tracking-[0.2em] uppercase text-espresso-light/30 font-light mb-6">
                      Your Info (Optional)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="font-body text-[11px] tracking-[0.2em] uppercase text-espresso-light/50 font-light mb-2 block">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="yourName"
                          value={formData.yourName}
                          onChange={handleChange}
                          placeholder="First name"
                          className="w-full px-5 py-3.5 bg-cream border border-espresso/10 font-body text-sm font-light text-espresso placeholder:text-espresso/25 focus:outline-none focus:border-terracotta/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-body text-[11px] tracking-[0.2em] uppercase text-espresso-light/50 font-light mb-2 block">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="yourEmail"
                          value={formData.yourEmail}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className="w-full px-5 py-3.5 bg-cream border border-espresso/10 font-body text-sm font-light text-espresso placeholder:text-espresso/25 focus:outline-none focus:border-terracotta/40 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.35}>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-espresso text-cream font-body text-sm tracking-[0.15em] uppercase font-light hover:bg-espresso-light transition-colors duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Nomination</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </FadeIn>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-forest/10 flex items-center justify-center">
                <Coffee size={24} className="text-forest" />
              </div>
              <h2 className="font-display text-3xl font-light text-espresso mb-4 tracking-wide">
                Nomination received.
              </h2>
              <p className="font-body text-sm text-espresso-light/60 font-light max-w-md mx-auto leading-relaxed">
                Thanks for putting <span className="text-espresso font-normal">{formData.roasterName}</span> on our radar.
                We review every nomination and reach out to roasters who align with our values.
              </p>
              <div className="mt-8 w-12 h-px bg-terracotta mx-auto" />
            </motion.div>
          )}
        </div>
      </section>

      {/* What We Look For */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-terracotta" />
              <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide">
                What We Look For
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Small Batch",
                text: "We partner with roasters who prioritize quality over volume. If they're roasting in small batches with intention, they're our kind of people.",
              },
              {
                title: "Ethical Sourcing",
                text: "Direct trade, fair wages, sustainable practices. We want to know the story behind every bean — from farm to cup.",
              },
              {
                title: "Distinct Character",
                text: "We're not looking for generic. We want roasters with a point of view — a signature style that makes their coffee unmistakably theirs.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-warm-white p-8 border border-espresso/5">
                  <h3 className="font-display text-xl font-light text-espresso mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-espresso-light/60 font-light leading-relaxed">
                    {item.text}
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
