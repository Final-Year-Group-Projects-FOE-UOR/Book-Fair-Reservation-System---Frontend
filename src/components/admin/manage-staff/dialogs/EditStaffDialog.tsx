import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, User, Mail, Lock, UserPlus, X, FileText } from "lucide-react";
import { Staff } from "../types";

const EditStaffDialog = ({ staff }: { staff: Staff }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition flex items-center justify-center gap-2 text-sm"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Edit</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#2a2f4a]/95 to-[#1e2337]/95 backdrop-blur-xl border border-white/10 shadow-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            Edit Staff Member
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Update staff account details and access credentials
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              Full Name
            </label>
            <input
              type="text"
              value={staff.name} 
              onChange={() => {}}
              placeholder="Enter full name"
              className="w-full px-4 py-3 bg-[#0d1229]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Email Address
            </label>
            <input
            
              type="email"
              value={staff.email}
              onChange={() => {}}
              placeholder="staff@example.com"
              className="w-full px-4 py-3 bg-[#0d1229]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-pink-400" />
              New Password
            </label>
            <input
              type="password"
              placeholder="Create secure password"
              className="w-full px-4 py-3 bg-[#0d1229]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 border border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] group"
            >
              <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Update Staff Member
            </button>
            <button
              type="button"
              className="flex-1 py-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 border border-gray-500/30 text-gray-300 rounded-xl text-sm font-bold hover:from-gray-600/30 hover:to-gray-700/30 hover:border-gray-400/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] group"
            >
              <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStaffDialog;
