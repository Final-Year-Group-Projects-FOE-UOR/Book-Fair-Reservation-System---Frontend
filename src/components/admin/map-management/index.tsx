/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle, Trash, Upload } from "lucide-react";
import MapViewer from "./dialogs/MapViewer";
import StallSelector from "./StallSelector";
import MapEditDialog from "./dialogs/MapEditDialog";
import ImageKitUploader from "@/components/common/document-upload/ImageKitUploader";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { addMap, getMap } from "@/actions/mapActions";
import LoadingScreen from "@/components/common/loading";
import { getStalls } from "@/actions/stallActions";
import { Stall } from "../stall-configuration/types";
import { useRouter } from "next/navigation";
import DeleteMapDialog from "./dialogs/DeleteMapDialog";

export default function MapManagement() {
  const router = useRouter();
  const [upload, setUpload] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [hoveredStall, setHoveredStall] = useState<string | null>(null);
  const [isPositioningMode, setIsPositioningMode] = useState(false);
  const [stallMapImage, setStallMapImage] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);

  // const getCurrentMap = async () => {
  //   const jwt = Cookies.get("jwt") || "";
  //   if (!jwt) {
  //     toast.error("Authentication error. Please log in again.");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const response = await getMap(jwt);
  //     if (response.success && response.data.mapUrl) {
  //       setStallMapImage(response.data.mapUrl);
  //     } else {
  //       setStallMapImage(null);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };

  const getStallsList = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
    try {
      setLoading(true);
      const response = await getStalls(jwt);
      console.log(response.data);
      if (response.success) {
        setStalls(response.data);
      } else {
        setStalls([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const handleViewportChange = (
      event: MediaQueryList | MediaQueryListEvent,
    ) => {
      const mobile = event.matches;
      setIsSmallScreen(mobile);
      if (mobile) {
        router.replace("/admin/dashboard");
      }
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, [router]);

  useEffect(() => {
    if (isSmallScreen !== false) {
      return;
    }
    const mapUrl = Cookies.get("mapUrl") || null;
    setStallMapImage(mapUrl);
    // getCurrentMap();
    getStallsList();
  }, [isSmallScreen]);

  const handleUploadSuccess = async (response: any) => {
    const mapUrl = response.url;
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
    try {
      const addMapRes = await addMap(jwt, mapUrl);
      if (addMapRes.success) {
        toast.success("Map updated successfully!");
        Cookies.set("mapUrl", mapUrl, { expires: 1 });
        setStallMapImage(mapUrl);
      } else {
        toast.error("Failed to update map. Please try again.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUpload(false);
    }
  };

  if (isSmallScreen !== false) {
    return null;
  }

  return (
    <>
      {loading && <LoadingScreen />}
      <div
        className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
      >
        <div className="bg-linear-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-8 mb-6">
          <div className="w-full flex flex-col gap-4 mb-5">
            <ImageKitUploader
              onUploadSuccess={handleUploadSuccess}
              upload={upload}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              placeholder="Upload your resume or any document"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setUpload(true)}
                disabled={!selectedFile}
                className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:scale-[1.05] transition-all duration-300 flex items-center gap-2 ${
                  isPositioningMode
                    ? "bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg"
                    : "bg-linear-to-r from-blue-500 to-cyan-600 text-white"
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
          </div>
          {stallMapImage && (
            <div className="bg-[#1a1f37]/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">

                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPositioningMode((s) => !s);
                      setIsMapDialogOpen(true);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:scale-[1.05] transition-all duration-300 flex items-center gap-2 ${
                      isPositioningMode
                        ? "bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg"
                        : "bg-linear-to-r from-blue-500 to-cyan-600 text-white"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    {isPositioningMode ? "Exit Positioning" : "Position Stalls"}
                  </button>
                  <DeleteMapDialog setStallMapImage={setStallMapImage} />
                </div>
              </div>

              {isPositioningMode && (
                <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-semibold mb-1">
                        Positioning Mode Active
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        Click on a stall below, then click on the map where it
                        should appear. Positions are automatically saved for
                        vendors to see.
                      </p>
                    </div>
                  </div>

                  <StallSelector
                    stalls={stalls}
                    hoveredStall={hoveredStall}
                    setHoveredStall={setHoveredStall}
                  />
                </div>
              )}
              <MapEditDialog
                open={isMapDialogOpen}
                onOpenChange={() => {
                  setIsPositioningMode(false);
                  setIsMapDialogOpen(false);
                }}
                stallMapImage={stallMapImage}
                stalls={stalls}
                setStalls={setStalls}
                hoveredStall={hoveredStall}
                setHoveredStall={setHoveredStall}
                isPositioningMode={isPositioningMode}
              />

              <MapViewer
                stallMapImage={stallMapImage}
                stalls={stalls}
                setStalls={setStalls}
                hoveredStall={hoveredStall}
                setHoveredStall={setHoveredStall}
                isPositioningMode={isPositioningMode}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
