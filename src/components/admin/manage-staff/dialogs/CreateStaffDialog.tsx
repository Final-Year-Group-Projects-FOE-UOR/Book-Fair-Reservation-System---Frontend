"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, User, Mail, Lock, UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { createStaff } from "@/actions/adminActions";


const CreateStaffDialog = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const jwt = Cookies.get("jwt");
    if(!jwt){
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try{
      setLoading(true);
      const response = await createStaff(
        jwt,
        fullName,
        email
      )
      console.log(response);
      if(response.success){
        toast.success("Staff member created successfully!");
        setFullName("");
        setEmail("");
        setOpen(false);
      }else{
        toast.error(response.message || "Failed to create staff member.");
        console.log(response.message);
      }
    }catch(err){
      console.log("An error occurred while creating staff member:", err);
      toast.error("An error occurred while creating staff member. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="ml-auto px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 border border-purple-400/30 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Add New Staff</span>
          <span className="sm:hidden">Add Staff</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#2a2f4a]/95 to-[#1e2337]/95 backdrop-blur-xl border border-white/10 shadow-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            Add New Staff Member
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Create a new staff account with access credentials
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@example.com"
              className="w-full px-4 py-3 bg-[#0d1229]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Password Input */}
          {/* <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-pink-400" />
              Password
            </label>
            <input
              type="password"
              placeholder="Create secure password"
              className="w-full px-4 py-3 bg-[#0d1229]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
            />
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              type="button"
              disabled={loading || !fullName || !email}
              className={`
    flex-1 py-3 bg-gradient-to-r from-purple-500 h-[50px] to-pink-600 text-white rounded-xl text-sm font-bold 
    transition-all duration-300 flex items-center justify-center gap-2 border border-purple-400/30 
    ${
      loading
        ? "opacity-60 cursor-not-allowed hover:scale-100"
        : "hover:from-purple-600 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] group"
    }
  `}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Add Staff Member
                </>
              )}
            </Button>

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

export default CreateStaffDialog;
