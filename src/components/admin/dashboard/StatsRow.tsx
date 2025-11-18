"use client";
import React from "react";
import AnimatedStatCard from "./AnimatedStatCard";
import { Target, Eye, CheckCircle, Users } from "lucide-react";

export default function StatsRow({
  stats,
  vendorsCount,
}: {
  stats: { total: number; reserved: number; available: number };
  vendorsCount: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <AnimatedStatCard
        icon={<Target className="w-5 h-5 text-white" />}
        label="Total Stalls"
        value={stats.total}
        trend="+5%"
        color="blue"
      />
      <AnimatedStatCard
        icon={<Eye className="w-5 h-5 text-white" />}
        label="Available"
        value={stats.available}
        color="green"
      />
      <AnimatedStatCard
        icon={<CheckCircle className="w-5 h-5 text-white" />}
        label="Reserved"
        value={stats.reserved}
        trend="+12%"
        color="pink"
      />
      <AnimatedStatCard
        icon={<Users className="w-5 h-5 text-white" />}
        label="Vendors"
        value={vendorsCount}
        trend="+8%"
        color="orange"
      />
    </div>
  );
}
