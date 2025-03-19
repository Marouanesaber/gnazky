
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      
      // Show success toast
      toast.success("Thank you for subscribing to our newsletter!", {
        duration: 3000,
      });
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-center z-50 animate-slide-in-right">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-800"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
        <h3 className="text-xl font-bold">
          Join <span className="text-blue-600">PetClinic</span> Today
        </h3>
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <Input 
            placeholder="Email" 
            className="w-48 sm:w-auto" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="bg-blue-600 whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBanner;
