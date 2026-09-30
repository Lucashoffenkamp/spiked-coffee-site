/*
 * Navigation — Spiked Coffee
 * Design: Cormorant Garamond + Jost. Dalmatian icon mark.
 * Transparent → cream on scroll. Thin, editorial feel.
 * Mobile: Slide-out drawer from the right using Sheet primitive.
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const LOGO_ICON_LIGHT = "/assets/dalmatian-light.png";
const LOGO_ICON_DARK = "/assets/dalmatian-dark.png";

const navLinks = [
  { label: "Menu", href: "/menu", isRoute: true },
  { label: "Our Roasters", href: "/roasters", isRoute: true },
  { label: "Merch", href: "/merch", isRoute: true },
  { label: "Journal", href: "/journal", isRoute: true },
  { label: "Find Us", href: "/find-us", isRoute: true },
  { label: "The Garden", href: "/the-garden", isRoute: true, isNew: true },
  { label: "About", href: "/about", isRoute: true },
];

/* ─── NEW badge: small animated dot + label ─── */
function NewBadge({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  if (variant === "mobile") {
    return (
      <span className="ml-auto inline-flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta/60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta" />
        </span>
        <span className="font-body text-[9px] tracking-[0.2em] uppercase text-terracotta font-medium">New</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 ml-1.5 -translate-y-0.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta/60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-terracotta" />
      </span>
    </span>
  );
}

function NavLink({ link, className, onClick }: { link: typeof navLinks[0]; className: string; onClick?: () => void }) {
  const [location] = useLocation();

  if (link.isRoute) {
    const isActive = location === link.href;
    return (
      <Link href={link.href} className={`${className} ${isActive ? "!text-espresso" : ""}`} onClick={onClick}>
        {link.label}
        {(link as any).isNew && <NewBadge />}
        <span className={`absolute -bottom-1 left-0 h-px bg-terracotta/60 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
      </Link>
    );
  }

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
  const [location] = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
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
              src={scrolled ? LOGO_ICON_DARK : LOGO_ICON_LIGHT}
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

          {/* Mobile Menu — Sheet Drawer */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-espresso hover:text-terracotta transition-colors duration-300"
                  aria-label="Open menu"
                >
                  <Menu size={22} strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-cream border-l border-espresso/10 w-[85%] sm:max-w-sm p-0 [&>button]:hidden"
              >
                {/* Drawer Header */}
                <SheetHeader className="px-8 pt-8 pb-4 border-b border-espresso/5">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex items-center gap-3">
                    <img
                      src={scrolled ? LOGO_ICON_DARK : LOGO_ICON_LIGHT}
                      alt="Spiked Coffee"
                      className="h-10 w-10 object-contain"
                    />
                    <div className="w-px h-6 bg-espresso/15" />
                    <span className="font-display text-base font-light tracking-[0.12em] text-espresso">
                      SPIKED COFFEE
                    </span>
                  </div>
                </SheetHeader>

                {/* Nav Links */}
                <nav className="flex flex-col px-8 pt-8 gap-1">
                  {navLinks.map((link, i) => {
                    const isActive = link.isRoute && location === link.href;
                    return (
                      <SheetClose key={link.href} asChild>
                        <div
                          className="overflow-hidden"
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          {link.isRoute ? (
                            <Link
                              href={link.href}
                              className={`flex items-center gap-4 py-4 border-b border-espresso/5 group transition-colors duration-300 ${
                                isActive ? "text-espresso" : "text-espresso-light/60 hover:text-espresso"
                              }`}
                            >
                              <span className="font-body text-[10px] tracking-widest text-espresso-light/30 font-light w-6">
                                0{i + 1}
                              </span>
                              <span className="font-display text-2xl font-light tracking-[0.05em]">
                                {link.label}
                              </span>
                              {(link as any).isNew && !isActive && <NewBadge variant="mobile" />}
                              {isActive && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-terracotta" />
                              )}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              className="flex items-center gap-4 py-4 border-b border-espresso/5 group text-espresso-light/60 hover:text-espresso transition-colors duration-300"
                              onClick={(e) => {
                                if (location === "/") {
                                  e.preventDefault();
                                  const hash = link.href.replace("/", "");
                                  const el = document.querySelector(hash);
                                  if (el) el.scrollIntoView({ behavior: "smooth" });
                                }
                                setMobileOpen(false);
                              }}
                            >
                              <span className="font-body text-[10px] tracking-widest text-espresso-light/30 font-light w-6">
                                0{i + 1}
                              </span>
                              <span className="font-display text-2xl font-light tracking-[0.05em]">
                                {link.label}
                              </span>
                            </a>
                          )}
                        </div>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Drawer Footer */}
                <div className="mt-auto px-8 pb-8 pt-6">
                  <div className="w-12 h-px bg-espresso/10 mb-6" />
                  <p className="font-body text-xs text-espresso-light/40 font-light tracking-wide leading-relaxed">
                    Craft coffee &amp; fine beverages.
                    <br />
                    Libertyville &middot; Denver
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <a
                      href="https://instagram.com/spikedcoffee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[10px] tracking-[0.2em] uppercase text-espresso-light/40 hover:text-terracotta transition-colors font-light"
                    >
                      Instagram
                    </a>
                    <span className="text-espresso-light/15">|</span>
                    <a
                      href="mailto:hello@spikedcoffee.com"
                      className="font-body text-[10px] tracking-[0.2em] uppercase text-espresso-light/40 hover:text-terracotta transition-colors font-light"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
