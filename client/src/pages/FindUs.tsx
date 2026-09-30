/*
 * FindUs Page — Spiked Coffee
 * Design: Interactive map with location pins, upcoming pop-up schedule,
 * and farmers market dates. Cream editorial feel.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { MapView } from "@/components/Map";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DALMATIAN_ICON = "/assets/dalmatian-dark.png";
const TRUCK_IMAGE = "/assets/find_us_truck.jpg";

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

interface LocationPin {
  name: string;
  region: string;
  lat: number;
  lng: number;
  status: "Active" | "Coming Soon" | "Scouting";
}

const locations: LocationPin[] = [
  { name: "Libertyville", region: "Illinois", lat: 42.2831, lng: -87.9531, status: "Active" },
  { name: "Denver", region: "Colorado", lat: 39.7392, lng: -104.9903, status: "Coming Soon" },
];

interface PopupEvent {
  title: string;
  location: string;
  date: string;
  time: string;
  type: "Farmers Market" | "Pop-Up" | "Special Event";
}

const upcomingEvents: PopupEvent[] = [
  {
    title: "Libertyville Farmers Market",
    location: "Cook Park, Libertyville, IL",
    date: "Every Saturday",
    time: "8:00 AM — 1:00 PM",
    type: "Farmers Market",
  },
  {
    title: "Summer Pop-Up: Craft & Pour",
    location: "Libertyville Town Center",
    date: "June 14, 2026",
    time: "4:00 PM — 10:00 PM",
    type: "Pop-Up",
  },
  {
    title: "Denver Launch Weekend",
    location: "RiNo Art District, Denver, CO",
    date: "July 2026",
    time: "TBA",
    type: "Special Event",
  },
];

const typeColors: Record<PopupEvent["type"], string> = {
  "Farmers Market": "bg-forest/10 text-forest",
  "Pop-Up": "bg-terracotta/10 text-terracotta",
  "Special Event": "bg-espresso/10 text-espresso",
};

export default function FindUs() {
  const handleMapReady = useCallback((map: google.maps.Map) => {
    // Fit bounds to show all locations
    const bounds = new google.maps.LatLngBounds();
    locations.forEach((loc) => {
      bounds.extend({ lat: loc.lat, lng: loc.lng });

      // Create custom marker for each location
      const markerContent = document.createElement("div");
      markerContent.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        ">
          <div style="
            background: ${loc.status === 'Active' ? '#3D2B1F' : '#8B7355'};
            color: #F5F0E8;
            padding: 6px 12px;
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            font-weight: 300;
            white-space: nowrap;
            border-radius: 0;
          ">
            ${loc.name}
          </div>
          <div style="
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid ${loc.status === 'Active' ? '#3D2B1F' : '#8B7355'};
          "></div>
        </div>
      `;

      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: loc.lat, lng: loc.lng },
        content: markerContent,
        title: `${loc.name}, ${loc.region}`,
      });
    });

    map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {/* Hero — Truck Image */}
      <section className="relative pt-20 lg:pt-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="relative w-full h-[40vh] lg:h-[50vh] overflow-hidden">
              <img
                src={TRUCK_IMAGE}
                alt="Spiked Coffee at a farmers market"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
            </div>
          </FadeIn>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center -mt-16 lg:-mt-24 pb-16 lg:pb-20">
          <FadeIn delay={0.1}>
            <div className="w-12 h-px bg-terracotta mx-auto mb-8" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-light text-espresso tracking-wide leading-[1.1]">
              Find Us
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-body text-sm lg:text-base text-espresso-light/60 mt-6 tracking-wide font-light max-w-lg mx-auto">
              From farmers markets to pop-ups to our future brick and mortar.
              Here's where you can find Spiked Coffee next.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-warm-white">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
            <MapView
              className="w-full h-[400px] lg:h-[500px]"
              initialCenter={{ lat: 41.5, lng: -95 }}
              initialZoom={5}
              onMapReady={handleMapReady}
            />
          </div>
        </FadeIn>
      </section>

      {/* Locations Grid */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <h2 className="font-body text-[11px] tracking-[0.3em] uppercase text-espresso-light/50 mb-10 font-light">
              Our Markets
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((loc, i) => (
              <FadeIn key={loc.name} delay={i * 0.1}>
                <div className="bg-warm-white p-8 border border-espresso/5 group hover:border-terracotta/20 transition-colors duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <MapPin size={16} className="text-terracotta mt-1" strokeWidth={1.5} />
                    <span className={`font-body text-[9px] tracking-[0.2em] uppercase px-2 py-1 font-light ${
                      loc.status === "Active"
                        ? "bg-forest/10 text-forest"
                        : loc.status === "Coming Soon"
                        ? "bg-terracotta/10 text-terracotta"
                        : "bg-espresso/5 text-espresso-light/50"
                    }`}>
                      {loc.status}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-light text-espresso mb-1">
                    {loc.name}
                  </h3>
                  <p className="font-body text-sm text-espresso-light/50 font-light">
                    {loc.region}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-warm-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-terracotta" />
              <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide">
                Upcoming
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {upcomingEvents.map((event, i) => (
              <FadeIn key={event.title} delay={i * 0.08}>
                <div className="bg-cream p-6 lg:p-8 border border-espresso/5 hover:border-terracotta/20 transition-colors duration-500 group">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`font-body text-[9px] tracking-[0.2em] uppercase px-2 py-1 font-light ${typeColors[event.type]}`}>
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-display text-xl lg:text-2xl font-light text-espresso mb-2">
                        {event.title}
                      </h3>
                      <p className="font-body text-sm text-espresso-light/50 font-light">
                        {event.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-2 lg:min-w-[200px]">
                      <div className="flex items-center gap-2 text-espresso-light/60">
                        <Calendar size={13} strokeWidth={1.5} />
                        <span className="font-body text-sm font-light">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-espresso-light/60">
                        <Clock size={13} strokeWidth={1.5} />
                        <span className="font-body text-sm font-light">{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <p className="font-body text-sm text-espresso-light/40 font-light">
                Follow us on Instagram for real-time pop-up announcements and schedule changes.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
