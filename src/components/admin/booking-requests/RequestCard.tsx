"use client";

import React, { useState } from 'react'
import { Calendar, CheckCircle, Mail, Store, Tag, X } from 'lucide-react';
import { BookingRequest } from './types';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { approvePendingRequest, cancelReservation } from '@/actions/reservationsActions';

type RequestCardProps = {
  bookingRequest: BookingRequest;
  setData: () => void;
}

const RequestCard = ({ bookingRequest, setData }: RequestCardProps) => {
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const approveRequest = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try{
      setApproveLoading(true);
      const response = await approvePendingRequest(jwt, bookingRequest.id);
      console.log(response);
      if(response.success){
        console.log("Approved")
        toast.success("Booking request approved successfully!");
        setData();
      }else{
        toast.error("Failed to approve the booking request. Please try again later.");
      }
    }catch(error){
      console.log(error);
      toast.error("Failed to approve the booking request. Please try again later.");
    }finally{
      setApproveLoading(false);
    }
  }

  const rejectRequest = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try {
      setRejectLoading(true);
      const response = await cancelReservation(jwt, bookingRequest.id);
      if (response.success) {
        toast.success("Booking request rejected successfully!");
        setData();
      } else {
        toast.error(
          "Failed to reject the booking request. Please try again later.",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to reject the booking request. Please try again later.",
      );
    } finally {
      setRejectLoading(false);
    }
  };


  return (
    <div className="bg-gradient-to-br font-geist-sans from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden group hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl"></div>

      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-2.5 rounded-xl shadow-lg">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              {bookingRequest.stallName}
              <Tag className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-md text-purple-300 font-semibold">
                {bookingRequest.size}
              </div>
            </div>
          </div>
        </div>
        <span className="text-xs bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/40 text-orange-300 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
          Pending
        </span>
      </div>

      {/* Business Info Section */}
      <div className="space-y-3 mb-4 relative z-10">
        <div className="bg-[#0d1229]/60 border border-white/10 rounded-xl p-3">
          <div className="flex items-start gap-2 mb-2">
            <Store className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-gray-400 mb-0.5">Business Name</div>
              <div className="text-sm font-semibold text-pink-300">
                {bookingRequest.businessName}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-gray-400 mb-0.5">Contact Email</div>
              <div className="text-sm text-gray-300 break-all">
                {bookingRequest.email}
              </div>
            </div>
          </div>
        </div>

        {/* Request Date */}
        <div className="flex items-center gap-2 text-xs text-gray-400 px-3 py-2 bg-[#0d1229]/40 border border-white/5 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-medium">Requested:</span>
          <span className="text-gray-300">
            {bookingRequest.requestDate
              ? new Date(bookingRequest.requestDate).toLocaleString()
              : "—"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 relative z-10">
        <button
          onClick={approveRequest}
          type="button"
          disabled={approveLoading}
          className="flex-1 cursor-pointer py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 text-green-300 rounded-xl font-semibold hover:from-green-500/30 hover:to-emerald-600/30 hover:border-green-400/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] group/btn disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {approveLoading ? (
            <svg
              className="animate-spin w-4 h-4 text-green-300 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <CheckCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          )}
          {approveLoading ? "Approving..." : "Approve"}
        </button>
        <button
          onClick={rejectRequest}
          type="button"
          className="flex-1 cursor-pointer py-2.5 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300 rounded-xl font-semibold hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] group/btn"
        >
          {rejectLoading ? (
            <svg
              className="animate-spin w-4 h-4 text-red-300 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <X className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          )}
          {rejectLoading ? "Removing..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default RequestCard