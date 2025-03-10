
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import NotFound from "./pages/NotFound";
import ProjectIdeaGenerator from "./components/ProjectIdeaGenerator";
import { Demo } from "./components/Demo";
import {SignedOut,SignedIn} from '@clerk/clerk-react' 

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
         
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 flex flex-col">
              <SignedIn>
              <Routes>
                 <Route path="/generate" element={<ProjectIdeaGenerator />} />
                 <Route path="/full" element={<Demo />} />
                 
                  </Routes>
              </SignedIn>


               <SignedOut>
               <Routes>
                 <Route path="/" element={<Index />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="*" element={<NotFound />} />
                 </Routes>
               </SignedOut>
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                 
              
              </main>
            </div>
          
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
