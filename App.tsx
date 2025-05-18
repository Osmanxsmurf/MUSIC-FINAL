import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/not-found";
import DiscoverPage from "@/pages/discover";
import LibraryPage from "@/pages/library";
import AssistantPage from "@/pages/assistant";
import ProfilePage from "@/pages/profile";
import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/service-worker";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={AssistantPage} />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/library" component={LibraryPage} />
        <Route path="/library/liked" component={LibraryPage} />
        <Route path="/library/recent" component={LibraryPage} />
        <Route path="/library/playlists" component={LibraryPage} />
        <Route path="/assistant" component={AssistantPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  // Register service worker for PWA capabilities
  useEffect(() => {
    registerServiceWorker().catch(error => {
      console.error("Service worker registration failed:", error);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="muzikai_theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
