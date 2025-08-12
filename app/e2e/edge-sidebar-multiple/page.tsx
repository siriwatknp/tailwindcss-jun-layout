"use client";

import { useState } from "react";
import { triggerEdgeDrawer, triggerEdgeDrawerRight } from "@/packages/tailwindcss-jun-layout";

export default function EdgeSidebarMultipleTestPage() {
  const [config, setConfig] = useState({
    leftMode: "permanent",
    rightMode: "drawer",
    bothPermanent: false,
  });

  return (
    <>
      {/* Feature controls */}
      <div className="p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">Multiple Sidebars Testing</h2>
        
        <div className="space-y-3">
          <div>
            <label htmlFor="left-mode" className="block mb-1">
              Left Sidebar Mode:
            </label>
            <select
              id="left-mode"
              value={config.leftMode}
              onChange={(e) => setConfig({ ...config, leftMode: e.target.value })}
              data-testid="left-mode-select"
              className="px-3 py-1 border rounded"
            >
              <option value="permanent">Permanent</option>
              <option value="drawer">Drawer</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="right-mode" className="block mb-1">
              Right Sidebar Mode:
            </label>
            <select
              id="right-mode"
              value={config.rightMode}
              onChange={(e) => setConfig({ ...config, rightMode: e.target.value })}
              data-testid="right-mode-select"
              className="px-3 py-1 border rounded"
            >
              <option value="permanent">Permanent</option>
              <option value="drawer">Drawer</option>
            </select>
          </div>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.bothPermanent}
              onChange={(e) => setConfig({ 
                ...config, 
                bothPermanent: e.target.checked,
                leftMode: e.target.checked ? "permanent" : config.leftMode,
                rightMode: e.target.checked ? "permanent" : config.rightMode,
              })}
              data-testid="both-permanent-checkbox"
            />
            Both sidebars permanent
          </label>
        </div>
      </div>

      {/* Test layout with multiple sidebars */}
      <div className="jun-layout" data-testid="layout-multiple">
        <header className="jun-header bg-blue-500 text-white">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {config.leftMode === "drawer" && (
                <button
                  className="jun-edgeDrawerTrigger p-2 hover:bg-blue-600 rounded"
                  data-testid="left-drawer-trigger"
                  onClick={() => triggerEdgeDrawer()}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1>Multiple Sidebars Test</h1>
            </div>
            
            {config.rightMode === "drawer" && (
              <button
                className="jun-edgeDrawerTriggerR p-2 hover:bg-blue-600 rounded"
                data-testid="right-drawer-trigger"
                onClick={() => triggerEdgeDrawerRight()}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </header>

        {/* Left sidebar */}
        <aside
          className={`jun-edgeSidebar jun-edgeSidebar-w-[256px] ${
            config.leftMode === "permanent" 
              ? "jun-edgeSidebar-permanent" 
              : "jun-edgeSidebar-drawer"
          }`}
          data-testid="sidebar-left-multi"
        >
          <div className="jun-edgeContent">
            <div className="p-4 h-full bg-gray-100">
              <h3 className="font-semibold mb-4">Left Sidebar</h3>
              <p className="text-sm text-gray-600 mb-4" data-testid="left-content">
                Mode: {config.leftMode}
              </p>
              <nav className="space-y-2">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Dashboard
                </a>
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Analytics
                </a>
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Reports
                </a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Right sidebar */}
        <aside
          className={`jun-edgeSidebarR jun-edgeSidebarR-w-[300px] ${
            config.rightMode === "permanent" 
              ? "jun-edgeSidebarR-permanent" 
              : "jun-edgeSidebarR-drawer"
          }`}
          data-testid="sidebar-right-multi"
        >
          <div className="jun-edgeContent">
            <div className="p-4 h-full bg-gray-100">
              <h3 className="font-semibold mb-4">Right Sidebar</h3>
              <p className="text-sm text-gray-600 mb-4" data-testid="right-content">
                Mode: {config.rightMode}
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-white rounded">
                  <h4 className="font-medium mb-1">Widget 1</h4>
                  <p className="text-sm text-gray-600">Content goes here</p>
                </div>
                <div className="p-3 bg-white rounded">
                  <h4 className="font-medium mb-1">Widget 2</h4>
                  <p className="text-sm text-gray-600">More content</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="jun-content">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Main Content</h2>
            <p className="mb-4" data-testid="main-content">
              Testing multiple sidebars with different configurations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">Left Sidebar Status</h3>
                <p className="text-sm">Mode: {config.leftMode}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">Right Sidebar Status</h3>
                <p className="text-sm">Mode: {config.rightMode}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Responsive multiple sidebars test */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-lg font-semibold mb-4 px-4">Responsive Multiple Sidebars</h2>
        
        <div className="jun-layout" data-testid="layout-responsive-multi">
          <header className="jun-header bg-green-500 text-white">
            <div className="px-4 flex items-center justify-between">
              <button
                className="jun-edgeDrawerTrigger p-2 hover:bg-green-600 rounded md:hidden"
                data-testid="responsive-left-trigger"
                onClick={() => triggerEdgeDrawer()}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-center flex-1">Responsive Layout</h1>
              <button
                className="jun-edgeDrawerTriggerR p-2 hover:bg-green-600 rounded lg:hidden"
                data-testid="responsive-right-trigger"
                onClick={() => triggerEdgeDrawerRight()}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
                </svg>
              </button>
            </div>
          </header>

          {/* Left: drawer on mobile, permanent on desktop */}
          <aside
            className="jun-edgeSidebar jun-edgeSidebar-w-[256px] jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent"
            data-testid="sidebar-responsive-left"
          >
            <div className="jun-edgeContent">
              <div className="p-4 h-full bg-gray-100">
                <h3 className="font-semibold">Responsive Left</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Drawer on mobile, permanent on desktop
                </p>
              </div>
            </div>
          </aside>

          {/* Right: drawer on mobile/tablet, permanent on desktop */}
          <aside
            className="jun-edgeSidebarR jun-edgeSidebarR-w-[250px] jun-edgeSidebarR-drawer lg:jun-edgeSidebarR-permanent"
            data-testid="sidebar-responsive-right"
          >
            <div className="jun-edgeContent">
              <div className="p-4 h-full bg-gray-100">
                <h3 className="font-semibold">Responsive Right</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Drawer until lg breakpoint
                </p>
              </div>
            </div>
          </aside>

          <main className="jun-content">
            <div className="p-4">
              <p>Content adjusts based on sidebar visibility</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}