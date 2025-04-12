
import { NavigationMenu } from "./NavigationMenu";
import { AuthButtons } from "./AuthButtons";
import { CartButton } from "./CartButton";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isAuthenticated: boolean;
  cartItemCount: number;
  onClose: () => void;
}

export function MobileMenu({ isAuthenticated, cartItemCount, onClose }: MobileMenuProps) {
  return (
    <div className="md:hidden pt-4 pb-2">
      <div className="flex flex-col space-y-4">
        <NavigationMenu onItemClick={onClose} mobile={true} />
        
        <Separator className="my-2" />
        
        <div className="pt-2">
          <AuthButtons 
            isAuthenticated={isAuthenticated} 
            onItemClick={onClose} 
            mobile={true} 
          />
          
          {isAuthenticated && (
            <div className="mt-2 w-full">
              <Link to="/cart" className="w-full">
                <Button 
                  className="w-full flex items-center gap-2" 
                  variant="outline" 
                  onClick={onClose}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({cartItemCount})
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default MobileMenu;
