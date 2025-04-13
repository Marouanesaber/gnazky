
import { NavigationMenu } from "./NavigationMenu";
import { AuthButtons } from "./AuthButtons";
import { CartButton } from "./CartButton";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserCircle2, LogOut } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";
import { useAuth } from "@/components/AuthProvider";

interface MobileMenuProps {
  isAuthenticated: boolean;
  cartItemCount: number;
  onClose: () => void;
}

export function MobileMenu({ isAuthenticated, cartItemCount, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const { userProfile } = useAuth();
  
  return (
    <div className="md:hidden pt-4 pb-2">
      {isAuthenticated && userProfile && (
        <div className="flex items-center gap-3 p-3 mb-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="font-medium">{userProfile.name || "User"}</p>
            <p className="text-xs text-gray-500">{userProfile.email || ""}</p>
          </div>
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        <NavigationMenu onItemClick={onClose} mobile={true} />
        
        <Separator className="my-3" />
        
        <div className="pt-1">
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link to="/dashboard" className="w-full">
                <Button 
                  className="w-full flex items-center justify-start gap-2 bg-primary/10 text-primary hover:bg-primary/20"
                  variant="ghost"
                  onClick={onClose}
                >
                  <UserCircle2 className="h-4 w-4" />
                  {t("dashboard")}
                </Button>
              </Link>
              
              <Link to="/cart" className="w-full">
                <Button 
                  className="w-full flex items-center justify-start gap-2"
                  variant="outline"
                  onClick={onClose}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {t("yourCart")} ({cartItemCount})
                </Button>
              </Link>
              
              <Link to="/logout" className="w-full">
                <Button 
                  className="w-full flex items-center justify-start gap-2 border border-gray-200"
                  variant="ghost"
                  onClick={onClose}
                >
                  <LogOut className="h-4 w-4" />
                  {t("logout")}
                </Button>
              </Link>
            </div>
          ) : (
            <AuthButtons 
              isAuthenticated={isAuthenticated} 
              onItemClick={onClose} 
              mobile={true} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
