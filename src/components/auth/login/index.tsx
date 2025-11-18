"use client";

import AnimatedBackground from "@/components/common/backgrounds/animated-background";
import LoginButton from "@/components/common/buttons/primary-buttons/login-button";
import {
  BookOpen,
  Building,
  Feather,
  Home,
  Mail,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };
  return (
    <AnimatedBackground className="items-center justify-center">
      <div className="flex w-full  min-h-full flex-col items-center justify-center">
        <div className="max-w-md w-full  relative z-10">
          <button
            onClick={() => router.push("/")}
            className="mb-4 text-pink-400 hover:text-pink-300 flex items-center gap-2 transition-colors group"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Home
          </button>

          <div className="bg-linear-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 animate-book-open">
            <div className="text-center mb-8">
              <div className="bg-linear-to-br from-pink-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/50 relative">
                <BookOpen className="w-8 h-8 text-white animate-page-flip" />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-sparkle" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                {isLogin ? "Vendor Login" : "Vendor Registration"}
              </h2>
              <p className="text-gray-300 mt-2 flex items-center justify-center gap-2">
                <Feather className="w-4 h-4 text-purple-400" />
                {isLogin
                  ? "Access your vendor account"
                  : "Create your account to reserve stalls"}
              </p>
            </div>

            {error && (
              <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500/50 transition text-white placeholder-gray-500"
                      placeholder="Enter your business name"
                    />
                  </div>
                </div>
              )}

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
                    className="w-full pl-10 pr-4 py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500/50 transition text-white placeholder-gray-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#1a1f37]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500/50 transition text-white placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              {/* <LoginButton buttonText={isLogin ? "Login to Account" : "Create Account & Reserve Stalls"} onClick={handleSubmit} /> */}

              
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({ businessName: "", email: "", password: "" });
                }}
                className="text-pink-400 hover:text-pink-300 text-sm transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Login;
