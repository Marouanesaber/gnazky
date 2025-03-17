
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

const Layout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background theme-transition">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="px-4 py-2 border-b flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home size={16} />
              Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ShoppingCart size={16} />
              Main Page
            </Button>
          </Link>
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
