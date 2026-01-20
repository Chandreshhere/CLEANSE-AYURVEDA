"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const { user, login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBgHovered, setIsBgHovered] = useState(false);

  // Generate evenly distributed positions for product cards across all edges
  const productCards = useMemo<ProductCard[]>(() => {
    const cards: ProductCard[] = [];

    // Define zones around the edges (avoiding center form area)
    // Zone format: { topMin, topMax, leftMin, leftMax }
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

    // Place one card in each zone with random position within that zone
    zones.forEach((zone, index) => {
      const top = zone.topMin + Math.random() * (zone.topMax - zone.topMin);
      const left = zone.leftMin + Math.random() * (zone.leftMax - zone.leftMin);

      cards.push({
        id: index,
        top,
        left,
        width: 65 + Math.random() * 45,
        height: 75 + Math.random() * 50,
        rotation: -15 + Math.random() * 30,
        image: productImages[index % productImages.length],
      });
    });

    return cards;
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);

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
        router.push("/account");
      } else {
        setError(result.error || "Signup failed");
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        router.push("/account");
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

  return (
    <main
      className="flex min-h-screen flex-col"
      style={{
        backgroundColor: "#F5F1EB",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsBgHovered(true)}
      onMouseLeave={() => setIsBgHovered(false)}
    >
      {/* Random Product Cards - All visible on bg hover, individual zoom on card hover */}
      {productCards.map((card) => (
        <ProductCardItem key={card.id} card={card} bgHovered={isBgHovered} />
      ))}

      {/* Login Form Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "48px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          position: "relative",
          zIndex: 10,
        }}
        onMouseEnter={() => setIsBgHovered(false)}
        onMouseLeave={() => setIsBgHovered(true)}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "28px",
            lineHeight: "100%",
            letterSpacing: "0",
            color: "#000000",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          {mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}
        </h1>

        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "150%",
            color: "#666666",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          {mode === "login"
            ? "Sign in to access your account and continue your wellness journey."
            : "Join us for exclusive offers and a personalized experience."}
        </p>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "#FDF8F8",
              border: "1px solid #E8D4D4",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#C9746C",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Field (Signup only) */}
          {mode === "signup" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  height: "52px",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                  padding: "0 16px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#000000",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4A2B1F")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E5E5")}
              />
            </div>
          )}

          {/* Email Field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                color: "#000000",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                height: "52px",
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                padding: "0 16px",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#000000",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4A2B1F")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E5E5")}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                color: "#000000",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
              required
              style={{
                width: "100%",
                height: "52px",
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                padding: "0 16px",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#000000",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4A2B1F")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E5E5")}
            />
          </div>

          {/* Confirm Password Field (Signup only) */}
          {mode === "signup" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                style={{
                  width: "100%",
                  height: "52px",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                  padding: "0 16px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#000000",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4A2B1F")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E5E5")}
              />
            </div>
          )}

          {/* Forgot Password (Login only) */}
          {mode === "login" && (
            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#4A2B1F",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              height: "56px",
              backgroundColor: isSubmitting ? "#8B7355" : "#4A2B1F",
              border: "none",
              borderRadius: "8px",
              fontFamily: "Lexend Exa, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0",
              color: "#FCF6EB",
              textTransform: "uppercase",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              marginTop: mode === "signup" ? "24px" : "0",
            }}
          >
            {isSubmitting
              ? "Please wait..."
              : mode === "login"
              ? "SIGN IN"
              : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "32px 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E5E5E5" }} />
          <span
            style={{
              padding: "0 16px",
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "#999999",
              textTransform: "uppercase",
            }}
          >
            OR
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E5E5E5" }} />
        </div>

        {/* Switch Mode */}
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "#666666",
            textAlign: "center",
          }}
        >
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={switchMode}
            style={{
              background: "none",
              border: "none",
              fontFamily: "Lexend, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#4A2B1F",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </main>
  );
}
