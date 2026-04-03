import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ConceptSection from "@/components/ConceptSection";
import VisionSection from "@/components/VisionSection";
import GallerySection from "@/components/GallerySection";
import SignupSection from "@/components/SignupSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <StorySection />
      <ConceptSection />
      <VisionSection />
      <GallerySection />
      <SignupSection />
      <Footer />
    </div>
  );
}
