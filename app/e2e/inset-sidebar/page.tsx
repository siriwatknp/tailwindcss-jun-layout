"use client";

import { useState } from "react";

export default function InsetSidebarPage() {
  const [position, setPosition] = useState<"sticky" | "fixed" | "absolute">(
    "sticky"
  );
  const [width, setWidth] = useState<string>("256px");
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">(
    "right"
  );

  const positionClass =
    position === "sticky"
      ? ""
      : position === "fixed"
        ? "jun-insetSidebar-fixed"
        : "jun-insetSidebar-absolute";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inset Sidebar Test Page</h1>

      {/* Controls */}
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-4">Controls</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Position Mode:</label>
            <select
              data-testid="position-selector"
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              className="px-3 py-2 border rounded"
            >
              <option value="sticky">Sticky (Default)</option>
              <option value="fixed">Fixed</option>
              <option value="absolute">Absolute</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Width:</label>
            <select
              data-testid="width-selector"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="200px">200px</option>
              <option value="256px">256px (Default)</option>
              <option value="300px">300px</option>
              <option value="400px">400px</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Sidebar Position:</label>
            <select
              data-testid="sidebar-position-selector"
              value={sidebarPosition}
              onChange={(e) => setSidebarPosition(e.target.value as any)}
              className="px-3 py-2 border rounded"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>

      {/* Test Layout */}
      <div
        className={`jun-layout ${position === "absolute" ? "jun-layout-standalone" : ""} jun-layout-h-sm`}
        data-testid={`layout-${position}`}
      >
        <header className="jun-header" data-testid="header">
          <div className="px-4 h-full flex items-center">
            <h1>Header - {position} mode</h1>
          </div>
        </header>

        <main className="jun-content" data-testid="main-content">
          {sidebarPosition === "left" && (
            <aside
              className={`jun-insetSidebar jun-insetSidebar-w-[${width}] ${positionClass}`}
              data-testid="inset-sidebar-left"
              style={{ width }}
            >
              <div
                className="jun-insetContent"
                data-testid="inset-content-left"
              >
                <div
                  className="p-4 bg-blue-50 h-full"
                  data-testid="sidebar-content-left"
                >
                  <h3 className="font-semibold mb-4">Left Inset Sidebar</h3>
                  <p>Position: {position}</p>
                  <p>Width: {width}</p>
                  <nav className="mt-4 space-y-2">
                    <div data-testid="nav-item-1">Section 1</div>
                    <div data-testid="nav-item-2">Section 2</div>
                    <div data-testid="nav-item-3">Section 3</div>
                  </nav>
                </div>
              </div>
            </aside>
          )}

          <div className="flex-1 p-8" data-testid="content-area">
            <h2 className="text-xl font-bold mb-4">Main Content Area</h2>
            <p className="mb-4">
              This content area demonstrates the inset sidebar integration. The
              sidebar should be positioned {sidebarPosition} with {position}{" "}
              positioning.
            </p>

            {/* Generate long content for scroll testing */}
            <div data-testid="scrollable-content">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="mb-4 p-4 bg-gray-50 rounded"
                  data-testid={`content-block-${i}`}
                >
                  <h3 className="font-semibold">Content Block {i + 1}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {sidebarPosition === "right" && (
            <aside
              className={`jun-insetSidebar jun-insetSidebar-w-[${width}] ${positionClass}`}
              data-testid="inset-sidebar-right"
              style={{ width }}
            >
              <div
                className="jun-insetContent"
                data-testid="inset-content-right"
              >
                <div
                  className="p-4 bg-green-50 h-full"
                  data-testid="sidebar-content-right"
                >
                  <h3 className="font-semibold mb-4">Right Inset Sidebar</h3>
                  <p>Position: {position}</p>
                  <p>Width: {width}</p>
                  <nav className="mt-4 space-y-2">
                    <div data-testid="toc-item-1">Section 1</div>
                    <div data-testid="toc-item-2">Section 2</div>
                    <div data-testid="toc-item-3">Section 3</div>
                  </nav>
                </div>
              </div>
            </aside>
          )}
        </main>

        {position === "absolute" && (
          <footer className="jun-footer" data-testid="footer">
            <div className="jun-insetAvoidingView">
              <div className="px-4 py-4">
                Footer with insetAvoidingView (for absolute mode)
              </div>
            </div>
          </footer>
        )}
      </div>

      {/* Responsive Test Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Responsive Visibility Test</h2>
        <div
          className="jun-layout jun-layout-h-sm"
          data-testid="layout-responsive"
        >
          <header className="jun-header">
            <div className="px-4 h-full flex items-center">
              <h1>Responsive Header</h1>
            </div>
          </header>

          <main className="jun-content">
            <aside
              className="jun-insetSidebar hidden md:block jun-insetSidebar-w-[200px] lg:jun-insetSidebar-w-[300px]"
              data-testid="inset-sidebar-responsive"
            >
              <div className="jun-insetContent">
                <div
                  className="p-4 bg-purple-50 h-full"
                  data-testid="sidebar-content-responsive"
                >
                  <h3 className="font-semibold mb-4">Responsive Sidebar</h3>
                  <p>Hidden on mobile</p>
                  <p>200px on tablet</p>
                  <p>300px on desktop</p>
                </div>
              </div>
            </aside>

            <div className="flex-1 p-8">
              <h2 className="text-xl font-bold mb-4">Responsive Content</h2>
              <p>
                The inset sidebar should be hidden on mobile, 200px wide on
                tablet, and 300px wide on desktop.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
