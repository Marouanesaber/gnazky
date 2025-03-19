
import React, { useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Execute logout
    logout();
    
    // Navigate back to home after a delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden animate-scale-in">
        <div className="p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <LogOut className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2 animate-fade-in [animation-delay:200ms]">You've Been Logged Out</h2>
          <p className="text-gray-600 mb-8 animate-fade-in [animation-delay:400ms]">
            Thank you for using PetClinic. We hope to see you again soon!
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden animate-fade-in [animation-delay:600ms]">
            <div className="bg-blue-600 h-full rounded-full animate-[progress_3s_ease-in-out_forwards]"></div>
          </div>
          <p className="text-sm text-gray-500 mt-4 animate-fade-in [animation-delay:800ms]">
            Redirecting you to the home page...
          </p>
        </div>
      </div>

      <style>
        {`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        `}
      </style>
    </div>
  );
};

export default Logout;
