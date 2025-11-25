"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "./StepIndicator";
import MapView from "./MapView";
import GridView from "./GridView";
import FloatingButton from "./FloatingButton";
import ReviewStep from "./ReviewStep";
import SubmittedStep from "./SubmittedStep";
import { Stall, VendorInfo } from "../types";
import { Grid, MapPin } from "lucide-react";
import Cookies from "js-cookie";
import { getStalls } from "@/actions/stallActions";
import { addReservation, fetchVendorByEmail } from "@/actions/vendorActions";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/common/loading";

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
    userId: 0,
    businessName: "",
    email: "",
    genres: [],
  });
  const [bookingStep, setBookingStep] = useState(1);
  const [useMapView, setUseMapView] = useState(false);
  const [stallMapImage, setStallMapImage] = useState(null);

  const [stalls, setStalls] = useState<Stall[]>([]);
  const [selectedStalls, setSelectedStalls] = useState<(number | null)[]>([]);

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
        setStalls(configuredStalls);
      }
    } catch (error) {
      console.log("An error occurred while fetching configured stalls:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVendorInfo = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    const vendorEmail = Cookies.get("email");
    if (!vendorEmail) {
      toast.error("Vendor email not found. Please log in again.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetchVendorByEmail(jwt, vendorEmail);
      if (response.success) {
        const vendorData = response.data;
        setVendorInfo({
          userId: vendorData.userId,
          businessName: vendorData.businessName,
          email: vendorData.userEmail,
          genres: vendorData.genres,
        });
      } else {
        console.log("Failed to fetch vendor info:", response.message);
      }
    } catch (err) {
      console.log("An error occurred while fetching vendor info:", err);
    } finally {
    }
  };

  useEffect(() => {
    getVendorInfo();
    getAllConfiguredStalls();
  }, []);

  // const myReservations = stalls.filter(
  //   (s) => s.businessName === vendorInfo.businessName,
  // );

  const selectedStallObjects = stalls.filter((s) =>
    selectedStalls.includes(s.id),
  );

  const handleRemoveStallClick = (stall: Stall) => {
    setSelectedStalls(selectedStalls.filter((id) => id !== stall.id));
  };

  const confirmReservation = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try {
      const body = {
        stallIds: selectedStalls,
        userId: vendorInfo.userId,
        userEmail: vendorInfo.email,
      };
      const response = await addReservation(jwt, body);
      console.log(response);
      if (response.id) {
        toast.success("Reservation confirmed!");
        setBookingStep(3);
      }else if (response.status === "CONFIRMED"){
        toast.success("Reservation confirmed!");
        setBookingStep(3); 
      }
      else{
        toast.error("Failed to confirm reservation.");
      }
      console.log(body);
    } catch (err) {
      console.log("An error occurred while confirming reservation:", err);
    }
  };

  const onMakeAnotherReservation = () => {
    setSelectedStalls([]);
    setBookingStep(1);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      {/* Booking Step Indicator */}
      {stallMapImage && bookingStep === 1 && (
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
      )}
      <StepIndicator
        bookingStep={bookingStep}
        setBookingStep={setBookingStep}
      />

      {/* Selection / Map/Grid (Step 1 only) */}
      {bookingStep === 1 && (
        <>
          {/* Conditionally render Map View or Grid View */}
          {useMapView && stallMapImage ? (
            <MapView
              stallMapImage={
                "https://ik.imagekit.io/web92xyy0/s1_o03c7akip.jpg"
              }
              stalls={stalls}
              selectedStalls={selectedStalls}
              setSelectedStalls={setSelectedStalls}
            />
          ) : (
            <GridView
              stalls={stalls}
              selectedStalls={selectedStalls}
              setSelectedStalls={setSelectedStalls}
              vendorInfo={vendorInfo}
            />
          )}
        </>
      )}

      {/* Floating next button for step 1 */}
      {bookingStep === 1 && selectedStalls.length > 0 && (
        <FloatingButton
          onClick={() => setBookingStep(2)}
          selectedStalls={selectedStalls}
        />
      )}

      {/* Review Step */}
      {bookingStep === 2 && (
        <ReviewStep
          selectedStallObjects={selectedStallObjects}
          handleRemoveStallClick={handleRemoveStallClick}
          selectedStalls={selectedStalls}
          vendorInfo={vendorInfo}
          genres={vendorInfo.genres || []}
          onSubmit={confirmReservation}
          goBack={() => setBookingStep(1)}
        />
      )}

      {/* Submitted Step (Step 3) */}
      {bookingStep === 3 && (
        <SubmittedStep onMakeAnother={onMakeAnotherReservation} />
      )}
    </>
  );
};

export default Booking;
