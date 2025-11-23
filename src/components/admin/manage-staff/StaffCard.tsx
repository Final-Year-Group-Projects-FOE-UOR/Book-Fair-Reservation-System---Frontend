import React from 'react'
import { Staff } from './types';
import { FileText, Mail, Trash2 } from 'lucide-react';

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
          <button
            type="button"
            // onClick={() => openEditModal(staff)}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition flex items-center justify-center gap-2 text-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            type="button"
            // onClick={() => deleteAdmin(staff.id)}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffCard