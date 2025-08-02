export default function HeaderClippingTestPage() {
  return (
    <>
      {/* Test 1: No clipping */}
      <div className="jun-layout mb-8" data-testid="layout-no-clip">
        <header
          className="jun-header bg-blue-500 text-white"
          data-testid="header-no-clip"
        >
          <div className="container mx-auto px-4">
            <h2>Header without clipping</h2>
          </div>
        </header>
        <main className="jun-content">
          <div className="container mx-auto px-4">
            <p>Content with full-width header</p>
          </div>
        </main>
      </div>

      {/* Test 2: Both sides clipped */}
      <div className="jun-layout mb-8" data-testid="layout-clip-both">
        <aside className="jun-edgeSidebar jun-edgeSidebar-permanent jun-edgeSidebar-w-64">
          <div className="jun-edgeContent">
            <div className="p-4 bg-gray-200 h-full">Left Sidebar</div>
          </div>
        </aside>
        <aside className="jun-edgeSidebarR jun-edgeSidebarR-permanent jun-edgeSidebarR-w-64">
          <div className="jun-edgeContent">
            <div className="p-4 bg-gray-200 h-full">Right Sidebar</div>
          </div>
        </aside>

        <header
          className="jun-header jun-header-clip bg-green-500 text-white"
          data-testid="header-clip-both"
        >
          <div className="container mx-auto px-4">
            <h2>Header with both sides clipped</h2>
          </div>
        </header>
        <main className="jun-content">
          <div className="container mx-auto px-4">
            <p>Content with clipped header on both sides</p>
          </div>
        </main>
      </div>

      {/* Test 3: Left side clipped only */}
      <div className="jun-layout mb-8" data-testid="layout-clip-left">
        <aside className="jun-edgeSidebar jun-edgeSidebar-permanent jun-edgeSidebar-w-64">
          <div className="jun-edgeContent">
            <div className="p-4 bg-gray-200 h-full">Left Sidebar</div>
          </div>
        </aside>

        <header
          className="jun-header jun-header-clip-left bg-orange-500 text-white"
          data-testid="header-clip-left"
        >
          <div className="container mx-auto px-4">
            <h2>Header with left side clipped</h2>
          </div>
        </header>
        <main className="jun-content">
          <div className="container mx-auto px-4">
            <p>Content with left-clipped header</p>
          </div>
        </main>
      </div>

      {/* Test 4: Right side clipped only */}
      <div className="jun-layout" data-testid="layout-clip-right">
        <aside className="jun-edgeSidebarR jun-edgeSidebarR-permanent jun-edgeSidebarR-w-64">
          <div className="jun-edgeContent">
            <div className="p-4 bg-gray-200 h-full">Right Sidebar</div>
          </div>
        </aside>

        <header
          className="jun-header jun-header-clip-right bg-purple-500 text-white"
          data-testid="header-clip-right"
        >
          <div className="container mx-auto px-4">
            <h2>Header with right side clipped</h2>
          </div>
        </header>
        <main className="jun-content">
          <div className="container mx-auto px-4">
            <p>Content with right-clipped header</p>
          </div>
        </main>
      </div>
    </>
  );
}
