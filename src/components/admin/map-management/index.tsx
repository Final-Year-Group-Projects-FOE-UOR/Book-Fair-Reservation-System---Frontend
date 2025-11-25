/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle, X, Building, Trash, Upload } from "lucide-react";
import MapUploader from "./MapUploader";
import MapViewer from "./dialogs/MapViewer";
import StallSelector from "./StallSelector";
import MapEditDialog from "./dialogs/MapEditDialog";
import ImageKitUploader from "@/components/common/document-upload/ImageKitUploader";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { addMap, getMap } from "@/actions/mapActions";
import LoadingScreen from "@/components/common/loading";
import { getStalls } from "@/actions/stallActions";
import { Stall } from "../stall-configuration/types";


export default function MapManagement() {
  const [upload, setUpload] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [hoveredStall, setHoveredStall] = useState<string | null>(null);
  const [isPositioningMode, setIsPositioningMode] = useState(false);
  const [stallMapImage, setStallMapImage] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [stalls, setStalls] = useState<Stall[]>([]);

  const getCurrentMap = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
    try {
      setLoading(true);
      const response = await getMap(jwt);
      if (response.success && response.data.mapUrl) {
        setStallMapImage(response.data.mapUrl);
      } else {
        setStallMapImage(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const getStallsList = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
    try {
      setLoading(true);
      const response = await getStalls(jwt);
      console.log(response.data)
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
  }

  useEffect(() => {
    getCurrentMap();
    getStallsList();
  }, []);

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

  return (
    <>
      {loading && <LoadingScreen />}
      <div
        className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
      >
        <div className="bg-linear-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-8 mb-6">
          <div className="w-full flex flex-col gap-4 mb-[20px]">
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
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
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
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">
                    Map Uploaded Successfully
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPositioningMode((s) => !s);
                      setIsMapDialogOpen(true);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:scale-[1.05] transition-all duration-300 flex items-center gap-2 ${
                      isPositioningMode
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    {isPositioningMode ? "Exit Positioning" : "Position Stalls"}
                  </button>
                  <button
                    onClick={() => {
                      setStallMapImage(null);
                      try {
                        localStorage.removeItem("tradeHallMap");
                      } catch {}
                    }}
                    className="px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:scale-[1.05] transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300 hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 shadow-lg hover:shadow-red-500/20"
                  >
                    <Trash className="w-4 h-4" />
                    Remove Map
                  </button>
                </div>
              </div>

              {isPositioningMode && (
                <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
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

              {/* <div className="flex items-center justify-end mt-3">
                <div className="flex items-center gap-4">
                  <p className="text-xs text-green-400 font-semibold">
                    {stalls.filter((s) => s.mapPosition && !s.isEmpty).length}{" "}
                    stalls positioned
                  </p>
                  <p className="text-xs text-blue-400 font-semibold">
                    ✓ Visible to all vendors
                  </p>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
