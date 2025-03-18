
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            <span className="text-blue-600">We Care</span> for<br />your animal
          </h1>
          <p className="text-gray-600 mb-8 max-w-md animate-fade-in [animation-delay:200ms]">
            Standard modern and efficient, affordable healthcare for your pets and other animals. So you don't have experience. Make an Appointment now!
          </p>
          <Link to="/book-appointment" className="animate-fade-in [animation-delay:400ms]">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105">
              Book Now
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2 relative animate-fade-in [animation-delay:600ms]">
          <div className="bg-white rounded-2xl shadow-lg p-4 relative z-10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1374"
              alt="Veterinarian with dog"
              className="rounded-xl w-full"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-blue-200 rounded-lg z-0"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-16 h-16 bg-blue-100 rounded-lg z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
