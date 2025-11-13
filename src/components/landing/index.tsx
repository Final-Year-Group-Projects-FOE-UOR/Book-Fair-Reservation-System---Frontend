"use client";
import { Book, BookOpen, Library } from "lucide-react";
import React, { useState } from "react";
import SignUpModal from "./sign-up";

type Particle = {
  left: string;
  top: string;
  delay: string;
  duration: string;
};

type FloatingBook = {
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: number;
  type: "Book" | "BookOpen" | "Library";
};

const Home = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`,
    }))
  );

  const [floatingBooks] = useState<FloatingBook[]>(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${6 + Math.random() * 6}s`,
      size: 40 + Math.random() * 40,
      type: i % 3 === 0 ? "BookOpen" : i % 3 === 1 ? "Book" : "Library",
    }))
  );

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

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
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
        <div className="mt-12 w-[60vw] bg-linear-to-r from-[#2a2f4a]/60 to-[#1e2337]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Book className="w-8 h-8 text-yellow-400 animate-floating-book" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-sparkle" />
            </div>
            <div>
              <div className="text-white font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-pink-400" />
                Trusted by 200+ Publishers
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Feather className="w-3 h-3 text-purple-400" />
                {`Sri Lanka's Premier Book Exhibition Platform`}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center group">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                50+
                <BookMarked className="w-5 h-5 text-pink-400 group-hover:animate-bookmark-drop" />
              </div>
              <div className="text-xs text-gray-400">Stalls</div>
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

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
          Welcome to BookFest
        </h1>
        <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay">
          Reserve your stall for the ultimate book fair experience
        </p>
        <button
          onClick={() => setIsSignUpOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 animate-fade-in-delay-2"
        >
          Get Started - Register Now
        </button>
      </div>

      {/* SignUp Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />

      {/* Animations / styles (global within this component) */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s backwards;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s backwards;
        }
      `}</style>
    </div>
  );
};

export default Landing;
