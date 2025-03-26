
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

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
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/technicians" className="text-gray-700 hover:text-primary transition-colors">
              Technicians
            </Link>
            <Link to="/contact-us" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/shop"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/technicians"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Technicians
              </Link>
              <Link
                to="/contact-us"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="flex space-x-2">
                    <Link to="/dashboard" className="flex-1">
                      <Button className="w-full" variant="ghost" onClick={() => setIsMenuOpen(false)}>Dashboard</Button>
                    </Link>
                    <Link to="/cart" className="flex-1">
                      <Button className="w-full" variant="outline" onClick={() => setIsMenuOpen(false)}>Cart</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login" className="flex-1">
                      <Button className="w-full" variant="ghost" onClick={() => setIsMenuOpen(false)}>Sign In</Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
