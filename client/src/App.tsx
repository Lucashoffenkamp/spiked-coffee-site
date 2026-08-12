import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback, lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import CoffeePourIndicator from "./components/CoffeePourIndicator";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import FindUs from "./pages/FindUs";
import About from "./pages/About";
import NominateRoaster from "./pages/NominateRoaster";

// Lazy-loaded pages for better initial bundle size
const Roasters = lazy(() => import("./pages/Roasters"));
const Menu = lazy(() => import("./pages/Menu"));
const Merch = lazy(() => import("./pages/Merch"));
const Journal = lazy(() => import("./pages/Journal"));
const TheGarden = lazy(() => import("./pages/TheGarden"));

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location}>
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/roasters"} component={Roasters} />
            <Route path={"/menu"} component={Menu} />
            <Route path={"/find-us"} component={FindUs} />
            <Route path={"/about"} component={About} />
            <Route path={"/nominate"} component={NominateRoaster} />
            <Route path={"/merch"} component={Merch} />
            <Route path={"/journal"} component={Journal} />
            <Route path={"/the-garden"} component={TheGarden} />
            <Route path={"/404"} component={NotFound} />
            {/* Final fallback route */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
          <CoffeePourIndicator />
          <SmoothScroll>
            <Router />
          </SmoothScroll>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
