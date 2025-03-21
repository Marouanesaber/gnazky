import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (email: string, password: string, keepMeOnline?: boolean) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<{ name: string; email: string; profilePicture: string }>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  login: async () => false,
  logout: () => {},
  updateProfile: async () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserProfile = localStorage.getItem("userProfile");
    
    if (storedLoggedIn === "true" && storedUserProfile) {
      setIsAuthenticated(true);
      setUserProfile(JSON.parse(storedUserProfile));
    }
  }, []);

  const login = async (email: string, password: string, keepMeOnline: boolean = true): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Login failed');
        return false;
      }

      setIsAuthenticated(true);
      setUserProfile(data.user);
      
      // Save to localStorage if keepMeOnline is true
      if (keepMeOnline) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userProfile", JSON.stringify(data.user));
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Server error. Please try again later.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
  };

  const updateProfile = async (data: Partial<{ name: string; email: string; profilePicture: string }>): Promise<boolean> => {
    if (!userProfile) return false;
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userProfile.id,
          ...data
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update profile');
        return false;
      }

      const updatedProfile = { ...userProfile, ...data };
      setUserProfile(updatedProfile);
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Server error. Please try again later.');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
