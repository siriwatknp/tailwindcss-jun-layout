export default function FooterAvoidingViewDemo() {
  return (
    <div className="w-full border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[240px] jun-layout-standalone ">
        <main className="jun-content">
          <div className="text-center mt-2">
            <div className="h-4 w-32 rounded bg-muted mx-auto" />
          </div>

          <div className="jun-insetSidebar jun-insetSidebar-absolute jun-insetSidebar-w-[200px] bg-sidebar">
            <div className="jun-insetContent border-l p-4">
              <div className="h-4 w-32 rounded bg-muted" />
            </div>
          </div>
        </main>
        <footer className="jun-footer">
          <div className="jun-insetAvoidingView p-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
