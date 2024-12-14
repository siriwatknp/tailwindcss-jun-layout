import { Home, User, Settings, Bell } from "lucide-react";
import { useState } from "react";

export default function DockExample1() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-[400px] border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[240px] jun-layout-standalone overflow-hidden">
        <nav className="jun-dock">
          <ul className="jun-dockMenu">
            <li className="jun-dockMenuItem">
              <a
                href="#"
                className="jun-dockMenuButton jun-dockMenuButton-row p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(0);
                }}
              >
                <Home className="size-4" />
                <span className="jun-dockTooltip jun-dockTooltip-noIndicator text-xs">
                  Home
                </span>
                {activeIndex === 0 && (
                  <span className="jun-dockIndicator inset-x-0 inset-y-1 w-auto h-auto rounded-full bg-primary/5" />
                )}
              </a>
            </li>
            <li className="jun-dockMenuItem">
              <a
                href="#"
                className="jun-dockMenuButton jun-dockMenuButton-row p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(1);
                }}
              >
                <Bell className="size-4" />
                <span className="jun-dockTooltip jun-dockTooltip-noIndicator text-xs">
                  Notifications
                </span>
                {activeIndex === 1 && (
                  <span className="jun-dockIndicator inset-x-0 inset-y-1 w-auto h-auto rounded-full bg-primary/5" />
                )}
              </a>
            </li>
            <li className="jun-dockMenuItem">
              <a
                href="#"
                className="jun-dockMenuButton jun-dockMenuButton-row p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(2);
                }}
              >
                <User className="size-4" />
                <span className="jun-dockTooltip jun-dockTooltip-noIndicator text-xs">
                  Profile
                </span>
                {activeIndex === 2 && (
                  <span className="jun-dockIndicator inset-x-0 inset-y-1 w-auto h-auto rounded-full bg-primary/5" />
                )}
              </a>
            </li>
            <li className="jun-dockMenuItem">
              <a
                href="#"
                className="jun-dockMenuButton jun-dockMenuButton-row p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(3);
                }}
              >
                <Settings className="size-4" />
                <span className="jun-dockTooltip jun-dockTooltip-noIndicator text-xs">
                  Settings
                </span>
                {activeIndex === 3 && (
                  <span className="jun-dockIndicator inset-x-0 inset-y-1 w-auto h-auto rounded-full bg-primary/5" />
                )}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
