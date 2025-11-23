"use client";
import React, { useEffect, useState } from "react";
import StallDashboard, { Stall } from "./StallDashboard";

const sampleStalls: Stall[] = [
  { id: "1", size: "small", reserved: true, isEmpty: false },
  { id: "2", size: "small", reserved: false, isEmpty: false },
  { id: "3", size: "small", reserved: true, isEmpty: false },
  { id: "4", size: "medium", reserved: true, isEmpty: false },
  { id: "5", size: "medium", reserved: true, isEmpty: false },
  { id: "6", size: "medium", reserved: false, isEmpty: false },
  { id: "7", size: "medium", reserved: false, isEmpty: false },
  { id: "8", size: "large", reserved: true, isEmpty: false },
  { id: "9", size: "large", reserved: false, isEmpty: false },
  { id: "10", size: "large", reserved: false, isEmpty: false },
];

const sampleStats = {
  total: 10,
  reserved: 6,
  available: 4,
};

const AdminDashboard: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [adminTab, setAdminTab] = useState<
    "availability" | "reservations" | "mapupload"
  >("availability");

  useEffect(() => {
    const t = setTimeout(() => setFadeIn(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <StallDashboard
        stalls={sampleStalls}
        stats={sampleStats}
        vendorsCount={6}
      />
    </div>
  );
};

export default AdminDashboard;
