
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const petServices = [
    { 
      name: "Wellness Exam", 
      description: "Comprehensive health checkup including physical examination, weight check, and health history review.", 
      price: "$50",
      features: ["Complete physical examination", "Vital signs check", "Health history review", "Preventive care recommendations"]
    },
    { 
      name: "Vaccination", 
      description: "Core and non-core vaccines to protect your pet from common diseases.", 
      price: "$25-45",
      features: ["Customized vaccination schedule", "DHPP/FVRCP for dogs and cats", "Rabies vaccination", "Vaccination certificate"]
    },
    { 
      name: "Dental Cleaning", 
      description: "Professional dental care including cleaning, polishing, and examination under anesthesia.", 
      price: "$150",
      features: ["Full dental radiographs", "Scaling and polishing", "Fluoride treatment", "Extractions if needed (additional cost)"]
    },
    { 
      name: "Surgery", 
      description: "Various surgical procedures including spay/neuter, tumor removal, and orthopedic procedures.", 
      price: "Varies",
      features: ["Pre-surgical blood work", "Anesthesia monitoring", "Pain management", "Post-op care instructions"]
    },
    { 
      name: "Laboratory Testing", 
      description: "Comprehensive blood work, urinalysis, and other diagnostic testing.", 
      price: "$75-200",
      features: ["Complete blood count", "Chemistry panels", "Thyroid testing", "Rapid results"]
    },
    { 
      name: "Microchipping", 
      description: "Permanent pet identification with registration to national database.", 
      price: "$45",
      features: ["Lifetime registration", "Quick, painless procedure", "Universal scanner detection", "Peace of mind"]
    },
    { 
      name: "Grooming", 
      description: "Professional grooming services including bathing, haircuts, and nail trims.", 
      price: "$40-80",
      features: ["Breed-specific styling", "Ear cleaning", "Nail trimming", "Anal gland expression"]
    },
    { 
      name: "Boarding", 
      description: "Safe, comfortable overnight care for your pet while you're away.", 
      price: "$30/night",
      features: ["Climate-controlled facilities", "Regular exercise", "Medication administration", "Veterinary supervision"]
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
          <h1 className="text-3xl font-bold mb-6">Our Services</h1>
          
          <p className="text-gray-600 mb-8 max-w-3xl">
            At Fluffy Care Vet, we provide comprehensive veterinary care for your beloved pets. 
            Our team of experienced veterinarians offers a wide range of services to keep your pets healthy and happy.
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {petServices.slice(0, 6).map((service) => (
              <Card key={service.name} className="border-t-4 border-t-blue-500">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <Button className="bg-blue-600">
              <Link to="/book-appointment" className="text-white">Book Appointment</Link>
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
