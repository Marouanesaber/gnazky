import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { apiRequest } from "@/utils/api";
import { onEvent } from "@/utils/eventBus";
import { NavigationMenu } from "./NavigationMenu";
import { AuthButtons } from "./AuthButtons";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

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
      // Keep the current count on error
    }
  };

  useEffect(() => {
    fetchCartCount();
    
    const unsubscribe = onEvent('cart-updated', () => {
      fetchCartCount();
    });
    
    return unsubscribe;
  }, [isAuthenticated]);

  return (
    <nav className="py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="PetClinic Home"
          >
            <PawPrint className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl md:text-2xl">PetClinic</span>
          </Link>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
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
        
        {isMenuOpen && (
          <MobileMenu 
            isAuthenticated={isAuthenticated} 
            cartItemCount={cartItemCount} 
            onClose={() => setIsMenuOpen(false)} 
          />
        )}
      </div>
    </nav>
  );
}

export default Navigation;
