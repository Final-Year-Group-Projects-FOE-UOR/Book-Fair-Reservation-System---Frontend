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

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] flex items-center justify-center p-8 transition-opacity duration-500 relative overflow-hidden">
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

export default Home;
