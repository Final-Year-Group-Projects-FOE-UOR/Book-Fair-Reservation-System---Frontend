"use client";

import React, { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import { Reservation, ReservationResponse } from "@/components/vendor/my-bookings/types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getPendingReservations } from "@/actions/reservationsActions";
import { getStalls } from "@/actions/stallActions";
import { Stall } from "@/components/vendor/types";
import { BookingRequest } from "./types";
import { fetchVendorByEmail } from "@/actions/vendorActions";
import LoadingScreen from "@/components/common/loading";

const BookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    const jwt = Cookies.get("jwt");
    const email = Cookies.get("email");
    if (!jwt || !email) {
      toast.error("You must be logged in to view your bookings.");
      return;
    }
    try {
      const reservations = await getPendingReservations(jwt);
      if (reservations.success) {
        console.log(reservations.data);
        return reservations.data;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch reservations. Please try again later.");
    } finally {
    }
  };

  const getAllConfiguredStalls = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) return;
    try {
      const response = await getStalls(jwt);
      if (response.success) {
        const fetchedStalls = response.data;
        const configuredStalls = fetchedStalls.filter(
          (stall: Stall) => stall.mapMetadata?.configured === true,
        );
        console.log("Configured stalls:", configuredStalls);
        return configuredStalls;
      }
    } catch (error) {
      console.log("An error occurred while fetching configured stalls:", error);
    } finally {
    }
  };

  const getVendorInfo = async (email: string) => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try{
      const response = await fetchVendorByEmail(jwt, email);
      if (response.success) {
        const vendorData = response.data;
        return {
          businessName: vendorData.businessName,
          email: vendorData.userEmail,
        };
      }
    }catch(err){
      console.log("An error occurred while fetching vendor info:", err);
    }
  }

  const setData = async () => {
    setLoading(true);
    try {
      const reservations = await fetchReservations();
      const stalls = await getAllConfiguredStalls();

      const configuredBookings = await Promise.all(
        reservations.map(async (reservation: ReservationResponse) => {
          const stall = stalls.find(
            (stall: Stall) => stall.id === reservation.stallIds[0],
          );
          console.log("Stall: ", stall);
          const vendorInfo = await getVendorInfo(reservation.userEmail);

          return {
            id: reservation.id,
            stallName: stall ? stall.stallName : "Unknown Stall",
            size: stall ? stall.type : "Unknown Size",
            reserved: reservation.status === "CONFIRMED",
            pending: reservation.status === "PENDING",
            businessName: vendorInfo
              ? vendorInfo.businessName
              : "Unknown Vendor",
            email: reservation.userEmail,
            requestDate: reservation.reservationDate,
          };
        }),
      );

      console.log("Configured Reservations:", configuredBookings);
      setBookingRequests(configuredBookings);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    setData();
  }, []);

  if(loading){
    return <LoadingScreen/>
  }
  

  return (
    <div
      className={` relative overflow-hidden`}
    >
      {bookingRequests.length === 0 ? (
        <div className="bg-[#1a1f37]/50 border border-white/10 rounded-xl p-6 sm:p-8 text-center text-gray-400">
          No pending requests at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {bookingRequests.map((bookingRequest) => (
            <RequestCard key={bookingRequest.id} bookingRequest={bookingRequest} setData={setData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
