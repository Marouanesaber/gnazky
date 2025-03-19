import { Outlet, useNavigate, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Home, Globe, LogOut, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New appointment request", time: "5 minutes ago", read: false },
    { id: 2, message: "Vaccination reminder for Luna", time: "1 hour ago", read: false },
    { id: 3, message: "Lab results ready for Max", time: "3 hours ago", read: false },
  ]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && !localStorage.getItem("isLoggedIn")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = () => {
    navigate("/logout");
  };

  // Preserve authentication when navigating to main page
  const navigateToMainPage = () => {
    // Don't logout - just navigate, keeping authentication state
    navigate("/", { replace: false });
  };

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
    
    if (notifications.every(notification => notification.read)) {
      setHasNotifications(false);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setHasNotifications(false);
    toast.success("All notifications marked as read");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background theme-transition animate-fade-in">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="px-4 py-2 border-b flex items-center justify-between animate-fade-in [animation-delay:200ms]">
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2 transition-all hover:bg-gray-100">
                <Home size={16} />
                Dashboard
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 transition-all hover:bg-blue-100 hover:text-blue-700"
              onClick={navigateToMainPage}
            >
              <Globe size={16} />
              Main Page
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative transition-all hover:bg-blue-100 hover:text-blue-700"
                >
                  <Bell size={18} />
                  {hasNotifications && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-semibold">Notifications</h3>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${notification.read ? 'opacity-70' : ''}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className={`text-sm ${notification.read ? 'font-normal' : 'font-medium'}`}>{notification.message}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="w-full text-blue-600">
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 transition-all hover:bg-red-100 hover:text-red-700"
              onClick={handleSignOut}
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6 animate-fade-in [animation-delay:300ms]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
