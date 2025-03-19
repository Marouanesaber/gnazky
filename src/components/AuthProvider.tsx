
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: {
    name: string;
    email: string;
    profilePicture: string;
  } | null;
  login: (email: string, keepMeOnline?: boolean) => void;
  logout: () => void;
  updateProfile: (data: Partial<{ name: string; email: string; profilePicture: string }>) => void;
}

const defaultUserProfile = {
  name: "Admin User",
  email: "admin@petclinic.com",
  profilePicture: "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<AuthContextType["userProfile"]>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("userEmail");
    
    if (storedLoggedIn === "true") {
      setIsAuthenticated(true);
      
      // Load user profile from localStorage or use default
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      } else {
        const newProfile = { ...defaultUserProfile };
        if (storedEmail) {
          newProfile.email = storedEmail;
        }
        setUserProfile(newProfile);
        localStorage.setItem("userProfile", JSON.stringify(newProfile));
      }
    }
  }, []);

  const login = (email: string, keepMeOnline: boolean = true) => {
    setIsAuthenticated(true);
    
    // Create user profile
    const newProfile = { 
      ...defaultUserProfile,
      email: email || defaultUserProfile.email,
      name: email.split('@')[0] || defaultUserProfile.name,
      profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=0D8ABC&color=fff`
    };
    
    setUserProfile(newProfile);
    
    // Always store as logged in to maintain state across the app
    localStorage.setItem("userProfile", JSON.stringify(newProfile));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfile");
  };

  const updateProfile = (data: Partial<{ name: string; email: string; profilePicture: string }>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...data };
      setUserProfile(updatedProfile);
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
