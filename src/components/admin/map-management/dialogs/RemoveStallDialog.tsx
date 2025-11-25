"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

type Props = {
  handleRemoveStall: () => Promise<void> | void;
};

const RemoveStallDialog = ({ handleRemoveStall }: Props) => {
  const [loading, setLoading] = useState(false);

  const removeStall = async () => {
    try {
      setLoading(true);
      await handleRemoveStall();
      toast.success("Stall removed from map successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove stall");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="w-full px-3 py-1.5 text-xs rounded bg-red-600 hover:bg-red-700 text-white shadow-sm transition"
          type="button"
        >
          Remove from Maps
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#071027] border border-white/8 text-white z-50000 rounded-lg shadow-xl">
        <AlertDialogHeader className="px-4 py-3">
          <AlertDialogTitle className="text-lg font-semibold">
            Remove stall from map
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-300 mt-1">
            This will remove the stall configuration from the map. This action
            can be undone by re-placing the stall.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="px-4 py-3 flex items-center justify-end gap-2">
          <AlertDialogCancel className="px-3 py-1.5 rounded bg-gray-800 text-gray-200 hover:bg-gray-700">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              if (loading) return;
              removeStall();
            }}
            disabled={loading}
            className={`px-3 py-1.5 rounded text-sm font-semibold flex items-center gap-2 ${
              loading
                ? "bg-orange-500/70 text-white cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading && (
              <svg
                className="w-4 h-4 animate-spin text-white"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            <span>{loading ? "Removing…" : "Continue"}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveStallDialog;
