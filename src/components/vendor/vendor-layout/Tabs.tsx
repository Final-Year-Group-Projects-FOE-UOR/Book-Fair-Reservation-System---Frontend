import { BookOpen, Calendar, User } from "lucide-react";
import TabItem from "./TabItem";

const Tabs = () => {
  return (
    <div className="flex gap-4 mb-6 border-b border-white/10">
      <TabItem
        vendorHomeTab={"my-bookings"}
        icon={<BookOpen className="w-5 h-5" />}
        label="My Bookings"
      />
      <TabItem
        vendorHomeTab={"booking"}
        icon={<Calendar className="w-5 h-5" />}
        label="Book Stalls"
      />
      <TabItem
        vendorHomeTab={"profile"}
        icon={<User className="w-5 h-5" />}
        label="My Profile"
      />
    </div>
  );
};

export default Tabs;
