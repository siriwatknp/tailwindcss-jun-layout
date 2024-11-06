import { docsConfig } from "@/config/docs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocsSidebarNav } from "@/components/sidebar-nav";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container md:gap-6 lg:gap-10">
      <aside className="hidden md:block jun-insetSidebar lg:jun-insetSidebar-w-[250px]">
        <ScrollArea className="h-full pr-6">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  );
}
