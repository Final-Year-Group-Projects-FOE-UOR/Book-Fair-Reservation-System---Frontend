/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Award, Building, CheckCircle, LayoutDashboard, LogOut, MapPin, Menu, Settings, Users } from 'lucide-react';
import React, { useState } from 'react'

type AdminSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) => {
 
 const [currentView, setCurrentView] = useState("superadmin_landing");
 const [superAdminTab, setSuperAdminTab] = useState("dashboard");
  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all fixed duration-300 min-h-screen bg-[#1e2337]/80 backdrop-blur-xl border-r border-white/10 flex-col  z-100 hidden md:flex`}
    >
      <div className="p-6 flex items-center h-[80px] justify-between border-b border-white/10">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="bg-linear-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">SuperAdmin</span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white transition p-2 hover:bg-white/5 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setSuperAdminTab("dashboard")}
          className={`w-full flex items-center  gap-3 ${
            sidebarOpen ? "px-4 py-3 justify-left" : "px-2 py-3 justify-center"
          } rounded-xl transition ${
            superAdminTab === "dashboard"
              ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          {sidebarOpen && <span className="font-semibold">Dashboard</span>}
        </button>

        <button
          onClick={() => setSuperAdminTab("requests")}
          className={`w-full flex items-center gap-3 ${
            sidebarOpen ? "px-4 py-3 justify-left" : "px-2 py-3 justify-center"
          } rounded-xl transition ${
            superAdminTab === "requests"
              ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          {sidebarOpen && (
            <div className="flex items-center justify-between flex-1">
              <span className="font-semibold">Booking Requests</span>
              {/* {pendingRequests.length > 0 && (
                <span className="bg-orange-500/30 text-orange-300 text-xs px-2 py-1 rounded-full font-semibold">
                  {pendingRequests.length}
                </span>
              )} */}
            </div>
          )}
        </button>

        <button
          onClick={() => setSuperAdminTab("availability")}
          className={`w-full flex items-center gap-3 ${
            sidebarOpen ? "px-4 py-3 justify-left" : "px-2 py-3 justify-center"
          } rounded-xl transition ${
            superAdminTab === "availability"
              ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Building className="w-5 h-5" />
          {sidebarOpen && <span className="font-semibold">Availability</span>}
        </button>

        <button
          onClick={() => setSuperAdminTab("reservations")}
          className={`w-full flex items-center gap-3 ${
            sidebarOpen ? "px-4 py-3 justify-left" : "px-2 py-3 justify-center"
          } rounded-xl transition ${
            superAdminTab === "reservations"
              ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          {sidebarOpen && <span className="font-semibold">Reservations</span>}
        </button>

        <div className="pt-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => setSuperAdminTab("admins")}
            className={`w-full flex items-center gap-3 ${
              sidebarOpen
                ? "px-4 py-3 justify-left"
                : "px-2 py-3 justify-center"
            } rounded-xl transition ${
              superAdminTab === "admins"
                ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && (
              <span className="font-semibold">Manage Admins</span>
            )}
          </button>

          <button
            onClick={() => setSuperAdminTab("stallconfig")}
            className={`w-full flex items-center gap-3 ${
              sidebarOpen
                ? "px-4 py-3 justify-left"
                : "px-2 py-3 justify-center"
            } rounded-xl transition ${
              superAdminTab === "stallconfig"
                ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && (
              <span className="font-semibold">Stall Configuration</span>
            )}
          </button>

          <button
            onClick={() => setSuperAdminTab("mapupload")}
            className={`w-full flex items-center gap-3 ${
              sidebarOpen
                ? "px-4 py-3 justify-left"
                : "px-2 py-3 justify-center"
            } rounded-xl transition ${
              superAdminTab === "mapupload"
                ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MapPin className="w-5 h-5" />
            {sidebarOpen && (
              <span className="font-semibold">Map Management</span>
            )}
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            if (window.location.pathname.startsWith("/adminx")) {
              window.location.href = "/";
            } else {
              setCurrentView("superadmin_landing");
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition bg-linear-to-r from-red-500/20 to-pink-600/20 text-red-300 hover:from-red-500/30 hover:to-pink-600/30 border border-red-500/30`}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar