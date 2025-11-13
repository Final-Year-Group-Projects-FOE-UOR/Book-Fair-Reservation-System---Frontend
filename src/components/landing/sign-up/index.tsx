"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Book, BookOpen, Library } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Particle = {
  left: string;
  top: string;
  delay: string;
  duration: string;
};

type FloatingBook = {
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: number;
  type: "Book" | "BookOpen" | "Library";
};

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`,
    }))
  );

  const [floatingBooks] = useState<FloatingBook[]>(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${6 + Math.random() * 6}s`,
      size: 40 + Math.random() * 40,
      type: i % 3 === 0 ? "BookOpen" : i % 3 === 1 ? "Book" : "Library",
    }))
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call to Spring Boot backend
      const response = await fetch(
        "http://localhost:8080/api/vendors/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle successful registration
        alert("Account created successfully!");
        onClose();
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      {/* Animated Background Orbs */}
      <div className="background-orbs pointer-events-none absolute inset-0 -z-10">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Floating Book Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingBooks.map((b, i) => (
          <div
            key={i}
            className="absolute text-white/5 animate-floating-book"
            style={{
              left: b.left,
              top: b.top,
              animationDelay: b.delay,
              animationDuration: b.duration,
              width: b.size,
              height: b.size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {b.type === "BookOpen" ? (
              <BookOpen size={b.size} />
            ) : b.type === "Book" ? (
              <Book size={b.size} />
            ) : (
              <Library size={b.size} />
            )}
          </div>
        ))}
      </div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md px-4">
        {/* Back to Home Link */}
        <button
          onClick={onClose}
          className="mb-6 flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Back to Home</span>
        </button>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Vendor Registration
          </h2>
          <p className="text-gray-400 text-center mb-8 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Create your account to reserve stalls
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter your business name"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account & Reserve Stalls"}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-400 text-sm mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes floating-book {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.1;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-floating-book {
          animation: floating-book ease-in-out infinite;
        }

        .background-orbs .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: pulse 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #8b5cf6, transparent);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #ec4899, transparent);
          top: 20%;
          right: -5%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #6366f1, transparent);
          bottom: 10%;
          left: 10%;
          animation-delay: 4s;
        }

        .orb-4 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #a855f7, transparent);
          bottom: -15%;
          right: -15%;
          animation-delay: 6s;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
