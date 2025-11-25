"use client";

import { Stall } from "@/components/vendor/types";
import React, { useEffect, useState } from "react";
import MapView from "./map";
import {
  Reservation,
  ReservationResponse,
} from "@/components/vendor/my-bookings/types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getAllReservations } from "@/actions/reservationsActions";
import { getStalls } from "@/actions/stallActions";
import LoadingScreen from "@/components/common/loading";

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    const jwt = Cookies.get("jwt");
    const email = Cookies.get("email");
    if (!jwt || !email) {
      toast.error("You must be logged in to view your bookings.");
      return;
    }
    setLoading(true);
    try {
      const reservations = await getAllReservations(jwt);
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
      setLoading(true);
      const response = await getStalls(jwt);
      if (response.success) {
        const fetchedStalls = response.data;
        const configuredStalls = fetchedStalls.filter(
          (stall: Stall) => stall.mapMetadata?.configured === true,
        );
        return configuredStalls;
      }
    } catch (error) {
      console.log("An error occurred while fetching configured stalls:", error);
    } finally {
      setLoading(false);
    }
  };

  const setData = async () => {
    try {
      const reservations = await fetchReservations();
      const stalls = await getAllConfiguredStalls();
      const configuredReservations = reservations.map(
        (reservation: ReservationResponse) => {
          return {
            id: reservation.stallIds[0],
            stall: stalls.find(
              (stall: Stall) => stall.id === reservation.stallIds[0],
            ),
            reservationDate: reservation.reservationDate,
            status: reservation.status,
            userEmail: reservation.userEmail,
          };
        },
      );
      console.log("Configured Reservations:", configuredReservations);
      setReservations(configuredReservations);
      const configuredStalls = configuredReservations.map(
        (reservation: Reservation) => reservation.stall,
      );
      setStalls(configuredStalls);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div className="w-full overflow-auto rounded-md">
        <MapView
          stallMapImage={"https://ik.imagekit.io/web92xyy0/s1_o03c7akip.jpg"}
          reservations={reservations}
        />
      </div>
    </div>
  );
};

export default Reservations;
