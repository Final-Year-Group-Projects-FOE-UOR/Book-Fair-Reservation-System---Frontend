"use client";

import { CheckCircle } from "lucide-react";
import React from "react";

interface SubmittedStepProps {
  onMakeAnother: () => void;
}

const SubmittedStep: React.FC<SubmittedStepProps> = ({ onMakeAnother }:SubmittedStepProps) => {
  return (
    <div className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    Request Submitted
                  </h3>
                  <p className="text-gray-300 mb-6">Your booking request is pending approval. You will see its status below once processed by an admin.</p>
                  <button
                    type="button"
                    onClick={onMakeAnother}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:from-pink-600 hover:to-purple-700 transition"
                  >Make Another Booking</button>
                </div>
  );
};

export default SubmittedStep;
