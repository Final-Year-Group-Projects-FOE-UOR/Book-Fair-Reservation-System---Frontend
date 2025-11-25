"use client";

import { fetchVendorByEmail, saveVendorProfile } from "@/actions/vendorActions";
import LoadingScreen from "@/components/common/loading";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FloatingButton from "./FloatingButton";
import { generateInitialStalls } from "./GenerateInitialStalls";
import GridView from "./GridView";
import VendorHeader from "./Header";
import MapView from "./MapView";
import MyBookings from "./MyBookings";
import MyProfile from "./MyProfile";
import ReviewStep from "./ReviewStep";
import StepIndicator from "./StepIndicator";
import SubmittedStep from "./SubmittedStep";
import Tabs from "./Tabs";
import { Stall, VendorInfo } from "./types";

const Vendor = () => {
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
    businessName: "",
    email: "",
    genres: [],
  });
  const [vendorHomeTab, setVendorHomeTab] = useState("booking");
  const [bookingStep, setBookingStep] = useState(1);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [stallMapImage, setStallMapImage] = useState(() => {
    // Sample Trade Hall Map (SVG as data URL)
    const sampleTradeHallMap = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI3MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5ncmlkLWxpbmUge3N0cm9rZTogIzMzMzsgc3Ryb2tlLXdpZHRoOiAxO30gLmdyaWQtYXJlYSB7IGZpbGw6ICMxZTFlMmU7IHN0cm9rZTogIzQ0NDsgc3Ryb2tlLXdpZHRoOiAyOyB9IC5lbnRyYW5jZSB7IGZpbGw6ICMyMmM1NTU7IHN0cm9rZTogIzAwYTg2Njsgc3Ryb2tlLXdpZHRoOiAzOyB9IC5zdGFsbCB7IGZpbGw6ICMzMzMzZmY7IHN0cm9rZTogIzU1NzduZjsgc3Ryb2tlLXdpZHRoOiAyOyB9IC5yZXN0YXVyYW50IHsgZmlsbDogI2ZmNjYyMjsgc3Ryb2tlOiAjZmY5OTAwOyBzdHJva2Utd2lkdGg6IDI7IH0gLnRleHQgeyBmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBBcmlhbDsgZmlsbDogI2ZmZjtzdHJva2U6IG5vbmU7IH0gLnRpdGxlIHsgZm9udC1zaXplOiAzMHB4OyBmb250LXdlaWdodDogYm9sZDsgZmlsbDogI2ZmZjsgfTwvc3R5bGU+PC9kZWZzPjwhLS0gQmFja2dyb3VuZCAtLT48cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI3MDAiIGZpbGw9IiMwZTA4YTAiLz48IS0tIFRpdGxlIC0tPjx0ZXh0IHg9IjUwMCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJ0aXRsZSI+Q29sb21ibyBJbnRlcm5hdGlvbmFsIEJvb2tmYWlyIC0gVHJhZGUgSGFsbDwvdGV4dD48IS0tIEdyaWQgTGluZXMgLS0+PGxpbmUgeDE9IjA0MCIgeTE9IjEwMCIgeDI9IjQwIiB5Mj0iNjUwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjEwMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjY1MCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSIxNjAiIHkxPSIxMDAiIHgyPSIxNjAiIHkyPSI2NTAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iMjIwIiB5MT0iMTAwIiB4Mj0iMjIwIiB5Mj0iNjUwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjI4MCIgeTE9IjEwMCIgeDI9IjI4MCIgeTI9IjY1MCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSIzNDAiIHkxPSIxMDAiIHgyPSIzNDAiIHkyPSI2NTAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iNDAwIiB5MT0iMTAwIiB4Mj0iNDAwIiB5Mj0iNjUwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjQ2MCIgeTE9IjEwMCIgeDI9IjQ2MCIgeTI9IjY1MCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSI1MjAiIHkxPSIxMDAiIHgyPSI1MjAiIHkyPSI2NTAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iNTgwIiB5MT0iMTAwIiB4Mj0iNTgwIiB5Mj0iNjUwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjY0MCIgeTE9IjEwMCIgeDI9IjY0MCIgeTI9IjY1MCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSI3MDAiIHkxPSIxMDAiIHgyPSI3MDAiIHkyPSI2NTAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iNzYwIiB5MT0iMTAwIiB4Mj0iNzYwIiB5Mj0iNjUwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjgyMCIgeTE9IjEwMCIgeDI9IjgyMCIgeTI9IjY1MCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSI4ODAiIHkxPSIxMDAiIHgyPSI4ODAiIHkyPSI2NTAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iOTQwIiB5MT0iMTAwIiB4Mj0iOTQwIiB5Mj0iNjUwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjAiIHkxPSIxMDAiIHgyPSI5NjAiIHkyPSIxMDAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iMCIgeTE9IjE2MCIgeDI9Ijk2MCIgeTI9IjE2MCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSIwIiB5MT0iMjIwIiB4Mj0iOTYwIiB5Mj0iMjIwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjAiIHkxPSIyODAiIHgyPSI5NjAiIHkyPSIyODAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iMCIgeTE9IjM0MCIgeDI9Ijk2MCIgeTI9IjM0MCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSIwIiB5MT0iNDAwIiB4Mj0iOTYwIiB5Mj0iNDAwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjAiIHkxPSI0NjAiIHgyPSI5NjAiIHkyPSI0NjAiIGNsYXNzPSJncmlkLWxpbmUiLz48bGluZSB4MT0iMCIgeTE9IjUyMCIgeDI9Ijk2MCIgeTI9IjUyMCIgY2xhc3M9ImdyaWQtbGluZSIvPjxsaW5lIHgxPSIwIiB5MT0iNTgwIiB4Mj0iOTYwIiB5Mj0iNTgwIiBjbGFzcz0iZ3JpZC1saW5lIi8+PGxpbmUgeDE9IjAiIHkxPSI2NDAiIHgyPSI5NjAiIHkyPSI2NDAiIGNsYXNzPSJncmlkLWxpbmUiLz48IS0tIEVudHJhbmNlIC0tPjxyZWN0IHg9IjMyMCIgeT0iMjAwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjgwIiBjbGFzcz0iZW50cmFuY2UiLz48dGV4dCB4PSI0ODAiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgY2xhc3M9InRleHQiPkVudHJhbmNlPC90ZXh0PjwhLS0gQ29uc2Nlc3Npb24gQXJlYSAvIFNuYWsgQmFyIC0tPjxyZWN0IHg9IjAiIHk9IjUxMCIgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwIiBjbGFzcz0icmVzdGF1cmFudCIvPjx0ZXh0IHg9IjUwMCIgeT0iNTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCI+Q29uY2Vzc2lvbiAvIFJlc3RhdXJhbnQgQXJlYTwvdGV4dD48IS0tIFJvdyBBIChhYm92ZSBlbnRyYW5jZSkgLS0+PGZvcmVpZ25PYmplY3QgeDo9IjczIiB5PSIxMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgY2xhc3M9InN0YWxsIj48L2ZvcmVpZ25PYmplY3Q+PHJlY3QgeD0iNzMiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBjbGFzcz0ic3RhbGwiLz48dGV4dCB4PSI4OCIgeT0iMTM5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2ZmZiI+QTEgPC90ZXh0PjxyZWN0IHg9IjE0NiIgeT0iMTIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGNsYXNzPSJzdGFsbCIvPjx0ZXh0IHg9IjE2MSIgeT0iMTM5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2ZmZiI+QTI8L3RleHQ+PHJlY3QgeD0iMjE5IiB5PSIxMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgY2xhc3M9InN0YWxsIi8+PHRleHQgeD0iMjM0IiB5PSIxMzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJ0ZXh0IiBmb250LXNpemU9IjEyIiBmaWxsPSIjZmZmIj5BMzwvdGV4dD48cmVjdCB4PSI0MDkiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBjbGFzcz0ic3RhbGwiLz48dGV4dCB4PSI0MjQiIHk9IjEzOSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgY2xhc3M9InRleHQiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmZmYiPkE0PC90ZXh0PjxyZWN0IHg9IjQ4MiIgeT0iMTIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGNsYXNzPSJzdGFsbCIvPjx0ZXh0IHg9IjQ5NyIgeT0iMTM5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2ZmZiI+QTU8L3RleHQ+PHJlY3QgeD0iNTU1IiB5PSIxMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgY2xhc3M9InN0YWxsIi8+PHRleHQgeD0iNTcwIiB5PSIxMzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJ0ZXh0IiBmb250LXNpemU9IjEyIiBmaWxsPSIjZmZmIj5BNjwvdGV4dD48cmVjdCB4PSI2MjgiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBjbGFzcz0ic3RhbGwiLz48dGV4dCB4PSI2NDMiIHk9IjEzOSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgY2xhc3M9InRleHQiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmZmYiPkE3PC90ZXh0PjxyZWN0IHg9IjcwMSIgeT0iMTIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGNsYXNzPSJzdGFsbCIvPjx0ZXh0IHg9IjcxNiIgeT0iMTM5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2ZmZiI+QTg8L3RleHQ+PHJlY3QgeD0iNzc0IiB5PSIxMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgY2xhc3M9InN0YWxsIi8+PHRleHQgeD0iNzg5IiB5PSIxMzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJ0ZXh0IiBmb250LXNpemU9IjEyIiBmaWxsPSIjZmZmIj5BOTwvdGV4dD48L3N2Zz4=`;
    // Use it with:
    localStorage.setItem("tradeHallMap", sampleTradeHallMap);

    const savedMap = localStorage.getItem("tradeHallMap");
    return savedMap || null;
  });
  const [useMapView, setUseMapView] = useState(false);
  const [stalls, setStalls] = useState<Stall[]>(() => {
    const savedStalls = localStorage.getItem("tradeHallStalls");
    return savedStalls ? JSON.parse(savedStalls) : generateInitialStalls();
  });
  const [selectedStalls, setSelectedStalls] = useState<(string | null)[]>([]);
  const selectedStallObjects = stalls.filter((s) =>
    selectedStalls.includes(s.id)
  );
  const myReservations = stalls.filter(
    (s) => s.businessName === vendorInfo.businessName
  );

  useEffect(() => {
    const fetchVendorData = async () => {
      const email = Cookies.get("email");
      const jwt = Cookies.get("jwt");
      if (email && jwt) {
        try {
          setIsLoading(true);
          const data = await fetchVendorByEmail(jwt, email);
          if (data) {
            // Prefer an array format if present
            const list = Array.isArray(data.data)
              ? data.data
              : data.data
              ? [data.data]
              : [];
            if (list.length > 0 && list[0]) {
              const vendor = list[0];
              // Ensure we have the fields we expect before using them
              if (vendor && (vendor.businessName || vendor.userEmail)) {
                setVendorInfo({
                  businessName: vendor.businessName ?? "",
                  email: vendor.userEmail ?? "",
                  genres: vendor.genres || [],
                });

                setIsLoading(false);
              } else {
                console.warn(
                  "fetchVendorByEmail returned vendor object but missing expected fields:",
                  vendor
                );
                router.push("/");
              }
            } else {
              // No vendor found in the response
              console.log(
                "No vendor record found for email:",
                email,
                "response:",
                data
              );
              setIsLoading(false);
              router.push("/");
            }
          } else {
            console.log("Failed to fetch vendor data: empty response");
            setIsLoading(false);
            router.push("/");
          }
        } catch (error) {
          console.error("Failed to fetch vendor data:", error);
          setIsLoading(false);
          router.push("/");
        }
      } else {
        // Not logged in -> redirect
        console.log("No email or JWT found in cookies.");
        setIsLoading(false);
        router.push("/");
      }
    };

    fetchVendorData();
  }, [router]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "tradeHallMap" && e.newValue) {
        setStallMapImage(e.newValue);
      }
      if (e.key === "tradeHallStalls" && e.newValue) {
        setStalls(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleVendorLogout = () => {
    try {
      // Clear auth cookies set during login
      Cookies.remove("jwt");
      Cookies.remove("email");
      Cookies.remove("role");
    } catch (e) {
      // ignore cookie removal errors (e.g., SSR/no-cookie environment)
      console.warn("Failed to remove cookies during logout", e);
    }

    // Reset local state and UI
    setVendorInfo({ businessName: "", email: "", genres: [] });
    setSelectedStalls([]);
    setBookingStep(1);
    setVendorHomeTab("booking");

    // Optionally clear any stored session state if you want full sign-out
    // localStorage.removeItem('tradeHallStalls');

    // Redirect to the public landing/login page
    router.push("/");
  };

  const handleVendorHomeTabChange = (tab: string) => {
    setVendorHomeTab(tab);
    setBookingStep(1);
  };

  const saveProfileChanges = async (vendorInfo: VendorInfo) => {
    setVendorInfo(vendorInfo);
    console.log("Saving profile changes...", vendorInfo);
    try {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        const response = await saveVendorProfile(jwt, vendorInfo);
   
        if (response && response.success) {
          console.log("Profile changes saved successfully");
        } else {
          console.error("Failed to save profile changes:", response?.message);
        }
      }
    } catch (err) {
      console.error("An error occurred while saving profile changes:", err);
    }
  };

  const confirmReservation = () => {
    const updatedStalls = stalls.map((stall) => {
      if (selectedStalls.includes(stall.id)) {
        return {
          ...stall,
          reserved: false,
          pending: true,
          status: "pending",
          businessName: vendorInfo.businessName,
          email: vendorInfo.email,
          requestDate: new Date().toISOString(),
        };
      }
      return stall;
    });

    setStalls(updatedStalls);
    alert(
      " Booking request submitted! Your request is now pending admin approval."
    );
    setBookingStep(3); // show submitted state
  };

  const handleRemoveStallClick = (stall: Stall) => {
    setSelectedStalls(selectedStalls.filter((id) => id !== stall.id));
  };

  const cancelReservation = (stallId: string | null) => {
    const updatedStalls = stalls.map((stall) => {
      if (
        stall.id === stallId &&
        stall.businessName === vendorInfo.businessName
      ) {
        return {
          ...stall,
          reserved: false,
          pending: false,
          status: null,
          businessName: null,
          email: null,
          requestDate: null,
        };
      }
      return stall;
    });

    setStalls(updatedStalls);
  };

  const onMakeAnotherReservation = () => {
    setSelectedStalls([]);
    setBookingStep(1);
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500
        "opacity-100" relative overflow-hidden`}
    >
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <VendorHeader
          stallMapImage={stallMapImage}
          useMapView={useMapView}
          setUseMapView={setUseMapView}
          vendorInfo={vendorInfo}
          handleVendorLogout={handleVendorLogout}
          bookingStep={bookingStep}
        />
        <Tabs
          handleVendorHomeTabChange={handleVendorHomeTabChange}
          vendorHomeTab={vendorHomeTab}
        />

        {vendorHomeTab === "profile" && (
          <MyProfile
            vendorInfo={vendorInfo}
            onSave={(updatedVendorInfo) =>
              saveProfileChanges(updatedVendorInfo)
            }
          />
        )}

        {vendorHomeTab === "booking" && (
          <>
            {/* Booking Step Indicator */}
            <StepIndicator bookingStep={bookingStep} />

            {/* Selection / Map/Grid (Step 1 only) */}
            {bookingStep === 1 && (
              <>
                {/* Conditionally render Map View or Grid View */}
                {useMapView && stallMapImage ? (
                  <MapView
                    stallMapImage={stallMapImage}
                    stalls={stalls}
                    selectedStalls={selectedStalls}
                    setSelectedStalls={setSelectedStalls}
                    vendorInfo={vendorInfo}
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

            {myReservations.length > 0 && (
              <MyBookings
                onCancel={cancelReservation}
                myReservations={myReservations}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Vendor;
