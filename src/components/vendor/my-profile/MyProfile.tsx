"use client";
import { User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { VendorInfo } from "../types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/common/loading";
import { fetchVendorByEmail, updateVendor } from "@/actions/vendorActions";

const MyProfile = () => {
  const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
    userId: 0,
    businessName: "",
    email: "",
    genres: [],
  });

  const [genreInput, setGenreInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const getVendorInfo = async () => {
    const jwt = Cookies.get("jwt");
    const email = Cookies.get("email");
    if (!jwt || !email) {
      toast.error("You must be logged in to view your profile.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchVendorByEmail(jwt, email);
      if (response.success) {
        setVendorInfo({
          userId: response.data.id,
          businessName: response.data.businessName,
          email: response.data.userEmail,
          genres: response.data.genres,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to fetch profile information. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVendorInfo();
  }, []);

  const addGenre = (e: React.FormEvent) => {
    e.preventDefault();
    const newGenre =
      genreInput.trim().at(0)?.toUpperCase() + genreInput.trim().slice(1);
    if (!newGenre) return;
    if (vendorInfo.genres?.includes(newGenre)) {
      toast.error("This genre is already added.");
      return;
    }
    setVendorInfo((prev) => ({
      ...prev,
      genres: prev.genres ? [...prev.genres, newGenre] : [newGenre],
    }));
    setGenreInput("");
  };

  const removeGenre = (g: string) => {
    setVendorInfo((prev) => ({
      ...prev,
      genres: prev.genres?.filter((genre) => genre !== g) || [],
    }));
  };

  const updateProfile = async () => {
    const jwt = Cookies.get("jwt");
    const email = Cookies.get("email");
    if (!jwt || !email) {
      toast.error("You must be logged in to update your profile.");
      return;
    }
    setButtonLoading(true);
    try {
      const response = await updateVendor(jwt, email, vendorInfo);
      if (response.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-gradient-to-br font-geist-sans from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-8 w-full max-w-3xl mx-auto">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
        <User className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 shrink-0" />
        Profile Information
      </h3>

      {/* Business Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={vendorInfo.businessName}
            onChange={(e) =>
              setVendorInfo({ ...vendorInfo, businessName: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0d1229] border border-white/10 rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-pink-500 transition"
            placeholder="Your business name"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
            Contact Email
          </label>
          <input
            disabled
            type="email"
            value={vendorInfo.email}
            onChange={(e) =>
              setVendorInfo({ ...vendorInfo, email: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0d1229] border border-white/10 rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-pink-500 transition disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Genres */}
      <form onSubmit={addGenre} className="mb-5 sm:mb-6">
        <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
          Genres / Categories
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0d1229] border border-white/10 rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-pink-500 transition"
            placeholder="Add a genre"
          />
          <button
            type="submit"
            className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm sm:text-base rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition whitespace-nowrap shrink-0"
          >
            Add
          </button>
        </div>
        {vendorInfo.genres?.length === 0 ? (
          <p className="text-xs sm:text-sm text-gray-400">
            No genres added yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {vendorInfo.genres?.map((g) => (
              <span
                key={g}
                className="inline-flex items-center gap-1.5 bg-pink-500/20 border border-pink-500/30 text-pink-300 px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                {g}
                <button
                  type="button"
                  onClick={() => removeGenre(g)}
                  className="opacity-60 hover:opacity-100 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </form>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={updateProfile}
          disabled={buttonLoading}
          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm sm:text-base rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {buttonLoading && (
            <svg
              className="animate-spin w-4 h-4 text-white shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {buttonLoading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
