import React from 'react';
import { Grid, CheckCircle, Target, LayoutDashboard } from 'lucide-react';
import ProgressCircle from '../../shared/ProgressCircle';

interface StallAvailabilityProps {
  stats: {
    total: number;
    reserved: number;
  };
  stalls: any[];
}

const StallAvailability: React.FC<StallAvailabilityProps> = ({ stats, stalls }) => (
  <div className="grid md:grid-cols-4 gap-6">
    <div className="md:col-span-3">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Grid className="w-6 h-6 text-blue-400" />
        All Stalls
      </h3>
      <div className="grid grid-cols-5 gap-3">
        {stalls.filter(s => !s.isEmpty).map(stall => (
          <div
            key={stall.id}
            className={`p-4 rounded-xl border-2 transition-all ${
              stall.pending
                ? 'bg-orange-500/10 border-orange-500/40 animate-pulse'
                : stall.reserved
                ? 'bg-gray-700/30 border-gray-600'
                : 'bg-green-500/10 border-green-500/30'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-white">{stall.id}</div>
              <div className="text-xs text-gray-400">{stall.size}</div>
              {stall.pending && (
                <div className="mt-2">
                  <CheckCircle className="w-5 h-5 text-orange-400 mx-auto" />
                  <div className="text-xs text-orange-400 mt-1">Pending</div>
                </div>
              )}
              {stall.reserved && !stall.pending && (
                <div className="mt-2">
                  <CheckCircle className="w-5 h-5 text-gray-400 mx-auto" />
                  <div className="text-xs text-gray-500 mt-1">Reserved</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Booking Progress
        </div>
        <div className="flex justify-center mb-4">
          <ProgressCircle 
            percentage={Math.round((stats.reserved / stats.total) * 100)} 
            size={140} 
            strokeWidth={10}
            color="pink" 
          />
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Stalls Reserved</div>
          <div className="text-lg font-bold text-white">{stats.reserved} of {stats.total}</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4" />
          Stall Sizes
        </div>
        <div className="space-y-3">
          {['small', 'medium', 'large'].map((size, idx) => {
            const count = stalls.filter(s => s.size === size && !s.isEmpty).length;
            const reserved = stalls.filter(s => s.size === size && s.reserved).length;
            const percentage = count > 0 ? (reserved / count) * 100 : 0;
            const colors = ['from-blue-500 to-cyan-600', 'from-pink-500 to-purple-600', 'from-orange-500 to-amber-600'];
            
            return (
              <div key={size}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-300 capitalize font-medium">{size}</span>
                  <span className="text-xs text-gray-400">{reserved}/{count}</span>
                </div>
                <div className="h-2 bg-[#1a1f37] rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${colors[idx]} transition-all duration-1000 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default StallAvailability;