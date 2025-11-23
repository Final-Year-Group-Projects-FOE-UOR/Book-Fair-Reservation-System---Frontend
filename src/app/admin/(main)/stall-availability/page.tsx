"use client";

import StallAvailability from "@/components/admin/stall-availability";
import dynamic from "next/dynamic";

const StallAvailabilityPage = dynamic(
  () => Promise.resolve(StallAvailability),
  {
    ssr: false,
  }
);

export default StallAvailabilityPage