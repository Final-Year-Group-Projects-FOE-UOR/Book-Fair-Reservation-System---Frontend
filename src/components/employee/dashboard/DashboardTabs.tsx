import React from 'react';
import { CheckCircle, Grid, Users } from 'lucide-react';

interface DashboardTabsProps {
  employeeTab: string;
  setEmployeeTab: (tab: string) => void;
  stats: {
    pending: number;
  };
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ employeeTab, setEmployeeTab, stats }) => (
  <div className="flex gap-2 sm:gap-4 mb-6 border-b border-white/10 overflow-x-auto">
    <button
      type="button"
      onClick={() => setEmployeeTab('requests')}
      className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
        employeeTab === 'requests' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        Booking Requests
        {/* {stats.pending > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {stats.pending}
          </span>
        )} */}
      </div>
      {employeeTab === 'requests' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
      )}
    </button>
    
    <button
      type="button"
      onClick={() => setEmployeeTab('availability')}
      className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
        employeeTab === 'availability' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <Grid className="w-5 h-5" />
        Stall Availability
      </div>
      {employeeTab === 'availability' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
      )}
    </button>
    
    <button
      type="button"
      onClick={() => setEmployeeTab('reservations')}
      className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
        employeeTab === 'reservations' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5" />
        All Reservations
      </div>
      {employeeTab === 'reservations' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
      )}
    </button>
  </div>
);

export default DashboardTabs;