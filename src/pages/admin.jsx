import React, { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import EventSection from "../pages/components/EventSection";
import BookingsSection from "./components/BookingsSection";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Events", icon: <CalendarDays size={20} /> },
  { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Organisers", icon: <Users size={20} /> },
];

const AdminLayout = () => {
  const [active, setActive] = useState("Events");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  const showText = expanded || mobileOpen; // important fix

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* BACKDROP MOBILE */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          bg-gray-900 text-white flex flex-col
          fixed md:relative z-50 h-full
          transition-all duration-300

          w-64 md:${expanded ? "w-64" : "w-20"}

          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">

          <span className="font-bold">
            {showText ? "Admin Panel" : "A"}
          </span>

          {/* Mobile close */}
          <button className="md:hidden" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>

          {/* Desktop toggle */}
          <button
            className="hidden md:block"
            onClick={() => setExpanded(!expanded)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 p-2 space-y-2">

          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActive(item.name);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                active === item.name ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              {item.icon}

              {/* TEXT FIXED */}
              <span className={showText ? "inline" : "hidden md:hidden"}>
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* LOGOUT */}
        <div className="p-2 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 hover:bg-red-500 rounded-lg"
          >
            <LogOut size={20} />

            <span className={showText ? "inline" : "hidden md:hidden"}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE TOP BAR */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
          <button onClick={() => setMobileOpen(true)}>
            <Menu />
          </button>
          <h1 className="font-semibold">{active}</h1>
          <div />
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden md:flex bg-white p-4 rounded-xl shadow m-4">
          <h1 className="text-2xl font-semibold">{active}</h1>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-3 md:p-6 overflow-y-auto">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow">

            {active === "Events" && <EventSection />}
            {active === "Dashboard" && <BookingsSection />}
            {active === "Organisers" && <p>Organiser Management</p>}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;