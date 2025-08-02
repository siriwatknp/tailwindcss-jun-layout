"use client";

import { useState } from "react";
import { triggerEdgeCollapse } from "@/packages/tailwindcss-jun-layout";

export default function EdgeSidebarCollapseTestPage() {
  const [features, setFeatures] = useState({
    collapsible: true,
    hoverUncollapse: false,
    autoCollapse: false,
    collapsedWidth: "80px",
  });

  return (
    <>
      {/* Feature controls */}
      <div className="p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">Sidebar Collapse Features</h2>
        
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={features.collapsible}
              onChange={(e) => setFeatures({ ...features, collapsible: e.target.checked })}
              data-testid="collapsible-checkbox"
            />
            Enable Collapsible
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={features.hoverUncollapse}
              onChange={(e) => setFeatures({ ...features, hoverUncollapse: e.target.checked })}
              data-testid="hover-uncollapse-checkbox"
            />
            Enable Hover to Expand
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={features.autoCollapse}
              onChange={(e) => setFeatures({ ...features, autoCollapse: e.target.checked })}
              data-testid="auto-collapse-checkbox"
            />
            Enable Auto-collapse at lg breakpoint
          </label>
          
          <div>
            <label htmlFor="collapsed-width" className="block mb-1">
              Collapsed Width:
            </label>
            <select
              id="collapsed-width"
              value={features.collapsedWidth}
              onChange={(e) => setFeatures({ ...features, collapsedWidth: e.target.value })}
              data-testid="collapsed-width-select"
              className="px-3 py-1 border rounded"
            >
              <option value="64px">64px</option>
              <option value="80px">80px</option>
              <option value="96px">96px</option>
            </select>
          </div>
        </div>
      </div>

      {/* Test layout with collapsible sidebar */}
      <div className="jun-layout" data-testid="layout-collapsible">
        <header className="jun-header bg-blue-500 text-white">
          <div className="container mx-auto px-4">
            <h1>Collapsible Sidebar Test</h1>
          </div>
        </header>

        <aside
          className={`jun-edgeSidebar jun-edgeSidebar-permanent jun-edgeSidebar-w-[256px] ${
            features.collapsedWidth === "64px" ? "jun-edgeSidebar-collapsed-w-[64px]" :
            features.collapsedWidth === "80px" ? "jun-edgeSidebar-collapsed-w-[80px]" :
            "jun-edgeSidebar-collapsed-w-[96px]"
          } ${
            features.hoverUncollapse ? "jun-edgeSidebar-permanent-hoverUncollapse" : ""
          } ${
            features.autoCollapse ? "jun-edgeSidebar-permanent-autoCollapse-lg" : ""
          }`}
          data-testid="sidebar-collapsible"
        >
          <div className="jun-edgeContent">
            <div className="p-4 h-full bg-gray-100">
              {features.collapsible && (
                <button
                  className="jun-edgeCollapseTrigger w-full mb-4 p-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center gap-2"
                  data-testid="collapse-trigger"
                  onClick={(event) => triggerEdgeCollapse({ event })}
                >
                  {/* Collapsed state icon */}
                  <svg
                    className="jun-edgeCollapsed-visible w-5 h-5"
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
                  
                  {/* Uncollapsed state icon and text */}
                  <svg
                    className="jun-edgeUncollapsed-visible w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                  <span className="jun-edgeUncollapsed-visible">Collapse</span>
                </button>
              )}
              
              <nav className="space-y-2">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="jun-edgeUncollapsed-visible">Dashboard</span>
                </a>
                
                <a href="#" className="block p-2 hover:bg-gray-200 rounded flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="jun-edgeUncollapsed-visible">Users</span>
                </a>
                
                <a href="#" className="block p-2 hover:bg-gray-200 rounded flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="jun-edgeUncollapsed-visible">Settings</span>
                </a>
              </nav>
              
              <div className="mt-4 p-2 bg-white rounded jun-edgeUncollapsed-visible">
                <p className="text-sm text-gray-600" data-testid="sidebar-content">
                  This content is hidden when collapsed
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="jun-content">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Sidebar Collapse Testing</h2>
            <p className="mb-4">
              Test the sidebar collapse functionality by clicking the collapse button in the sidebar.
            </p>
            <p className="text-sm text-gray-600">
              - When collapsed, only icons are visible<br />
              - When expanded, full content is shown<br />
              - Hover behavior can be enabled with the checkbox<br />
              - Auto-collapse triggers below lg breakpoint (1024px)
            </p>
          </div>
        </main>
      </div>
    </>
  );
}