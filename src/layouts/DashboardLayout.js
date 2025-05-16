"use client";

import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PATH_DASHBOARD } from "../routes/paths";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";
import { ICON_URL_PREFIX } from "../utils/constant";

const menu = [
  {
    label: "Ship",
    icon: `${ICON_URL_PREFIX}/menu-ship.png`,
    to: PATH_DASHBOARD.ship,
  },
  {
    label: "Rates",
    icon: `${ICON_URL_PREFIX}/menu-rates.png`,
    to: PATH_DASHBOARD.rates,
  },
  {
    label: "Reports",
    icon: `${ICON_URL_PREFIX}/menu-reports.png`,
    to: PATH_DASHBOARD.reports,
  },
  {
    label: "Settings",
    icon: `${ICON_URL_PREFIX}/menu-settings.png`,
    to: PATH_DASHBOARD.settings,
  },
];

export function DashboardLayout() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-gray-100 border-r min-h-screen ${
          isCollapsed ? "w-24" : "w-64"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex flex-col items-center border-b bg-black
            ${isCollapsed ? "py-4" : "py-8"}`}
        >
          <div
            className={`bg-black rounded-full flex items-center justify-center mb-2 ${
              isCollapsed ? "w-16 h-16" : "w-32 h-32"
            }`}
          >
            {/* Logo here */}
            {/* Replace with your logo */}
            <span className={`${isCollapsed ? "text-6xl" : "text-9xl"}`}>
              ☠️
            </span>
          </div>
        </div>
        {/* Menu */}
        <nav className="flex-1">
          {menu.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `flex group items-center gap-2 px-4 py-1 font-extrabold transition-colors ${
                  isActive || location.pathname.startsWith(item.to)
                    ? "bg-white text-black"
                    : "text-gray-400 hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              <img
                alt={item.label}
                src={item.icon}
                className={`w-16 h-16 group-hover:grayscale-0 ${
                  location.pathname.startsWith(item.to)
                    ? ""
                    : "filter grayscale"
                }`}
              />
              {!isCollapsed && <span className="text-xl">{item.label}</span>}
            </NavLink>
          ))}
          <NavLink
            key="logout"
            className="flex group items-center gap-2 px-4 py-1 font-extrabold transition-colors text-gray-400 hover:text-black"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <img
              alt="logout"
              src={`${ICON_URL_PREFIX}/menu-logout.png`}
              className="`w-16 h-16 group-hover:grayscale-0 filter grayscale"
            />
            {!isCollapsed && <span className="text-xl">Logout</span>}
          </NavLink>
        </nav>
        {/* Collapse and Footer */}
        <div className="mt-auto flex flex-col items-center pb-4">
          <button
            className="flex items-center text-gray-400 hover:text-gray-700 mb-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <>
                <FaChevronRight className="mr-1" /> Expand
              </>
            ) : (
              <>
                <FaChevronLeft className="mr-1" /> Collapse
              </>
            )}
          </button>

          <div className="text-xs text-gray-400 text-center px-2">
            © 2014-2025. All Rights Reserved
            <br />
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            ·{" "}
            <a href="#" className="underline">
              Terms of Use
            </a>{" "}
            ·{" "}
            <a href="#" className="underline">
              Cookies Notice
            </a>
            <br />
            <a href="#" className="underline">
              Manage your Privacy & Data Settings
            </a>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}
