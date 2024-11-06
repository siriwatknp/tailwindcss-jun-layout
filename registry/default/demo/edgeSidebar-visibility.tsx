export default function EdgeSidebarVisibilityDemo() {
  return (
    <div className="w-full border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone">
        <header className="jun-header">
          <div className="p-3 flex items-center">
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        </header>
        <aside className="jun-edgeSidebar jun-edgeSidebar-permanent-hidden md:jun-edgeSidebar-permanent-visible">
          <div className="jun-edgeContent bg-sidebar">
            <div className="p-4 space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          </div>
        </aside>
        <main className="jun-content">
          <div className="p-4">
            <div className="h-4 w-48 bg-muted rounded" />
          </div>
        </main>
      </div>
    </div>
  );
}
