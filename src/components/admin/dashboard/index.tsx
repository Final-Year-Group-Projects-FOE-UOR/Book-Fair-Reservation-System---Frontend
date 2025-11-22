"use client";
import React, { useEffect, useState } from "react";
import { BookOpen, CheckCircle, MapPin } from "lucide-react";
import AnimatedStatCard from "./AnimatedStatCard";
import ProgressCircle from "./ProgressCircle";
import Header from "./Header";
import StatsRow from "./StatsRow";
import StallGrid from "./StallGrid";
import ReservationsTable from "./ReservationsTable";
import Sidebar from "./Sidebar";
import MapManagement from "./map-management";
import StallDashboard, { Stall } from "./Test";

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
  const [adminTab, setAdminTab] = useState<"availability" | "reservations" | "mapupload">(
    "availability"
  );

  useEffect(() => {
    const t = setTimeout(() => setFadeIn(true), 20);
    return () => clearTimeout(t);
  }, []);

  // const generateInitialStalls = (): Stall[] => {
  //   const stalls: Stall[] = [];
  //   const sizes: Stall["size"][] = ["small", "medium", "large"];
  //   const rows = 5;
  //   const cols = 10;

  //   for (let row = 0; row < rows; row++) {
  //     for (let col = 0; col < cols; col++) {
  //       if ((col === 4 || col === 5) && row === 2) {
  //         stalls.push({ id: null, isEmpty: true });
  //         continue;
  //       }

  //       const stallId = `${String.fromCharCode(65 + row)}${col + 1}`;
  //       const size = sizes[Math.floor(Math.random() * sizes.length)];
  //       const reserved = Math.random() < 0.3;

  //       stalls.push({
  //         id: stallId,
  //         size,
  //         reserved,
  //         isEmpty: false,
  //         businessName: reserved ? `Business ${stallId}` : null,
  //         email: reserved ? `vendor${stallId.toLowerCase()}@example.com` : null,
  //       });
  //     }
  //   }

  //   return stalls;
  // };

  // const [stalls, setStalls] = useState<Stall[]>(() => generateInitialStalls());

  // const stats = {
  //   total: stalls.filter((s) => !s.isEmpty).length,
  //   reserved: stalls.filter((s) => s.reserved).length,
  //   available: stalls.filter((s) => !s.isEmpty && !s.reserved).length,
  // };

  // const reservations = stalls.filter((s) => s.reserved && s.businessName);

  return (
    <div
      className={`min-h-[calc(100vh-80px)]  bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      } relative overflow-hidden`}
    >
      <StallDashboard stalls={sampleStalls} stats={sampleStats} vendorsCount={6} />;
    </div>
  );
};

export default AdminDashboard;
