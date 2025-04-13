
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LanguageSwitcher, useLanguage } from "@/components/LanguageSwitcher";
import { apiRequest } from "@/utils/api";
import { onEvent } from "@/utils/eventBus";
import { NavigationMenu } from "./NavigationMenu";
import { AuthButtons } from "./AuthButtons";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);
  const { t } = useLanguage();

  const fetchCartCount = async () => {
    if (!isAuthenticated) {
      setCartItemCount(0);
      return;
    }
    
    try {
      const cartItems = await apiRequest('/shop/cart');
      setCartItemCount(cartItems.length || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    
    const unsubscribe = onEvent('cart-updated', () => {
      fetchCartCount();
    });
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAuthenticated]);

  return (
    <nav className={`py-3 sticky top-0 z-40 w-full border-b transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-sm border-gray-200" 
        : "bg-white/80 backdrop-blur-sm border-transparent"
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
            aria-label="PetClinic Home"
          >
            <img 
              src="/lovable-uploads/9bee879e-f556-4063-97b6-360a5db49912.png" 
              alt="PetClinic Logo" 
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-bold text-primary text-xl tracking-tight">PETCLINC</span>
              <span className="text-xs text-gray-500 italic">{t('vetWithSoul') || "Vet with Soul"}</span>
            </div>
          </Link>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              className="text-primary hover:text-primary/80"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            <AuthButtons isAuthenticated={isAuthenticated} />
            
            {isAuthenticated && <CartButton itemCount={cartItemCount} />}
          </div>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <MobileMenu 
                isAuthenticated={isAuthenticated} 
                cartItemCount={cartItemCount} 
                onClose={() => setIsMenuOpen(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navigation;
