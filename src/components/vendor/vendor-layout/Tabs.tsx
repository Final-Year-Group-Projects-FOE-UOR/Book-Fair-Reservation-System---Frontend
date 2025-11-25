import TabItem from "@/components/common/tab/tab-item";
import { BookOpen, Calendar, User } from "lucide-react";

const Tabs = () => {
  return (
    <div className="flex gap-4 mb-6 border-b border-white/10">
      <TabItem
        tabName={"my-bookings"}
        icon={<BookOpen className="w-5 h-5" />}
        label="My Bookings"
      />
      <TabItem
        tabName={"booking"}
        icon={<Calendar className="w-5 h-5" />}
        label="Book Stalls"
      />
      <TabItem
        tabName={"profile"}
        icon={<User className="w-5 h-5" />}
        label="My Profile"
      />
    </div>
  );
};

export default Tabs;
