import React from "react";
import { Staff } from "./types";
import { Mail } from "lucide-react";
import DeleteStaffDialog from "./dialogs/DeleteStaffDialog";
import ResetPasswordDialog from "./dialogs/ResetPasswordDialog";

type StaffCardProps = {
  staff: Staff;
  onUpdate: () => void;
};

const StaffCard = ({ staff, onUpdate }: StaffCardProps) => {
  return (
    <div className="bg-[#1a1f37]/50 border border-white/10 rounded-xl p-4 sm:p-5 hover:border-purple-500/30 transition">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-white mb-1 truncate">
            {staff.username}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-2 flex items-center gap-1.5 truncate">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{staff.email}</span>
          </p>
          <span className="inline-block bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            {staff.role === "ROLE_MODERATOR" ? "Staff Member" : "Admin"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:shrink-0">
          <ResetPasswordDialog staff={staff} />
          <DeleteStaffDialog staff={staff} onConfirm={onUpdate} />
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
