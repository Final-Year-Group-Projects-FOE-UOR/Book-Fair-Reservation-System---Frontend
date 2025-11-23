"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Staff } from "./types";
import StaffCard from "./StaffCard";
import CreateStaffDialog from "./dialogs/CreateStaffDialog";

const ManageStaff = () => {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>(() => {
    const savedAdmins = localStorage.getItem("bookfairAdmins");
    return savedAdmins
      ? JSON.parse(savedAdmins)
      : [
          {
            id: 1,
            email: "admin@bookfair.com",
            password: "admin123",
            name: "Admin User",
            role: "admin",
          },
          {
            id: 2,
            email: "employee@bookfair.com",
            password: "employee123",
            name: "Employee User",
            role: "admin",
          },
        ];
  });
  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <CreateStaffDialog />
      </div>

      <div className="grid gap-4">
        {staffList.map((staff) => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default ManageStaff;
