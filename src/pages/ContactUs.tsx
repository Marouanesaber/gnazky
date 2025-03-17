
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            This is the Contact Us page. Coming soon!
          </p>
          <form className="space-y-4 max-w-md">
            <div>
              <Input placeholder="Name" className="w-full" />
            </div>
            <div>
              <Input placeholder="Email" type="email" className="w-full" />
            </div>
            <div>
              <textarea 
                placeholder="Message" 
                className="w-full rounded-md border border-input bg-background min-h-[120px] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              ></textarea>
            </div>
            <Button className="w-full bg-blue-600">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
