
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, BarChart3, DollarSign, Users, PawPrint, Beaker, Syringe, Filter, ChevronsUpDown } from "lucide-react";
import { AppointmentCalendar } from "@/components/AppointmentCalendar";
import { VaccinationChart } from "@/components/VaccinationChart";
import { PetOwnersTable } from "@/components/PetOwnersTable";
import { AdminPetsTable } from "@/components/AdminPetsTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AppointmentStats from "@/components/home/AppointmentStats";
import { apiRequest } from "@/utils/api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState("Main Clinic");
  const [allLocations, setAllLocations] = useState(["All Locations"]);
  const [timeRange, setTimeRange] = useState("Today");
  const navigate = useNavigate();
  
  const [dashboardStats, setDashboardStats] = useState({
    visits: "...",
    appointments: "...",
    pets: "...",
    sales: "...",
    loading: true
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Try to get real data
        const appointments = await apiRequest('/appointments', { useCredentials: true })
          .catch(() => null);
        
        const pets = await apiRequest('/pets', { useCredentials: true })
          .catch(() => null);
            
        // Update stats with real data when available
        setDashboardStats({
          visits: appointments?.length?.toString() || "12",
          appointments: appointments?.filter(a => a.status === 'scheduled')?.length?.toString() || "5",
          pets: pets?.length?.toString() || "28",
          sales: "GHS 1,240.00",
          loading: false
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to demo data
        setDashboardStats({
          visits: "12",
          appointments: "5",
          pets: "28",
          sales: "GHS 1,240.00",
          loading: false
        });
      }
    };
    
    fetchDashboardData();
  }, []);

  const quickNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back to your pet clinic management dashboard.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Yesterday">Yesterday</SelectItem>
              <SelectItem value="Last 7 days">Last 7 days</SelectItem>
              <SelectItem value="This month">This month</SelectItem>
              <SelectItem value="Last month">Last month</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Filter className="h-3.5 w-3.5" />
                Filter
                <ChevronsUpDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info("Filter by Status selected")}>
                Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Filter by Species selected")}>
                Species
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Filter by Service Type selected")}>
                Service Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="All Visits"
          value={dashboardStats.visits}
          icon={<Calendar className="h-5 w-5 text-clinic-green" />}
          color="green"
          loading={dashboardStats.loading}
          tooltip="Total number of pet visits recorded"
          trend={{direction: "up", value: "8%", text: "from last week"}}
        />
        <StatsCard 
          title="Appointments" 
          value={dashboardStats.appointments}
          icon={<Clock className="h-5 w-5 text-clinic-blue" />}
          color="blue"
          loading={dashboardStats.loading}
          tooltip="Active scheduled appointments"
          trend={{direction: "down", value: "3%", text: "from yesterday"}}
        />
        <StatsCard 
          title="Pets"
          value={dashboardStats.pets}
          icon={<PawPrint className="h-5 w-5 text-clinic-red" />}
          color="red"
          loading={dashboardStats.loading}
          tooltip="Registered pets in the system"
          trend={{direction: "up", value: "12%", text: "from last month"}}
        />
        <StatsCard 
          title="Total Sales Today"
          value={dashboardStats.sales}
          icon={<DollarSign className="h-5 w-5 text-clinic-purple" />}
          color="purple"
          loading={dashboardStats.loading}
          tooltip="Revenue generated today"
          trend={{direction: "up", value: "5%", text: "from average"}}
        />
      </div>

      {/* Today's Appointments & Vaccinations Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-clinic-blue" />
                Today's Appointments
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => navigate("/dashboard/appointments")}>
                View all
              </Button>
            </div>
            <CardDescription>Summary of today's scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentStats />
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Syringe className="h-5 w-5 text-clinic-green" />
                Recent Vaccinations
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => navigate("/dashboard/vaccinations")}>
                View all
              </Button>
            </div>
            <CardDescription>Summary of recent pet vaccinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-600">5</div>
              <div className="grid grid-cols-2 gap-2">
                <VaccinationStat label="Rabies" count={2} />
                <VaccinationStat label="Distemper" count={1} />
                <VaccinationStat label="Parvovirus" count={1} />
                <VaccinationStat label="Bordetella" count={1} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lightning className="h-5 w-5 text-amber-500" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickAccessCard 
            title="Appointments"
            icon={<Calendar className="h-4 w-4" />}
            path="/dashboard/appointments"
            description="Schedule and manage"
          />
          <QuickAccessCard 
            title="Vaccinations"
            icon={<Syringe className="h-4 w-4" />}
            path="/dashboard/vaccinations"
            description="Track records"
          />
          <QuickAccessCard 
            title="Laboratory"
            icon={<Beaker className="h-4 w-4" />}
            path="/dashboard/laboratory"
            description="Tests and results"
          />
          <QuickAccessCard 
            title="Surgery"
            icon={<Scissors className="h-4 w-4" />}
            path="/dashboard/surgery"
            description="Procedures"
          />
          <QuickAccessCard 
            title="Pets"
            icon={<PawPrint className="h-4 w-4" />}
            path="/dashboard/pets"
            description="Manage pets"
          />
          <QuickAccessCard 
            title="Owners"
            icon={<Users className="h-4 w-4" />}
            path="/dashboard/owners"
            description="Client records"
          />
        </div>
      </div>

      {/* Calendar */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-clinic-blue" />
              Appointments Calendar
            </CardTitle>
            <Select defaultValue="view">
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">Week view</SelectItem>
                <SelectItem value="day">Day view</SelectItem>
                <SelectItem value="month">Month view</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <AppointmentCalendar />
        </CardContent>
      </Card>

      {/* Charts */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ChartIcon className="h-5 w-5 text-clinic-blue" />
              Vaccination Statistics
            </CardTitle>
            <Select defaultValue="month">
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <VaccinationChart />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ActivityIcon className="h-5 w-5 text-clinic-blue" />
              Recent Activity
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem 
              icon={<PawPrint className="h-5 w-5 text-clinic-blue" />}
              title="New pet registered"
              description="Max (Dog) - 30 minutes ago"
              color="blue"
            />
            <ActivityItem 
              icon={<Calendar className="h-5 w-5 text-clinic-green" />}
              title="Appointment scheduled"
              description="Luna (Cat) - 1 hour ago"
              color="green"
            />
            <ActivityItem 
              icon={<Users className="h-5 w-5 text-clinic-purple" />}
              title="New owner registered"
              description="John Doe - 2 hours ago"
              color="purple"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tables */}
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-clinic-blue" />
                Pet Owners & Their Registered Pets
              </CardTitle>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PetOwnersTable />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <PawPrint className="h-5 w-5 text-clinic-blue" />
                Pets Registered by Admin
              </CardTitle>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AdminPetsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Stats Card Component
interface TrendProps {
  direction: 'up' | 'down';
  value: string;
  text: string;
}

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'red' | 'purple' | 'yellow' | 'teal';
  loading: boolean;
  tooltip: string;
  trend?: TrendProps;
}

const StatsCard = ({ title, value, icon, color, loading, tooltip, trend }: StatsCardProps) => {
  const colorClasses = {
    green: 'bg-clinic-green/10 border-clinic-green/20 shadow-sm hover:shadow-md hover:bg-clinic-green/15 transition-all',
    blue: 'bg-clinic-blue/10 border-clinic-blue/20 shadow-sm hover:shadow-md hover:bg-clinic-blue/15 transition-all',
    red: 'bg-clinic-red/10 border-clinic-red/20 shadow-sm hover:shadow-md hover:bg-clinic-red/15 transition-all',
    purple: 'bg-clinic-purple/10 border-clinic-purple/20 shadow-sm hover:shadow-md hover:bg-clinic-purple/15 transition-all',
    yellow: 'bg-clinic-yellow/10 border-clinic-yellow/20 shadow-sm hover:shadow-md hover:bg-clinic-yellow/15 transition-all',
    teal: 'bg-clinic-teal/10 border-clinic-teal/20 shadow-sm hover:shadow-md hover:bg-clinic-teal/15 transition-all',
  };

  const iconBgClasses = {
    green: 'bg-clinic-green/20',
    blue: 'bg-clinic-blue/20',
    red: 'bg-clinic-red/20',
    purple: 'bg-clinic-purple/20',
    yellow: 'bg-clinic-yellow/20',
    teal: 'bg-clinic-teal/20',
  };
  
  const trendIconClasses = {
    up: 'text-emerald-500',
    down: 'text-rose-500',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className={`${colorClasses[color]} cursor-default animate-slide-in [animation-delay:100ms]`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${iconBgClasses[color]}`}>
                  {icon}
                </div>
                <div>
                  {loading ? (
                    <div className="animate-pulse h-12 w-12 bg-gray-200 rounded"></div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{value}</div>
                      <div className="text-xs text-muted-foreground">{title}</div>
                    </>
                  )}
                </div>
              </div>
              {trend && (
                <div className={`flex items-center text-xs ${trendIconClasses[trend.direction]}`}>
                  {trend.direction === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  <span>{trend.value} <span className="text-muted-foreground">{trend.text}</span></span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

// Quick Access Card Component
interface QuickAccessCardProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  description: string;
}

const QuickAccessCard = ({ title, icon, path, description }: QuickAccessCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="transition-all hover:shadow-md cursor-pointer hover:bg-muted/50 group" 
      onClick={() => navigate(path)}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div className="text-sm font-medium mb-0.5">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  );
};

// Vaccination Stat Component
interface VaccinationStatProps {
  label: string;
  count: number;
}

const VaccinationStat = ({ label, count }: VaccinationStatProps) => (
  <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-2 rounded">
    <span className="text-xs">{label}</span>
    <span className="font-medium text-sm">{count}</span>
  </div>
);

// Activity Item Component
interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'green' | 'blue' | 'red' | 'purple' | 'yellow';
}

const ActivityItem = ({ icon, title, description, color }: ActivityItemProps) => {
  const colorClasses = {
    green: 'bg-clinic-green/10',
    blue: 'bg-clinic-blue/10',
    red: 'bg-clinic-red/10',
    purple: 'bg-clinic-purple/10',
    yellow: 'bg-clinic-yellow/10',
  };

  return (
    <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted/50 transition-colors">
      <div className={`rounded-full p-2 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};

// Import additional icons
import { TrendingUp, TrendingDown, Scissors, ChartIcon, ActivityIcon, Lightning } from "lucide-react";

export default Index;
