
import { Link } from "react-router-dom";
import { Home, ClipboardList, ShoppingCart, Users, Phone } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";

interface NavigationMenuProps {
  onItemClick?: () => void;
  mobile?: boolean;
}

export function NavigationMenu({ onItemClick, mobile = false }: NavigationMenuProps) {
  const { t } = useLanguage();
  
  const baseClasses = mobile 
    ? "px-2 py-1 text-gray-700 hover:text-primary transition-colors flex items-center gap-2" 
    : "text-gray-700 hover:text-primary transition-colors flex items-center gap-1";
  
  const menuItems = [
    { icon: <Home className="h-4 w-4" />, text: t("home"), path: "/" },
    { icon: <ClipboardList className="h-4 w-4" />, text: t("services"), path: "/services" },
    { icon: <ShoppingCart className="h-4 w-4" />, text: t("shop"), path: "/shop" },
    { icon: <Users className="h-4 w-4" />, text: "Technicians", path: "/technicians" },
    { icon: <Phone className="h-4 w-4" />, text: t("contact"), path: "/contact-us" }
  ];

  return (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={baseClasses}
          onClick={onItemClick}
        >
          {item.icon}
          {item.text}
        </Link>
      ))}
    </>
  );
}

export default NavigationMenu;
