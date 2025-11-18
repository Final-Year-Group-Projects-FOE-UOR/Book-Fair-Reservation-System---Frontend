"use client";

import {
  Book,
  BookMarked,
  BookOpen,
  Calendar,
  Feather,
  Library,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import AnimatedBackground from "../common/backgrounds/animated-background";
import LoginCard from "./LoginCard";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] flex items-center justify-center p-8 transition-opacity duration-500 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="background-orbs pointer-events-none absolute inset-0 -z-10">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <InfoBox
            icon={<Calendar className="w-5 h-5 text-blue-400" />}
            title="Event Date"
            value="Dec 15-20"
          />
          <InfoBox
            icon={<MapPin className="w-5 h-5 text-pink-400" />}
            title="Available Stalls"
            value={`35/48`}
          />
          <InfoBox
            icon={<Users className="w-5 h-5 text-green-400" />}
            title="Vendors"
            value={13}
          />
        </div>
        <div className="w-[60vw]">
          <LoginCard />
        </div>

        {/* Main Title */}
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in flex items-center justify-center gap-4 flex-wrap">
          <Book className="w-16 h-16 text-pink-400" />
          Colombo International Book Fair
          <Library className="w-16 h-16 text-purple-400" />
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay flex items-center justify-center gap-2 flex-wrap">
          <Feather className="w-5 h-5 text-purple-400" />
          Smart Stall Reservation System
          <Feather className="w-5 h-5 text-pink-400" />
        </p>

        {/* Stats Bar */}
        <div className="mb-8 bg-gradient-to-r from-[#2a2f4a]/60 to-[#1e2337]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4 animate-fade-in-delay">
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-pink-400" />
            <div>
              <div className="text-white font-bold">Available Stalls</div>
              <div className="text-sm text-gray-400">35/48</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white font-bold">Vendors</div>
              <div className="text-sm text-gray-400">13</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-xs text-gray-400">Days</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                24/7
                <Library className="w-5 h-5 text-blue-400 group-hover:animate-floating-book" />
              </div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Home;
