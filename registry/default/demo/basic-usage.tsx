export default function BasicUsageDemo() {
  return (
    <div className="w-full border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[400px] jun-layout-standalone overflow-hidden">
        <header className="jun-header">
          <div className="p-3 flex items-center justify-between">
            <div className="h-4 w-32 bg-muted rounded"></div>
            <nav className="flex gap-4 ml-2">
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
            </nav>
          </div>
        </header>
        <aside className="jun-edgeSidebar">
          <div className="jun-edgeContent bg-sidebar">
            <nav className="p-4 space-y-2">
              <div className="p-2 h-8 bg-muted rounded"></div>
              <div className="p-2 h-8 bg-muted rounded"></div>
              <div className="p-2 h-8 bg-muted rounded"></div>
            </nav>
          </div>
        </aside>
        <main className="jun-content">
          <div className="p-4">
            <div className="h-8 w-48 bg-muted rounded mb-4"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </main>
        <footer className="jun-footer">
          <div className="p-3 flex items-center justify-between">
            <div className="h-4 w-32 bg-muted rounded"></div>
            <div className="flex gap-4">
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
