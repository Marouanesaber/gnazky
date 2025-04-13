
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageSwitcher";
import { CalendarDays } from "lucide-react";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 lg:py-28 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-16 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif leading-tight">
            <span className="text-primary relative inline-block">
              We Care
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-secondary"></span>
            </span>
            <span className="ml-2">for</span><br />
            <span className="relative inline-block">
              your animal
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-secondary"></span>
            </span>
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
            Standard modern and efficient, affordable healthcare for your pets and other animals. 
            So you don't have to worry about their wellbeing. Make an appointment now!
          </p>
          
          <div className="space-x-4">
            <Link to="/book-appointment">
              <Button className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <CalendarDays className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary transition-all duration-300 transform hover:scale-105 hover:bg-primary/5">
                Our Services
              </Button>
            </Link>
          </div>
          
          <div className="pt-8 flex gap-6">
            {[
              { label: "Professional Staff", value: "25+" }, 
              { label: "Happy Customers", value: "1000+" }, 
              { label: "Years Experience", value: "10+" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:w-1/2 relative"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 relative z-10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl rotate-1 hover:rotate-0">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
              alt="Veterinarian with dog"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-secondary rounded-lg z-0 animate-pulse"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-16 h-16 bg-blue-100 rounded-lg z-0 animate-bounce"></div>
          <div className="absolute bottom-[40px] right-[-30px] w-12 h-12 bg-primary/20 rounded-full z-0 animate-ping opacity-75"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
