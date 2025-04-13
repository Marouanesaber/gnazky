
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={scrollToTop} 
              size="icon" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg animate-fade-in transition-transform hover:scale-105"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Back to top</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export default BackToTop;
