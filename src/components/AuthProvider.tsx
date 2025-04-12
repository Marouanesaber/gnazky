import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/utils/api";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  token: string | null;
  login: (email: string, password: string, keepMeOnline?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<{ name: string; email: string; profilePicture: string }>) => Promise<boolean>;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: async () => false,
  checkAuthStatus: async () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    id: 1,
    name: "Guest User",
    email: "guest@example.com",
    profilePicture: "https://ui-avatars.com/api/?name=Guest+User&background=0D8ABC&color=fff",
    role: "admin"
  });
  const [token, setToken] = useState<string | null>("demo-token-no-authentication");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const storedUserProfile = localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile");
    
    if (storedToken && storedUserProfile) {
      try {
        setToken(storedToken);
        setUserProfile(JSON.parse(storedUserProfile));
        localStorage.setItem("isLoggedIn", "true");
      } catch (error) {
        console.error("Error parsing stored user profile:", error);
        // Don't clear auth data, just use the default guest user
      }
    }
  }, []);

  const clearAllAuthData = () => {
    setUserProfile({
      id: 1,
      name: "Guest User",
      email: "guest@example.com",
      profilePicture: "https://ui-avatars.com/api/?name=Guest+User&background=0D8ABC&color=fff",
      role: "admin"
    });
    setToken("demo-token-no-authentication");
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("isLoggedIn");
    
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userProfile");
    sessionStorage.removeItem("isLoggedIn");
    
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      console.log("Registration attempt with:", email);
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: { name, email, password }
      });

      if (!data || data.error) {
        toast.error(data?.error || 'Registration failed');
        return false;
      }

      setIsAuthenticated(true);
      setUserProfile(data.user);
      setToken(data.token);
      
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userProfile", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");
      
      toast.success('Registration successful! Welcome to Pet Clinic.');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Server error. Please try again later.');
      return false;
    }
  };

  const login = async (email: string, password: string, keepMeOnline: boolean = true): Promise<boolean> => {
    try {
      console.log("Login attempt with:", email);
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password }
      });

      if (!data || data.error) {
        console.error("Login failed:", data?.error);
        toast.error(data?.error || 'Login failed');
        return false;
      }

      console.log("Login successful:", data);
      setIsAuthenticated(true);
      setUserProfile(data.user);
      setToken(data.token);
      
      if (keepMeOnline) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userProfile", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");
      } else {
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("userProfile", JSON.stringify(data.user));
        sessionStorage.setItem("isLoggedIn", "true");
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Server error. Please try again later.');
      return false;
    }
  };

  const logout = () => {
    clearAllAuthData();
    
    try {
      fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).catch(error => {
        console.log("Backend logout notification failed, but user was logged out client-side");
      });
    } catch (error) {
      console.log("Error during logout request, but user was logged out client-side");
    }
  };

  const updateProfile = async (data: Partial<{ name: string; email: string; profilePicture: string }>): Promise<boolean> => {
    if (!userProfile || !token) return false;
    
    try {
      let updatedData = {...data};
      
      if (data.profilePicture) {
        try {
          updatedData.profilePicture = await compressImage(data.profilePicture);
        } catch (error) {
          console.error('Error compressing image:', error);
          toast.error('Failed to process image. Try a smaller image.');
          return false;
        }
      }
      
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.error || 'Failed to update profile');
        return false;
      }

      const updatedProfile = responseData.user;
      setUserProfile(updatedProfile);
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Server error. Please try again later.');
      return false;
    }
  };

  const compressImage = (base64Image: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Image;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        resolve(compressedBase64);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: true,
      userProfile, 
      token, 
      login, 
      register,
      logout, 
      updateProfile,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
