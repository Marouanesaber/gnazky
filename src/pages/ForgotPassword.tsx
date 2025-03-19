
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      
      // Show success toast
      toast.success("Password reset instructions sent to your email", {
        duration: 5000,
        className: "animate-slide-in-right"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex animate-fade-in">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img 
          src="/lovable-uploads/53e5364f-8c3a-4ab4-a79a-201ef7f981b4.png" 
          alt="Dog with sunglasses" 
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2 animate-fade-in [animation-delay:200ms]">PetClinic</h1>
          <p className="text-xl animate-fade-in [animation-delay:400ms]">We'll help you get back in</p>
        </div>
      </div>
      
      {/* Right side - Forgot Password Form */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in [animation-delay:200ms]">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
              <CardDescription>
                {!submitted 
                  ? "Enter your email and we'll send you instructions to reset your password" 
                  : "Check your email for password reset instructions"}
              </CardDescription>
            </CardHeader>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">EMAIL ADDRESS</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending Instructions..." : "Send Reset Instructions"}
                  </Button>
                  <div className="text-center text-sm mt-2">
                    <span>Remember your password? </span>
                    <Link to="/login" className="text-blue-500 hover:underline">
                      Back to Login
                    </Link>
                  </div>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="space-y-4 text-center">
                <div className="p-3">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Sent Successfully</h3>
                  <p className="text-gray-500 mb-4">
                    We've sent password reset instructions to:<br />
                    <span className="font-medium text-gray-700">{email}</span>
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                    asChild
                  >
                    <Link to="/login">Return to Login</Link>
                  </Button>
                </div>
              </CardContent>
            )}
            <CardFooter className="pt-0">
              <Link to="/" className="w-full text-center text-sm text-blue-500 hover:underline flex items-center justify-center mt-4">
                <ArrowLeft className="mr-1 h-4 w-4" /> 
                Back to website
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
