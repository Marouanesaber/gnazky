
import React from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedIn, Twitter, Mail, Calendar } from "lucide-react";

interface Technician {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
    email: string;
  };
}

const technicians: Technician[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Veterinarian",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=700",
    bio: "Dr. Sarah has over 15 years of experience in veterinary medicine and specializes in small animal surgery and care.",
    specialties: ["Small Animal Surgery", "Emergency Care", "Preventive Medicine"],
    socials: {
      twitter: "#",
      linkedin: "#",
      email: "sarah@petclinic.com"
    }
  },
  {
    id: 2,
    name: "Dr. Michael Thompson",
    role: "Veterinary Dentist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600&h=700",
    bio: "Dr. Michael focuses on pet dental health and has pioneered several techniques for painless dental procedures.",
    specialties: ["Dental Surgery", "Oral Health", "Preventive Dentistry"],
    socials: {
      twitter: "#",
      linkedin: "#",
      email: "michael@petclinic.com"
    }
  },
  {
    id: 3,
    name: "Dr. Rebecca Owusu",
    role: "Exotic Pet Specialist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600&h=700",
    bio: "Dr. Rebecca is our exotic animal specialist with particular expertise in reptiles, birds, and small mammals.",
    specialties: ["Exotic Animals", "Avian Medicine", "Reptile Care"],
    socials: {
      linkedin: "#",
      email: "rebecca@petclinic.com"
    }
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Veterinary Surgeon",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600&h=700",
    bio: "Dr. James is our lead surgeon with specialized training in orthopedic and soft tissue procedures.",
    specialties: ["Orthopedic Surgery", "Soft Tissue Surgery", "Rehabilitation"],
    socials: {
      twitter: "#",
      linkedin: "#",
      email: "james@petclinic.com"
    }
  },
  {
    id: 5,
    name: "Dr. Lisa Mensah",
    role: "Senior Veterinarian",
    image: "https://images.unsplash.com/photo-1643297654416-05795de01371?auto=format&fit=crop&q=80&w=600&h=700",
    bio: "Dr. Lisa specializes in preventive care and has a particular interest in feline medicine.",
    specialties: ["Feline Medicine", "Preventive Care", "Senior Pet Care"],
    socials: {
      twitter: "#",
      email: "lisa@petclinic.com"
    }
  },
  {
    id: 6,
    name: "Jacob Asante",
    role: "Veterinary Technician",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=700",
    bio: "Jacob is our senior vet tech with over 8 years of experience in animal care and lab procedures.",
    specialties: ["Laboratory Analysis", "Animal Restraint", "Client Education"],
    socials: {
      linkedin: "#",
      email: "jacob@petclinic.com"
    }
  }
];

const Technicians = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-12 container mx-auto px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Meet Our Veterinary Team</h1>
            <p className="text-gray-600 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
              Our team of highly skilled and compassionate veterinarians and technicians are dedicated to providing the best care for your beloved pets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicians.map((tech, index) => (
              <Card 
                key={tech.id} 
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={tech.image} 
                    alt={tech.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">{tech.name}</h3>
                        <div className="flex space-x-2">
                          {tech.socials.twitter && (
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white">
                              <Twitter className="h-4 w-4" />
                            </Button>
                          )}
                          {tech.socials.linkedin && (
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white">
                              <LinkedIn className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{tech.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{tech.role}</p>
                  <p className="text-gray-600 mb-4 text-sm">{tech.bio}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center animate-fade-in [animation-delay:800ms]">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate veterinary professionals to join our growing team at PetClinic.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              View Career Opportunities
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Technicians;
