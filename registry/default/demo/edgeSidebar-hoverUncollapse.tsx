import { triggerEdgeCollapse } from "@/packages/tailwindcss-jun-layout";
import { PanelLeftClose, PanelRightClose } from "lucide-react";

export default function EdgeSidebarhoverUncollapseDemo() {
  return (
    <div className="w-full border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <div className="p-3">
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        </header>
        <aside
          id="edgeSidebar-hoverUncollapse-demo"
          className="jun-edgeSidebar jun-edgeSidebar-collapsed-w-[80px] jun-edgeSidebar-permanent-hoverUncollapse"
        >
          <div className="jun-edgeContent bg-sidebar">
            <button
              className="jun-edgeCollapseTrigger p-4 hover:bg-neutral-200"
              onClick={(event) =>
                triggerEdgeCollapse({
                  event,
                  sidebarId: "edgeSidebar-hoverUncollapse-demo",
                })
              }
            >
              <PanelRightClose className="jun-edgeCollapsed-visible" />
              <PanelLeftClose className="jun-edgeUncollapsed-visible" />
            </button>
            <div className="p-4 space-y-2">
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
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
