import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Docs from "./pages/Docs";
import Facts from "./pages/Facts";
import Home from "./pages/Home";
import ReleaseNotes from "./pages/ReleaseNotes";

// 使用 Hash 路由以兼容 GitHub Pages 静态托管
// 这样可以避免刷新页面时出现 404 错误
function HashRouter({ children }: { children: React.ReactNode }) {
  return (
    <WouterRouter hook={useHashLocation}>
      {children}
    </WouterRouter>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/facts" component={Facts} />
      <Route path="/release-notes" component={ReleaseNotes} />
      <Route path="/docs" component={Docs} />
      
      {/* Redirects for sidebar items to existing pages for now */}
      <Route path="/technology/hdt" component={Home} />
      <Route path="/technology/itd" component={Home} />
      <Route path="/community" component={Facts} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
