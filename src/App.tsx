
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppointmentsPage from "./pages/Appointments";
import ConsultationsPage from "./pages/Consultations";
import VaccinationsPage from "./pages/Vaccinations";
import LaboratoryPage from "./pages/Laboratory";
import SurgeryPage from "./pages/Surgery";
import PetsPage from "./pages/Pets";
import OwnersPage from "./pages/Owners";
import SettingsPage from "./pages/Settings";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pet-clinic-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
              <Route path="/dashboard/consultations" element={<ConsultationsPage />} />
              <Route path="/dashboard/vaccinations" element={<VaccinationsPage />} />
              <Route path="/dashboard/laboratory" element={<LaboratoryPage />} />
              <Route path="/dashboard/surgery" element={<SurgeryPage />} />
              <Route path="/dashboard/pets" element={<PetsPage />} />
              <Route path="/dashboard/owners" element={<OwnersPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
