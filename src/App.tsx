import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/resume" element={
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Resume Refiner</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          } />
          <Route path="/portfolio" element={
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Portfolio Builder</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          } />
          <Route path="/cover-letter" element={
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Cover Letter Generator</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          } />
          <Route path="/profile" element={
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Profile Settings</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          } />
          <Route path="/help" element={
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Help & Resources</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
