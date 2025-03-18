
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16 px-6 relative">
      <div className="container mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-1">PetClinic</h3>
          <p className="text-blue-200 text-sm">Providing the best pet healthcare experience</p>
        </div>
        <div className="text-sm text-blue-200">
          © 2023, PetClinic. Powered by Outstanding Technologies.
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f9fafb" className="w-full">
          <path fillOpacity="1" d="M0,64L60,53.3C120,43,240,21,360,32C480,43,600,85,720,90.7C840,96,960,64,1080,53.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
