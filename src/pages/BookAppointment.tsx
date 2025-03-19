
import React, { useState } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, MapPin, User, Phone, Mail, PawPrint, FileText, Stethoscope } from "lucide-react";

const BookAppointment = () => {
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      
      // Show success toast
      toast.success("Appointment scheduled successfully!", {
        duration: 5000,
      });
      
      // Clear form data
      setName("");
      setEmail("");
      setPhone("");
      setPetName("");
      setPetType("");
      setAppointmentType("");
      setMessage("");
      setDate(undefined);
    }, 1500);
  };

  const appointmentTypes = [
    { value: "checkup", label: "Regular Check-up" },
    { value: "vaccination", label: "Vaccination" },
    { value: "emergency", label: "Emergency Care" },
    { value: "surgery", label: "Surgery" },
    { value: "dental", label: "Dental Care" },
    { value: "consultation", label: "General Consultation" },
  ];

  const petTypes = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "rabbit", label: "Rabbit" },
    { value: "reptile", label: "Reptile" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-12 container mx-auto px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 animate-fade-in">Book an Appointment</h1>
          <p className="text-gray-600 text-center mb-8 animate-fade-in [animation-delay:200ms]">Schedule a visit for your pet with our experienced veterinarians</p>
          
          {!submitted ? (
            <Card className="border-0 shadow-lg animate-fade-in [animation-delay:300ms]">
              <CardHeader>
                <CardTitle>Appointment Request</CardTitle>
                <CardDescription>Fill out the form below to schedule your pet's appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        Your Name
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="transition-all focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-500" />
                        Email Address
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="transition-all focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-blue-500" />
                        Phone Number
                      </Label>
                      <Input 
                        id="phone" 
                        placeholder="+233 12 345 6789" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="transition-all focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="petName" className="flex items-center">
                        <PawPrint className="h-4 w-4 mr-2 text-blue-500" />
                        Pet's Name
                      </Label>
                      <Input 
                        id="petName" 
                        placeholder="Name of your pet" 
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        required
                        className="transition-all focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="petType" className="flex items-center">
                        <PawPrint className="h-4 w-4 mr-2 text-blue-500" />
                        Pet Type
                      </Label>
                      <Select value={petType} onValueChange={setPetType} required>
                        <SelectTrigger id="petType" className="transition-all focus:border-blue-500">
                          <SelectValue placeholder="Select pet type" />
                        </SelectTrigger>
                        <SelectContent>
                          {petTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="appointmentType" className="flex items-center">
                        <Stethoscope className="h-4 w-4 mr-2 text-blue-500" />
                        Appointment Type
                      </Label>
                      <Select value={appointmentType} onValueChange={setAppointmentType} required>
                        <SelectTrigger id="appointmentType" className="transition-all focus:border-blue-500">
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                        Preferred Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal transition-all focus:border-blue-500",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time" className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        Preferred Time
                      </Label>
                      <Select required>
                        <SelectTrigger id="time" className="transition-all focus:border-blue-500">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                          <SelectItem value="evening">Evening (4:00 PM - 6:00 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      Additional Information
                    </Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide any additional details about your pet's condition" 
                      className="min-h-[120px] transition-all focus:border-blue-500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Booking Appointment..." : "Book Appointment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg animate-fade-in text-center">
              <CardContent className="pt-6 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Appointment Scheduled!</h2>
                <p className="text-gray-600 mb-4">Thank you for booking an appointment with PetClinic.</p>
                <p className="text-gray-600 mb-6">We've sent a confirmation email to your inbox with all the details.</p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  Book Another Appointment
                </Button>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in [animation-delay:500ms]">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Our Location</h3>
                  <p className="text-gray-600">123 Pet Care Street, Accra, Ghana</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Contact Us</h3>
                  <p className="text-gray-600">+233 12 345 6789</p>
                  <p className="text-gray-600">info@petclinic.com</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9am - 7pm</p>
                  <p className="text-gray-600">Saturday: 9am - 5pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;
