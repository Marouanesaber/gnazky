
import React from "react";
import { Navigation } from "@/components/home/Navigation";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import PetGallery from "@/components/home/PetGallery";
import Footer from "@/components/home/Footer";
import AppointmentStats from "@/components/home/AppointmentStats";
import BackToTop from "@/components/home/BackToTop";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AppointmentStats />
          <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <h3 className="text-lg font-semibold mb-3">Welcome to PetClinic</h3>
            <p className="text-gray-600 leading-relaxed">
              At PetClinic, we provide comprehensive healthcare services for your beloved animals. 
              Our team of experienced veterinarians and support staff are committed to maintaining 
              the health and wellness of your pets through preventive care, diagnostics, surgery, 
              and various treatments. We understand that your pets are important family members, and 
              we treat them with the care and respect they deserve.
            </p>
          </div>
        </div>
      </div>
      
      <ServicesSection />
      <PetGallery />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;
