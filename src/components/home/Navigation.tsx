
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LanguageSwitcher, useLanguage } from "@/components/LanguageSwitcher";
import { apiRequest } from "@/utils/api";
import { onEvent } from "@/utils/eventBus";
import { NavigationMenu } from "./NavigationMenu";
import { AuthButtons } from "./AuthButtons";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navigation() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, userProfile } = useAuth();
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

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

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
            className="flex items-center space-x-3 transition-transform hover:scale-105"
            aria-label="PetClinic Home"
          >
            <img 
              src="/lovable-uploads/9bee879e-f556-4063-97b6-360a5db49912.png" 
              alt="PetClinic Logo" 
              className="h-12 w-auto" // Increased from h-10 to h-12
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
          
          <div className="hidden md:flex items-center space-x-12">
            <NavigationMenu />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={userProfile?.profilePicture || "https://github.com/shadcn.png"}
                        alt={userProfile?.name || "User"}
                      />
                      <AvatarFallback>
                        {userProfile?.name ? getInitials(userProfile.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to="/dashboard">
                      <DropdownMenuItem>
                        <span>{t("dashboard")}</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/dashboard/profile">
                      <DropdownMenuItem>
                        <span>{t("profile")}</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <Link to="/logout">
                    <DropdownMenuItem>
                      <span>{t("logout")}</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthButtons isAuthenticated={isAuthenticated} />
            )}
            
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
