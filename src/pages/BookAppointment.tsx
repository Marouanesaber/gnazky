
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BookAppointment = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment booked successfully! We'll contact you shortly to confirm.", {
      description: "Thank you for choosing Fluffy Care Vet Clinic!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6 transition-all hover:text-blue-800 hover:translate-x-[-5px] duration-300">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Book an Appointment</h1>
            <p className="text-gray-600 max-w-xl mx-auto">Schedule your pet's visit with our expert veterinarians. Please fill out the form below and we'll confirm your appointment within 24 hours.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <Label htmlFor="fullName" className="group-hover:text-blue-600 transition-colors">FULL NAME *</Label>
                <Input id="fullName" placeholder="Your full name" required 
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="phone" className="group-hover:text-blue-600 transition-colors">PHONE NUMBER *</Label>
                <Input id="phone" placeholder="Your phone number" required 
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <Label htmlFor="email" className="group-hover:text-blue-600 transition-colors">EMAIL ADDRESS *</Label>
                <Input id="email" type="email" placeholder="Your email address" required 
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="petName" className="group-hover:text-blue-600 transition-colors">PET'S NAME *</Label>
                <Input id="petName" placeholder="Your pet's name" required 
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <Label htmlFor="petType" className="group-hover:text-blue-600 transition-colors">TYPE OF PET/ANIMAL *</Label>
                <Select>
                  <SelectTrigger id="petType" className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400">
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent className="animate-fade-in">
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="reptile">Reptile</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="appointmentType" className="group-hover:text-blue-600 transition-colors">APPOINTMENT TYPE *</Label>
                <Select>
                  <SelectTrigger id="appointmentType" className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent className="animate-fade-in">
                    <SelectItem value="examination">Regular Examination</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="dental">Dental Care</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <Label className="group-hover:text-blue-600 transition-colors">PREFERRED DATE *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : "Select appointment date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 animate-fade-in">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="time" className="group-hover:text-blue-600 transition-colors">TIME PREFERENCE *</Label>
                <Select>
                  <SelectTrigger id="time" className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400">
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent className="animate-fade-in">
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 group">
              <Label htmlFor="reason" className="group-hover:text-blue-600 transition-colors">REASON FOR APPOINTMENT *</Label>
              <textarea 
                id="reason"
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                placeholder="Please describe the reason for your appointment"
                required
              ></textarea>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Book Appointment
              </Button>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                By booking an appointment, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
