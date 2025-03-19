
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail, Award, Stethoscope, GraduationCap, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Technicians = () => {
  const team = [
    {
      name: "Dr. Emily Johnson",
      role: "Lead Veterinarian",
      specialization: "Small Animal Medicine",
      experience: "12 years",
      education: "University of California, Davis",
      email: "emily.johnson@fluffycare.com",
      phone: "(555) 123-4567",
      color: "bg-blue-100",
      gradient: "from-blue-500 to-cyan-400",
      quote: "Helping pets live their best lives is my passion. I believe in preventative care and client education."
    },
    {
      name: "Dr. Michael Chen",
      role: "Veterinary Surgeon",
      specialization: "Orthopedic Surgery",
      experience: "8 years",
      education: "Cornell University",
      email: "michael.chen@fluffycare.com",
      phone: "(555) 234-5678",
      color: "bg-green-100",
      gradient: "from-green-500 to-emerald-400",
      quote: "I specialize in complex surgeries that improve mobility and quality of life for our animal patients."
    },
    {
      name: "Sarah Wilson",
      role: "Veterinary Technician",
      specialization: "Emergency Care",
      experience: "6 years",
      education: "Purdue University",
      email: "sarah.wilson@fluffycare.com",
      phone: "(555) 345-6789",
      color: "bg-purple-100",
      gradient: "from-purple-500 to-violet-400",
      quote: "My goal is to provide calm, compassionate care for pets during their most stressful moments."
    },
    {
      name: "James Rodriguez",
      role: "Veterinary Assistant",
      specialization: "Animal Behavior",
      experience: "4 years",
      education: "Colorado State University",
      email: "james.rodriguez@fluffycare.com",
      phone: "(555) 456-7890",
      color: "bg-amber-100",
      gradient: "from-amber-500 to-yellow-400",
      quote: "Understanding pet behavior helps us provide better care and helps owners build stronger relationships with their pets."
    },
    {
      name: "Dr. Olivia Park",
      role: "Veterinary Dentist",
      specialization: "Dental Surgery",
      experience: "7 years",
      education: "University of Pennsylvania",
      email: "olivia.park@fluffycare.com",
      phone: "(555) 567-8901",
      color: "bg-red-100",
      gradient: "from-red-500 to-rose-400",
      quote: "Dental health is vital to your pet's overall wellbeing. I'm dedicated to providing pain-free dental care."
    },
    {
      name: "Thomas Wright",
      role: "Pet Nutritionist",
      specialization: "Dietary Management",
      experience: "5 years",
      education: "Ohio State University",
      email: "thomas.wright@fluffycare.com",
      phone: "(555) 678-9012",
      color: "bg-teal-100",
      gradient: "from-teal-500 to-cyan-400",
      quote: "Proper nutrition is the foundation of pet health. I love helping pet parents find the right diet for their companions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.8))] -z-10"></div>
        
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <Link to="/" className="inline-flex items-center text-blue-600 mb-8 transition-all hover:text-blue-800 hover:translate-x-[-5px] duration-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-purple-600 border-purple-200 bg-purple-50">Our Team</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
              Meet Our Expert Technicians
            </h1>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Our team of highly qualified veterinarians and technicians are committed to providing exceptional care for your beloved pets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`h-2 bg-gradient-to-r ${member.gradient}`}></div>
                <CardHeader className="relative pt-8">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <Avatar className="h-16 w-16 border-4 border-white shadow-md">
                      <AvatarFallback className={`bg-gradient-to-r ${member.gradient} text-white`}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center pt-4">
                    <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                    <Badge variant="outline" className={`${member.color} border-0 text-gray-700`}>
                      {member.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm italic mb-4 text-center">"{member.quote}"</p>
                  
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-blue-500" />
                      <p><span className="font-medium">Specialization:</span> {member.specialization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <p><span className="font-medium">Experience:</span> {member.experience}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      <p><span className="font-medium">Education:</span> {member.education}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1 hover:bg-blue-50">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1 hover:bg-blue-50">
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1 hover:bg-blue-50">
                    <span>Profile</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg mb-12 animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Why Choose Our Team?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our veterinary professionals bring a wealth of experience and specialized knowledge to provide the highest quality care for your pets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-100 rounded-lg p-6 text-center hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Certified Experts</h3>
                <p className="text-sm text-gray-600">All our veterinarians are board-certified with specialized training.</p>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-6 text-center hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Years of Experience</h3>
                <p className="text-sm text-gray-600">Our team has over 40 years of combined veterinary experience.</p>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-6 text-center hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Continuing Education</h3>
                <p className="text-sm text-gray-600">We stay updated with the latest advancements in veterinary medicine.</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 sm:justify-between items-center bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl text-white shadow-lg animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold mb-2">Want to join our team?</h3>
              <p className="text-blue-100">We're always looking for talented veterinary professionals to join our growing practice</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Link to="/contact-us">Contact Us</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technicians;
