
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
    ? "px-3 py-2 text-gray-700 hover:text-primary transition-colors flex items-center gap-2" 
    : "text-gray-700 hover:text-primary transition-colors flex items-center gap-1.5 font-medium";
  
  const menuItems = [
    { icon: <Home className="h-4 w-4" />, text: t("home"), path: "/" },
    { icon: <ClipboardList className="h-4 w-4" />, text: t("services"), path: "/services" },
    { icon: <ShoppingCart className="h-4 w-4" />, text: t("shop"), path: "/shop" },
    { icon: <Users className="h-4 w-4" />, text: t("technicians"), path: "/technicians" },
    { icon: <Phone className="h-4 w-4" />, text: t("contact"), path: "/contact-us" }
  ];

  return (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${baseClasses} relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
          onClick={onItemClick}
        >
          {item.icon}
          <span>{item.text}</span>
        </Link>
      ))}
    </>
  );
}

export default NavigationMenu;
