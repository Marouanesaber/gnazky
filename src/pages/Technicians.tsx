import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Globe, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";

const technicianData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Veterinarian",
    speciality: "Surgery, Internal Medicine",
    experience: "15+ years",
    education: "DVM, Cornell University",
    bio: "Dr. Johnson is our senior veterinarian with extensive experience in small animal surgery and internal medicine. She has a special interest in cardiology and orthopedic procedures.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    email: "sarah.johnson@petclinic.com",
    phone: "+1 (555) 123-4567",
    linkedin: "sarahjohnson",
    availability: "Monday-Thursday"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Veterinarian",
    speciality: "Dermatology, Nutrition",
    experience: "8 years",
    education: "DVM, University of California",
    bio: "Dr. Chen specializes in veterinary dermatology and nutrition. He has helped countless pets overcome allergies, skin conditions, and dietary challenges with his innovative treatment approaches.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    email: "michael.chen@petclinic.com",
    phone: "+1 (555) 234-5678",
    linkedin: "michaelchen",
    availability: "Tuesday-Saturday"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Veterinarian",
    speciality: "Exotic Pets, Avian Medicine",
    experience: "10 years",
    education: "DVM, Colorado State University",
    bio: "Dr. Rodriguez is our exotic animal specialist, with extensive training in the care of birds, reptiles, amphibians, and small mammals. She's passionate about educating pet owners on proper care for these unique companions.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    email: "emily.rodriguez@petclinic.com",
    phone: "+1 (555) 345-6789",
    linkedin: "emilyrodriguez",
    availability: "Monday, Wednesday, Friday"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Veterinary Dentist",
    speciality: "Dental Surgery, Oral Health",
    experience: "12 years",
    education: "DVM, University of Pennsylvania",
    bio: "Dr. Wilson is our dental specialist, focusing exclusively on pet oral health. From routine cleanings to complex dental surgeries, he's dedicated to ensuring your pet's mouth stays healthy and pain-free.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    email: "james.wilson@petclinic.com",
    phone: "+1 (555) 456-7890",
    linkedin: "jameswilson",
    availability: "Thursday-Sunday"
  }
];

const Technicians = () => {
  const navigate = useNavigate();

  const handleBookAppointment = (doctorName: string) => {
    toast.success(`Booking appointment with ${doctorName}`);
    navigate("/book-appointment");
  };

  const handleContactDoctor = (email: string) => {
    window.location.href = `mailto:${email}`;
    toast.success("Opening email client");
  };

  const handleCallDoctor = (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast.success("Opening phone dialer");
  };

  const handleLinkedIn = (username: string) => {
    window.open(`https://linkedin.com/in/${username}`, "_blank");
    toast.success("Opening LinkedIn profile");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow pt-24 animate-fade-in">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-6">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600 animate-fade-in">Meet Our Veterinary Team</h1>
            <p className="text-lg text-gray-700 mb-8 animate-fade-in [animation-delay:200ms]">
              Our highly skilled veterinarians and technicians are dedicated to providing the best possible care for your beloved pets.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in [animation-delay:400ms]">
              <Button 
                className="bg-blue-600" 
                onClick={() => navigate("/book-appointment")}
              >
                Book an Appointment
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/services")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
        
        {/* Technicians Grid */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicianData.map((tech, index) => (
                <Card key={tech.id} className="overflow-hidden transition-transform hover:shadow-lg animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="md:flex">
                    <div className="md:w-1/3 h-64 md:h-auto relative">
                      <img 
                        src={tech.image} 
                        alt={tech.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{tech.name}</CardTitle>
                            <CardDescription>{tech.role}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-gray-700">Speciality:</span> {tech.speciality}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-gray-700">Experience:</span> {tech.experience}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-gray-700">Education:</span> {tech.education}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {tech.bio}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <a 
                            href={`mailto:${tech.email}`} 
                            className="text-blue-600 hover:underline" 
                            onClick={(e) => {
                              e.preventDefault();
                              handleContactDoctor(tech.email);
                            }}
                          >
                            {tech.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <a 
                            href={`tel:${tech.phone}`} 
                            className="hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCallDoctor(tech.phone);
                            }}
                          >
                            {tech.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span>Available: {tech.availability}</span>
                        </div>
                        <div className="flex mt-3 space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1"
                            onClick={() => handleLinkedIn(tech.linkedin)}
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 gap-1"
                            onClick={() => handleBookAppointment(tech.name)}
                          >
                            Book Appointment
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 bg-blue-50">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Schedule a Visit?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our veterinary professionals are available to provide excellent care for your pets.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 font-medium py-2 px-6 rounded-full"
              onClick={() => navigate("/book-appointment")}
            >
              Book an Appointment Today
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Technicians;
