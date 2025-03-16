
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/consultations" element={<ConsultationsPage />} />
              <Route path="/vaccinations" element={<VaccinationsPage />} />
              <Route path="/laboratory" element={<LaboratoryPage />} />
              <Route path="/surgery" element={<SurgeryPage />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/owners" element={<OwnersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
