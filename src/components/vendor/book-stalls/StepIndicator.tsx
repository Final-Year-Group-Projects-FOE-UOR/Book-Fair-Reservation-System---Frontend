interface StepIndicatorProps {
  bookingStep: number;
}

const StepIndicator = ({ bookingStep }: StepIndicatorProps) => {
  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center gap-2 ${step < 3 ? "mr-2" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  bookingStep === step
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-110"
                    : step < bookingStep
                    ? "bg-green-600 text-white"
                    : "bg-[#2a2f4a] text-gray-400"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-pink-500/40 to-purple-600/40 rounded"></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-300 font-medium">
          {bookingStep === 1 && "Step 1: Select up to 3 stalls"}
          {bookingStep === 2 && "Step 2: Review your selection"}
          {bookingStep === 3 && "Step 3: Request submitted - awaiting approval"}
        </div>
      </div>

      {/* Step Content */}
      {bookingStep === 1 && (
        <div className="mb-6 bg-[#1e2337]/60 border border-white/10 rounded-2xl p-5 text-sm text-gray-300">
          Select up to{" "}
          <span className="text-pink-400 font-semibold">3 stalls</span>. You can
          toggle between grid and map view. After selecting, click &quot;Review
          Selection&quot; to continue.
        </div>
      )}
      {bookingStep === 2 && (
        <div className="mb-6 bg-[#1e2337]/60 border border-white/10 rounded-2xl p-5 text-sm text-gray-300">
          Review your chosen stalls. Remove any if needed. When ready, submit
          your booking request for admin approval.
        </div>
      )}
      {bookingStep === 3 && (
        <div className="mb-6 bg-green-600/20 border border-green-500/40 rounded-2xl p-5 text-sm text-green-300">
          Your booking request has been submitted and is pending admin approval.
          You can track status below.
        </div>
      )}
    </>
  );
};

export default StepIndicator;

// "use client";

// import React from "react";

// interface StepIndicatorProps {
//   currentStep: number;
//   totalSteps: number;
// }

// const StepIndicator: React.FC<StepIndicatorProps> = ({
//   currentStep,
//   totalSteps,
// }) => {
//   const stepLabels = [
//     "Select up to 3 stalls",
//     "Review your selection",
//     "Request submitted - awaiting approval",
//   ];

//   return (
//     <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//       <div className="flex items-center gap-3">
//         {Array.from({ length: totalSteps }).map((_, index) => {
//           const step = index + 1;
//           return (
//             <div
//               key={step}
//               className={`flex items-center gap-2 ${
//                 step < totalSteps ? "mr-2" : ""
//               }`}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
//                   currentStep === step
//                     ? "bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-110"
//                     : step < currentStep
//                     ? "bg-green-600 text-white"
//                     : "bg-[#2a2f4a] text-gray-400"
//                 }`}
//               >
//                 {step}
//               </div>
//               {step < totalSteps && (
//                 <div className="hidden md:block w-12 h-1 bg-linear-to-r from-pink-500/40 to-purple-600/40 rounded"></div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//       <div className="text-sm text-gray-300 font-medium">
//         {stepLabels[currentStep - 1]}
//       </div>
//     </div>
//   );
// };

// export default StepIndicator;
