"use client";
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

const AdminLogin = () => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push("/");
  };

  const handleSuccessLogin = () => {
    router.push("/admin/dashboard");
  };

  // Predefined admin credentials
  const adminCredentials = [
    { email: "admin@bookfair.com", password: "admin123", name: "Admin User" },
    {
      email: "employee@bookfair.com",
      password: "employee123",
      name: "Employee User",
    },
  ];
  const handleAdminLogin = (email: string, password: string) => {
    const admin = adminCredentials.find(
      (a) => a.email === email && a.password === password
    );
    if (admin) {
      return true;
    }
    return false;
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const success = handleAdminLogin(formData.email, formData.password);
    if (!success) {
      setError("Invalid email or password. Please check your credentials.");
    } else {
      handleSuccessLogin();
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
              <h2 className="text-3xl font-bold text-white">Employee Login</h2>
              <p className="text-gray-300 mt-2 flex items-center justify-center gap-2">
                <BookMarked className="w-4 h-4 text-blue-400" />
                Access the admin dashboard
              </p>
            </div>

            {error && (
              <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <X className="w-4 h-4" />
                {error}
              </div>
            )}

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

              <div>
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
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all shadow-lg shadow-blue-500/50"
              >
                Login to Dashboard
              </button>
            </form>

            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-xs text-gray-300 text-center mb-2 font-semibold">
                Demo Credentials:
              </p>
              <div className="space-y-1 text-xs text-gray-400">
                <p className="text-center">admin@bookfair.com / admin123</p>
                {/* <p className="text-center">employee@bookfair.com / employee123</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default AdminLogin;
