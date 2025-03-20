
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, PawPrint } from "lucide-react";

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleSignOut = () => {
    logout();
    navigate("/logout");
  };

  return (
    <header className={`py-4 px-6 fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center animate-fade-in">
          <Link to="/" className="font-bold text-xl text-blue-600 transition-all hover:scale-105 flex items-center gap-2">
            <PawPrint className="h-6 w-6 text-blue-600" />
            <span>PetClinic</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {['Home', 'Book Appointment', 'Services', 'Technicians', 'Contact Us'].map((item, index) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all"
              style={{"animationDelay": `${(index + 1) * 100}ms`}}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2 animate-fade-in [animation-delay:600ms]">
          {isAuthenticated ? (
            <>
              <Button 
                onClick={handleDashboard} 
                className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all hover:scale-105"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                onClick={handleSignOut} 
                className="text-sm font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all hover:scale-105"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all hover:scale-105">
                Login
              </Link>
              <Link to="/register" className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full transition-all hover:scale-105">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
