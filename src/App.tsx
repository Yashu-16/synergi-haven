
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Doctors from "./pages/Doctors";
import Assessment from "./pages/Assessment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorProfile from "./pages/DoctorProfile";
import About from "./pages/About";
import DoctorDashboard from "./pages/DoctorDashboard";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Appointments from "./pages/Appointments";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            
            {/* New routes */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/admin" element={<AdminPanel />} />
            
            <Route path="/blog" element={<NotFound />} />
            <Route path="/careers" element={<NotFound />} />
            <Route path="/conditions/*" element={<NotFound />} />
            <Route path="/faq" element={<NotFound />} />
            <Route path="/testimonials" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/privacy" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            <Route path="/sitemap" element={<NotFound />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
