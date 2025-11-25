/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import AdminHeader from "@/components/admin/header";
import AdminSidebar from "@/components/admin/sidebar";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import VendorLayout from "@/components/vendor/vendor-layout";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Suspense>
      <VendorLayout >
        {children}
      </VendorLayout>
    </Suspense>
  );
}
