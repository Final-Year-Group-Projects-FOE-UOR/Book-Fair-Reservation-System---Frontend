/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingScreen from "@/components/common/loading";
import {
  Award,
  Building,
  CheckCircle,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

type AdminSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentView, setCurrentView] = useState("superadmin_landing");
  const [superAdminTab, setSuperAdminTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  // Derive superAdminTab from pathname directly
  const getSuperAdminTab = (path: string) => {
    const segment = path.split("/")[2] || "dashboard";
    const tabMap: Record<string, string> = {
      dashboard: "dashboard",
      "booking-requests": "requests",
      "stall-configuration": "stallconfig",
      availability: "availability",
      reservations: "reservations",
      "manage-staff": "manageStaff",
      "map-management": "mapManagement",
    };
    return tabMap[segment] || "dashboard";
  };

  useEffect(() => {
    setSuperAdminTab(getSuperAdminTab(pathname));
  }, [pathname]);

  return (
    <>
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
          <SidebarItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            tag="dashboard"
            sidebarOpen={sidebarOpen}
            superAdminTab={superAdminTab}
            setSuperAdminTab={setSuperAdminTab}
            onClick={() => {
              setSuperAdminTab("dashboard");
              router.push("/admin/dashboard");
            }}
          />
          <SidebarItem
            icon={<CheckCircle className="w-5 h-5" />}
            label="Booking Requests"
            tag="requests"
            sidebarOpen={sidebarOpen}
            superAdminTab={superAdminTab}
            setSuperAdminTab={setSuperAdminTab}
            onClick={() => {
              setSuperAdminTab("requests");
              router.push("/admin/booking-requests");
            }}
          />

          <SidebarItem
            icon={<Building className="w-5 h-5" />}
            label="Availability"
            tag="availability"
            sidebarOpen={sidebarOpen}
            superAdminTab={superAdminTab}
            setSuperAdminTab={setSuperAdminTab}
            onClick={() => {
              setSuperAdminTab("availability");
              router.push("/admin/availability");
            }}
          />

          <SidebarItem
            icon={<CheckCircle className="w-5 h-5" />}
            label="Reservations"
            tag="reservations"
            sidebarOpen={sidebarOpen}
            superAdminTab={superAdminTab}
            setSuperAdminTab={setSuperAdminTab}
            onClick={() => {
              setSuperAdminTab("reservations");
              router.push("/admin/reservations");
            }}
          />

          <div className="pt-4 border-t border-white/10 space-y-2">
            <SidebarItem
              icon={<Users className="w-5 h-5" />}
              label="Manage Staff"
              tag="manageStaff"
              sidebarOpen={sidebarOpen}
              superAdminTab={superAdminTab}
              setSuperAdminTab={setSuperAdminTab}
              onClick={() => {
                setSuperAdminTab("manageStaff");
                router.push("/admin/manage-staff");
              }}
            />

            <SidebarItem
              icon={<Settings className="w-5 h-5" />}
              label="Stall Configuration"
              tag="stallConfig"
              sidebarOpen={sidebarOpen}
              superAdminTab={superAdminTab}
              setSuperAdminTab={setSuperAdminTab}
              onClick={() => {
                setSuperAdminTab("stallConfig");
                router.push("/admin/stall-configuration");
              }}
            />

            <SidebarItem
              icon={<MapPin className="w-5 h-5" />}
              label="Map Management"
              tag="mapManagement"
              sidebarOpen={sidebarOpen}
              superAdminTab={superAdminTab}
              setSuperAdminTab={setSuperAdminTab}
              onClick={() => {
                setSuperAdminTab("mapManagement");
                router.push("/admin/map-management");
              }}
            />

            
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
    </>
  );
};

export default AdminSidebar;
