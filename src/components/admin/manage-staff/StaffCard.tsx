import React from 'react'
import { Staff } from './types';
import { FileText, Mail, Trash2 } from 'lucide-react';
import EditStaffDialog from './dialogs/EditStaffDialog';
import DeleteStaffDialog from './dialogs/DeleteStaffDialog';

type StaffCardProps = {
 staff: Staff;
}

const StaffCard = ({ staff }: StaffCardProps) => {
  return (
    <div
      key={staff.id}
      className="bg-[#1a1f37]/50 border border-white/10 rounded-xl p-4 sm:p-6 hover:border-purple-500/30 transition"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{staff.name}</h3>
          <p className="text-gray-400 text-sm mb-1">
            <Mail className="w-4 h-4 inline mr-2" />
            {staff.email}
          </p>
          <span className="inline-block bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
            Admin
          </span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <EditStaffDialog staff={staff} />
          <DeleteStaffDialog staffName={staff.name} staffEmail={staff.email} />
        </div>
      </div>
    </div>
  );
}

export default StaffCard