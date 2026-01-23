"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context";
import { auth, RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "@/lib/firebase";
import { getRedirectPath } from "@/lib/auth-utils";

type AuthStep = "phone" | "otp" | "register";

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

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loginWithOTP, registerWithPhone } = useAuth();
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBgHovered, setIsBgHovered] = useState(false);
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [firebaseToken, setFirebaseToken] = useState<string>("");
  const [resendTimer, setResendTimer] = useState(0);

  // Registration form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

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

  // Initialize reCAPTCHA
  useEffect(() => {
    if (typeof window !== "undefined" && recaptchaContainerRef.current && !recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved
          },
          "expired-callback": () => {
            setError("reCAPTCHA expired. Please try again.");
          },
        });
      } catch (err) {
        console.error("reCAPTCHA initialization error:", err);
      }
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, "");
    return cleaned;
  };

  const getFullPhoneNumber = (): string => {
    const cleaned = phone.replace(/[^\d]/g, "");
    // If the phone doesn't start with country code, assume India (+91)
    if (phone.startsWith("+")) {
      return phone;
    }
    return `+91${cleaned}`;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const phoneNumber = getFullPhoneNumber();

    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current!, {
          size: "invisible",
        });
      }

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
      setConfirmationResult(confirmation);
      setStep("otp");
      setResendTimer(30);
    } catch (err: unknown) {
      console.error("Send OTP error:", err);
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === "auth/invalid-phone-number") {
        setError("Invalid phone number format");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
      // Reset reCAPTCHA on error
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    }

    setIsSubmitting(false);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOTPPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      setIsSubmitting(false);
      return;
    }

    if (!confirmationResult) {
      setError("Session expired. Please request a new OTP.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await confirmationResult.confirm(otpCode);
      const token = await result.user.getIdToken();
      setFirebaseToken(token);

      // Try to login with the token
      const loginResult = await loginWithOTP(token);

      if (loginResult.success) {
        router.push(redirectPath);
      } else if (loginResult.needsRegistration) {
        // User doesn't exist, show registration form
        setStep("register");
      } else {
        setError(loginResult.error || "Login failed");
      }
    } catch (err: unknown) {
      console.error("Verify OTP error:", err);
      const firebaseError = err as { code?: string };
      if (firebaseError.code === "auth/invalid-verification-code") {
        setError("Invalid OTP. Please check and try again.");
      } else if (firebaseError.code === "auth/code-expired") {
        setError("OTP has expired. Please request a new one.");
      } else {
        setError("Verification failed. Please try again.");
      }
    }

    setIsSubmitting(false);
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setError("");
    setIsSubmitting(true);

    try {
      // Reset reCAPTCHA
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }

      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current!, {
        size: "invisible",
      });

      const phoneNumber = getFullPhoneNumber();
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
      setConfirmationResult(confirmation);
      setResendTimer(30);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError("Failed to resend OTP. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    const result = await registerWithPhone({
      firebaseIdToken: firebaseToken,
      termsAccepted: true,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      email: email || undefined,
    });

    if (result.success) {
      router.push(redirectPath);
    } else {
      setError(result.error || "Registration failed");
    }

    setIsSubmitting(false);
  };

  const goBack = () => {
    if (step === "otp") {
      setStep("phone");
      setOtp(["", "", "", "", "", ""]);
    } else if (step === "register") {
      setStep("otp");
    }
    setError("");
  };

  const handleSkip = () => {
    router.push(redirectPath);
  };

  const getTitle = () => {
    switch (step) {
      case "phone":
        return "WELCOME";
      case "otp":
        return "VERIFY OTP";
      case "register":
        return "CREATE ACCOUNT";
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case "phone":
        return "Enter your phone number to continue your wellness journey.";
      case "otp":
        return `We've sent a verification code to ${getFullPhoneNumber()}`;
      case "register":
        return "Complete your profile to get started.";
    }
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F5F1EB] px-4 py-8"
      onMouseEnter={() => setIsBgHovered(true)}
      onMouseLeave={() => setIsBgHovered(false)}
    >
      {/* reCAPTCHA Container */}
      <div ref={recaptchaContainerRef} id="recaptcha-container" />

      {/* Random Product Cards */}
      {productCards.map((card) => (
        <ProductCardItem key={card.id} card={card} bgHovered={isBgHovered} />
      ))}

      {/* Form Card */}
      <div
        className="relative z-10 w-full max-w-[480px] rounded-xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10 xl:p-12"
        onMouseEnter={() => setIsBgHovered(false)}
        onMouseLeave={() => setIsBgHovered(true)}
      >
        {/* Back Button */}
        {step !== "phone" && (
          <button
            type="button"
            onClick={goBack}
            className="mb-4 flex items-center gap-2 bg-transparent font-lexend text-sm font-normal text-[#666666] transition-colors hover:text-[#4A2B1F]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        )}

        {/* Title */}
        <h1 className="mb-3 text-center font-lexend-exa text-xl font-normal uppercase text-black sm:text-2xl lg:text-[28px]">
          {getTitle()}
        </h1>

        <p className="mb-8 text-center font-lexend text-sm font-normal leading-relaxed text-[#666666] lg:mb-10">
          {getSubtitle()}
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-[#E8D4D4] bg-[#FDF8F8] px-4 py-3">
            <p className="text-center font-lexend text-sm font-normal text-[#C9746C]">
              {error}
            </p>
          </div>
        )}

        {/* Phone Input Step */}
        {step === "phone" && (
          <form onSubmit={handleSendOTP}>
            <div className="mb-5">
              <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex h-12 w-[72px] items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] font-lexend text-sm text-[#666666] lg:h-[52px]">
                  +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  placeholder="Enter your phone number"
                  required
                  maxLength={10}
                  autoComplete="tel"
                  className="h-12 flex-1 rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 h-12 w-full rounded-lg font-lexend-exa text-sm font-normal uppercase text-[#FCF6EB] transition-colors lg:h-14 ${
                isSubmitting ? "cursor-not-allowed bg-[#8B7355]" : "cursor-pointer bg-[#4A2B1F]"
              }`}
            >
              {isSubmitting ? "Sending OTP..." : "SEND OTP"}
            </button>
          </form>
        )}

        {/* OTP Verification Step */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-5">
              <label className="mb-3 block font-lexend text-xs font-medium uppercase text-black">
                Enter 6-digit OTP
              </label>
              <div className="flex justify-between gap-2" onPaste={handleOTPPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpInputsRef.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    autoComplete="one-time-code"
                    className="h-12 w-12 rounded-lg border border-[#E5E5E5] text-center font-lexend text-lg font-medium text-black outline-none transition-colors focus:border-[#4A2B1F] sm:h-14 sm:w-14 lg:h-[52px] lg:w-[52px]"
                  />
                ))}
              </div>
            </div>

            <div className="mb-6 text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendTimer > 0 || isSubmitting}
                className={`bg-transparent font-lexend text-sm font-normal ${
                  resendTimer > 0 ? "text-[#999999]" : "text-[#4A2B1F] underline"
                }`}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || otp.join("").length !== 6}
              className={`h-12 w-full rounded-lg font-lexend-exa text-sm font-normal uppercase text-[#FCF6EB] transition-colors lg:h-14 ${
                isSubmitting || otp.join("").length !== 6
                  ? "cursor-not-allowed bg-[#8B7355]"
                  : "cursor-pointer bg-[#4A2B1F]"
              }`}
            >
              {isSubmitting ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>
        )}

        {/* Registration Step */}
        {step === "register" && (
          <form onSubmit={handleRegister}>
            <div className="mb-5">
              <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                autoComplete="given-name"
                className="h-12 w-full rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                autoComplete="family-name"
                className="h-12 w-full rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block font-lexend text-xs font-medium uppercase text-black">
                Email Address <span className="font-normal normal-case text-[#999999]">(Optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className="h-12 w-full rounded-lg border border-[#E5E5E5] px-4 font-lexend text-sm font-normal text-black outline-none transition-colors focus:border-[#4A2B1F] lg:h-[52px]"
              />
            </div>

            <div className="mb-6">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 cursor-pointer accent-[#4A2B1F]"
                />
                <span className="font-lexend text-sm font-normal text-[#666666]">
                  I agree to the{" "}
                  <a href="/terms" className="text-[#4A2B1F] underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#4A2B1F] underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !termsAccepted}
              className={`h-12 w-full rounded-lg font-lexend-exa text-sm font-normal uppercase text-[#FCF6EB] transition-colors lg:h-14 ${
                isSubmitting || !termsAccepted
                  ? "cursor-not-allowed bg-[#8B7355]"
                  : "cursor-pointer bg-[#4A2B1F]"
              }`}
            >
              {isSubmitting ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-[#E5E5E5]" />
          <span className="px-4 font-lexend text-xs font-normal uppercase text-[#999999]">
            OR
          </span>
          <div className="h-px flex-1 bg-[#E5E5E5]" />
        </div>

        {/* Switch to Email Login */}
        <p className="text-center font-lexend text-sm font-normal text-[#666666]">
          Prefer email login?{" "}
          <Link
            href="/login-email"
            className="font-lexend text-sm font-semibold text-[#4A2B1F] underline"
          >
            Sign in with Email
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
