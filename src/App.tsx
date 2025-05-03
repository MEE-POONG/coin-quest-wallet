
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Gifts from "./pages/Gifts";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";
import React from "react"; 

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

export default App;
