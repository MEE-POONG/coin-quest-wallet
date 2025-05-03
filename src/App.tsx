import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { startProgress, doneProgress } from "./utils/nprogress";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Gifts from "./pages/Gifts";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance in a React component
const App = () => {
  // Create QueryClient inside the component to ensure React is in scope
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ProgressBar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// Progress bar component
const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    startProgress();
    const timer = setTimeout(() => {
      doneProgress();
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default App;
