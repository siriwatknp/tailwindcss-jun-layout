import {
  triggerEdgeDrawerRight,
  triggerEdgeCollapseRight,
} from "@/packages/tailwindcss-jun-layout";
import { Menu, PanelRightClose } from "lucide-react";

export default function EdgeSidebarRightDemo() {
  return (
    <div className="w-full max-w-[400px] border-4 rounded bg-background overflow-hidden">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <button
            className="jun-edgeDrawerTriggerR p-2 ml-1 rounded hover:bg-neutral-200"
            onClick={() =>
              triggerEdgeDrawerRight({
                sidebarId: "edgeSidebar-right-demo", // this is for demo purpose only because the demo page has more than one sidebars.
              })
            }
          >
            <Menu />
          </button>
          <button
            className="jun-edgeCollapseTriggerR p-2 ml-1 rounded hover:bg-neutral-200"
            onClick={(event) =>
              triggerEdgeCollapseRight({
                event,
                sidebarId: "edgeSidebar-right-demo", // this is for demo purpose only because the demo page has more than one sidebars.
              })
            }
          >
            <PanelRightClose />
          </button>
        </header>
        <aside
          id="edgeSidebar-right-demo"
          className="jun-edgeSidebar jun-edgeSidebarR jun-edgeSidebarR-drawer md:jun-edgeSidebarR-permanent"
        >
          <div className="jun-edgeContent bg-sidebar">
            <div className="p-4 space-y-2">
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
