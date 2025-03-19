
import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-blue-600 font-medium text-center mb-4">Testimonials</h2>
        <h3 className="text-3xl font-bold text-center mb-10">More than 2 Hundred happy<br />Customers and counting</h3>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-4">
              Don't just take our word for it. Here's what some of our satisfied customers have to say about their experience at OutstandenVet.
            </p>
          </div>
          <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-gray-500 text-sm">Pet Owner</p>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-blue-500 text-blue-500" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">
              "OutstandenVet is all you can ask for. The perfect fit for all your pet care needs!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
