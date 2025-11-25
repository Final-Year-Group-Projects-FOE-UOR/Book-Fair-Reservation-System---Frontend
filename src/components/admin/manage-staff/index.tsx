"use client";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Staff } from "./types";
import StaffCard from "./StaffCard";
import CreateStaffDialog from "./dialogs/CreateStaffDialog";
import Cookies from "js-cookie";
import { getAllStaff } from "@/actions/staffActions";
import LoadingScreen from "@/components/common/loading";

const ManageStaff = () => {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);

  const getStaffList = async () => {
    const jwt = Cookies.get("jwt");
    if(!jwt){
      return;
    }
    try{
      setLoading(true);
      const response = await getAllStaff(jwt);
      if(response.success){
        const staffList = response.data.map((staff: any) => ({
          id: staff.id,
          name: staff.username,
          email: staff.email,
          role: staff.role,
        }));
        setStaffList(staffList);
      }else{
        console.log("Failed to fetch staff list:", response.message);
      }
    }catch(err){
      console.log("An error occurred while fetching staff list:", err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getStaffList();
  }, []);

  return (
    <>
    {loading && (
      <LoadingScreen/>
    )}
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <CreateStaffDialog />
      </div>

      <div className="grid gap-4">
        {staffList.map((staff) => (
          <StaffCard onUpdate={getStaffList} key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
    </>
  );
};

export default ManageStaff;
