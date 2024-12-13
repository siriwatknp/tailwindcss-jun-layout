"use client";
import { Home, Search, Bell, Settings, User, Mail } from "lucide-react";
import React from "react";

function ActiveMenus4() {
  const [active, setActive] = React.useState(0);
  return (
    <nav className="jun-dock sm:jun-dock-float bottom-[600px]">
      <ul className="jun-dockMenu gap-x-2">
        <li className="jun-dockMenuItem">
          <button
            className="jun-dockMenuButton jun-dockMenuButton-row"
            onClick={() => setActive(0)}
          >
            <Home className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-noIndicator">
              Home
            </span>
            {active === 0 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button
            className="jun-dockMenuButton jun-dockMenuButton-row"
            onClick={() => setActive(1)}
          >
            <Search className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-noIndicator">
              Search
            </span>
            {active === 1 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button
            className="jun-dockMenuButton jun-dockMenuButton-row"
            onClick={() => setActive(2)}
          >
            <Bell className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-noIndicator">
              Alerts
            </span>
            {active === 2 && <span className="jun-dockIndicator" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function ActiveMenus3() {
  const [active, setActive] = React.useState(0);
  return (
    <nav className="jun-dock sm:jun-dock-float bottom-[500px]">
      <ul className="jun-dockMenu gap-x-2">
        <li className="jun-dockMenuItem">
          <button
            className="jun-dockMenuButton jun-dockMenuButton-row"
            onClick={() => setActive(0)}
          >
            <Home className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-hasIndicator">
              Home
            </span>
            {active === 0 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button
            className="jun-dockMenuButton jun-dockMenuButton-row"
            onClick={() => setActive(1)}
          >
            <Search className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-hasIndicator">
              Search
            </span>
            {active === 1 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button
            className="jun-dockMenuButton jun-dockMenuButton-row"
            onClick={() => setActive(2)}
          >
            <Bell className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-hasIndicator">
              Alerts
            </span>
            {active === 2 && <span className="jun-dockIndicator" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function ActiveMenus2() {
  const [active, setActive] = React.useState(0);
  return (
    <nav className="jun-dock sm:jun-dock-float bottom-[400px]">
      <ul className="jun-dockMenu gap-x-2">
        <li className="jun-dockMenuItem">
          <button className="jun-dockMenuButton" onClick={() => setActive(0)}>
            <Home className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-noIndicator">
              Home
            </span>
            {active === 0 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button className="jun-dockMenuButton " onClick={() => setActive(1)}>
            <Search className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-noIndicator">
              Search
            </span>
            {active === 1 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button className="jun-dockMenuButton " onClick={() => setActive(2)}>
            <Bell className="size-5" />
            <span className="jun-dockTooltip jun-dockTooltip-noIndicator">
              Alerts
            </span>
            {active === 2 && <span className="jun-dockIndicator" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function ActiveMenus() {
  const [active, setActive] = React.useState(0);
  return (
    <nav className="jun-dock sm:jun-dock-float bottom-[320px]">
      <ul className="jun-dockMenu gap-x-2">
        <li className="jun-dockMenuItem">
          <button className="jun-dockMenuButton" onClick={() => setActive(0)}>
            <Home className="size-5" />
            <span className="jun-dockTooltip">Home</span>
            {active === 0 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button className="jun-dockMenuButton" onClick={() => setActive(1)}>
            <Search className="size-5" />
            <span className="jun-dockTooltip">Search</span>
            {active === 1 && <span className="jun-dockIndicator" />}
          </button>
        </li>
        <li className="jun-dockMenuItem">
          <button className="jun-dockMenuButton" onClick={() => setActive(2)}>
            <Bell className="size-5" />
            <span className="jun-dockTooltip">Alerts</span>
            {active === 2 && <span className="jun-dockIndicator" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default function DockPlayground() {
  return (
    <div className="jun-layout">
      <nav className="jun-dock">
        <ul className="jun-dockMenu">
          <li className="jun-dockMenuItem">
            <button
              className="jun-dockMenuButton jun-dockMenuButton-row"
              data-menu-active
            >
              <Home className="size-5" />
              <span>Home</span>
              <span className="jun-dockIndicator" />
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Search className="size-5" />
              <span>Search</span>
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Bell className="size-5" />
              <span>Alerts</span>
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Settings className="size-5" />
              <span>Settings</span>
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <User className="size-5" />
              <span>Profile</span>
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Mail className="size-5" />
              <span>Messages</span>
            </button>
          </li>
        </ul>
      </nav>

      <nav className="jun-dock jun-dock-float bottom-[80px]">
        <ul className="jun-dockMenu">
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Home className="size-5" />
              <span>Home</span>
              <span className="jun-dockIndicator" />
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Search className="size-5" />
              <span>Search</span>
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Bell className="size-5" />
              <span>Alerts</span>
            </button>
          </li>
        </ul>
      </nav>

      <nav className="jun-dock bottom-[160px]">
        <ul className="jun-dockMenu">
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Home className="size-5" />
              <span>Home</span>
              <span className="jun-dockIndicator" />
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Search className="size-5" />
              <span>Search</span>
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton">
              <Bell className="size-5" />
              <span>Alerts</span>
            </button>
          </li>
        </ul>
      </nav>

      <nav className="jun-dock bottom-[240px]">
        <ul className="jun-dockMenu">
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton jun-dockMenuButton-row">
              <Home className="size-5" />
              <span>Home</span>
              <span className="jun-dockIndicator" />
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton jun-dockMenuButton-row">
              <Search className="size-5" />
              <span>Search</span>
            </button>
          </li>
          <li className="jun-dockMenuItem">
            <button className="jun-dockMenuButton jun-dockMenuButton-row">
              <Bell className="size-5" />
              <span>Alerts</span>
            </button>
          </li>
        </ul>
      </nav>

      <ActiveMenus />

      <ActiveMenus2 />

      <ActiveMenus3 />

      <ActiveMenus4 />
    </div>
  );
}
