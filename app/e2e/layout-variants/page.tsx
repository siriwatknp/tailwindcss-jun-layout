"use client";

import { useState } from "react";

export default function LayoutVariantsTestPage() {
  const [variant, setVariant] = useState<
    "default" | "standalone" | "noTransition" | "customHeight"
  >("default");

  const layoutClasses = {
    default: "jun-layout",
    standalone: "jun-layout jun-layout-standalone",
    noTransition: "jun-layout jun-layout-noTransition",
    customHeight: "jun-layout jun-layout-h-[600px]",
  };

  return (
    <>
      {/* Test controls */}
      <div className="fixed top-0 right-0 z-50 p-4 bg-white shadow-lg rounded-bl-lg">
        <h3 className="font-semibold mb-2">Layout Variant:</h3>
        <select
          value={variant}
          onChange={(e) => setVariant(e.target.value as typeof variant)}
          className="border rounded px-2 py-1"
          data-testid="variant-selector"
        >
          <option value="default">Default</option>
          <option value="standalone">Standalone</option>
          <option value="noTransition">No Transition</option>
          <option value="customHeight">Custom Height (600px)</option>
        </select>
      </div>

      <div className={layoutClasses[variant]} data-testid="layout-container">
        <header className="jun-header jun-header-h-[64px]" data-testid="header">
          <div className="container mx-auto px-4">
            <h1>Layout Variant: {variant}</h1>
          </div>
        </header>

        <main className="jun-content" data-testid="content">
          <div className="container mx-auto px-4">
            <h2>Testing {variant} variant</h2>
            <p>Content area with different layout variants.</p>

            {/* Long content to test scrolling */}
            <div className="space-y-4 mt-8">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="p-4 bg-gray-100 rounded">
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </p>
              ))}
            </div>
          </div>
        </main>

        <footer className="jun-footer" data-testid="footer">
          <div className="container mx-auto px-4">
            <p>Footer in {variant} mode</p>
          </div>
        </footer>
      </div>
    </>
  );
}
