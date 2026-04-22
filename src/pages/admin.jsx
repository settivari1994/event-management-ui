import React, { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Ticket,
  Settings,
  LogOut,
  Menu,
  X
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
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // IMPORTANT (if you store role)
    
    navigate("/", { replace: true });
    };


  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <span className="text-xl font-bold">Admin</span>}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 p-2 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                active === item.name
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-3 hover:bg-red-500 rounded-lg">
            <LogOut size={20} />
            {isOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{active}</h1>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-xl shadow">
          {active === "Events" && <EventSection />}
          {active === "Dashboard" && <BookingsSection/>}
          {active === "Organisers" && <p>Organiser Management</p>}
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;