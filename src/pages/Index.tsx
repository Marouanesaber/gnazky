
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar, Clock, MapPin, BarChart3, DollarSign } from "lucide-react";
import { AppointmentCalendar } from "@/components/AppointmentCalendar";
import { VaccinationChart } from "@/components/VaccinationChart";
import { PetOwnersTable } from "@/components/PetOwnersTable";
import { AdminPetsTable } from "@/components/AdminPetsTable";

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState("Current Location");
  const [allLocations, setAllLocations] = useState(["All Locations"]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            <MapPin className="inline-block h-4 w-4 mr-1" />
            {currentLocation}
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            <MapPin className="inline-block h-4 w-4 mr-1" />
            {allLocations[0]}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="clinic-card bg-clinic-green/10 border-clinic-green/20 animate-slide-in [animation-delay:100ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-green/20">
              <Calendar className="h-5 w-5 text-clinic-green" />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-xs text-muted-foreground">All Visits</div>
            </div>
          </div>
        </div>
        <div className="clinic-card bg-clinic-blue/10 border-clinic-blue/20 animate-slide-in [animation-delay:200ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-blue/20">
              <Clock className="h-5 w-5 text-clinic-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <div className="text-xs text-muted-foreground">Appointments</div>
            </div>
          </div>
        </div>
        <div className="clinic-card bg-clinic-red/10 border-clinic-red/20 animate-slide-in [animation-delay:300ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-red/20">
              <BarChart3 className="h-5 w-5 text-clinic-red" />
            </div>
            <div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-muted-foreground">Pets</div>
            </div>
          </div>
        </div>
        <div className="clinic-card bg-clinic-purple/10 border-clinic-purple/20 animate-slide-in [animation-delay:400ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-purple/20">
              <DollarSign className="h-5 w-5 text-clinic-purple" />
            </div>
            <div>
              <div className="text-2xl font-bold">GHS 0.00</div>
              <div className="text-xs text-muted-foreground">Total Sales Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div>
        <h2 className="text-xl font-bold mb-4">Appointments Calendar</h2>
        <AppointmentCalendar />
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Vaccination Graph</h2>
        <VaccinationChart />
      </div>

      {/* Tables */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Pet Owners & Their Registered Pets</h2>
          <PetOwnersTable />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Pets Registered by Admin</h2>
          <AdminPetsTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
