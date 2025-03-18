
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Home, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { toast } from "sonner";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && !localStorage.getItem("isLoggedIn")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = () => {
    logout();
    toast.success("You have been signed out", {
      duration: 3000,
    });
    navigate("/login");
  };

  // Preserve authentication when navigating to main page
  const navigateToMainPage = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background theme-transition">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="px-4 py-2 border-b flex items-center justify-between">
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
              <ShoppingCart size={16} />
              Main Page
            </Button>
          </div>
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
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
