import { triggerEdgeDrawer } from "@/packages/tailwindcss-jun-layout";
import { PanelRightClose } from "lucide-react";

export default function EdgeSidebarDrawerDemo() {
  return (
    <div className="w-full max-w-[400px] border-4 rounded bg-background overflow-hidden">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <button
            className="jun-edgeDrawerTrigger p-2 ml-1 rounded hover:bg-neutral-200"
            onClick={() =>
              triggerEdgeDrawer({
                sidebarId: "edgeSidebar-drawer-demo", // this is for demo purpose only because the demo page has more than one sidebars.
              })
            }
          >
            <PanelRightClose />
          </button>
        </header>
        <aside
          id="edgeSidebar-drawer-demo"
          className="jun-edgeSidebar jun-edgeSidebar-drawer"
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
