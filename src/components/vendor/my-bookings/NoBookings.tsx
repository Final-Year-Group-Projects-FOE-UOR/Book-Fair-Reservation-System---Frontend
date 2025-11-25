import { CalendarX, Sparkles } from 'lucide-react';
import React from 'react'

const NoBookings = () => {
  return (
    <div className="mt-8 bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-10 flex flex-col items-center justify-center text-center">
      <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes pulse-ring {
        0% { transform: scale(0.9); opacity: 0.6; }
        50% { transform: scale(1.05); opacity: 0.2; }
        100% { transform: scale(0.9); opacity: 0.6; }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      .float-icon { animation: float 3.5s ease-in-out infinite; }
      .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
      .shimmer-text {
        background: linear-gradient(90deg, #94a3b8 0%, #e2e8f0 40%, #94a3b8 60%, #64748b 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
    `}</style>

      {/* Icon with pulsing ring */}
      <div className="relative mb-6 float-icon">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 scale-150 pulse-ring" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#3d4470] to-[#252a45] border border-white/10 flex items-center justify-center shadow-xl">
          <CalendarX className="w-9 h-9 text-indigo-300/80" strokeWidth={1.5} />
        </div>
        {/* sparkle accents */}
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-indigo-400/60" />
      </div>

      {/* Heading */}
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
        No bookings yet
      </h3>

      {/* Subtext */}
      <p className="shimmer-text text-sm max-w-[240px] leading-relaxed font-medium">
        Your confirmed and pending reservations will appear here once you book a
        stall.
      </p>

      {/* Divider dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-indigo-400/30"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default NoBookings