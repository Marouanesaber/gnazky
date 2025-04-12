
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle2, LogOut } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onItemClick?: () => void;
  mobile?: boolean;
}

export function AuthButtons({ isAuthenticated, onItemClick, mobile = false }: AuthButtonsProps) {
  const { t } = useLanguage();
  
  if (isAuthenticated) {
    if (mobile) {
      return (
        <div className="flex flex-col space-y-2">
          <Link to="/dashboard" className="w-full">
            <Button className="w-full flex items-center gap-2" variant="ghost" onClick={onItemClick}>
              <UserCircle2 className="h-4 w-4" />
              {t("dashboard")}
            </Button>
          </Link>
          <Link to="/logout" className="w-full">
            <Button className="w-full flex items-center gap-2 bg-red-50 text-red-500 hover:bg-red-100" variant="ghost" onClick={onItemClick}>
              <LogOut className="h-4 w-4" />
              {t("logout")}
            </Button>
          </Link>
        </div>
      );
    }
    
    return (
      <>
        <Link to="/dashboard">
          <Button variant="ghost" className="flex items-center gap-1">
            <UserCircle2 className="h-4 w-4" />
            {t("dashboard")}
          </Button>
        </Link>
        <Link to="/logout">
          <Button variant="ghost" className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </Button>
        </Link>
      </>
    );
  }
  
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
        <Button variant="ghost">{t("login")}</Button>
      </Link>
      <Link to="/register">
        <Button>{t("signUp")}</Button>
      </Link>
    </>
  );
}

export default AuthButtons;
