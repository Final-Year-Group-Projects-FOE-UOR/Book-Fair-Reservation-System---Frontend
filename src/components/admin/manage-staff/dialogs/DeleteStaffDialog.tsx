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
import { Trash2, AlertTriangle, X, UserX } from "lucide-react";
import toast from "react-hot-toast";
import { Staff } from "../types";
import Cookies from "js-cookie";
import { deleteStaff } from "@/actions/staffActions";

type DeleteStaffDialogProps = {
  staff: Staff;
  onConfirm?: () => void;
};

const DeleteStaffDialog = ({ staff, onConfirm }: DeleteStaffDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteStaff = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try {
      setLoading(true);
      const response = await deleteStaff(jwt, staff.email);
      if (response.success) {
        toast.success("Staff member deleted successfully!");
        onConfirm?.();
        setOpen(false);
      } else {
        toast.error(response.message || "Failed to delete staff member.");
      }
    } catch (err) {
      console.log("An error occurred while deleting staff member:", err);
      toast.error(
        "An error occurred while deleting staff member. Please try again.",
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
          className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300 rounded-lg text-xs sm:text-sm font-semibold hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 hover:scale-[1.02] whitespace-nowrap"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-gradient-to-br from-[#2a2f4a]/95 to-[#1e2337]/95 backdrop-blur-xl border border-red-500/20 shadow-2xl w-[calc(100%-2rem)] sm:max-w-md rounded-2xl p-5 sm:p-6">
        <DialogHeader className="mb-1">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-1.5 sm:p-2 rounded-lg shrink-0">
              <UserX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Delete Staff Member
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-xs sm:text-sm">
            This action cannot be undone
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-red-300 mb-1">
                Warning: Permanent Action
              </p>
              <p className="text-xs text-gray-400">
                Deleting this staff member will remove all their access and data
                permanently.
              </p>
            </div>
          </div>

          {/* Staff Info */}
          <div className="bg-[#0d1229]/80 border border-white/10 rounded-xl p-3 sm:p-4 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-semibold text-gray-400 shrink-0">
                Name:
              </span>
              <span className="text-xs sm:text-sm text-white font-medium truncate">
                {staff.username}
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-semibold text-gray-400 shrink-0">
                Email:
              </span>
              <span className="text-xs sm:text-sm text-gray-300 truncate">
                {staff.email}
              </span>
            </div>
          </div>

          {/* Confirmation Text */}
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Are you sure you want to delete this staff member?
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
            <button
              type="button"
              onClick={handleDeleteStaff}
              disabled={loading}
              className={`flex-1 py-2.5 sm:py-3 border rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group
                ${
                  loading
                    ? "bg-red-500/20 border-red-400/40 text-red-300 cursor-not-allowed opacity-60"
                    : "bg-gradient-to-r from-red-500/20 to-pink-600/20 border-red-500/30 text-red-300 hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02]"
                }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin shrink-0" />
                  Deleting...
                </div>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform shrink-0" />
                  Yes, Delete Staff
                </>
              )}
            </button>

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

export default DeleteStaffDialog;
