import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resume" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Resume Refiner</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
            <Route path="/portfolio" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Portfolio Builder</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
            <Route path="/cover-letter" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Cover Letter Generator</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
            <Route path="/profile" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Profile Settings</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
            <Route path="/help" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Help & Resources</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
