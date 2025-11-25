"use client";

import Reservations from "@/components/employee/reservations";
import dynamic from "next/dynamic";

const ReservationsPage = dynamic(
  () => Promise.resolve(Reservations),
  { ssr: false }
);

export default ReservationsPage