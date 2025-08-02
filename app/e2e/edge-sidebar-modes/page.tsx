"use client";

import { useState } from "react";
import { triggerEdgeDrawer } from "@/packages/tailwindcss-jun-layout";

export default function EdgeSidebarModesTestPage() {
  const [mode, setMode] = useState<"permanent" | "drawer" | "responsive">(
    "permanent",
  );

  return (
    <>
      {/* Mode selector for testing */}
      <div className="p-4 bg-gray-100">
        <label htmlFor="mode-selector" className="block mb-2 font-medium">
          Sidebar Mode:
        </label>
        <select
          id="mode-selector"
          data-testid="mode-selector"
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "permanent" | "drawer" | "responsive")
          }
          className="px-4 py-2 border rounded"
        >
          <option value="permanent">Permanent</option>
          <option value="drawer">Drawer</option>
          <option value="responsive">
            Responsive (Drawer on mobile, Permanent on desktop)
          </option>
        </select>
      </div>

      {/* Test 1: Permanent Mode */}
      {mode === "permanent" && (
        <div className="jun-layout" data-testid="layout-permanent">
          <header className="jun-header bg-blue-500 text-white">
            <div className="container mx-auto px-4">
              <h1>Permanent Sidebar Mode</h1>
            </div>
          </header>

          <aside
            className="jun-edgeSidebar jun-edgeSidebar-permanent jun-edgeSidebar-w-[256px]"
            data-testid="sidebar-permanent"
          >
            <div className="jun-edgeContent">
              <div className="p-4 h-full bg-gray-200">
                <h2 className="font-semibold mb-4">Permanent Sidebar</h2>
                <p>Always visible on desktop</p>
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 3
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          <main className="jun-content">
            <div className="container mx-auto px-4 py-8">
              <p>Content area with permanent sidebar</p>
            </div>
          </main>
        </div>
      )}

      {/* Test 2: Drawer Mode */}
      {mode === "drawer" && (
        <div className="jun-layout" data-testid="layout-drawer">
          <header className="jun-header bg-green-500 text-white">
            <div className="container mx-auto px-4 flex items-center gap-4">
              <button
                className="jun-edgeDrawerTrigger p-2 hover:bg-green-600 rounded"
                data-testid="drawer-trigger"
                onClick={() => triggerEdgeDrawer()}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1>Drawer Sidebar Mode</h1>
            </div>
          </header>

          <aside
            className="jun-edgeSidebar jun-edgeSidebar-drawer jun-edgeSidebar-w-[256px]"
            data-testid="sidebar-drawer"
          >
            <div className="jun-edgeContent">
              <div className="p-4 h-full bg-gray-200">
                <h2 className="font-semibold mb-4">Drawer Sidebar</h2>
                <p>Toggle with button</p>
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 3
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          <main className="jun-content">
            <div className="container mx-auto px-4 py-8">
              <p>Content area with drawer sidebar</p>
              <p className="mt-2 text-sm text-gray-600">
                Click the menu button in the header to open the drawer
              </p>
            </div>
          </main>
        </div>
      )}

      {/* Test 3: Responsive Mode */}
      {mode === "responsive" && (
        <div className="jun-layout" data-testid="layout-responsive">
          <header className="jun-header bg-purple-500 text-white">
            <div className="container mx-auto px-4 flex items-center gap-4">
              <button
                className="jun-edgeDrawerTrigger p-2 hover:bg-purple-600 rounded"
                data-testid="responsive-drawer-trigger"
                onClick={() => triggerEdgeDrawer()}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1>Responsive Sidebar Mode</h1>
            </div>
          </header>

          <aside
            className="jun-edgeSidebar jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent jun-edgeSidebar-w-[256px]"
            data-testid="sidebar-responsive"
          >
            <div className="jun-edgeContent">
              <div className="p-4 h-full bg-gray-200">
                <h2 className="font-semibold mb-4">Responsive Sidebar</h2>
                <p className="text-sm">
                  Drawer on mobile, Permanent on desktop
                </p>
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-300 rounded"
                      >
                        Item 3
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          <main className="jun-content">
            <div className="container mx-auto px-4 py-8">
              <p>Content area with responsive sidebar</p>
              <p className="mt-2 text-sm text-gray-600">
                On mobile: Click menu button to open drawer
                <br />
                On desktop: Sidebar is always visible
              </p>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
