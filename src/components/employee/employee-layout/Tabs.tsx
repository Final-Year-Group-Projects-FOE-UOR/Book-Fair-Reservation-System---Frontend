import TabItem from "@/components/common/tab/tab-item";
import {Building, CheckCircle } from "lucide-react";

const Tabs = () => {
  return (
    <div className="flex items-center w-full justify-center gap-4 mb-6 border-b border-white/10">
      <TabItem
        tabName={"employee/booking-requests"}
        icon={<CheckCircle className="w-5 h-5" />}
        label="Booking Requests"
      />
      <TabItem
        tabName={"employee/stall-availability"}
        icon={<Building className="w-5 h-5" />}
        label="Stall Availability"
      />
      <TabItem
        tabName={"employee/reservations"}
        icon={<CheckCircle className="w-5 h-5" />}
        label="All Reservations"
      />
    </div>
  );
};

export default Tabs;
