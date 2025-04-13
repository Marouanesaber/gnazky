
import { Bell, Search, Menu, Settings, User, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Main Clinic");
  const [allLocations, setAllLocations] = useState(["All Locations", "Main Clinic", "Downtown Branch", "Westside Clinic"]);
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
      setSidebarVisible(!sidebarVisible);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("You have been signed out", {
      duration: 3000,
    });
    navigate("/logout");
  };

  const navigateToProfile = () => {
    navigate("/dashboard/profile");
  };

  const navigateToSettings = () => {
    navigate("/dashboard/settings");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const changeLocation = (loc: string) => {
    setCurrentLocation(loc);
    setLocationDropdownOpen(false);
    toast.success(`Location changed to ${loc}`);
  };

  // Sample notifications with added types
  const notifications = [
    { id: 1, title: "New appointment", message: "You have a new appointment scheduled for tomorrow", time: "5 minutes ago", read: false, type: "appointment" },
    { id: 2, title: "Lab results ready", message: "Lab results for patient #OVHMS0003 are ready", time: "1 hour ago", read: false, type: "laboratory" },
    { id: 3, title: "System maintenance", message: "Scheduled maintenance at 2 AM", time: "3 hours ago", read: true, type: "system" },
    { id: 4, title: "New pet registration", message: "A new pet has been registered in the system", time: "5 hours ago", read: false, type: "pet" },
  ];

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case "appointment": return <Calendar className="h-4 w-4 text-clinic-blue" />;
      case "laboratory": return <Beaker className="h-4 w-4 text-clinic-purple" />;
      case "system": return <Settings className="h-4 w-4 text-muted-foreground" />;
      case "pet": return <PawPrint className="h-4 w-4 text-clinic-green" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: number) => {
    toast.success("Notification marked as read");
    // In a real app, you would update the notification state
  };

  const markAllAsRead = () => {
    toast.success("All notifications marked as read");
    setNotificationsOpen(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex items-center justify-between theme-transition">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-10 w-10 rounded-full lg:hidden"
          title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="relative max-w-sm lg:min-w-[240px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full max-w-[200px] md:max-w-none rounded-full bg-muted/80 focus:bg-background focus:shadow-sm"
          />
        </div>

        <DropdownMenu open={locationDropdownOpen} onOpenChange={setLocationDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:flex items-center hidden gap-1.5">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{currentLocation}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuLabel>Select Location</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allLocations.map((location) => (
              <DropdownMenuItem 
                key={location}
                className={location === currentLocation ? "bg-primary/5 font-medium" : ""}
                onClick={() => changeLocation(location)}
              >
                {location}
                {location === currentLocation && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <ThemeSwitcher />
          </TooltipTrigger>
          <TooltipContent>Toggle theme</TooltipContent>
        </Tooltip>
        
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative animate-fade-in h-10 w-10 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1.5 h-5 w-5 flex items-center justify-center text-xs font-medium rounded-full bg-clinic-red text-white">{unreadCount}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600 hover:text-blue-800"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-1.5 bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <h5 className="font-medium text-sm">{notification.title}</h5>
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 pl-8">{notification.message}</p>
                    <div className="pl-8">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-blue-600 hover:text-blue-800 h-6 px-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-2 border-t text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs w-full text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setNotificationsOpen(false);
                  navigate("/dashboard/notifications");
                }}
              >
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted/80">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={userProfile?.profilePicture || "https://github.com/shadcn.png"}
                  alt={userProfile?.name || "Admin"}
                />
                <AvatarFallback>
                  {userProfile?.name ? getInitials(userProfile.name) : "AD"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 animate-scale-in" align="end">
            <div className="p-2 border-b">
              <p className="text-sm font-medium">{userProfile?.name || "Admin User"}</p>
              <p className="text-xs text-muted-foreground">{userProfile?.email || "admin@petclinic.com"}</p>
            </div>
            <DropdownMenuItem onClick={navigateToProfile} className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={navigateToSettings} className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-clinic-red" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

import { Calendar, Beaker, PawPrint } from "lucide-react";

