"use client";
import { User, X } from "lucide-react";
import { useEffect, useState } from "react";

interface MyProfileProps {
  vendorInfo: { businessName: string; email: string };
  genres: string[];

  onSave: (updatedData: {
    businessName: string;
    email: string;
    genres: string[];
  }) => void;
}


const MyProfile = ({ vendorInfo, genres, onSave }: MyProfileProps) => {
  const [updatedVendorInfo, setUpdatedVendorInfo] = useState(vendorInfo);
  const [updatedGenres, setUpdatedGenres] = useState(genres);
  const [genreInput, setGenreInput] = useState("");

    useEffect(() => {
    setUpdatedVendorInfo(vendorInfo);
  }, [vendorInfo]);

  useEffect(() => {
    setUpdatedGenres(genres);
  }, [genres]);

  const addGenre = () => {
    const newGenre = genreInput.trim();
    if (!newGenre) return;
    setUpdatedGenres([...updatedGenres, newGenre]);
    setGenreInput("");
  };

  const removeGenre = (g: string) => {
    //remove genre g from updatedGenres
    const newGenres = updatedGenres.filter((genre) => genre !== g);
    setUpdatedGenres(newGenres);
  };
  return (
    <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <User className="w-6 h-6 text-pink-400" />
        Profile Information
      </h3>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={updatedVendorInfo.businessName}
            onChange={(e) =>
              setUpdatedVendorInfo({
                ...updatedVendorInfo,
                businessName: e.target.value,
              })
            }
            className="w-full px-4 py-3 bg-[#0d1229] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 transition"
            placeholder="Your business name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={updatedVendorInfo.email}
            onChange={(e) =>
              setUpdatedVendorInfo({
                ...updatedVendorInfo,
                email: e.target.value,
              })
            }
            className="w-full px-4 py-3 bg-[#0d1229] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 transition"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Genres / Categories
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#0d1229] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 transition"
            placeholder="Add a genre"
          />
          <button
            type="button"
            onClick={addGenre}
            className="px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition"
          >
            Add
          </button>
        </div>
        {updatedGenres.length === 0 ? (
          <p className="text-sm text-gray-400">No genres added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {updatedGenres.map((g) => (
              <span
                key={g}
                className="group inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 text-pink-300 px-3 py-2 rounded-full text-xs font-semibold"
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
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            alert("Profile updated (stored in this session).");
            onSave({ ...updatedVendorInfo, genres: updatedGenres });
          }}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:from-pink-600 hover:to-purple-700 transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
