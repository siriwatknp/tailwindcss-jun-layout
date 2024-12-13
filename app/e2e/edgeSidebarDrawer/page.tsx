"use client";
import { triggerEdgeDrawer } from "@/packages/tailwindcss-jun-layout";

export default function EdgeSidebarDrawerPage() {
  return (
    <div className="jun-layout">
      <header className="jun-header">
        <button
          className="jun-edgeDrawerTrigger"
          aria-label="toggle drawer"
          onClick={() => {
            triggerEdgeDrawer();
          }}
        >
          toggle drawer
        </button>
      </header>
      <aside className="jun-edgeSidebar jun-edgeSidebar-drawer">
        <div className="jun-edgeContent">
          <div>edge sidebar content</div>
        </div>
      </aside>
    </div>
  );
}
