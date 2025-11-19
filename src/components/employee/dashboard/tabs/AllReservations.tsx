import React from 'react';
import { Users, Mail } from 'lucide-react';

interface AllReservationsProps {
  reservations: any[];
}

const AllReservations: React.FC<AllReservationsProps> = ({ reservations }) => (
  <div className="grid md:grid-cols-4 gap-6">
    <div className="md:col-span-3">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Users className="w-6 h-6 text-purple-400" />
        Active Reservations ({reservations.length})
      </h3>
      {reservations.length > 0 ? (
        <div className="space-y-3">
          {reservations.map((stall) => (
            <div
              key={stall.id}
              className="bg-[#1a1f37]/50 border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-lg">
                      <span className="text-purple-300 font-bold">{stall.id}</span>
                    </div>
                    <div className="text-sm text-gray-400">{stall.size}</div>
                  </div>
                  <div className="text-white font-semibold mb-1">{stall.businessName}</div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {stall.email}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                    <span className="text-green-300 text-xs font-semibold">✓ Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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

export default AllReservations;