
import React, { useState } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  PawPrint, 
  Info, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Dog,
  Cat,
  Bird,
  Rabbit
} from "lucide-react";
import { toast } from "sonner";
import { ShadowInner } from "lucide-react";

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    ownerName: "",
    email: "",
    phone: "",
    appointmentType: "",
    symptoms: "",
    preferredTime: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep1 = () => {
    if (!formData.petName || !formData.petType || !formData.ownerName) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const validateStep3 = () => {
    if (!formData.appointmentType || !date || !formData.preferredTime) {
      toast.error("Please select appointment type, date and preferred time");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Move to success step
      window.scrollTo(0, 0);
    }, 1500);
  };

  const getPetTypeIcon = () => {
    switch (formData.petType) {
      case "dog":
        return <Dog className="h-10 w-10 text-blue-600" />;
      case "cat":
        return <Cat className="h-10 w-10 text-blue-600" />;
      case "bird":
        return <Bird className="h-10 w-10 text-blue-600" />;
      case "rabbit":
        return <Rabbit className="h-10 w-10 text-blue-600" />;
      default:
        return <PawPrint className="h-10 w-10 text-blue-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16 px-4 animate-fade-in">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Book a Veterinary Appointment</h1>
            <div className="flex justify-center">
              <p className="text-gray-600 max-w-2xl mx-auto border-b-2 border-blue-200 pb-4">
                Schedule a visit with our veterinary professionals to ensure your pet receives the best care possible.
              </p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                    step === i ? "border-blue-600 bg-blue-600 text-white" : 
                    step > i ? "border-green-500 bg-green-500 text-white" : 
                    "border-gray-300 bg-white text-gray-500"
                  )}
                >
                  {step > i ? <CheckCircle className="h-6 w-6" /> : i}
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-blue-600 transition-all" 
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className={cn("transition-colors duration-300", step >= 1 ? "text-blue-600 font-medium" : "text-gray-500")}>Pet Information</span>
              <span className={cn("transition-colors duration-300", step >= 2 ? "text-blue-600 font-medium" : "text-gray-500")}>Contact Details</span>
              <span className={cn("transition-colors duration-300", step >= 3 ? "text-blue-600 font-medium" : "text-gray-500")}>Appointment Details</span>
              <span className={cn("transition-colors duration-300", step >= 4 ? "text-blue-600 font-medium" : "text-gray-500")}>Confirmation</span>
            </div>
          </div>
          
          <Card className="border shadow-lg animate-fade-in bg-white">
            {step === 1 && (
              <>
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <PawPrint className="h-5 w-5 text-blue-600" />
                    Pet Information
                  </CardTitle>
                  <CardDescription>
                    Tell us about your pet who needs the appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="petName" className="font-medium text-gray-700">Pet Name *</Label>
                        <div className="relative">
                          <PawPrint className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="petName"
                            placeholder="Max"
                            value={formData.petName}
                            onChange={(e) => handleChange("petName", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="petType" className="font-medium text-gray-700">Pet Type *</Label>
                        <Select
                          value={formData.petType}
                          onValueChange={(value) => handleChange("petType", value)}
                        >
                          <SelectTrigger id="petType" className="w-full">
                            <SelectValue placeholder="Select pet type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dog">
                              <div className="flex items-center gap-2">
                                <Dog className="h-4 w-4" />
                                <span>Dog</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="cat">
                              <div className="flex items-center gap-2">
                                <Cat className="h-4 w-4" />
                                <span>Cat</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="bird">
                              <div className="flex items-center gap-2">
                                <Bird className="h-4 w-4" />
                                <span>Bird</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="rabbit">
                              <div className="flex items-center gap-2">
                                <Rabbit className="h-4 w-4" />
                                <span>Rabbit</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="other">
                              <div className="flex items-center gap-2">
                                <PawPrint className="h-4 w-4" />
                                <span>Other</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ownerName" className="font-medium text-gray-700">Owner's Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="ownerName"
                          placeholder="John Doe"
                          value={formData.ownerName}
                          onChange={(e) => handleChange("ownerName", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 bg-gray-50 -mx-6 px-6 py-3 mt-6 border-t text-sm text-gray-600">
                    Fields marked with * are required
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end bg-gray-50 border-t px-6 py-4">
                  <Button 
                    onClick={nextStep} 
                    className="bg-blue-600 hover:bg-blue-700 gap-2"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </>
            )}
            
            {step === 2 && (
              <>
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Contact Details
                  </CardTitle>
                  <CardDescription>
                    Please provide your contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium text-gray-700">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-medium text-gray-700">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 bg-blue-50 -mx-6 px-6 py-3 mt-6 rounded-md text-blue-600 flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Privacy Note</p>
                      <p className="text-sm text-blue-700">Your contact information will only be used to confirm your appointment and provide important updates.</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 bg-gray-50 -mx-6 px-6 py-3 mt-6 border-t text-sm text-gray-600">
                    Fields marked with * are required
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 border-t px-6 py-4">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous Step
                  </Button>
                  <Button 
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 gap-2"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </>
            )}
            
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Appointment Details
                  </CardTitle>
                  <CardDescription>
                    Choose appointment type, date and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="appointmentType" className="font-medium text-gray-700">Appointment Type *</Label>
                      <Select
                        value={formData.appointmentType}
                        onValueChange={(value) => handleChange("appointmentType", value)}
                      >
                        <SelectTrigger id="appointmentType">
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checkup">Regular Checkup</SelectItem>
                          <SelectItem value="vaccination">Vaccination</SelectItem>
                          <SelectItem value="illness">Illness/Injury</SelectItem>
                          <SelectItem value="dental">Dental Care</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                          <SelectItem value="grooming">Grooming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Preferred Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              // Disable past dates and Sundays
                              return date < today || date.getDay() === 0;
                            }}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="font-medium text-gray-700">Preferred Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => handleChange("preferredTime", value)}
                      >
                        <SelectTrigger id="preferredTime" className="w-full pl-10">
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="symptoms" className="font-medium text-gray-700">Reason for Visit / Symptoms</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="symptoms"
                        placeholder="Please describe the reason for your visit or any symptoms your pet is experiencing..."
                        value={formData.symptoms}
                        onChange={(e) => handleChange("symptoms", e.target.value)}
                        className="min-h-[120px] pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 bg-gray-50 -mx-6 px-6 py-3 mt-6 border-t text-sm text-gray-600">
                    Fields marked with * are required
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 border-t px-6 py-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous Step
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? "Submitting..." : "Book Appointment"}
                  </Button>
                </CardFooter>
              </form>
            )}
            
            {step === 4 && (
              <>
                <CardHeader className="text-center bg-green-50 border-b">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-600">Appointment Booked!</CardTitle>
                  <CardDescription>
                    Your appointment has been scheduled successfully
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
                      {getPetTypeIcon()}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 space-y-4">
                    <h3 className="font-bold text-lg text-blue-700 border-b border-blue-200 pb-2">Appointment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <PawPrint className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium">Pet</p>
                          <p className="text-sm">{formData.petName} ({formData.petType})</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium">Owner</p>
                          <p className="text-sm">{formData.ownerName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium">Date & Time</p>
                          <p className="text-sm">{date ? format(date, "PPP") : ""} at {formData.preferredTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium">Service</p>
                          <p className="text-sm">{formData.appointmentType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pt-2 border-t border-blue-200 mt-2">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">PetClinic Main Office, 123 Pet Care Street</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-6">
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start gap-2">
                      <Info className="h-5 w-5 text-yellow-600 mt-1" />
                      <div>
                        <p className="font-medium text-yellow-700">What's Next?</p>
                        <p className="text-sm text-yellow-600">
                          A confirmation email has been sent to {formData.email}. If you need to make any changes to your appointment, please contact our office at least 24 hours in advance.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center bg-gray-50 border-t px-6 py-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700" 
                    onClick={() => window.location.href = "/"}
                  >
                    Return to Home
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
          
          {/* Information Cards */}
          {step < 4 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" /> 
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-1">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-1">
                    <li className="flex justify-between">
                      <span>Phone:</span>
                      <span>(555) 123-4567</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Email:</span>
                      <span>info@petclinic.com</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Emergency:</span>
                      <span>(555) 987-6543</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    What to Bring
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-1">
                    <li>• Previous medical records (if available)</li>
                    <li>• Current medications</li>
                    <li>• Pet's vaccination history</li>
                    <li>• List of any questions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;
