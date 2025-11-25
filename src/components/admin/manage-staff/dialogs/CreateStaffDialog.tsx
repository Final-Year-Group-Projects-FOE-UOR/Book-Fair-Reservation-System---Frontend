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
import { Plus, User, Mail, UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { createStaff } from "@/actions/staffActions";

type CreateStaffDialogProps = {
  uponSuccess: () => void;
};

const CreateStaffDialog = ({ uponSuccess }: CreateStaffDialogProps) => {
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
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try {
      setLoading(true);
      const response = await createStaff(jwt, fullName, email);
      if (response.success) {
        toast.success("Staff member created successfully!");
        uponSuccess();
        setFullName("");
        setEmail("");
        setOpen(false);
      } else {
        toast.error(response.message || "Failed to create staff member.");
      }
    } catch (err) {
      console.log("An error occurred while creating staff member:", err);
      toast.error(
        "An error occurred while creating staff member. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="ml-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:from-purple-600 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border border-purple-400/30 hover:scale-[1.02]"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="hidden sm:inline">Add New Staff</span>
          <span className="sm:hidden">Add Staff</span>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-gradient-to-br from-[#2a2f4a]/95 to-[#1e2337]/95 backdrop-blur-xl border border-white/10 shadow-2xl w-[calc(100%-2rem)] sm:max-w-md rounded-2xl p-5 sm:p-6">
        <DialogHeader className="mb-1">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-1.5 sm:p-2 rounded-lg shrink-0">
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Add New Staff Member
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-xs sm:text-sm">
            Create a new staff account with access credentials
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {/* Name Input */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter full name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0d1229]/80 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@example.com"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0d1229]/80 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Button
              onClick={handleSubmit}
              type="button"
              disabled={loading || !fullName || !email}
              className={`flex-1 py-2.5 sm:py-3 h-auto bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 border border-purple-400/30
                ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-purple-600 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] group"
                }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                  Processing...
                </div>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform shrink-0" />
                  Add Staff Member
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 border border-gray-500/30 text-gray-300 rounded-xl text-xs sm:text-sm font-bold hover:from-gray-600/30 hover:to-gray-700/30 hover:border-gray-400/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] group"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform shrink-0" />
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStaffDialog;
