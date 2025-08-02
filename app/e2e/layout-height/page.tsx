"use client";

import { useState } from "react";

export default function LayoutHeightTestPage() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasCustomHeight, setHasCustomHeight] = useState(false);

  const getLayoutClasses = () => {
    const classes = ["jun-layout"];
    if (isStandalone) classes.push("jun-layout-standalone");
    if (hasCustomHeight) classes.push("jun-layout-h-[500px]");
    return classes.join(" ");
  };

  return (
    <>
      {/* Test controls */}
      <div className="fixed top-0 right-0 z-50 p-4 bg-white shadow-lg rounded-bl-lg">
        <h3 className="font-semibold mb-2">Layout Options:</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isStandalone}
              onChange={(e) => setIsStandalone(e.target.checked)}
              className="mr-2"
              data-testid="standalone-checkbox"
            />
            Standalone Mode
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasCustomHeight}
              onChange={(e) => setHasCustomHeight(e.target.checked)}
              className="mr-2"
              data-testid="custom-height-checkbox"
            />
            Custom Height (500px)
          </label>
        </div>
      </div>

      <div className={getLayoutClasses()} data-testid="layout-container">
        <header className="jun-header" data-testid="header">
          <div className="container mx-auto px-4">
            <h1>Layout Height Test</h1>
            <p className="text-sm">
              Standalone: {isStandalone ? "Yes" : "No"} | Custom Height:{" "}
              {hasCustomHeight ? "500px" : "Default"}
            </p>
          </div>
        </header>

        <main className="jun-content" data-testid="content">
          <div className="container mx-auto px-4">
            <h2>Height Behavior</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Default layout: height adjusts to content, min-height is
                viewport
              </li>
              <li>
                With custom height (non-standalone): min-height is set to 500px
              </li>
              <li>Standalone mode: layout is fixed to viewport height</li>
              <li>Standalone + custom height: layout is fixed to 500px</li>
            </ul>

            {/* Long content to test scrolling behavior */}
            <div className="space-y-4 mt-8">
              {Array.from({ length: 30 }, (_, i) => (
                <p key={i} className="p-4 bg-gray-100 rounded">
                  Content block {i + 1}: This demonstrates scrolling behavior
                </p>
              ))}
            </div>
          </div>
        </main>

        <footer className="jun-footer" data-testid="footer">
          <div className="container mx-auto px-4">
            <p>Footer - Mode: {isStandalone ? "Standalone" : "Default"}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
