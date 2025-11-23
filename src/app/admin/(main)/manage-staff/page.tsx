"use client";

import ManageStaff from "@/components/admin/manage-staff";
import dynamic from "next/dynamic";

const ManageStaffPage = dynamic(() => Promise.resolve(ManageStaff), {
  ssr: false,
});

export default ManageStaffPage