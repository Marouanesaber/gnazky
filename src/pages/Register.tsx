
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, User, ArrowLeft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreementChecked) {
      toast.error("Please agree to the Terms and Conditions to continue");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success toast
      toast.success("Account created successfully!", {
        duration: 3000,
        className: "animate-slide-in-right"
      });
      
      // Navigate to login after a short delay
      setTimeout(() => navigate("/login"), 500);
    }, 1000);
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
          <p className="text-xl animate-fade-in [animation-delay:400ms]">Join our pet care community</p>
        </div>
      </div>
      
      {/* Right side - Registration Form */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in [animation-delay:200ms]">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
              <CardDescription>
                Enter your details to register
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">FULL NAME</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
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
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">CONFIRM PASSWORD</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreementChecked}
                    onCheckedChange={(checked) => setAgreementChecked(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="text-blue-500 hover:underline cursor-pointer">Terms and Conditions</span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Terms and Conditions</DialogTitle>
                          <DialogDescription>
                            Last updated: {new Date().toLocaleDateString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-sm">
                          <h3 className="font-semibold text-base">1. Introduction</h3>
                          <p>
                            Welcome to PetClinic. These Terms and Conditions govern your use of our website and services. By using our website or services, you agree to these terms.
                          </p>
                          
                          <h3 className="font-semibold text-base">2. Services</h3>
                          <p>
                            PetClinic provides veterinary care services for pets. We offer a range of services including routine check-ups, vaccinations, surgical procedures, and emergency care.
                          </p>
                          
                          <h3 className="font-semibold text-base">3. Appointment Scheduling</h3>
                          <p>
                            You may schedule appointments through our website. By scheduling an appointment, you agree to attend at the specified time or provide at least 24 hours notice for cancellation.
                          </p>
                          
                          <h3 className="font-semibold text-base">4. User Accounts</h3>
                          <p>
                            To access certain features of our website, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                          </p>
                          
                          <h3 className="font-semibold text-base">5. Privacy Policy</h3>
                          <p>
                            Our Privacy Policy describes how we collect, use, and share information about you when you use our website or services. By using our website or services, you agree to our collection, use, and sharing of your information as described in our Privacy Policy.
                          </p>
                          
                          <h3 className="font-semibold text-base">6. Limitation of Liability</h3>
                          <p>
                            PetClinic is not liable for any damages that may occur as a result of your use of our website or services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
                          </p>
                          
                          <h3 className="font-semibold text-base">7. Changes to Terms</h3>
                          <p>
                            We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new Terms and Conditions on this page.
                          </p>
                          
                          <h3 className="font-semibold text-base">8. Contact Us</h3>
                          <p>
                            If you have any questions about these Terms and Conditions, please contact us at support@petclinic.com.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
                <div className="text-center text-sm mt-2">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Log In
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

export default Register;
