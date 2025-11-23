"use client";

import MapManagement from "@/components/admin/map-management";
import dynamic from "next/dynamic";

const MapManagementPage = dynamic(
  () => Promise.resolve(MapManagement),
  { ssr: false }
);

export default MapManagementPage