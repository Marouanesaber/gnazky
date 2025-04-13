
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CircleDot,
  Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoplayDelay?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function ImageCarousel({ 
  images, 
  autoplayDelay = 5000, 
  showIndicators = true, 
  showArrows = true,
  className 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Handle automatic transition
  useEffect(() => {
    if (!isPaused && autoplayDelay > 0 && images.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex((currentIndex) => 
          currentIndex === images.length - 1 ? 0 : currentIndex + 1
        );
      }, autoplayDelay);
      
      return () => clearInterval(intervalId);
    }
  }, [autoplayDelay, isPaused, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div 
      className={cn("relative overflow-hidden rounded-xl", className)} 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="w-full flex-shrink-0 relative"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[400px] object-cover"
            />
            {(image.title || image.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm">
                {image.title && <h3 className="text-xl font-bold mb-1">{image.title}</h3>}
                {image.description && <p className="text-sm">{image.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showArrows && images.length > 1 && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
      
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`h-8 w-8 p-0 rounded-full ${
                currentIndex === index 
                  ? "text-white" 
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentIndex === index ? (
                <CircleDot className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
