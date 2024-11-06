import {
  triggerEdgeDrawer,
  triggerEdgeCollapse,
} from "@/packages/tailwindcss-jun-layout";
import { Menu, PanelRightClose } from "lucide-react";

export default function EdgeSidebarResponsiveDemo() {
  return (
    <div className="w-full max-w-[400px] border-4 rounded bg-background overflow-hidden">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <button
            className="jun-edgeDrawerTrigger p-2 ml-1 rounded hover:bg-neutral-200"
            onClick={() =>
              triggerEdgeDrawer({
                sidebarId: "edgeSidebar-responsive-demo",
              })
            }
          >
            <Menu />
          </button>
          <button
            className="jun-edgeCollapseTrigger p-2 ml-1 rounded hover:bg-neutral-200"
            onClick={(event) =>
              triggerEdgeCollapse({
                event,
                sidebarId: "edgeSidebar-responsive-demo",
              })
            }
          >
            <PanelRightClose />
          </button>
        </header>
        <aside
          id="edgeSidebar-responsive-demo"
          className="jun-edgeSidebar jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent"
        >
          <div className="jun-edgeContent bg-sidebar">
            <div className="p-4 space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
