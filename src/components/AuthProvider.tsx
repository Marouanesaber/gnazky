
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

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
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: async () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedToken = localStorage.getItem("authToken");
    const storedUserProfile = localStorage.getItem("userProfile");
    
    if (storedToken && storedUserProfile) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserProfile(JSON.parse(storedUserProfile));
      // Store a flag to indicate user is logged in for page refreshes
      localStorage.setItem("isLoggedIn", "true");
    }
  }, []);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        return false;
      }

      setIsAuthenticated(true);
      setUserProfile(data.user);
      setToken(data.token);
      
      // Save to localStorage
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
      setToken(data.token);
      
      // Save to localStorage if keepMeOnline is true
      if (keepMeOnline) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userProfile", JSON.stringify(data.user));
      }
      
      // Always set the isLoggedIn flag
      localStorage.setItem("isLoggedIn", "true");
      
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
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("isLoggedIn");
  };

  const updateProfile = async (data: Partial<{ name: string; email: string; profilePicture: string }>): Promise<boolean> => {
    if (!userProfile || !token) return false;
    
    try {
      // If updating profile picture, need to compress it before sending
      let updatedData = {...data};
      
      if (data.profilePicture) {
        try {
          // Compress the image before sending
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

  // Function to compress an image
  const compressImage = (base64Image: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Image;
      
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Set target dimensions (adjust these for your needs)
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
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
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get compressed base64 (0.7 quality)
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
      isAuthenticated, 
      userProfile, 
      token, 
      login, 
      register,
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
