
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Technicians = () => {
  const team = [
    {
      name: "Dr. Emily Johnson",
      role: "Lead Veterinarian",
      specialization: "Small Animal Medicine",
      experience: "12 years",
      education: "University of California, Davis"
    },
    {
      name: "Dr. Michael Chen",
      role: "Veterinary Surgeon",
      specialization: "Orthopedic Surgery",
      experience: "8 years",
      education: "Cornell University"
    },
    {
      name: "Sarah Wilson",
      role: "Veterinary Technician",
      specialization: "Emergency Care",
      experience: "6 years",
      education: "Purdue University"
    },
    {
      name: "James Rodriguez",
      role: "Veterinary Assistant",
      specialization: "Animal Behavior",
      experience: "4 years",
      education: "Colorado State University"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Our Technicians</h1>
          
          <p className="text-gray-600 mb-8">
            Meet our experienced team of veterinarians and technicians dedicated to providing the best care for your pets.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <div className="space-y-1 text-gray-600">
                  <p><span className="font-medium">Specialization:</span> {member.specialization}</p>
                  <p><span className="font-medium">Experience:</span> {member.experience}</p>
                  <p><span className="font-medium">Education:</span> {member.education}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="bg-blue-600">
            <Link to="/book-appointment">Book Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Technicians;
