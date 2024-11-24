import { triggerEdgeCollapse } from "@/packages/tailwindcss-jun-layout";
import {
  Database,
  Apple,
  Bell,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";

export default function SidebarMenuGroupTextDemo() {
  return (
    <div className="w-full border-4 rounded bg-background max-w-[500px]">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <div className="p-3">
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        </header>
        <aside
          id="sidebar-menu-groupText-demo"
          className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[52px]"
        >
          <div className="jun-edgeContent bg-sidebar">
            <button
              className="jun-edgeCollapseTrigger p-4 hover:bg-neutral-200"
              onClick={(event) =>
                triggerEdgeCollapse({
                  event,
                  sidebarId: "sidebar-menu-groupText-demo",
                })
              }
            >
              <PanelRightClose className="jun-edgeCollapsed-visible" />
              <PanelLeftClose className="jun-edgeUncollapsed-visible" />
            </button>

            <div className="jun-sidebarMenu">
              {[
                <Database key="1" className="w-6 h-6 jun-sidebarIcon" />,
                <Apple key="2" className="w-6 h-6 jun-sidebarIcon" />,
                <Bell key="3" className="w-6 h-6 jun-sidebarIcon" />,
              ].map((icon, index) => (
                <button
                  key={index}
                  className="jun-sidebarMenuButton jun-sidebarMenuButton-spacing-3.5 rounded-none items-start"
                >
                  {icon}
                  <div className="jun-sidebarGroupText">
                    <div className="flex flex-col">
                      <span className="text-[1rem]">Primary text</span>
                      <span className="text-muted-foreground jun-sidebarText">
                        Secondary text a very long text
                      </span>
                      <span className="text-muted-foreground jun-sidebarText">
                        Tertiary text
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
        <main className="jun-content">
          <div className="p-4">
            <div className="h-4 w-48 rounded bg-muted" />
          </div>
        </main>
      </div>
    </div>
  );
}
