/*
 * Navigation — Spiked Coffee
 * Design: Cormorant Garamond + Jost. Dalmatian icon mark.
 * Transparent → cream on scroll. Thin, editorial feel.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

const LOGO_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/dalmatian_fix_5_23e75f68.png";

const navLinks = [
  { label: "Our Story", href: "/#story", isRoute: false },
  { label: "The Concept", href: "/#concept", isRoute: false },
  { label: "Our Roasters", href: "/roasters", isRoute: true },
  { label: "The Vision", href: "/#vision", isRoute: false },
  { label: "Join Us", href: "/#signup", isRoute: false },
];

function NavLink({ link, className, onClick }: { link: typeof navLinks[0]; className: string; onClick?: () => void }) {
  const [location] = useLocation();

  if (link.isRoute) {
    return (
      <Link href={link.href} className={className} onClick={onClick}>
        {link.label}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-terracotta/60 transition-all duration-300 group-hover:w-full" />
      </Link>
    );
  }

  // For hash links: if we're on the home page, just use the hash; otherwise navigate to /#section
  const handleClick = (e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      const hash = link.href.replace("/", "");
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  };

  return (
    <a href={link.href} className={className} onClick={handleClick}>
      {link.label}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-terracotta/60 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Mark */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={LOGO_ICON}
                alt="Spiked Coffee"
                className="h-9 w-9 lg:h-11 lg:w-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="w-px h-6 bg-espresso/15 hidden sm:block" />
              <div className="hidden sm:block">
                <span className="font-display text-base lg:text-lg font-light tracking-[0.12em] text-espresso">
                  SPIKED COFFEE
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  link={link}
                  className="font-body text-xs tracking-[0.15em] uppercase text-espresso-light/70 hover:text-espresso transition-colors duration-300 font-light relative group"
                />
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-espresso"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1 }}
              >
                <NavLink
                  link={link}
                  className="font-display text-3xl font-light tracking-[0.1em] text-espresso hover:text-terracotta transition-colors relative group"
                  onClick={() => setMobileOpen(false)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
