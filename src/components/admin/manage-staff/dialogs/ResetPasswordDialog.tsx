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
import { Lock } from "lucide-react";
import { Staff } from "../types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { resetStaffPassword } from "@/actions/staffActions";

const ResetPasswordDialog = ({ staff }: { staff: Staff }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleResetPassword = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try {
      const email = staff.email;
      setLoading(true);
      const response = await resetStaffPassword(jwt, email);
      if (response.success) {
        toast.success("Password reset successfully!");
        setOpen(false);
      } else {
        toast.error(response.message || "Failed to reset password.");
        console.log(response.message);
      }
    } catch (err) {
      console.log("An error occurred while resetting password:", err);
      toast.error(
        "An error occurred while resetting password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium transition-all flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Reset Password
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#0a0d1f]/95 backdrop-blur-xl border border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Reset Password
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {`A password reset link will be sent to the staff member's email`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Staff Info */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-sm text-gray-400">Staff Member</p>
            <p className="text-white font-medium">{staff.name}</p>
            <p className="text-sm text-gray-400 mt-1">{staff.email}</p>
          </div>

          {/* Warning Message */}
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-sm text-yellow-200">
              The staff member can enter the default password upon login in
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all transform 
    shadow-lg shadow-yellow-500/25
    ${
      loading
        ? "bg-yellow-400 cursor-not-allowed scale-[0.99] opacity-80"
        : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:scale-[1.02] active:scale-[0.98]"
    }
  `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <DialogTrigger asChild>
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-gray-300 transition-all">
                Cancel
              </button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;
