import React from 'react';
import { CheckCircle, X, Building, Mail } from 'lucide-react';

interface BookingRequestsProps {
  stats: { pending: number };
  pendingRequests: any[];
  approveBooking: (stallId: string) => void;
  rejectBooking: (stallId: string) => void;
}

const BookingRequests: React.FC<BookingRequestsProps> = ({
  stats,
  pendingRequests,
  approveBooking,
  rejectBooking
}) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <CheckCircle className="w-7 h-7 text-blue-400" />
        Pending Booking Requests
        {stats.pending > 0 && (
          <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
            {stats.pending} pending
          </span>
        )}
      </h2>
    </div>

    {pendingRequests.length === 0 ? (
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-white mb-2">No Pending Requests</h3>
        <p className="text-gray-300">All booking requests have been processed.</p>
      </div>
    ) : (
      <div className="grid gap-4">
        {pendingRequests.map(stall => (
          <div key={stall.id} className="bg-gradient-to-br from-orange-500/10 to-yellow-600/10 border border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/50 transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
                    Stall {stall.id}
                  </span>
                  <span className="bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    ⏳ PENDING APPROVAL
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    stall.size === 'small' ? 'bg-green-500/20 border border-green-500/30 text-green-300' :
                    stall.size === 'medium' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' :
                    'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                  }`}>
                    {stall.size}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-semibold">
                    <Building className="w-4 h-4 inline mr-2 text-blue-400" />
                    {stall.businessName}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <Mail className="w-4 h-4 inline mr-2 text-gray-400" />
                    {stall.email}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Requested: {new Date(stall.requestDate).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => approveBooking(stall.id)}
                  className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition shadow-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => rejectBooking(stall.id)}
                  className="px-5 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default BookingRequests;