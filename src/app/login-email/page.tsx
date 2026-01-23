"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context";

type AuthMode = "login" | "signup";

// Product images from public folder
const productImages = [
  "/jar.png",
  "/product.png",
  "/spotlight-jar.png",
  "/p1.png",
  "/p2.png",
  "/p3.png",
  "/p4.png",
  "/cream-small.png",
  "/serum-small.png",
  "/spotlight-tube.png",
  "/product-display.png",
  "/shot.png",
];

// Random product cards configuration
interface ProductCard {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  rotation: number;
  image: string;
}

// Define zones around the edges (avoiding center form area)
const zones = [
  // Top edge - full width
  { topMin: 2, topMax: 12, leftMin: 2, leftMax: 20 },
  { topMin: 2, topMax: 12, leftMin: 25, leftMax: 45 },
  { topMin: 2, topMax: 12, leftMin: 55, leftMax: 75 },
  { topMin: 2, topMax: 12, leftMin: 80, leftMax: 95 },
  // Bottom edge - full width
  { topMin: 88, topMax: 96, leftMin: 2, leftMax: 20 },
  { topMin: 88, topMax: 96, leftMin: 25, leftMax: 45 },
  { topMin: 88, topMax: 96, leftMin: 55, leftMax: 75 },
  { topMin: 88, topMax: 96, leftMin: 80, leftMax: 95 },
  // Left edge - middle section
  { topMin: 15, topMax: 35, leftMin: 2, leftMax: 18 },
  { topMin: 40, topMax: 60, leftMin: 2, leftMax: 18 },
  { topMin: 65, topMax: 85, leftMin: 2, leftMax: 18 },
  // Right edge - middle section
  { topMin: 15, topMax: 35, leftMin: 82, leftMax: 96 },
  { topMin: 40, topMax: 60, leftMin: 82, leftMax: 96 },
  { topMin: 65, topMax: 85, leftMin: 82, leftMax: 96 },
  // Corner areas for extra coverage
  { topMin: 15, topMax: 25, leftMin: 20, leftMax: 28 },
  { topMin: 15, topMax: 25, leftMin: 72, leftMax: 80 },
  { topMin: 75, topMax: 85, leftMin: 20, leftMax: 28 },
  { topMin: 75, topMax: 85, leftMin: 72, leftMax: 80 },
];

// Generate cards function - called only on client side
const generateProductCards = (): ProductCard[] => {
  return zones.map((zone, index) => ({
    id: index,
    top: zone.topMin + Math.random() * (zone.topMax - zone.topMin),
    left: zone.leftMin + Math.random() * (zone.leftMax - zone.leftMin),
    width: 65 + Math.random() * 45,
    height: 75 + Math.random() * 50,
    rotation: -15 + Math.random() * 30,
    image: productImages[index % productImages.length],
  }));
};

// Individual product card component with its own hover state for zoom
const ProductCardItem: React.FC<{ card: ProductCard; bgHovered: boolean }> = ({
  card,
  bgHovered,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        top: `${card.top}%`,
        left: `${card.left}%`,
        width: `${card.width}px`,
        height: `${card.height}px`,
        borderRadius: "12px",
        opacity: bgHovered ? 0.85 : 0,
        transform: isHovered
          ? `scale(1.15) rotate(${card.rotation}deg)`
          : `scale(1) rotate(${card.rotation}deg)`,
        transition: "opacity 0.5s ease-out, transform 0.3s ease-out",
        overflow: "hidden",
        backgroundColor: "#F5F1EB",
        zIndex: isHovered ? 5 : 1,
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={card.image}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default function EmailLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBgHovered, setIsBgHovered] = useState(false);
  const [productCards, setProductCards] = useState<ProductCard[]>([]);

  // Get redirect path from query params
  const redirectPath = searchParams?.get("redirect") || "/";

  // Generate random positions only on client side to avoid hydration mismatch
  useEffect(() => {
    setProductCards(generateProductCards());
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(redirectPath);
    }
  }, [user, router, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your name");
        setIsSubmitting(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsSubmitting(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsSubmitting(false);
        return;
      }

      const result = await signup(name, email, password);
      if (result.success) {
        router.push(redirectPath);
      } else {
        setError(result.error || "Signup failed");
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        router.push(redirectPath);
      } else {
        setError(result.error || "Login failed");
      }
    }

    setIsSubmitting(false);
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSkip = () => {
    router.push(redirectPath);
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F5F1EB] px-4 py-8"
      onMouseEnter={() => setIsBgHovered(true)}
      onMouseLeave={() => setIsBgHovered(false)}
    >
      {/* Random Product Cards - All visible on bg hover, individual zoom on card hover */}
      {productCards.map((card) => (
        <ProductCardItem key={card.id} card={card} bgHovered={isBgHovered} />
      ))}

      {/* Login Form Card */}
      <div
        className="relative z-10 w-full max-w-[480px] rounded-xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10 xl:p-12"
        onMouseEnter={() => setIsBgHovered(false)}
        onMouseLeave={() => setIsBgHovered(true)}
      >
        {/* Title */}
        <h1 className="mb-3 text-center font-lexend-exa text-xl font-normal uppercase text-black sm:text-2xl lg:text-[28px]">
          {mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}
        </h1>

        <p className="mb-8 text-center font-lexend text-sm font-normal leading-relaxed text-[#666666] lg:mb-10">
          {mode === "login"
            ? "Sign in to access your account and continue your wellness journey."
            : "Join us for exclusive offers and a personalized experience."}
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-[#E8D4D4] bg-[#FDF8F8] px-4 py-3">
            <p className="text-center font-lexend text-sm font-normal text-[#C9746C]">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Field (Signup only) */}
          {mode === "signup" && (
            <div className="mb-5">
              <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 w-full rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-5">
            <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="h-12 w-full rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
            />
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
              required
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              className="h-12 w-full rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
            />
          </div>

          {/* Confirm Password Field (Signup only) */}
          {mode === "signup" && (
            <div className="mb-5">
              <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="h-12 w-full rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
              />
            </div>
          )}

          {/* Forgot Password (Login only) */}
          {mode === "login" && (
            <div className="mb-6 text-right">
              <button
                type="button"
                className="bg-transparent font-lexend text-xs font-normal text-[#4A2B1F] underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`h-12 w-full rounded-lg font-lexend-exa text-sm font-normal uppercase text-[#FCF6EB] transition-colors lg:h-14 ${
              isSubmitting ? "cursor-not-allowed bg-[#8B7355]" : "cursor-pointer bg-[#4A2B1F]"
            } ${mode === "signup" ? "mt-6" : ""}`}
          >
            {isSubmitting
              ? "Please wait..."
              : mode === "login"
              ? "SIGN IN"
              : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-[#E5E5E5]" />
          <span className="px-4 font-lexend text-xs font-normal uppercase text-[#999999]">
            OR
          </span>
          <div className="h-px flex-1 bg-[#E5E5E5]" />
        </div>

        {/* Switch Mode */}
        <p className="text-center font-lexend text-sm font-normal text-[#666666]">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={switchMode}
            className="bg-transparent font-lexend text-sm font-semibold text-[#4A2B1F] underline"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>

        {/* Phone Login Option */}
        <p className="mt-4 text-center font-lexend text-sm font-normal text-[#666666]">
          Prefer phone login?{" "}
          <Link
            href="/login"
            className="font-lexend text-sm font-semibold text-[#4A2B1F] underline"
          >
            Sign in with OTP
          </Link>
        </p>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="mt-4 h-12 w-full rounded-lg border border-[#E5E5E5] bg-transparent font-lexend-exa text-sm font-normal uppercase text-[#4A2B1F] transition-colors hover:bg-[#F5F1EB] lg:h-14"
        >
          SKIP FOR NOW
        </button>
      </div>
    </main>
  );
}
