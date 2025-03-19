
import React from "react";
import Navigation from "@/components/home/Navigation";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/home/Footer";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import PetGallery from "@/components/home/PetGallery";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Navigation />
      <HeroSection />
      <PetGallery />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
      <NewsletterBanner />
    </div>
  );
};

export default Home;
