import { Home, User, Settings, Bell } from "lucide-react";
import { useState } from "react";

export default function DockTooltipDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full max-w-[400px] border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[240px] jun-layout-standalone overflow-hidden">
        <nav className="jun-dock jun-dock-float">
          <ul className="jun-dockMenu">
            <li className="jun-dockMenuItem">
              <button
                className="jun-dockMenuButton"
                onClick={() => setActiveIndex(0)}
              >
                <Home className="size-5" />
                <span className="jun-dockTooltip">Home</span>
                {activeIndex === 0 && <span className="jun-dockIndicator" />}
              </button>
            </li>
            <li className="jun-dockMenuItem">
              <button
                className="jun-dockMenuButton"
                onClick={() => setActiveIndex(1)}
              >
                <Bell className="size-5" />
                <span className="jun-dockTooltip">Notifications</span>
                {activeIndex === 1 && <span className="jun-dockIndicator" />}
              </button>
            </li>
            <li className="jun-dockMenuItem">
              <button
                className="jun-dockMenuButton"
                onClick={() => setActiveIndex(2)}
              >
                <User className="size-5" />
                <span className="jun-dockTooltip">Profile</span>
                {activeIndex === 2 && <span className="jun-dockIndicator" />}
              </button>
            </li>
            <li className="jun-dockMenuItem">
              <button
                className="jun-dockMenuButton"
                onClick={() => setActiveIndex(3)}
              >
                <Settings className="size-5" />
                <span className="jun-dockTooltip">Settings</span>
                {activeIndex === 3 && <span className="jun-dockIndicator" />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
