
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-white pt-20 pb-8 px-6 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/9bee879e-f556-4063-97b6-360a5db49912.png"
                alt="PetClinic Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-white font-bold text-xl">PETCLINIC</h3>
                <p className="text-blue-200 text-xs">{t('vetWithSoul')}</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-6 leading-relaxed">
              {t('footerTagline')}
            </p>
            <div className="flex space-x-3 mt-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-9 h-9 rounded-full bg-blue-800/30 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" 
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b border-blue-800/50 pb-2">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
              {[
                { name: t('home'), path: '/' },
                { name: t('bookAppointment'), path: '/book-appointment' },
                { name: t('services'), path: '/services' },
                { name: t('technicians'), path: '/technicians' },
                { name: t('contact'), path: '/contact-us' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-blue-200 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1.5 text-secondary" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b border-blue-800/50 pb-2">
              {t('openingHours')}
            </h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-blue-200">
                <span className="font-medium">{t('mondayFriday')}</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-blue-200">
                <span className="font-medium">{t('saturday')}</span>
                <span>9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between text-blue-200">
                <span className="font-medium">{t('sunday')}</span>
                <span>{t('closed')}</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-800/50 rounded-lg border border-blue-700">
              <p className="text-sm text-white flex items-center">
                <Clock className="h-4 w-4 mr-2 text-secondary flex-shrink-0" />
                <span>{t('emergencyService')}</span>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b border-blue-800/50 pb-2">
              {t('contactUs')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-blue-200">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary" />
                <span className="leading-relaxed">123 Pet Care Street, Veterinary District, 10001</span>
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
            <div className="mt-6">
              <Link 
                to="/contact-us" 
                className="inline-block"
              >
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-primary font-medium"
                >
                  {t('getInTouch')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800/30 pt-6 mt-8 text-sm text-blue-200 flex flex-col md:flex-row justify-between items-center">
          <div>© {currentYear} PETCLINC - {t('vetWithSoul')}. {t('allRightsReserved')}</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('privacyPolicy')}</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
