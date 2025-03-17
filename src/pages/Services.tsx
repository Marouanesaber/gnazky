
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Services = () => {
  const petServices = [
    { name: "Wellness Exam", description: "Comprehensive health checkup", price: "$50" },
    { name: "Vaccination", description: "Core and non-core vaccines", price: "$25-45" },
    { name: "Dental Cleaning", description: "Complete dental care", price: "$150" },
    { name: "Surgery", description: "Various surgical procedures", price: "Varies" },
    { name: "Laboratory Testing", description: "Blood work and diagnostics", price: "$75-200" },
    { name: "Microchipping", description: "Pet identification", price: "$45" },
    { name: "Grooming", description: "Bathing, haircuts, nail trim", price: "$40-80" },
    { name: "Boarding", description: "Overnight pet care", price: "$30/night" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Our Services</h1>
          
          <p className="text-gray-600 mb-8">
            At OutstandenVet, we provide comprehensive veterinary care for your beloved pets. 
            Below is a list of our primary services with pricing information.
          </p>

          <div className="overflow-x-auto mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Service</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {petServices.map((service) => (
                  <TableRow key={service.name}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell className="text-right">{service.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <Button className="bg-blue-600">
              <Link to="/book-appointment">Book Appointment</Link>
            </Button>
            <Button variant="outline">
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
