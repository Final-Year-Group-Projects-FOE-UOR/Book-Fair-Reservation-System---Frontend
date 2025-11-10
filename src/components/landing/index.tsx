"use client";

import {
  Book,
  BookOpen,
  Calendar,
  Feather,
  Library,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import AnimatedBackground from "../common/backgrounds/animated-background";
import LoginCard from "./LoginCard";

const Landing = () => {
  return (
    <AnimatedBackground>
      <div className="flex flex-col w-full items-center justify-start">
        <div className="max-w-6xl w-full relative z-10">
          {/* Header Section with Stats */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 px-4 py-2 rounded-full mb-6 animate-book-open">
              <BookOpen className="w-4 h-4 text-pink-400 animate-page-flip" />
              <span className="text-pink-300 text-sm font-semibold">
                Colombo 2025 - Premium Event
              </span>
              <Sparkles className="w-4 h-4 text-pink-400 animate-sparkle" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text  flex items-center justify-center gap-4">
              <Book className="w-16 h-16 text-pink-400 animate-floating-book" />
              Colombo International Bookfair
              <Library
                className="w-16 h-16 text-purple-400 animate-floating-book"
                style={{ animationDelay: "2s" }}
              />
            </h1>
            <p className="text-xl text-gray-300 mb-8 flex items-center justify-center gap-2">
              <Feather className="w-5 h-5 text-purple-400" />
              Smart Stall Reservation System
              <Feather className="w-5 h-5 text-pink-400" />
            </p>
          </div>
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
        <div className="w-[80vw]">
          <LoginCard />
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Landing;
