import Navigation from "@/components/Navigation";
// import EventBanner from "@/components/EventBanner";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import WhatsBrewingCard from "@/components/WhatsBrewingCard";
import QuickMenuPreview from "@/components/QuickMenuPreview";
import ConceptSection from "@/components/ConceptSection";
import RoasterTeaser from "@/components/RoasterTeaser";
import BeaconTeaser from "@/components/BeaconTeaser";
import VisionSection from "@/components/VisionSection";
import GardenTeaser from "@/components/GardenTeaser";
import GallerySection from "@/components/GallerySection";
import SignupSection from "@/components/SignupSection";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <GrainOverlay />
      <ScrollProgress />
      {/* <EventBanner /> */}
      <Navigation />
      <HeroSection />
      <StorySection />
      <WhatsBrewingCard />
      <QuickMenuPreview />
      <ConceptSection />
      <RoasterTeaser />
      <BeaconTeaser />
      <VisionSection />
      <GardenTeaser />
      <GallerySection />
      <SignupSection />
      <Footer />
    </div>
  );
}
