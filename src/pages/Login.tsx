
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password, rememberMe);
      
      if (success) {
        toast.success("Login successful!", {
          duration: 3000,
          className: "animate-slide-in-right"
        });
        
        setTimeout(() => navigate("/dashboard"), 500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
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
          <p className="text-xl animate-fade-in [animation-delay:400ms]">Caring for your pets' health</p>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in [animation-delay:200ms]">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Login using your registered credentials
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
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
                <div className="space-y-2">
                  <Label htmlFor="password">PASSWORD</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
                <div className="text-center text-sm mt-2">
                  <span>New Client? </span>
                  <Link to="/register" className="text-blue-500 hover:underline">
                    Create an account
                  </Link>
                </div>
                <Link to="/" className="text-center text-sm text-blue-500 hover:underline flex items-center justify-center mt-4">
                  <ArrowLeft className="mr-1 h-4 w-4" /> 
                  Back to website
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
