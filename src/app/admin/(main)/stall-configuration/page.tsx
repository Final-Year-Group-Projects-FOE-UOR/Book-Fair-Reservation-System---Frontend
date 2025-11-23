"use client";

import StallConfiguration from "@/components/admin/stall-configuration";
import dynamic from "next/dynamic";

const StallConfigurationPage = dynamic(
  () => Promise.resolve(StallConfiguration),
  { ssr: false }
);

export default StallConfigurationPage