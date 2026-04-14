/*
 * Footer — Spiked Coffee
 * Design: Dark charcoal footer. Pure typographic logo, Jost Light body, Cormorant accent.
 */
import { Link } from "wouter";

const DALMATIAN_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-warm-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Logo & Tagline */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <img
                src={DALMATIAN_ICON}
                alt=""
                className="h-10 w-10 object-contain opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="w-px h-6 bg-warm-white/10" />
              <span className="font-display text-base font-light tracking-[0.12em] text-warm-white/70">
                SPIKED COFFEE
              </span>
            </Link>
            <p className="font-body text-sm text-warm-white/40 leading-relaxed max-w-sm font-light">
              Craft coffee by day. Fine beverages by evening. A legacy built on
              connection, community, and the belief that life is good.
            </p>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-warm-white/30 mb-5 font-light">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "The Menu", href: "/menu" },
                { label: "Our Roasters", href: "/roasters" },
                { label: "Merch", href: "/merch" },
                { label: "Journal", href: "/journal" },
                { label: "Find Us", href: "/find-us" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300 font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="lg:col-span-3">
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-warm-white/30 mb-5 font-light">
              Community
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/nominate"
                className="font-body text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300 font-light"
              >
                Nominate a Roaster
              </Link>
              <a
                href="/#signup"
                className="font-body text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300 font-light"
              >
                Join the Pack
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-warm-white/30 mb-5 font-light">
              Locations
            </h4>
            <div className="flex flex-col gap-2">
              <p className="font-body text-sm text-warm-white/50 font-light">Libertyville, IL</p>
              <p className="font-body text-sm text-warm-white/50 font-light">Denver, CO</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-warm-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-warm-white/20 tracking-wide font-light">
            &copy; {new Date().getFullYear()} Spiked Coffee. All rights reserved.
          </p>
          <p className="font-accent text-sm text-warm-white/20">
            Named after a good dog. Built for good people.
          </p>
        </div>
      </div>
    </footer>
  );
}
