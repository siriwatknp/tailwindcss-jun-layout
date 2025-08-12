"use client";

import { useState } from "react";

export default function EdgeSidebarWidthTestPage() {
  const [widths, setWidths] = useState({
    left: "256px",
    right: "300px",
  });

  return (
    <>
      {/* Feature controls */}
      <div className="p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">Sidebar Width Testing</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="left-width" className="block mb-1">
              Left Sidebar Width:
            </label>
            <select
              id="left-width"
              value={widths.left}
              onChange={(e) => setWidths({ ...widths, left: e.target.value })}
              data-testid="left-width-select"
              className="px-3 py-1 border rounded w-full"
            >
              <option value="200px">200px</option>
              <option value="256px">256px</option>
              <option value="300px">300px</option>
              <option value="400px">400px</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="right-width" className="block mb-1">
              Right Sidebar Width:
            </label>
            <select
              id="right-width"
              value={widths.right}
              onChange={(e) => setWidths({ ...widths, right: e.target.value })}
              data-testid="right-width-select"
              className="px-3 py-1 border rounded w-full"
            >
              <option value="200px">200px</option>
              <option value="256px">256px</option>
              <option value="300px">300px</option>
              <option value="400px">400px</option>
            </select>
          </div>
        </div>
      </div>

      {/* Test layout with different sidebar widths */}
      <div className="jun-layout" data-testid="layout-width">
        <header className="jun-header bg-blue-500 text-white">
          <div className="container mx-auto px-4">
            <h1>Sidebar Width Customization Test</h1>
          </div>
        </header>

        {/* Left sidebar with dynamic width */}
        <aside
          className={`jun-edgeSidebar jun-edgeSidebar-permanent ${
            widths.left === "200px" ? "jun-edgeSidebar-w-[200px]" :
            widths.left === "256px" ? "jun-edgeSidebar-w-[256px]" :
            widths.left === "300px" ? "jun-edgeSidebar-w-[300px]" :
            "jun-edgeSidebar-w-[400px]"
          }`}
          data-testid="sidebar-left"
        >
          <div className="jun-edgeContent">
            <div className="p-4 h-full bg-gray-100">
              <h3 className="font-semibold mb-4">Left Sidebar</h3>
              <p className="text-sm text-gray-600" data-testid="left-sidebar-content">
                Current width: {widths.left}
              </p>
              <nav className="mt-4 space-y-2">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Navigation Item 1
                </a>
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Navigation Item 2
                </a>
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Navigation Item 3
                </a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Right sidebar with dynamic width */}
        <aside
          className={`jun-edgeSidebarR jun-edgeSidebarR-permanent ${
            widths.right === "200px" ? "jun-edgeSidebarR-w-[200px]" :
            widths.right === "256px" ? "jun-edgeSidebarR-w-[256px]" :
            widths.right === "300px" ? "jun-edgeSidebarR-w-[300px]" :
            "jun-edgeSidebarR-w-[400px]"
          }`}
          data-testid="sidebar-right"
        >
          <div className="jun-edgeContent">
            <div className="p-4 h-full bg-gray-100">
              <h3 className="font-semibold mb-4">Right Sidebar</h3>
              <p className="text-sm text-gray-600" data-testid="right-sidebar-content">
                Current width: {widths.right}
              </p>
              <div className="mt-4 space-y-2">
                <div className="p-2 bg-white rounded">
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                </div>
                <div className="p-2 bg-white rounded">
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                </div>
                <div className="p-2 bg-white rounded">
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="jun-content">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Main Content Area</h2>
            <p className="mb-4">
              This page tests custom widths for both left and right sidebars.
            </p>
            <p className="text-sm text-gray-600">
              - Sidebars can have different widths<br />
              - Widths can be changed dynamically<br />
              - Content area adjusts to available space<br />
              - Responsive width classes can be used
            </p>
          </div>
        </main>
      </div>

      {/* Responsive width test layout */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-lg font-semibold mb-4 px-4">Responsive Width Test</h2>
        
        <div className="jun-layout" data-testid="layout-responsive">
          <aside
            className="jun-edgeSidebar jun-edgeSidebar-permanent jun-edgeSidebar-w-[200px] md:jun-edgeSidebar-w-[256px] lg:jun-edgeSidebar-w-[300px]"
            data-testid="sidebar-responsive"
          >
            <div className="jun-edgeContent">
              <div className="p-4 h-full bg-gray-100">
                <h3 className="font-semibold mb-2">Responsive Sidebar</h3>
                <p className="text-sm text-gray-600" data-testid="responsive-sidebar-content">
                  Width changes with viewport:<br />
                  - Mobile: 200px<br />
                  - Tablet (md): 256px<br />
                  - Desktop (lg): 300px
                </p>
              </div>
            </div>
          </aside>

          <main className="jun-content">
            <div className="p-4">
              <p>Resize the window to see responsive width changes.</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}