
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail, Award, Stethoscope, GraduationCap, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
      color: "bg-blue-100"
    },
    {
      name: "Dr. Michael Chen",
      role: "Veterinary Surgeon",
      specialization: "Orthopedic Surgery",
      experience: "8 years",
      education: "Cornell University",
      email: "michael.chen@fluffycare.com",
      phone: "(555) 234-5678",
      color: "bg-green-100"
    },
    {
      name: "Sarah Wilson",
      role: "Veterinary Technician",
      specialization: "Emergency Care",
      experience: "6 years",
      education: "Purdue University",
      email: "sarah.wilson@fluffycare.com",
      phone: "(555) 345-6789",
      color: "bg-purple-100"
    },
    {
      name: "James Rodriguez",
      role: "Veterinary Assistant",
      specialization: "Animal Behavior",
      experience: "4 years",
      education: "Colorado State University",
      email: "james.rodriguez@fluffycare.com",
      phone: "(555) 456-7890",
      color: "bg-amber-100"
    },
    {
      name: "Dr. Olivia Park",
      role: "Veterinary Dentist",
      specialization: "Dental Surgery",
      experience: "7 years",
      education: "University of Pennsylvania",
      email: "olivia.park@fluffycare.com",
      phone: "(555) 567-8901",
      color: "bg-red-100"
    },
    {
      name: "Thomas Wright",
      role: "Pet Nutritionist",
      specialization: "Dietary Management",
      experience: "5 years",
      education: "Ohio State University",
      email: "thomas.wright@fluffycare.com",
      phone: "(555) 678-9012",
      color: "bg-teal-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">Our Technicians</h1>
          
          <p className="text-gray-600 mb-8 max-w-3xl">
            Meet our experienced team of veterinarians and technicians dedicated to providing the best care for your pets.
            Our professionals are committed to ensuring the health and happiness of all animals.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <div className={`h-8 ${member.color}`}></div>
                <CardHeader className="relative mt-2">
                  <div className="absolute -top-8 left-4">
                    <Avatar className="h-14 w-14 border-4 border-white shadow-sm">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-6">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-gray-500" />
                      <p><span className="font-medium">Specialization:</span> {member.specialization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <p><span className="font-medium">Experience:</span> {member.experience}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <p><span className="font-medium">Education:</span> {member.education}</p>
                    </div>
                    <div className="pt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span className="text-blue-600">Email</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span className="text-blue-600">Call</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between items-center bg-blue-50 p-4 rounded-lg">
            <div>
              <h3 className="text-lg font-bold mb-1">Want to join our team?</h3>
              <p className="text-sm text-gray-600">We're always looking for talented veterinary professionals</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600">
                <Link to="/contact-us" className="text-white">Contact Us</Link>
              </Button>
              <Button variant="outline">
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
