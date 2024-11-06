export default function HeaderClipDemo() {
  return (
    <div className="w-full border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[300px] jun-layout-standalone ">
        <header className="jun-header jun-header-clip flex items-center px-4">
          <div className="h-4 w-24 rounded bg-muted" />
        </header>
        <aside className="jun-edgeSidebar">
          <div className="jun-edgeContent bg-sidebar flex flex-col gap-2 p-4">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>
        </aside>
        <aside className="jun-edgeSidebar jun-edgeSidebarR">
          <div className="jun-edgeContent bg-sidebar flex flex-col gap-2 p-4">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-4 w-1/3 rounded bg-muted" />
          </div>
        </aside>
        <main className="jun-content flex items-center justify-center">
          <div className="h-8 w-32 rounded bg-muted" />
        </main>
      </div>
    </div>
  );
}
