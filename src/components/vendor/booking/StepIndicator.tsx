interface StepIndicatorProps {
  bookingStep: number;
  setBookingStep: (step: number) => void;
}

const StepIndicator = ({ bookingStep, setBookingStep }: StepIndicatorProps) => {
  const handleClickStep = (step: number) => {
    if(step === 3 || step === 2) return; // cannot go to step 2 or 3 manually
    setBookingStep(step);
  }
  return (
    <>
      <div className="mb-6 flex font-geist-sans flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center gap-2 ${step < 3 ? "mr-2" : ""}`}
            >
              <div
                onClick={() => handleClickStep(step)}
                className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center font-bold text-sm transition-all ${
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
        <div className="mb-6 bg-[#1e2337]/60 border font-geist-sans border-white/10 rounded-2xl p-5 text-sm text-gray-300">
          Select up to{" "}
          <span className="text-pink-400 font-semibold">3 stalls</span>. You can
          toggle between grid and map view. After selecting, click &quot;Review
          Selection&quot; to continue.
        </div>
      )}
      {bookingStep === 2 && (
        <div className="mb-6 bg-[#1e2337]/60 border font-geist-sans border-white/10 rounded-2xl p-5 text-sm text-gray-300">
          Review your chosen stalls. Remove any if needed. When ready, submit
          your booking request for admin approval.
        </div>
      )}
      {bookingStep === 3 && (
        <div className="mb-6 bg-green-600/20 border font-geist-sans border-green-500/40 rounded-2xl p-5 text-sm text-green-300">
          Your booking request has been submitted and is pending admin approval.
          You can track status below.
        </div>
      )}
    </>
  );
};

export default StepIndicator;
