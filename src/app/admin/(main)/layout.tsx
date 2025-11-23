/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import AdminHeader from "@/components/admin/header";
import AdminSidebar from "@/components/admin/sidebar";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AnimatedHeader from "@/components/common/headers/AnimatedHeader";
import {
  Building,
  CheckCircle,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
} from "lucide-react";

const headerContent: Record<string, React.ReactNode> = {
  dashboard: (
    <AnimatedHeader
      icon={
        <LayoutDashboard className="w-8 h-8 text-white animate-floating-book" />
      }
      title="Dashboard"
      description="Overview of the admin panel"
    />
  ),
  bookingRequests: (
    <AnimatedHeader
      icon={
        <LayoutDashboard className="w-8 h-8 text-white animate-floating-book" />
      }
      title="Booking Requests"
      description="Manage and review booking requests"
    />
  ),
  stallConfiguration: (
    <AnimatedHeader
      icon={<Settings className="w-8 h-8 text-white animate-floating-book" />}
      title="Stall Configuration"
      description="Manage and configure stall settings"
    />
  ),
  mapManagement: (
    <AnimatedHeader
      icon={<MapPin className="w-8 h-8 text-white animate-floating-book" />}
      title="Map Management"
      description="Manage and configure stall maps"
    />
  ),
  manageStaff: (
    <AnimatedHeader
      icon={<Users className="w-8 h-8 text-white animate-floating-book" />}
      title="Manage Staff"
      description="Manage and configure staff accounts"
    />
  ),
  reservations: (
    <AnimatedHeader
      icon={
        <CheckCircle className="w-8 h-8 text-white animate-floating-book" />
      }
      title="Reservations"
      description="Manage and configure reservations"
    />
  ),
  stallAvailability: (
    <AnimatedHeader
      icon={<Building className="w-8 h-8 text-white animate-floating-book" />}
      title="Stall Availability"
      description="Manage and configure stall availability"
    />
  ),
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
    } else if (segment === "manage-staff") {
      return "manageStaff";
    } else if (segment === "reservations") {
      return "reservations";
    } else if (segment === "stall-availability") {
      return "stallAvailability";
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
