import React from 'react'
import { Stall } from './types'

const ReservationCard = ({stall}: {stall: Stall}) => {
  return (
    <div
      key={stall.id}
      className="bg-[#1a1f37]/50 border border-green-500/40 rounded-xl p-4 sm:p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xl font-bold text-white">{stall.id}</div>
          <div className="text-xs text-gray-400">Size: {stall.size}</div>
          <div className="mt-2 text-sm text-gray-300 font-semibold">
            {stall.businessName}
          </div>
          <div className="text-xs text-gray-400">{stall.email}</div>
        </div>
        <span className="text-xs bg-green-500/30 text-green-300 px-2 py-1 rounded-full font-semibold">
          {stall.reserved ? "Reserved" : stall.pending ? "Pending" : "Available"}
        </span>
      </div>
      <div className="text-xs text-gray-400 mt-3">
        Approved:{" "}
        {stall.approvedDate
          ? new Date(stall.approvedDate).toLocaleString()
          : "—"}
      </div>
    </div>
  );
}

export default ReservationCard