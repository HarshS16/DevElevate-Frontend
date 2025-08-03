import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import ClerkProtectedRoute from "./components/auth/ClerkProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import ClerkAuth from "./pages/ClerkAuth";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<ClerkAuth />} />
        <Route path="/dashboard" element={
          <ClerkProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ClerkProtectedRoute>
        } />
        <Route path="/resume" element={
          <ClerkProtectedRoute>
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Resume Refiner</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          </ClerkProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ClerkProtectedRoute>
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Portfolio Builder</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          </ClerkProtectedRoute>
        } />
        <Route path="/cover-letter" element={
          <ClerkProtectedRoute>
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Cover Letter Generator</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          </ClerkProtectedRoute>
        } />
        <Route path="/profile" element={
          <ClerkProtectedRoute>
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Profile Settings</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          </ClerkProtectedRoute>
        } />
        <Route path="/help" element={
          <ClerkProtectedRoute>
            <AppLayout>
              <div className="p-8 text-center"><h2 className="text-2xl font-bold">Help & Resources</h2><p className="text-muted-foreground mt-2">Coming soon...</p></div>
            </AppLayout>
          </ClerkProtectedRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
