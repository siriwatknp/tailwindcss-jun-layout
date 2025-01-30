import { triggerEdgeDrawer } from "@/packages/tailwindcss-jun-layout";
import { PanelRightClose, PanelLeftClose } from "lucide-react";

export default function EdgeSidebarDrawerDemo() {
  return (
    <div className="w-full max-w-[400px] border-4 rounded bg-background overflow-hidden">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header jun-header-clip">
          <button
            className="jun-edgeDrawerTrigger p-2 ml-1 rounded hover:bg-neutral-200"
            onClick={() =>
              triggerEdgeDrawer({
                sidebarId: "edgeSidebar-drawer-withoutOverlay-demo", // this is for demo purpose only because the demo page has more than one sidebars.
              })
            }
          >
            <PanelLeftClose className="jun-edgeDrawerOpen-visible" />
            <PanelRightClose className="jun-edgeDrawerClosed-visible" />
          </button>
        </header>
        <aside
          id="edgeSidebar-drawer-withoutOverlay-demo"
          className="jun-edgeSidebar jun-edgeSidebar-drawer jun-edgeSidebar-drawer-withoutOverlay"
        >
          <div className="jun-edgeContent bg-sidebar border-r shadow-sm">
            <div className="p-4 space-y-2">
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
          </div>
        </aside>
        <main className="jun-content">
          <div className="p-4 space-y-8">
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-4/5 rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-4/5 rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-4/5 rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
