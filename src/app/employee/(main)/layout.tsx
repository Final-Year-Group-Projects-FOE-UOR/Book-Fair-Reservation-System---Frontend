/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Suspense } from "react";
import EmployeeLayout from "@/components/employee/employee-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <EmployeeLayout>{children}</EmployeeLayout>
    </Suspense>
  );
}
