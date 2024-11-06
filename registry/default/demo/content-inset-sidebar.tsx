export default function ContentInsetSidebarDemo() {
  return (
    <div className="w-full border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[240px] jun-layout-standalone ">
        <main className="jun-content container">
          <div className="jun-insetSidebar border-r bg-sidebar">
            <div className="jun-insetContent flex flex-col gap-2 p-4">
              <div className="h-4 w-[200px] rounded bg-muted" />
              <div className="h-4 w-[150px] rounded bg-muted" />
              <div className="h-4 w-[100px] rounded bg-muted" />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-8 w-32 rounded bg-muted" />
          </div>

          <div className="jun-insetSidebar bg-sidebar border-l">
            <div className="jun-insetContent flex flex-col gap-2 p-4">
              <div className="h-4 w-[200px] rounded bg-muted" />
              <div className="h-4 w-[133px] rounded bg-muted" />
              <div className="h-4 w-[67px] rounded bg-muted" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
