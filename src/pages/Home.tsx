
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
import ImageCarousel from "@/components/home/ImageCarousel";

const Home = () => {
  // Sample images for the carousel
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Veterinarian with dog",
      title: "Expert Veterinary Care",
      description: "Our skilled professionals provide the highest quality care for your pets."
    },
    {
      src: "https://images.unsplash.com/photo-1558618047-f4b511aae74d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Cat getting examined",
      title: "Comprehensive Wellness Exams",
      description: "Regular check-ups ensure your pet stays healthy and happy."
    },
    {
      src: "https://images.unsplash.com/photo-1604848698030-c434ba08ece1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Pet carrier",
      title: "Visit Our Pet Shop",
      description: "Quality products for all your pet care needs."
    },
    {
      src: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Dog grooming",
      title: "Professional Grooming Services",
      description: "Keep your pet looking and feeling their best with our expert grooming."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      
      {/* New Carousel Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services Spotlight</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Take a look at the quality care and services we provide for your beloved pets
          </p>
        </div>
        <ImageCarousel 
          images={carouselImages} 
          autoplayDelay={6000}
          className="shadow-lg"
        />
      </div>
      
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
