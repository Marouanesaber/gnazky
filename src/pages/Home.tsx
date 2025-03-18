
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, ArrowRight, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b py-4 px-6 bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-blue-600">PetClinic</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-all">Home</Link>
            <Link to="/book-appointment" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Book Appointment</Link>
            <Link to="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Services</Link>
            <Link to="/technicians" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Technicians</Link>
            <Link to="/contact-us" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all">Contact Us</Link>
          </nav>
          <div className="flex gap-2">
            <Link to="/login" className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all">
              Login
            </Link>
            <Link to="/register" className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              <span className="text-blue-600">We Care</span> for<br />your animal
            </h1>
            <p className="text-gray-600 mb-8 max-w-md animate-fade-in [animation-delay:200ms]">
              Standard modern and efficient, affordable healthcare for your pets and other animals. So you don't have experience. Make an Appointment now!
            </p>
            <Link to="/book-appointment" className="animate-fade-in [animation-delay:400ms]">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105">
                Book Now
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 relative animate-fade-in [animation-delay:600ms]">
            <div className="bg-white rounded-2xl shadow-lg p-4 relative z-10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1374"
                alt="Veterinarian with dog"
                className="rounded-xl w-full"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-blue-200 rounded-lg z-0"></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-16 h-16 bg-blue-100 rounded-lg z-0"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-blue-600 font-medium mb-4">Services</h2>
          <h3 className="text-3xl font-bold mb-8">Comprehensive Veterinary Care <br />for Your Beloved Pets</h3>
          <p className="text-gray-600 max-w-2xl mb-10">
            At our veterinary hospital, we provide a wide range of veterinarian services, including routine check-ups, vaccinations, surgeries, and more. Additionally, we offer specialized services to ensure the well-being of your pets.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🏥</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Diagnosis and Treatment</h4>
              <p className="text-gray-600 mb-4">Get all the veterinary services you need in one place, quickly and efficiently to ensure the best care of your pets.</p>
              <Link to="/services" className="text-blue-600 text-sm hover:underline">Discover it →</Link>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🦮</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Comprehensive Solutions</h4>
              <p className="text-gray-600 mb-4">Monitor your pet's health and growth with our comprehensive solutions. We provide everything you need in one place.</p>
              <Link to="/services" className="text-blue-600 text-sm hover:underline">Read More →</Link>
            </div>
            
            {/* Contact Us */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-4">Need help?</h4>
                <p className="text-gray-600 mb-6">If you have any questions about our services, please don't hesitate to contact us.</p>
              </div>
              <div className="flex gap-3">
                <Link to="/contact-us" className="flex-1">
                  <Button variant="outline" className="w-full">Contact Us</Button>
                </Link>
                <Link to="/book-appointment" className="flex-1">
                  <Button className="w-full bg-blue-600">Book a Demo</Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Pet Illustration Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-6 mb-16">
            <div className="md:w-1/3">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1998/1998627.png" 
                alt="Cartoon dog with medical items" 
                className="w-40 h-40 md:w-full md:h-auto object-contain"
              />
            </div>
            <div className="md:w-2/3">
              <h4 className="text-gray-500 uppercase text-sm mb-2">REPORTS</h4>
              <h3 className="text-2xl font-bold mb-4">Access Comprehensive Reports</h3>
              <p className="text-gray-600 mb-6">
                With our veterinary care services, you can easily access detailed reports about your pet's health and growth. All the necessary filters are available to make your specific search.
              </p>
              <Link to="/login" className="text-blue-600 hover:underline flex items-center">
                Sign in or Join OutstandenVet Today <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* Contact Section */}
      <section className="py-16 px-6 bg-white border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-blue-600 font-medium mb-2">Address</h3>
              <h4 className="text-2xl font-bold mb-6">If you need to find us:</h4>
              
              <h3 className="font-bold mb-2">Stay connected</h3>
              <p className="text-gray-600 mb-6">Stay connected with OutstandenVet - we are available for your requests at all times.</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a href="tel:+33746808745" className="text-gray-700 hover:text-blue-600">+33 746 80 8745</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a href="mailto:info@outstandenvet.com" className="text-gray-700 hover:text-blue-600">info@outstandenvet.com</a>
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
              <form className="space-y-4">
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
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center relative">
            <div className="absolute right-5 top-5">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1998/1998627.png" 
                alt="Pet illustration" 
                className="w-16 h-16"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Join <span className="text-blue-600">OutstandenVet</span> Today
            </h2>
            <div className="flex gap-2 mt-4">
              <Input placeholder="Email" className="flex-grow" />
              <Button className="bg-blue-600">Subscribe</Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Read veterinary services in news, only at OutstandenVet
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-1">PetClinic</h3>
            <p className="text-blue-200 text-sm">Providing the best pet healthcare experience</p>
          </div>
          <div className="text-sm text-blue-200">
            © 2023, PetClinic. Powered by Outstanding Technologies.
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f9fafb" className="w-full">
            <path fillOpacity="1" d="M0,64L60,53.3C120,43,240,21,360,32C480,43,600,85,720,90.7C840,96,960,64,1080,53.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>
      </footer>

      {/* Newsletter Banner (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-center">
        <div className="container max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-bold">
            Join <span className="text-blue-600">PetClinic</span> Today
          </h3>
          <div className="flex gap-2">
            <Input placeholder="Email" className="w-48 sm:w-auto" />
            <Button className="bg-blue-600 whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
