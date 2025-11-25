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
      const email = staff.email;
      setLoading(true);
      const response = await deleteStaff(jwt, email);
      if (response.success) {
        toast.success("Staff member deleted successfully!");
        if (onConfirm) {
          onConfirm();
        }
        setOpen(false);
      } else {
        toast.error(response.message || "Failed to delete staff member.");
        console.log(response.message);
      }
    } catch (err) {
      console.log("An error occurred while deleting staff member:", err);
      toast.error(
        "An error occurred while deleting staff member. Please try again."
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
          className="px-3 py-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300 rounded-lg text-sm font-semibold hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#2a2f4a]/95 to-[#1e2337]/95 backdrop-blur-xl border border-red-500/20 shadow-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2 rounded-lg">
              <UserX className="w-5 h-5 text-white" />
            </div>
            Delete Staff Member
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            This action cannot be undone
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-300 mb-1">
                Warning: Permanent Action
              </p>
              <p className="text-xs text-gray-400">
                Deleting this staff member will remove all their access and data
                permanently.
              </p>
            </div>
          </div>

          {/* Staff Info */}
          <div className="bg-[#0d1229]/80 border border-white/10 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400">Name:</span>
              <span className="text-sm text-white font-medium">
                {staff.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400">
                Email:
              </span>
              <span className="text-sm text-gray-300">{staff.email}</span>
            </div>
          </div>

          {/* Confirmation Text */}
          <p className="text-sm text-gray-400 text-center">
            Are you sure you want to delete this staff member?
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleDeleteStaff}
              disabled={loading}
              className={`flex-1 py-3 border rounded-xl text-sm font-bold transition-all duration-300 
    flex items-center justify-center gap-2 group ${
      loading
        ? "bg-red-500/20 border-red-400/40 text-red-300 cursor-not-allowed opacity-60 scale-[0.99]"
        : "bg-gradient-to-r from-red-500/20 to-pink-600/20 border-red-500/30 text-red-300 hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02]"
    }
  `}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin"></span>
                  Deleting...
                </div>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Yes, Delete Staff
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
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

export default DeleteStaffDialog;
