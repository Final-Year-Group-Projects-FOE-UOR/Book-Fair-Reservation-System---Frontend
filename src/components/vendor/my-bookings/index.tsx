"use client";

import {
  CheckCircle,
  X,
  CalendarX,
  Sparkles,
  MapPin,
  Grid,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Reservation, ReservationResponse } from "./types";
import NoBookings from "./NoBookings";
import LoadingScreen from "@/components/common/loading";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getAllReservationsbyEmail } from "@/actions/reservationsActions";
import { getStalls } from "@/actions/stallActions";
import { Stall } from "../types";
import MapView from "./MapView";
import GridView from "./GridView";

const MyBookings: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [useMapView, setUseMapView] = useState(false);
  const [stalls, setStalls] = useState<Stall[]>([]);

  const fetchReservations = async () => {
    const jwt = Cookies.get("jwt");
    const email = Cookies.get("email");
    if (!jwt || !email) {
      toast.error("You must be logged in to view your bookings.");
      return;
    }
    setLoading(true);
    try {
      const reservations = await getAllReservationsbyEmail(jwt, email);
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

  if (reservations.length === 0) {
    return <NoBookings />;
  }

  return (
    <>
      <div className="w-full flex justify-end items-center my-4">
        <button
          onClick={() => setUseMapView(!useMapView)}
          className={`px-4 py-2 cursor-pointer rounded-xl font-semibold transition flex items-center gap-2 ${
            useMapView
              ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
              : "bg-[#2a2f4a] text-gray-300 border border-white/10 hover:border-purple-500/50"
          }`}
        >
          {useMapView ? (
            <MapPin className="w-4 h-4" />
          ) : (
            <Grid className="w-4 h-4" />
          )}
          {useMapView ? "Map View" : "Grid View"}
        </button>
      </div>

      {useMapView ? (
        <MapView
          stallMapImage={"https://ik.imagekit.io/web92xyy0/s1_o03c7akip.jpg"}
          reservations={reservations}
        />
      ) : (
        <GridView
          reservations={reservations}
        />
      )}
    </>
  );
};

export default MyBookings;
