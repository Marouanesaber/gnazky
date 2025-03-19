
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10 space-y-6">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            <span className="text-blue-600 relative">
              We Care
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-300 animate-pulse"></span>
            </span> for<br />your animal
          </h1>
          <p className="text-gray-600 mb-8 max-w-md animate-fade-in [animation-delay:200ms]">
            Standard modern and efficient, affordable healthcare for your pets and other animals. So you don't have experience. Make an Appointment now!
          </p>
          <div className="space-x-4 animate-fade-in [animation-delay:400ms]">
            <Link to="/book-appointment">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Book Now
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-blue-600 text-blue-600 transition-all duration-300 transform hover:scale-105 hover:bg-blue-50">
                Our Services
              </Button>
            </Link>
          </div>
          
          <div className="pt-6 flex gap-4 animate-fade-in [animation-delay:600ms]">
            {[{ label: "Professional Staff", value: "25+" }, { label: "Happy Customers", value: "1000+" }, { label: "Years Experience", value: "10+" }].map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <p className="text-xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 relative animate-fade-in [animation-delay:600ms]">
          <div className="bg-white rounded-2xl shadow-lg p-4 relative z-10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl rotate-1 hover:rotate-0">
            <img
              src="https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1374"
              alt="Veterinarian with dog"
              className="rounded-xl w-full"
            />
          </div>
          {/* Decorative elements with animations */}
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-blue-200 rounded-lg z-0 animate-pulse"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-16 h-16 bg-blue-100 rounded-lg z-0 animate-bounce"></div>
          <div className="absolute bottom-[40px] right-[-30px] w-12 h-12 bg-yellow-200 rounded-full z-0 animate-ping opacity-75"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
