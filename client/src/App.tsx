import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Docs from "./pages/Docs";
import Facts from "./pages/Facts";
import GenericDoc from "./pages/GenericDoc";
import Home from "./pages/Home";
import ReleaseNotes from "./pages/ReleaseNotes";

// 使用 Hash 路由以兼容 GitHub Pages 静态托管
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
      {/* 核心页面 */}
      <Route path="/" component={Home} />
      <Route path="/facts" component={Facts} />
      <Route path="/release-notes" component={ReleaseNotes} />
      <Route path="/docs" component={Docs} />
      
      {/* 
        通配符路由：匹配所有其他文档路径
        注意：wouter 的通配符匹配比较简单，我们这里列举主要的一级路径前缀
        或者直接使用 GenericDoc 作为默认的回退（在 NotFound 之前）
      */}
      <Route path="/getting-started/:sub*" component={GenericDoc} />
      <Route path="/concepts/:sub*" component={GenericDoc} />
      <Route path="/guides/:sub*" component={GenericDoc} />
      <Route path="/api/:sub*" component={GenericDoc} />
      <Route path="/community/:sub*" component={GenericDoc} />
      
      {/* 404 页面 */}
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
