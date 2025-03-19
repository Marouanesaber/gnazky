
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
import ProfilePage from "./pages/Profile";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import Services from "./pages/Services";
import Technicians from "./pages/Technicians";
import ContactUs from "./pages/ContactUs";
import { AuthProvider } from "./components/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pet-clinic-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/services" element={<Services />} />
              <Route path="/technicians" element={<Technicians />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="appointments" element={<AppointmentsPage />} />
                <Route path="consultations" element={<ConsultationsPage />} />
                <Route path="vaccinations" element={<VaccinationsPage />} />
                <Route path="laboratory" element={<LaboratoryPage />} />
                <Route path="surgery" element={<SurgeryPage />} />
                <Route path="pets" element={<PetsPage />} />
                <Route path="owners" element={<OwnersPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
