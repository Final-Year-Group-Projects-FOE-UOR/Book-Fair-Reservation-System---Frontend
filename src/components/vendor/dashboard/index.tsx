"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VendorHeader from "./Header";
import Tabs from "./Tabs";

const Vendor = () => {
  const [vendorInfo, setVendorInfo] = useState({ businessName: "", email: "" });
  const [vendorHomeTab, setVendorHomeTab] = useState('booking');
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching vendor info and authentication status
    const fetchVendorData = () => {
      // This would typically involve an API call
      const storedVendorInfo = {
        businessName: "Demo Vendor",
        email: "",
      };
      setVendorInfo(storedVendorInfo);
    };

    fetchVendorData();
  }, []);

  const handleVendorLogout = () => {
   // setVendorInfo({ businessName: "", email: "" });
    router.push("/");
  };

  const handleVendorHomeTabChange = (tab: string) => {
    setVendorHomeTab(tab);
  }

  return (
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
        <VendorHeader
          vendorInfo={vendorInfo}
          handleVendorLogout={handleVendorLogout}
        />
        <Tabs handleVendorHomeTabChange={handleVendorHomeTabChange} vendorHomeTab={vendorHomeTab}/>
          
          





      </div>
    </div>
  );
};

export default Vendor;
