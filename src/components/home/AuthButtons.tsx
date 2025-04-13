
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onItemClick?: () => void;
  mobile?: boolean;
}

export function AuthButtons({ isAuthenticated, onItemClick, mobile = false }: AuthButtonsProps) {
  const { t } = useLanguage();
  
  if (mobile) {
    return (
      <div className="flex space-x-2">
        <Link to="/login" className="flex-1">
          <Button className="w-full" variant="ghost" onClick={onItemClick}>
            {t("login")}
          </Button>
        </Link>
        <Link to="/register" className="flex-1">
          <Button className="w-full" onClick={onItemClick}>
            {t("signUp")}
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <Link to="/login">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <LogIn className="h-4 w-4" />
          {t("login")}
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm" className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          {t("signUp")}
        </Button>
      </Link>
    </>
  );
}

export default AuthButtons;
