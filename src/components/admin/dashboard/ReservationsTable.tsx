"use client";
import React from "react";
import type { Stall } from "./types";
import { Users } from "lucide-react";

export default function ReservationsTable({
  reservations,
}: {
  reservations: Stall[];
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-linear-to-r from-pink-500/10 to-purple-600/10 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full" />
                  Stall ID
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Size
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Business Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {reservations.map((stall, idx) => (
              <tr
                key={stall.id ?? idx}
                className="hover:bg-white/5 transition group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-pink-500/30">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-white">
                      {stall.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {stall.size}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {stall.businessName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {stall.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reservations.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/30 rounded-full mb-4">
              <Users className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400">No reservations yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
