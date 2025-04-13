
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Stethoscope,
  Syringe,
  Beaker,
  Scissors,
  PawPrint,
  Users,
  Settings,
  Globe,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Sidebar() {
  const { userProfile } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <aside className={`sidebar h-screen flex flex-col bg-sidebar dark:bg-sidebar backdrop-blur-lg border-r border-border overflow-y-auto shrink-0 theme-transition animate-slide-in transition-all duration-300 ${
      collapsed ? "w-16" : "w-64"
    }`}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-clinic-blue" />
          {!collapsed && <span className="font-bold text-xl">PetClinic</span>}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <div className="px-3 py-2">
          <h3 className={`mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
            collapsed ? "sr-only" : ""
          }`}>
            Dashboard
          </h3>
          <div className="space-y-1">
            <NavLinkItem 
              to="/dashboard" 
              end={true}
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              collapsed={collapsed}
            />
            <NavLinkItem 
              to="/" 
              icon={<Globe className="h-5 w-5" />}
              label="Main Page"
              collapsed={collapsed}
            />
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h3 className={`mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
            collapsed ? "sr-only" : ""
          }`}>
            Services
          </h3>
          <div className="space-y-1">
            <NavLinkItem 
              to="/dashboard/appointments" 
              icon={<Calendar className="h-5 w-5" />}
              label="Appointments"
              collapsed={collapsed}
            />
            <NavLinkItem 
              to="/dashboard/consultations" 
              icon={<Stethoscope className="h-5 w-5" />}
              label="Consultations"
              collapsed={collapsed}
            />
            <NavLinkItem 
              to="/dashboard/vaccinations" 
              icon={<Syringe className="h-5 w-5" />}
              label="Vaccinations"
              collapsed={collapsed}
            />
            <NavLinkItem 
              to="/dashboard/laboratory" 
              icon={<Beaker className="h-5 w-5" />}
              label="Laboratory"
              collapsed={collapsed}
            />
            <NavLinkItem 
              to="/dashboard/surgery" 
              icon={<Scissors className="h-5 w-5" />}
              label="Surgery"
              collapsed={collapsed}
            />
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h3 className={`mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
            collapsed ? "sr-only" : ""
          }`}>
            Management
          </h3>
          <div className="space-y-1">
            <NavLinkItem 
              to="/dashboard/pets" 
              icon={<PawPrint className="h-5 w-5" />}
              label="Pets"
              collapsed={collapsed}
            />
            <NavLinkItem 
              to="/dashboard/owners" 
              icon={<Users className="h-5 w-5" />}
              label="Owners"
              collapsed={collapsed}
            />
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h3 className={`mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
            collapsed ? "sr-only" : ""
          }`}>
            User
          </h3>
          <div className="space-y-1">
            <NavLinkItem 
              to="/dashboard/profile" 
              icon={<User className="h-5 w-5" />}
              label="Profile"
              collapsed={collapsed}
            />
            <NavLinkItem 
              to="/dashboard/settings" 
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              collapsed={collapsed}
            />
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-border">
        {collapsed ? (
          <div className="flex justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-medium">
                  {userProfile?.name ? getInitials(userProfile.name) : "A"}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                {userProfile?.name || "Admin"}
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <div className="rounded-lg bg-sidebar-accent p-3">
            <p className="text-xs text-muted-foreground">
              Logged in as <span className="font-semibold">{userProfile?.name || "Admin"}</span>
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

interface NavLinkItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
  collapsed: boolean;
}

const NavLinkItem = ({ to, icon, label, end = false, collapsed }: NavLinkItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
         ${isActive
           ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
           : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
         }`
      }
    >
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger className="w-full flex justify-center">
            {icon}
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
};
