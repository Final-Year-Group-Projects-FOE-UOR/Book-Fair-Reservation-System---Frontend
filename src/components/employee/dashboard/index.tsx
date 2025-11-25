"use client";
import React, { useState } from "react";

import DashboardHeader from "@/components/employee/dashboard/DashboardHeader";
import DashboardTabs from "@/components/employee/dashboard/DashboardTabs";
import BookingRequests from "@/components/employee/dashboard/tabs/BookingRequests";
import StallAvailability from "@/components/employee/dashboard/tabs/StallAvailability";
import AllReservations from "@/components/employee/dashboard/tabs/AllReservations";

const EmployeeDashboard = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [employeeTab, setEmployeeTab] = useState("requests");
  const [currentView, setCurrentView] = useState("employee_dashboard");
  return (
    <div
      className={`min-h-screen font-geist-sans bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      } relative overflow-hidden`}
    >
      {/* Background Effects */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 2px, transparent 2px)`,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <DashboardHeader setCurrentView={setCurrentView} />

        <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
          <DashboardTabs
            employeeTab={employeeTab}
            setEmployeeTab={setEmployeeTab}
          />

          {employeeTab === "requests" && <BookingRequests />}
          {/* 

          {employeeTab === "availability" && (
            <StallAvailability stats={stats} stalls={stalls} />
          )}

          {employeeTab === "reservations" && (
            <AllReservations reservations={reservations} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
