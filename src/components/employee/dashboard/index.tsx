"use client";

import { Book, Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";

const EmployeeDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Employee Dashboard</h1>
        <p className="text-gray-300">Manage bookfair operations</p>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto mb-6 flex gap-4">
        <button
          onClick={() => setSelectedSection("overview")}
          className={`px-6 py-3 rounded-lg ${
            selectedSection === "overview"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedSection("stalls")}
          className={`px-6 py-3 rounded-lg ${
            selectedSection === "stalls"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Stall Management
        </button>
        <button
          onClick={() => setSelectedSection("vendors")}
          className={`px-6 py-3 rounded-lg ${
            selectedSection === "vendors"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Vendor Requests
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {selectedSection === "overview" && <OverviewSection />}
        {selectedSection === "stalls" && <StallsSection />}
        {selectedSection === "vendors" && <VendorsSection />}
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <DashboardCard
      icon={<Calendar className="w-8 h-8 text-blue-400" />}
      title="Event Date"
      value="Dec 15-20, 2025"
    />
    <DashboardCard
      icon={<MapPin className="w-8 h-8 text-pink-400" />}
      title="Available Stalls"
      value="35/48"
    />
    <DashboardCard
      icon={<Users className="w-8 h-8 text-green-400" />}
      title="Total Vendors"
      value="13"
    />
  </div>
);

// Stalls Section Component
const StallsSection = () => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
    <h2 className="text-2xl font-bold text-white mb-4">Stall Management</h2>
    <p className="text-gray-300">View and manage all stall bookings here.</p>
  </div>
);

// Vendors Section Component
const VendorsSection = () => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
    <h2 className="text-2xl font-bold text-white mb-4">Vendor Requests</h2>
    <p className="text-gray-300">Review and approve vendor applications.</p>
  </div>
);

// Reusable Dashboard Card
const DashboardCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | number }) => (
  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <div className="flex items-center gap-4 mb-4">{icon}</div>
    <h3 className="text-gray-300 text-sm mb-2">{title}</h3>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

export default EmployeeDashboard;