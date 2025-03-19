
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
import { CalendarIcon, Clock, MapPin, Phone, User, Mail, Pencil, PawPrint, Info, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16 px-4 animate-fade-in">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-600">Book an Appointment</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Schedule a visit with our veterinary professionals to ensure your pet receives the best care possible.
            </p>
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
              <span className={step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>Pet Information</span>
              <span className={step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>Contact Details</span>
              <span className={step >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}>Appointment Details</span>
              <span className={step >= 4 ? "text-blue-600 font-medium" : "text-gray-500"}>Confirmation</span>
            </div>
          </div>
          
          <Card className="border shadow-md animate-fade-in">
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PawPrint className="h-5 w-5 text-blue-600" />
                    Pet Information
                  </CardTitle>
                  <CardDescription>
                    Tell us about your pet who needs the appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet Name</Label>
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
                    <Label htmlFor="petType">Pet Type</Label>
                    <Select
                      value={formData.petType}
                      onValueChange={(value) => handleChange("petType", value)}
                    >
                      <SelectTrigger id="petType" className="w-full">
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner's Name</Label>
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
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={nextStep}>
                    Next Step
                  </Button>
                </CardFooter>
              </>
            )}
            
            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Contact Details
                  </CardTitle>
                  <CardDescription>
                    Please provide your contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
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
                    <Label htmlFor="phone">Phone Number</Label>
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
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Previous Step
                  </Button>
                  <Button onClick={nextStep}>
                    Next Step
                  </Button>
                </CardFooter>
              </>
            )}
            
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Appointment Details
                  </CardTitle>
                  <CardDescription>
                    Choose appointment type, date and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">Appointment Type</Label>
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
                    <Label>Preferred Date</Label>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Time</Label>
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
                    <Label htmlFor="symptoms">Reason for Visit / Symptoms</Label>
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
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous Step
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Book Appointment"}
                  </Button>
                </CardFooter>
              </form>
            )}
            
            {step === 4 && (
              <>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-600">Appointment Booked!</CardTitle>
                  <CardDescription>
                    Your appointment has been scheduled successfully
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-3">
                    <div className="flex items-start gap-3">
                      <PawPrint className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Pet</p>
                        <p className="text-sm">{formData.petName} ({formData.petType})</p>
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
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">PetClinic Main Office, 123 Pet Care Street</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-center text-sm text-gray-600">
                      A confirmation email has been sent to {formData.email}. If you need to make any changes to your appointment, please contact our office at least 24 hours in advance.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button className="bg-blue-600" onClick={() => window.location.href = "/"}>
                    Return to Home
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;
