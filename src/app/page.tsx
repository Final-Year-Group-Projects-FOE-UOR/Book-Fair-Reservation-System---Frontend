"use client";
import { Book, BookOpen, Library } from "lucide-react";
import React, { useState } from "react";

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

      {/* Animations / styles (global within this component) */}
      <style>{`
        
      `}</style>
    </div>
  );
};

export default Home;
