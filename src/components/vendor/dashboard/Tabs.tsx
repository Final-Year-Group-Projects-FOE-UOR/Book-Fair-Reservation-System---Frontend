import { Calendar, User } from "lucide-react";

interface TabsProps {
  vendorHomeTab: string;
  handleVendorHomeTabChange: (tab: string) => void;
}

const Tabs = ({vendorHomeTab, handleVendorHomeTabChange}:TabsProps) =>  {
  return (
    <div className="flex gap-4 mb-6 border-b border-white/10">
            <button
              type="button"
              onClick={() => { handleVendorHomeTabChange('booking'); }}
              className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${vendorHomeTab === 'booking' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Stalls
              </div>
              {vendorHomeTab === 'booking' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>}
            </button>
            <button
              type="button"
              onClick={() => handleVendorHomeTabChange('profile')}
              className={`px-6 py-3 font-semibold transition-all rounded-t-xl relative ${vendorHomeTab === 'profile' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                My Profile
              </div>
              {vendorHomeTab === 'profile' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>}
            </button>
          </div>
  );
};

export default Tabs;