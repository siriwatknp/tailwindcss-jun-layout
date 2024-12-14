import { Home, User, Settings, Bell } from "lucide-react";

export default function DockIconOnlyDemo() {
  return (
    <div className="w-full max-w-[400px] border-4 rounded bg-background">
      <div className="jun-layout jun-layout-h-[240px] jun-layout-standalone overflow-hidden">
        <nav className="jun-dock jun-dock-float">
          <ul className="jun-dockMenu">
            <li className="jun-dockMenuItem">
              <button className="jun-dockMenuButton" aria-label="Home">
                <Home className="size-5" />
              </button>
            </li>
            <li className="jun-dockMenuItem">
              <button className="jun-dockMenuButton" aria-label="Notifications">
                <Bell className="size-5" />
              </button>
            </li>
            <li className="jun-dockMenuItem">
              <button className="jun-dockMenuButton" aria-label="Profile">
                <User className="size-5" />
              </button>
            </li>
            <li className="jun-dockMenuItem">
              <button className="jun-dockMenuButton" aria-label="Settings">
                <Settings className="size-5" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
