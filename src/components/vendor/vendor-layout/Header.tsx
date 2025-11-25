import { BookOpen, CheckCircle, Grid, LogOut, MapPin } from "lucide-react";
import { VendorInfo } from "../types";
import AnimatedHeader from "@/components/common/headers/AnimatedHeader";

interface VendorHeaderProps {
  vendorInfo: VendorInfo;
  stallMapImage: string | null;
  useMapView: boolean;
  setUseMapView: React.Dispatch<React.SetStateAction<boolean>>;
  handleVendorLogout: () => void;
  bookingStep?: number;
}

const VendorHeader = ({
  vendorInfo,
  handleVendorLogout,
  stallMapImage,
  useMapView,
  setUseMapView,
  bookingStep,
}: VendorHeaderProps) => {
  return (
    <div className="flex justify-between font-geist-sans items-center mb-6">
      <AnimatedHeader
        icon={<BookOpen className="w-8 h-8 text-white animate-floating-book" />}
        title={`Welcome, ${vendorInfo.businessName}!`}
        description="Manage and review booking requests"
      />
      <div className="flex items-center gap-4">
        {stallMapImage && bookingStep === 1 && (
          <button
            onClick={() => setUseMapView(!useMapView)}
            className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
              useMapView
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                : "bg-[#2a2f4a] text-gray-300 border border-white/10 hover:border-purple-500/50"
            }`}
          >
            {useMapView ? (
              <MapPin className="w-4 h-4" />
            ) : (
              <Grid className="w-4 h-4" />
            )}
            {useMapView ? "Map View" : "Grid View"}
          </button>
        )}
        <button
          onClick={handleVendorLogout}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default VendorHeader;
