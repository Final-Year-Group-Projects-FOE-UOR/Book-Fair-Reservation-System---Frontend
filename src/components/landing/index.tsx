"use client";
import {
  Book,
  BookOpen,
  Library,
  Sparkles,
  Feather,
  MapPin,
  Users,
  BookMarked,
} from "lucide-react";
import React, { useState } from "react";
import SignUpModal from "./sign-up";
import LoginModal from "./login";

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
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] flex items-center justify-center p-8 transition-opacity duration-500 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="background-orbs pointer-events-none absolute inset-0 -z-10">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
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
        ))}
      </div>

      {/* Floating Book Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingBooks.map((b, i) => (
          <div
            key={i}
            className="absolute text-white/5 animate-floating-book"
            style={{
              left: b.left,
              top: b.top,
              animationDelay: b.delay,
              animationDuration: b.duration,
              width: b.size,
              height: b.size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {b.type === "BookOpen" ? (
              <BookOpen size={b.size} />
            ) : b.type === "Book" ? (
              <Book size={b.size} />
            ) : (
              <Library size={b.size} />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 px-4 py-2 rounded-full mb-6 animate-fade-in">
          <BookOpen className="w-4 h-4 text-pink-400" />
          <span className="text-pink-300 text-sm font-semibold">
            Colombo 2025 - Premium Event
          </span>
          <Sparkles className="w-4 h-4 text-pink-400" />
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
          </div>
          <div className="flex items-center gap-4">
            <BookMarked className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-white font-bold">50+ Stalls</div>
              <div className="text-sm text-gray-400">6 Days Event</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setIsSignUpOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 animate-fade-in-delay-2"
        >
          Get Started - Register Now
        </button>

        {/* Trust Badge */}
        <div className="mt-8 text-gray-400 text-sm flex items-center justify-center gap-2 animate-fade-in-delay-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Trusted by 200+ Publishers - Sri Lanka's Premier Book Exhibition
          Platform
        </div>
      </div>

      {/* SignUp Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => setIsLoginOpen(true)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={() => setIsSignUpOpen(true)}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes floating-book {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.1;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-floating-book {
          animation: floating-book ease-in-out infinite;
        }

        .background-orbs .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: pulse 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #8b5cf6, transparent);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #ec4899, transparent);
          top: 20%;
          right: -5%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #6366f1, transparent);
          bottom: 10%;
          left: 10%;
          animation-delay: 4s;
        }

        .orb-4 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #a855f7, transparent);
          bottom: -15%;
          right: -15%;
          animation-delay: 6s;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
