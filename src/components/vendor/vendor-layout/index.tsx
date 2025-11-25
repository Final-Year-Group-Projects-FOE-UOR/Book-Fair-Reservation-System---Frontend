"use client";

import React, { useEffect, useState } from "react";
import VendorHeader from "./Header";
import Tabs from "./Tabs";
import { VendorInfo } from "../types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { fetchVendorByEmail } from "@/actions/vendorActions";
import LoadingScreen from "@/components/common/loading";

type VendorLayoutProps = {
  children: React.ReactNode;
};

const VendorLayout = ({ children }: VendorLayoutProps) => {
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
    userId: 0,
    businessName: "",
    email: "",
    genres: [],
  });
  const [loading, setLoading] = useState(false);

  const getVendorInfo = async () => {
    const jwt = Cookies.get("jwt");
    if(!jwt){
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    const vendorEmail = Cookies.get("email");
    if(!vendorEmail){
      toast.error("Vendor email not found. Please log in again.");
      return;
    }
    try{
      setLoading(true);
      const response = await fetchVendorByEmail(jwt, vendorEmail);
      if(response.success){
        const vendorData = response.data;
        setVendorInfo({
          userId: vendorData.userId,
          businessName: vendorData.businessName,
          email: vendorData.email,
          genres: vendorData.genres,
        });
      }else{
        console.log("Failed to fetch vendor info:", response.message);
      }
    }catch(err){
      console.log("An error occurred while fetching vendor info:", err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getVendorInfo();
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <div
        className={`min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500
        "opacity-100" relative overflow-hidden`}
      >
        <div className="background-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <VendorHeader vendorInfo={vendorInfo} />
          <Tabs />
          {children}
        </div>
      </div>
    </>
  );
};

export default VendorLayout;
