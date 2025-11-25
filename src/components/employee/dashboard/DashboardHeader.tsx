import React from 'react';
import { Library, Sparkles, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  setCurrentView: (view: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setCurrentView }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-3">
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg shadow-blue-500/50 relative">
        <Library className="w-8 h-8 text-white animate-floating-book" />
        <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-sparkle" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          Employee Dashboard
        </h2>
        <p className="text-gray-300 text-sm">Manage bookfair reservations and stalls</p>
      </div>
    </div>
    <button
      onClick={() => setCurrentView('employee_landing')}
      className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  </div>
);

export default DashboardHeader;