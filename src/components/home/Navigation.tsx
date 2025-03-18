
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="border-b py-4 px-6 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl text-blue-600">PetClinic</Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-all">Home</Link>
          <Link to="/book-appointment" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Book Appointment</Link>
          <Link to="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Services</Link>
          <Link to="/technicians" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Technicians</Link>
          <Link to="/contact-us" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Contact Us</Link>
        </nav>
        <div className="flex gap-2">
          <Link to="/login" className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all">
            Login
          </Link>
          <Link to="/register" className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
