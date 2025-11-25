"use client";

import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import LoadingScreen from "@/components/common/loading";
import EmployeeHeader from "./Header";

type EmployeeLayoutProps = {
  children: React.ReactNode;
};

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {

  const [loading, setLoading] = useState(false);

  

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
          <EmployeeHeader/>
          <Tabs />
          {children}
        </div>
      </div>
    </>
  );
};

export default EmployeeLayout;
