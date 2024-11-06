export default function InsetSidebarWidth() {
  return (
    <div className="w-full max-w-[700px] max-h-[400px] border-4 rounded bg-background overflow-auto">
      <div className="jun-layout jun-layout-h-[400px]">
        <header className="jun-header px-3">Header</header>
        <main className="jun-content">
          <div className="p-3 text-gray-500">
            <div className="mb-8">
              <div className="h-4 w-full bg-muted rounded mb-3"></div>
              <div className="h-4 w-11/12 bg-muted rounded mb-3"></div>
              <div className="h-4 w-3/4 bg-muted rounded"></div>
            </div>
            <div className="mb-8">
              <div className="h-4 w-full bg-muted rounded mb-3"></div>
              <div className="h-4 w-10/12 bg-muted rounded mb-3"></div>
              <div className="h-4 w-4/5 bg-muted rounded"></div>
            </div>
            <div className="mb-8">
              <div className="h-4 w-full bg-muted rounded mb-3"></div>
              <div className="h-4 w-11/12 bg-muted rounded mb-3"></div>
              <div className="h-4 w-3/4 bg-muted rounded"></div>
            </div>
            <div>
              <div className="h-4 w-full bg-muted rounded mb-3"></div>
              <div className="h-4 w-10/12 bg-muted rounded mb-3"></div>
              <div className="h-4 w-4/5 bg-muted rounded"></div>
            </div>
          </div>
          <div className="jun-insetSidebar jun-insetSidebar-w-[220px] lg:jun-insetSidebar-w-[240px]">
            <div className="jun-insetContent">
              <div className="my-3 pl-3 border-l">
                <div className="space-y-4">
                  <div className="h-4 w-32 bg-muted rounded"></div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="jun-footer">
          <div className="p-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <div>© 2024 Company Name</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-foreground">
                  Terms
                </a>
                <a href="#" className="hover:text-foreground">
                  Privacy
                </a>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
