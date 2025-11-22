"use client";

import AdminHeader from "@/components/admin/header";
import DashboardHeader from "@/components/admin/new-dashboard/Header";
import AdminSidebar from "@/components/admin/sidebar";
import { useState } from "react";

const headerContent: Record<string, React.ReactNode> = {
  dashboard: <DashboardHeader/>,
  bookingRequests: <h1 className="text-2xl font-semibold text-white">Booking Requests</h1>,
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const [sidebarOpen, setSidebarOpen] = useState(true);
 const [currentPage, setCurrentPage] = useState(() => {
  if(typeof window === "undefined") return "dashboard";
  const path =  window.location.pathname.split("/")[3] || "dashboard";
  if(path === "dashboard"){
    return "dashboard";
  }else if(path === "booking-requests"){
    return "bookingRequests";
  }else{
    return "dashboard";
  }
 });
  return (
    <div className="flex bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#4a1b2d] to-[#1a1f37]  opacity-100 overflow-hidden flex-row inset-0">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex inset ${sidebarOpen ? "md:pl-64 pl-0" : "md:pl-20 pl-0"} w-full pt-20 `}>
       <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {headerContent[currentPage]}
       </AdminHeader>
        {children}
      </div>
    </div>
  );
}
