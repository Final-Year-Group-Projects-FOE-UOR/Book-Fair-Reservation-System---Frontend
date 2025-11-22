"use client";

import DashboardHeader from "@/components/admin/dashboard/Header";
import AdminHeader from "@/components/admin/header";
import AdminSidebar from "@/components/admin/sidebar";
import { useState } from "react";

const headerContent = {
  dashboard: <DashboardHeader/>
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#4a1b2d] to-[#1a1f37]  opacity-100 overflow-hidden flex-row inset-0">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex inset ${sidebarOpen ? "pl-64" : "pl-20"} w-full pt-20 `}>
       <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {headerContent["dashboard"]}
       </AdminHeader>
        {children}
      </div>
    </div>
  );
}
