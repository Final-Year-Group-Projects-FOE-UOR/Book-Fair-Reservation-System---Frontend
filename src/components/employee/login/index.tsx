"use client";

import React, { useState } from 'react';
import { Home, GraduationCap, Mail, Lock } from 'lucide-react';

interface EmployeeLoginProps {
  fadeIn: boolean;
  setCurrentView: (view: string) => void;
  handleEmployeeLogin: (email: string, password: string) => boolean;
}

const EmployeeLogin: React.FC<EmployeeLoginProps> = ({ fadeIn, setCurrentView, handleEmployeeLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = handleEmployeeLogin(credentials.email, credentials.password);
    if (!success) {
      setError('Invalid employee credentials');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] flex items-center justify-center p-8 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'} relative overflow-hidden`}>
      {/* Background Orbs */}
      <div className="background-orbs">
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('employee_landing')}
          className="mb-4 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors group"
        >
          <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        
        {/* Login Card */}
        <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Employee Login</h2>
            <p className="text-gray-300 mt-2">Enter your credentials to access the dashboard</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition text-white placeholder-gray-500"
                  placeholder="employee@bookfair.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition text-white placeholder-gray-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all shadow-lg shadow-blue-500/50"
            >
              Login to Dashboard
            </button>
          </form>
          
          {/* Demo Credentials */}
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
            <p className="text-xs text-gray-400 text-center">
              Demo: employee@bookfair.com / employee123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;