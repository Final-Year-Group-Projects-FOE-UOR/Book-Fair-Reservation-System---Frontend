"use client";
import { login } from "@/actions/authActions";
import AnimatedBackground from "@/components/common/backgrounds/animated-background";
import {
  BookMarked,
  GraduationCap,
  Home,
  Library,
  Lock,
  Mail,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      if (response && response.success) {
        toast.success("Login successful!");
        // Set cookie with token
        Cookies.set("admin_token", response.data.token, { expires: 1 }); // Expires in 1 day
        Cookies.set("email", response.data.email, { expires: 1 }); // Expires in 1 day
        Cookies.set("role", response.data.role, { expires: 1 }); // Expires in 1 day
        router.push("/admin/dashboard");
      } else {
        toast.error("Login failed, please check your credentials");
        // Handle login failure (e.g., show error message)
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
      <div className="flex w-full  min-h-full flex-col items-center justify-center">
        <div className="max-w-md w-full  relative z-10">
          <button
            onClick={handleCardClick}
            className="mb-4 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors group"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Go to Vendor Portal
          </button>
          <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 animate-book-open">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50 relative">
                <GraduationCap className="w-8 h-8 text-white" />
                <Library className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-floating-book" />
              </div>
              <h2 className="text-3xl font-bold text-white">Admin Login</h2>
              <p className="text-gray-300 mt-2 flex items-center justify-center gap-2">
                <BookMarked className="w-4 h-4 text-blue-400" />
                Access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition text-white placeholder-gray-500"
                    placeholder="admin@bookfair.com"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition text-white placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`
    w-full cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl font-semibold 
    transform transition-all shadow-lg shadow-blue-500/50
    ${
      loading
        ? "opacity-60 cursor-not-allowed hover:scale-100"
        : "hover:from-blue-600 hover:to-cyan-700 hover:scale-105"
    }
  `}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
