/*
 * Footer — Spiked Coffee
 * Design: Dark charcoal footer with the logo, minimal links, and brand sign-off.
 */

const LOGO_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/final_logo_dark_2c08d184.png";

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-warm-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Logo & Tagline */}
          <div className="lg:col-span-5">
            <img
              src={LOGO_DARK}
              alt="Spiked Coffee"
              className="h-14 lg:h-16 object-contain object-left mb-6"
            />
            <p className="font-body text-sm text-warm-white/40 leading-relaxed max-w-sm">
              Craft coffee by day. Fine beverages by evening. A legacy built on
              connection, community, and the belief that life is good.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="font-ui text-xs tracking-[0.25em] uppercase text-warm-white/30 mb-5">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Our Story", href: "#story" },
                { label: "The Concept", href: "#concept" },
                { label: "The Vision", href: "#vision" },
                { label: "Join Us", href: "#signup" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-ui text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-ui text-xs tracking-[0.25em] uppercase text-warm-white/30 mb-5">
              Locations
            </h4>
            <div className="flex flex-col gap-2">
              <p className="font-ui text-sm text-warm-white/50">Libertyville, IL</p>
              <p className="font-ui text-sm text-warm-white/50">Kenosha, WI</p>
              <p className="font-ui text-sm text-warm-white/50">Denver, CO</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-warm-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs text-warm-white/20 tracking-wide">
            &copy; {new Date().getFullYear()} Spiked Coffee. All rights reserved.
          </p>
          <p className="font-body text-xs text-warm-white/20 italic">
            Life is short. The coffee is good.
          </p>
        </div>
      </div>
    </footer>
  );
}
