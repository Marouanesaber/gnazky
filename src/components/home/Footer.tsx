
import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-secondary" />
              <span className="font-playfair text-2xl font-bold">PetClinic</span>
            </div>
            <p className="text-gray-300 font-montserrat text-sm">
              {t('footerTagline')}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 font-montserrat">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-secondary transition-colors">
                  {t('shop')}
                </Link>
              </li>
              <li>
                <Link to="/technicians" className="text-gray-300 hover:text-secondary transition-colors">
                  {t('technicians')}
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-300 hover:text-secondary transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-3 font-montserrat">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-gray-300">info@petclinic.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Pet Street, Vet City, VC 12345</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">{t('openingHours')}</h3>
            <ul className="space-y-2 font-montserrat">
              <li className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-white font-semibold">{t('monFri')}</p>
                  <p className="text-gray-300">8:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-white font-semibold">{t('saturday')}</p>
                  <p className="text-gray-300">9:00 AM - 5:00 PM</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-white font-semibold">{t('sunday')}</p>
                  <p className="text-gray-300">{t('closed')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm font-montserrat">
            &copy; {new Date().getFullYear()} {t('petClinic')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
