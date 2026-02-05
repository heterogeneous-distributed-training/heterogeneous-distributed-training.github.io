import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

// 定义菜单结构类型
type MenuItem = {
  title: string;
  href: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

// 更新后的目录结构
const sidebarItems: MenuSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Installation", href: "/getting-started/installation" },
      { title: "Quick Start", href: "/getting-started/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Architecture", href: "/concepts/architecture" },
      { title: "Data Flow", href: "/concepts/data-flow" },
      { title: "Configuration", href: "/concepts/configuration" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Basic Usage", href: "/guides/basic" },
      { title: "Advanced Features", href: "/guides/advanced" },
      { title: "Best Practices", href: "/guides/best-practices" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Client API", href: "/api/client" },
      { title: "Server API", href: "/api/server" },
      { title: "Types", href: "/api/types" },
    ],
  },
];

export function DocsLayout({ children }: DocsLayoutProps) {
  const [location] = useLocation();
  
  // 状态管理：记录哪些 section 是展开的
  // 默认全部展开
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    sidebarItems.reduce((acc, section) => ({ ...acc, [section.title]: true }), {})
  );

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header - Visible only on small screens */}
      <div className="md:hidden border-b p-4 flex items-center justify-between bg-background sticky top-0 z-50">
        <div className="font-bold text-lg text-primary">HDT Docs</div>
      </div>

      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <aside className="hidden md:block w-64 border-r bg-sidebar fixed h-screen overflow-hidden left-0 top-0 z-40">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <Link href="/">
              <div className="font-bold text-xl text-primary cursor-pointer">
                HDT Docs
              </div>
            </Link>
            <div className="text-xs text-muted-foreground mt-1">
              Documentation v1.0
            </div>
          </div>
          
          <ScrollArea className="flex-1 py-4">
            <div className="px-3 space-y-1">
              {sidebarItems.map((section, i) => (
                <div key={i} className="mb-2">
                  {/* 一级标题 - 可点击折叠 */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-foreground/90 hover:bg-muted/50 rounded-md transition-colors group"
                  >
                    <span>{section.title}</span>
                    {expandedSections[section.title] ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    )}
                  </button>
                  
                  {/* 二级菜单 - 根据状态显示/隐藏 */}
                  {expandedSections[section.title] && (
                    <div className="mt-1 ml-2 space-y-0.5 border-l pl-2 border-border/50">
                      {section.items.map((item, j) => (
                        <Link key={j} href={item.href}>
                          <div
                            className={cn(
                              "px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer block truncate",
                              location === item.href
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                          >
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t text-xs text-muted-foreground flex justify-between items-center">
            <span>© 2026 HDT Team</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <div className="container max-w-4xl py-10 md:py-12 lg:py-16 px-6 md:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}
