import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { ScrollArea } from "./ui/scroll-area";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Project Facts", href: "/facts" },
    ],
  },
  {
    title: "Technology",
    items: [
      { title: "HDT Framework", href: "/technology/hdt" },
      { title: "ITD Algorithm", href: "/technology/itd" },
    ],
  },
  {
    title: "Planning",
    items: [
      { title: "Release Notes", href: "/release-notes" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "/docs" },
      { title: "Community", href: "/community" },
    ],
  },
];

export function DocsLayout({ children }: DocsLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header - Visible only on small screens */}
      <div className="md:hidden border-b p-4 flex items-center justify-between bg-background sticky top-0 z-50">
        <div className="font-bold text-lg text-primary">HDT Framework</div>
        {/* Mobile menu trigger would go here */}
      </div>

      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <aside className="hidden md:block w-64 border-r bg-sidebar fixed h-screen overflow-hidden left-0 top-0 z-40">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <Link href="/">
              <div className="font-bold text-xl text-primary cursor-pointer">
                HDT Framework
              </div>
            </Link>
            <div className="text-xs text-muted-foreground mt-1">
              Heterogeneous Distributed Training
            </div>
          </div>
          
          <ScrollArea className="flex-1 py-4">
            <div className="px-4 space-y-6">
              {sidebarItems.map((section, i) => (
                <div key={i}>
                  <h4 className="mb-2 text-sm font-semibold text-foreground/90 px-2">
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.items.map((item, j) => (
                      <Link key={j} href={item.href}>
                        <div
                          className={cn(
                            "px-2 py-1.5 text-sm rounded-md transition-colors cursor-pointer",
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
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t text-xs text-muted-foreground">
            v1.0.0 Documentation
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <div className="container max-w-4xl py-10 md:py-12 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
