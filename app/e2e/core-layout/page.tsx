export default function CoreLayoutTestPage() {
  return (
    <div className="jun-layout">
      <header className="jun-header" data-testid="header">
        <div className="container mx-auto px-4">
          <h1>Test Header</h1>
        </div>
      </header>

      <main className="jun-content" data-testid="content">
        <div className="container mx-auto px-4">
          <h2>Main Content Area</h2>
          <p>
            This is the main content area for testing core layout functionality.
          </p>
        </div>
      </main>

      <footer className="jun-footer" data-testid="footer">
        <div className="container mx-auto px-4">
          <p>Test Footer Content</p>
        </div>
      </footer>
    </div>
  );
}
