export default function InsetSidebarAbsolute() {
  return (
    <div className="w-full max-w-[700px] border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[400px] jun-layout-standalone">
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
          <div className="jun-insetSidebar jun-insetSidebar-absolute jun-insetSidebar-w-[220px] lg:jun-insetSidebar-w-[240px]">
            <div className="jun-insetContent bg-sidebar border-l">
              <div className="my-3 pl-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Table of Contents</div>
                  <div className="space-y-1">
                    {Array.from({ length: 20 }, (_, i) => (
                      <a
                        key={i}
                        href={`#section-${i + 1}`}
                        className="block text-sm text-muted-foreground hover:text-foreground"
                      >
                        {i + 1}. Section {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="jun-footer">
          <div className="jun-insetAvoidingView">
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
          </div>
        </footer>
      </div>
    </div>
  );
}
