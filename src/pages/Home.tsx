
import React from "react";
import Navigation from "@/components/home/Navigation";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import PetGallery from "@/components/home/PetGallery";
import Footer from "@/components/home/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PetGallery />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
