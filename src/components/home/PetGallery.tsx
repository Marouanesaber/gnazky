
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const petImages = [
  {
    url: "/lovable-uploads/53e5364f-8c3a-4ab4-a79a-201ef7f981b4.png",
    caption: "Happy dog with sunglasses enjoying the summer"
  },
  {
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    caption: "Adorable puppy looking at the camera"
  },
  {
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    caption: "Cute cat with mesmerizing eyes"
  },
  {
    url: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca",
    caption: "Golden retriever puppy enjoying the outdoors"
  },
  {
    url: "https://images.unsplash.com/photo-1437957146754-f6377debe171",
    caption: "Playful dog running through grass"
  },
  {
    url: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
    caption: "Cat relaxing on a comfortable couch"
  }
];

const PetGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goToNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % petImages.length);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? petImages.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? "next" : "prev");
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Auto-advance slides
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  // Reset animation state after transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden rounded-xl max-w-5xl mx-auto my-12 shadow-xl">
      <div className="relative h-[400px] md:h-[500px]">
        {petImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 z-10 transform-none"
                : "opacity-0 z-0 transform " + 
                  (direction === "next" 
                    ? index === (currentIndex + 1) % petImages.length ? "translate-x-full" : "-translate-x-full"
                    : index === (currentIndex - 1 + petImages.length) % petImages.length ? "-translate-x-full" : "translate-x-full")
            }`}
          >
            <img
              src={image.url}
              alt={`Pet ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 animate-fade-in">{image.caption}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {petImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            } transition-all duration-300`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PetGallery;
