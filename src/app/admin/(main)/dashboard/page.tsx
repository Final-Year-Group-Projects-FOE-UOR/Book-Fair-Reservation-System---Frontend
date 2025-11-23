"use client";

import AdminDashboard from "@/components/admin/dashboard";
import dynamic from "next/dynamic";

const AdminDashboardPage = dynamic(() => Promise.resolve(AdminDashboard), {
  ssr: false,
});

export default AdminDashboardPage;
