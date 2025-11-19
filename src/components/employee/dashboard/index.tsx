// "use client";

// import React from 'react';
// import { Library, Sparkles, LogOut, CheckCircle, Grid, Users } from 'lucide-react';

// interface EmployeeDashboardProps {
//   fadeIn: boolean;
//   setCurrentView: (view: string) => void;
//   employeeTab: string;
//   setEmployeeTab: (tab: string) => void;
//   stats: {
//     total: number;
//     reserved: number;
//     available: number;
//     pending: number;
//   };
//   stalls: any[];
//   pendingRequests: any[];
//   reservations: any[];
//   approveBooking: (stallId: string) => void;
//   rejectBooking: (stallId: string) => void;
// }

// const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
//   fadeIn,
//   setCurrentView,
//   employeeTab,
//   setEmployeeTab,
//   stats,
//   stalls,
//   pendingRequests,
//   reservations,
//   approveBooking,
//   rejectBooking
// }) => (
//   <div className={`min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'} relative overflow-hidden`}>
//     {/* Background Effects */}
//     <div className="background-orbs">
//       <div className="orb orb-1"></div>
//       <div className="orb orb-2"></div>
//       <div className="orb orb-3"></div>
//       <div className="orb orb-4"></div>
//     </div>
    
//     <div className="absolute inset-0 opacity-10 pointer-events-none">
//       <div className="absolute inset-0" style={{
//         backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 2px, transparent 2px)`,
//         backgroundSize: '100px 100px'
//       }}></div>
//     </div>
    
//     <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
//     <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    
//     <div className="max-w-7xl mx-auto relative z-10">
//       {/* Dashboard Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg shadow-blue-500/50 relative">
//             <Library className="w-8 h-8 text-white animate-floating-book" />
//             <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-sparkle" />
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold text-white flex items-center gap-2">
//               Employee Dashboard
//             </h2>
//             <p className="text-gray-300 text-sm">Manage bookfair reservations and stalls</p>
//           </div>
//         </div>
//         <button
//           onClick={() => setCurrentView('employee_landing')}
//           className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
//         >
//           <LogOut className="w-5 h-5" />
//           Logout
//         </button>
//       </div>

//       {/* Main Dashboard Card */}
//       <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
//         {/* Tab Navigation */}
//         <div className="flex gap-2 sm:gap-4 mb-6 border-b border-white/10 overflow-x-auto">
//           <button
//             type="button"
//             onClick={() => setEmployeeTab('requests')}
//             className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
//               employeeTab === 'requests' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5" />
//               Booking Requests
//               {stats.pending > 0 && (
//                 <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
//                   {stats.pending}
//                 </span>
//               )}
//             </div>
//             {employeeTab === 'requests' && (
//               <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
//             )}
//           </button>
          
//           <button
//             type="button"
//             onClick={() => setEmployeeTab('availability')}
//             className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
//               employeeTab === 'availability' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               <Grid className="w-5 h-5" />
//               Stall Availability
//             </div>
//             {employeeTab === 'availability' && (
//               <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
//             )}
//           </button>
          
//           <button
//             type="button"
//             onClick={() => setEmployeeTab('reservations')}
//             className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${
//               employeeTab === 'reservations' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               <Users className="w-5 h-5" />
//               All Reservations
//             </div>
//             {employeeTab === 'reservations' && (
//               <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
//             )}
//           </button>
//         </div>

//         {/* Tab Content - Placeholder for now */}
//         <div className="text-center py-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
//             {employeeTab === 'requests' && <CheckCircle className="w-8 h-8 text-blue-400" />}
//             {employeeTab === 'availability' && <Grid className="w-8 h-8 text-blue-400" />}
//             {employeeTab === 'reservations' && <Users className="w-8 h-8 text-blue-400" />}
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">
//             {employeeTab === 'requests' && 'Booking Requests'}
//             {employeeTab === 'availability' && 'Stall Availability'}
//             {employeeTab === 'reservations' && 'All Reservations'}
//           </h3>
//           <p className="text-gray-400">
//             Tab content will be implemented here
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default EmployeeDashboard;


"use client";

import React from 'react';
import DashboardHeader from '@/components/employee/dashboard/DashboardHeader';
import DashboardTabs from '@/components/employee/dashboard/DashboardTabs';
import BookingRequests from '@/components/employee/dashboard/tabs/BookingRequests';
import StallAvailability from '@/components/employee/dashboard/tabs/StallAvailability';
import AllReservations from '@/components/employee/dashboard/tabs/AllReservations';

interface EmployeeDashboardProps {
  fadeIn: boolean;
  setCurrentView: (view: string) => void;
  employeeTab: string;
  setEmployeeTab: (tab: string) => void;
  stats: {
    total: number;
    reserved: number;
    available: number;
    pending: number;
  };
  stalls: any[];
  pendingRequests: any[];
  reservations: any[];
  approveBooking: (stallId: string) => void;
  rejectBooking: (stallId: string) => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  fadeIn,
  setCurrentView,
  employeeTab,
  setEmployeeTab,
  stats,
  stalls,
  pendingRequests,
  reservations,
  approveBooking,
  rejectBooking
}) => (
  <div className={`min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'} relative overflow-hidden`}>
    {/* Background Effects */}
    <div className="background-orbs">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
    </div>
    
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 2px, transparent 2px)`,
        backgroundSize: '100px 100px'
      }}></div>
    </div>
    
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <DashboardHeader setCurrentView={setCurrentView} />

      <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
        <DashboardTabs 
          employeeTab={employeeTab} 
          setEmployeeTab={setEmployeeTab} 
          stats={stats} 
        />

        {employeeTab === 'requests' && (
          <BookingRequests 
            stats={stats}
            pendingRequests={pendingRequests}
            approveBooking={approveBooking}
            rejectBooking={rejectBooking}
          />
        )}

        {employeeTab === 'availability' && (
          <StallAvailability stats={stats} stalls={stalls} />
        )}

        {employeeTab === 'reservations' && (
          <AllReservations reservations={reservations} />
        )}
      </div>
    </div>
  </div>
);

export default EmployeeDashboard;