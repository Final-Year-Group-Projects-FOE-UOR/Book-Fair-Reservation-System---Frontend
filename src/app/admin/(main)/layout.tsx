/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import AdminHeader from "@/components/admin/header";
import DashboardHeader from "@/components/admin/new-dashboard/Header";
import AdminSidebar from "@/components/admin/sidebar";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import StallConfigurationHeader from "@/components/admin/stall-configuration/Header";
import MapManagementHeader from "@/components/admin/map-management/Header";

const headerContent: Record<string, React.ReactNode> = {
  dashboard: <DashboardHeader />,
  bookingRequests: (
    <h1 className="text-2xl font-semibold text-white">Booking Requests</h1>
  ),
  stallConfiguration: <StallConfigurationHeader />,
  mapManagement: <MapManagementHeader />,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getPageFromPath = (path: string) => {
    const segment = path.split("/")[2] || "dashboard";
    if (segment === "dashboard") {
      return "dashboard";
    } else if (segment === "booking-requests") {
      return "bookingRequests";
    } else if (segment === "stall-configuration") {
      return "stallConfiguration";
    } else if (segment === "map-management") {
      return "mapManagement";
    } else {
      return "dashboard";
    }
  };

  // Initialize with pathname from usePathname hook, not window.location
  const [currentPage, setCurrentPage] = useState(() =>
    getPageFromPath(pathname)
  );

  useEffect(() => {
    const newPage = getPageFromPath(pathname);
    setCurrentPage(newPage);
  }, [pathname]);

  return (
    <Suspense>
      <div className="flex bg-gradient-to-br w-full font-geist-sans from-[#1a1f37] via-[#4a1b2d] to-[#1a1f37] opacity-100 overflow-hidden flex-row inset-0">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={`flex inset ${
            sidebarOpen ? "md:pl-64 pl-0" : "md:pl-20 pl-0"
          } w-full pt-20 `}
        >
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          >
            {headerContent[currentPage]}
          </AdminHeader>
          {children}
        </div>
      </div>
    </Suspense>
  );
}
