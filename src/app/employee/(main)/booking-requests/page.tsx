"use client";

import BookingRequests from "@/components/employee/booking-requests";
import dynamic from "next/dynamic";

const bookingRequestsPage = dynamic(() => Promise.resolve(BookingRequests), {
  ssr: false,
});

export default bookingRequestsPage