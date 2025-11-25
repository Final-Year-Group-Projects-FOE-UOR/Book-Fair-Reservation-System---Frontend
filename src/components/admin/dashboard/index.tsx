"use client";

import React, { useEffect, useState } from "react";
import StallDashboard from "./StallDashboard";
import { ConfiguredStall } from "./types";
import Cookies from "js-cookie";
import { getStalls } from "@/actions/stallActions";
import LoadingScreen from "@/components/common/loading";
import { Stall } from "@/components/vendor/types";
import { getAllVendors } from "@/actions/vendorActions";

const AdminDashboard: React.FC = () => {
  const [configuredStalls, setConfiguredStalls] = useState<ConfiguredStall[]>(
    [],
  );
  const [stats, setStats] = useState({
    total: 0,
    reserved: 0,
    available: 0,
  });
  const [vendorsCount, setVendorsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getConfiguredStalls = async (jwt: string) => {
    try {
      const response = await getStalls(jwt);
      if (response.success) {
        const allStalls = response.data;
        const configured = allStalls.filter((stall: Stall) => stall.mapMetadata?.configured);
        const structuredStalls: ConfiguredStall[] = configured.map((stall: Stall) => ({
          id: stall.id,
          size: stall.type,
          reserved: !stall.available,
        }));
        console.log(structuredStalls);
        setConfiguredStalls(structuredStalls);
        const total = structuredStalls.length;
        const reserved = structuredStalls.filter((s) => s.reserved).length;
        const available = total - reserved;
        setStats({ total, reserved, available });
      }
    } catch (err) {
      console.error("Error fetching configured stalls:", err);
    }
  };

  const getVendorsCount = async (jwt: string) => {
    try{
      const response = await getAllVendors(jwt);
      if(response.success){
        setVendorsCount(response.data.length);
      }
    }catch(err){
      console.error("Error fetching vendors count:", err);
    }
  }

  const setData = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try{
      setLoading(true);
      await getConfiguredStalls(jwt);
      await getVendorsCount(jwt);
    }catch(err){
      console.error("Error setting data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <StallDashboard
        stalls={configuredStalls}
        stats={stats}
        vendorsCount={vendorsCount}
      />
    </div>
  );
};

export default AdminDashboard;
