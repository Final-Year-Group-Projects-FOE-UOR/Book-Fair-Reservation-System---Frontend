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
import type { Stall } from "./types";
import MapManagement from "./map-management";

const AdminDashboard: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [adminTab, setAdminTab] = useState<"availability" | "reservations" | "mapupload">(
    "availability"
  );

  useEffect(() => {
    const t = setTimeout(() => setFadeIn(true), 20);
    return () => clearTimeout(t);
  }, []);

  const generateInitialStalls = (): Stall[] => {
    const stalls: Stall[] = [];
    const sizes: Stall["size"][] = ["small", "medium", "large"];
    const rows = 5;
    const cols = 10;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((col === 4 || col === 5) && row === 2) {
          stalls.push({ id: null, isEmpty: true });
          continue;
        }

        const stallId = `${String.fromCharCode(65 + row)}${col + 1}`;
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const reserved = Math.random() < 0.3;

        stalls.push({
          id: stallId,
          size,
          reserved,
          isEmpty: false,
          businessName: reserved ? `Business ${stallId}` : null,
          email: reserved ? `vendor${stallId.toLowerCase()}@example.com` : null,
        });
      }
    }

    return stalls;
  };

  const [stalls, setStalls] = useState<Stall[]>(() => generateInitialStalls());

  const stats = {
    total: stalls.filter((s) => !s.isEmpty).length,
    reserved: stalls.filter((s) => s.reserved).length,
    available: stalls.filter((s) => !s.isEmpty && !s.reserved).length,
  };

  const reservations = stalls.filter((s) => s.reserved && s.businessName);

  return (
    <div
      className={`min-h-screen bg-linear-to-br font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      } relative overflow-hidden`}
    >
      <div className="background-orbs pointer-events-none absolute inset-0 -z-10">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(59, 130, 246, 0.06) 2px, transparent 2px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Header />
        <StatsRow stats={stats} vendorsCount={reservations.length} />

        <div className="grid font-geist-sans grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-linear-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
            <div className="flex gap-4 mb-6 border-b border-white/10">
              <button
                onClick={() => setAdminTab("availability")}
                className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
                  adminTab === "availability"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Stall Availability
                </div>
                {adminTab === "availability" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-purple-600 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setAdminTab("reservations")}
                className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
                  adminTab === "reservations"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  All Reservations
                </div>
                {adminTab === "reservations" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-purple-600 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setAdminTab("mapupload")}
                className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
                  adminTab === "mapupload"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Map Management
                </div>
                {adminTab === "mapupload" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-purple-600 rounded-full"></div>
                )}
              </button>
            </div>

            {adminTab === "availability" && (
              <StallGrid stalls={stalls} setStalls={setStalls} />
            )}

            {adminTab === "reservations" && (
              <ReservationsTable reservations={reservations} />
            )}

            {adminTab === "mapupload" && (
              <MapManagement  />
            )}
          </div>

          <Sidebar stalls={stalls} stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
