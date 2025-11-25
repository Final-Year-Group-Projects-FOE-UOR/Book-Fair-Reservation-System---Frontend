"use client";
import { login } from "@/actions/authActions";
import AnimatedBackground from "@/components/common/backgrounds/animated-background";
import {
  GraduationCap,
  Home,
  Library,
  Lock,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getMap } from "@/actions/mapActions";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getCurrentMap = async (jwt: string) => {
      try {
        const response = await getMap(jwt);
        if (response.success && response.data.mapUrl) {
          console.log("Current map URL:", response.data.mapUrl);
          return response.data.mapUrl;
        } else {
          return null;
        }
      } catch (err) {
        console.log("An error occurred while fetching the map:", err);
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      if (response && response.success) {
        const mapUrl = await getCurrentMap(response.data.token);
        if (mapUrl) {
          Cookies.set("mapUrl", mapUrl, { expires: 1 }); // Expires in 1 day
        }
        toast.success("Login successful!");
        Cookies.set("jwt", response.data.token, { expires: 1 });
        Cookies.set("email", response.data.email, { expires: 1 });
        Cookies.set("role", response.data.role, { expires: 1 });
        router.push("/admin/dashboard");
      } else {
        toast.error("Login failed, please check your credentials");
        console.log("Login failed:", response?.message);
      }
    } catch (err) {
      console.log("An error occurred during login:", err);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedBackground className="items-center justify-center">
      <div className="flex w-full min-h-full flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-md w-full relative z-10">

          {/* Back button */}
          <button
            onClick={() => router.push("/")}
            className="mb-4 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors group text-sm sm:text-base"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0" />
            Go to Vendor Portal
          </button>

          {/* Card */}
          <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 animate-book-open">

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-blue-500/50 relative">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                <Library className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 absolute -top-1 -right-1 animate-floating-book" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Admin Login
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mt-1.5 sm:mt-2">
                Access the admin dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition text-sm sm:text-base text-white placeholder-gray-500"
                    placeholder="admin@bookfair.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition text-sm sm:text-base text-white placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transform transition-all shadow-lg shadow-blue-500/50 mt-2
                  ${loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-blue-600 hover:to-cyan-700 hover:scale-[1.02] sm:hover:scale-105"
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                    Loading...
                  </div>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default AdminLogin;