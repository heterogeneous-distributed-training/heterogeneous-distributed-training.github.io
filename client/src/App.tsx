import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GenericDoc from "./pages/GenericDoc";
import Introduction from "./pages/Introduction";
import { DocsLayout } from "./components/DocsLayout";

// 使用 Hash 路由以兼容 GitHub Pages 静态托管
function HashRouter({ children }: { children: React.ReactNode }) {
  return (
    <WouterRouter hook={useHashLocation}>
      {children}
    </WouterRouter>
  );
}

// 包装组件：为页面添加 DocsLayout
const withLayout = (Component: React.ComponentType) => {
  return (props: any) => (
    <DocsLayout>
      <Component {...props} />
    </DocsLayout>
  );
};

function AppRoutes() {
  return (
    <Switch>
      {/* 首页现在是 Introduction */}
      <Route path="/" component={withLayout(Introduction)} />
      
      {/* 
        通配符路由：匹配所有其他文档路径
        注意：wouter 的通配符匹配比较简单，我们这里列举主要的一级路径前缀
        或者直接使用 GenericDoc 作为默认的回退（在 NotFound 之前）
      */}
      <Route path="/getting-started/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/concepts/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/guides/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/api/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/community/:sub*" component={withLayout(GenericDoc)} />
      
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
