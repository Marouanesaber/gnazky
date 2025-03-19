
import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!formData.email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Your message has been sent successfully!");
    }, 1000);
  };

  return (
    <section className="py-16 px-6 bg-white border-t">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-blue-600 font-medium mb-2">Address</h3>
            <h4 className="text-2xl font-bold mb-6">If you need to find us:</h4>
            
            <h3 className="font-bold mb-2">Stay connected</h3>
            <p className="text-gray-600 mb-6">Stay connected with PetClinic - we are available for your requests at all times.</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:+33746808745" className="text-gray-700 hover:text-blue-600">+33 746 80 8745</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:info@petclinic.com" className="text-gray-700 hover:text-blue-600">info@petclinic.com</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Krakow, Poland</span>
              </div>
            </div>
            
            <h3 className="font-bold mb-3">Drop us a line</h3>
            <p className="text-gray-600 mb-6">
              If you have any query or suggestion, we are open to learning from you! Let's talk, mail us anytime.
            </p>
          </div>
          
          <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input 
                  placeholder="Name" 
                  className="w-full" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input 
                  placeholder="Email" 
                  type="email" 
                  className="w-full" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <textarea 
                  placeholder="Message" 
                  className="w-full rounded-md border border-input bg-background min-h-[120px] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <Button 
                className="w-full bg-blue-600"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
