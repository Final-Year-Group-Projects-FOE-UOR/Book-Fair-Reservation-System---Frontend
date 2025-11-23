import React from 'react'
import { Stall } from '../reservations/types'

const StallCard = ({stall}: {stall: Stall}) => {
  return (
    <div
      key={stall.id}
      className={`p-4 rounded-xl border-2 text-center text-sm font-semibold transition ${
        stall.pending
          ? "bg-orange-500/15 border-orange-500/40 text-orange-300"
          : stall.reserved
          ? "bg-green-500/15 border-green-500/40 text-green-300"
          : "bg-blue-500/10 border-blue-500/30 text-blue-300"
      }`}
    >
      <div className="text-lg font-bold text-white">{stall.id}</div>
      <div className="text-xs text-gray-400">{stall.size}</div>
      {stall.pending && (
        <div className="mt-1 text-xs text-orange-400">Pending</div>
      )}
      {stall.reserved && !stall.pending && (
        <div className="mt-1 text-xs text-green-400">Reserved</div>
      )}
    </div>
  );
}

export default StallCard