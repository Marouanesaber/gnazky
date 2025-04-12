
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageSwitcher";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10 space-y-6">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in font-playfair">
            <span className="text-primary relative inline-block animate-pulse overflow-hidden">
              {t('weCare')}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-secondary"></span>
            </span>
            <span className="ml-2 animate-fade-in [animation-delay:400ms]">{t('for')}</span><br />
            <span className="animate-fade-in [animation-delay:600ms] relative inline-block">
              {t('yourAnimal')}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-secondary origin-left transform scale-x-0 transition-transform duration-1000 animate-[grow_1.5s_ease-out_forwards_1s]"></span>
            </span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-md animate-fade-in [animation-delay:200ms] font-montserrat">
            {t('heroDescription')}
          </p>
          <div className="space-x-4 animate-fade-in [animation-delay:400ms]">
            <Link to="/book-appointment">
              <Button className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-montserrat">
                {t('bookNow')}
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary transition-all duration-300 transform hover:scale-105 hover:bg-primary/5 font-montserrat">
                {t('ourServices')}
              </Button>
            </Link>
          </div>
          
          <div className="pt-6 flex gap-4 animate-fade-in [animation-delay:600ms]">
            {[
              { label: t('professionalStaff'), value: "25+" }, 
              { label: t('happyCustomers'), value: "1000+" }, 
              { label: t('yearsExperience'), value: "10+" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <p className="text-xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-gray-500 font-montserrat">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 relative animate-fade-in [animation-delay:600ms]">
          <div className="bg-white rounded-2xl shadow-lg p-4 relative z-10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl rotate-1 hover:rotate-0">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1374"
              alt="Veterinarian with pet"
              className="rounded-xl w-full"
            />
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-secondary rounded-lg z-0 animate-pulse"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-16 h-16 bg-primary/10 rounded-lg z-0 animate-bounce"></div>
          <div className="absolute bottom-[40px] right-[-30px] w-12 h-12 bg-yellow-200 rounded-full z-0 animate-ping opacity-75"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
