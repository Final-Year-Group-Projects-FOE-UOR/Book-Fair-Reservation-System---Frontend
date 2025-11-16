import { BookOpen, LogOut } from "lucide-react";

interface VendorHeaderProps {
  vendorInfo: { businessName: string; email: string };

  handleVendorLogout: () => void;
}

const VendorHeader = ({
  vendorInfo,
  handleVendorLogout,
}: VendorHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-pink-400" />
          Welcome, {vendorInfo.businessName}!
        </h2>
        <p className="text-gray-300">Reserve your perfect stall location</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleVendorLogout}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default VendorHeader;
