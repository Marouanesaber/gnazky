
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-white py-16 px-6 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/9bee879e-f556-4063-97b6-360a5db49912.png"
                alt="PetClinic Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-blue-200 text-sm mb-4">
              {t('footerTagline') || "Providing the best pet healthcare experience with professional staff and state-of-the-art facilities."}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t('quickLinks') || "Quick Links"}</h4>
            <ul className="space-y-2">
              {[
                { name: t('home') || 'Home', path: '/' },
                { name: t('bookAppointment') || 'Book Appointment', path: '/book-appointment' },
                { name: t('services') || 'Services', path: '/services' },
                { name: t('technicians') || 'Technicians', path: '/technicians' },
                { name: t('contact') || 'Contact Us', path: '/contact-us' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-blue-200 hover:text-white hover:underline transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-secondary rounded-full mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t('openingHours') || "Opening Hours"}</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-blue-200">
                <span>{t('mondayFriday') || "Monday - Friday:"}</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-blue-200">
                <span>{t('saturday') || "Saturday:"}</span>
                <span>9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between text-blue-200">
                <span>{t('sunday') || "Sunday:"}</span>
                <span>{t('closed') || "Closed"}</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-blue-800/50 rounded-lg border border-blue-700">
              <p className="text-sm text-white flex items-center">
                <Clock className="h-4 w-4 mr-2 text-secondary" />
                <span>{t('emergencyService') || "24/7 Emergency Service"}</span>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t('contactUs') || "Contact Us"}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-blue-200">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary" />
                <span>123 Pet Care Street, Veterinary District, 10001</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200">
                <Phone className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200">
                <Mail className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span>info@petclinic.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                to="/contact-us" 
                className="inline-block px-4 py-2 bg-secondary text-primary font-medium rounded-md hover:bg-secondary/80 transition-colors"
              >
                {t('getInTouch') || "Get in Touch"}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800/50 pt-6 text-sm text-blue-200 flex flex-col md:flex-row justify-between items-center">
          <div>© {currentYear} PETCLINC - {t('vetWithSoul') || "Vet with Soul"}. {t('allRightsReserved') || "All rights reserved."}</div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('privacyPolicy') || "Privacy Policy"}</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">{t('termsOfService') || "Terms of Service"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
