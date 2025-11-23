import React from 'react'
import { Stall } from '../reservations/types'
import { Calendar, CheckCircle, Mail, Store, Tag, X } from 'lucide-react';

const RequestCard = ({ stall }: { stall: Stall }) => {
  return (
    <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden group hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl"></div>

      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-2.5 rounded-xl shadow-lg">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              {stall.id}
              <Tag className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-md text-purple-300 font-semibold">
                {stall.size}
              </div>
            </div>
          </div>
        </div>
        <span className="text-xs bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/40 text-orange-300 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
          Pending
        </span>
      </div>

      {/* Business Info Section */}
      <div className="space-y-3 mb-4 relative z-10">
        <div className="bg-[#0d1229]/60 border border-white/10 rounded-xl p-3">
          <div className="flex items-start gap-2 mb-2">
            <Store className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-gray-400 mb-0.5">Business Name</div>
              <div className="text-sm font-semibold text-pink-300">
                {stall.businessName}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-gray-400 mb-0.5">Contact Email</div>
              <div className="text-sm text-gray-300 break-all">
                {stall.email}
              </div>
            </div>
          </div>
        </div>

        {/* Request Date */}
        <div className="flex items-center gap-2 text-xs text-gray-400 px-3 py-2 bg-[#0d1229]/40 border border-white/5 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-medium">Requested:</span>
          <span className="text-gray-300">
            {stall.requestDate
              ? new Date(stall.requestDate).toLocaleString()
              : "—"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 relative z-10">
        <button
          type="button"
          className="flex-1 py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 text-green-300 rounded-xl font-semibold hover:from-green-500/30 hover:to-emerald-600/30 hover:border-green-400/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] group/btn"
        >
          <CheckCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          Approve
        </button>
        <button
          type="button"
          className="flex-1 py-2.5 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300 rounded-xl font-semibold hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] group/btn"
        >
          <X className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard