"use client";

import React from "react";
import { ChevronDownIcon } from "@/components/ui";

export const TopUtilityBar: React.FC = () => {
  return (
    <div className="bg-dark-brown w-full">
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
        }}
      >
        <div className="flex h-10 items-center justify-between">
          {/* Left Section - Language & Currency */}
          <div className="hidden items-center md:flex" style={{ gap: "40px", flex: 1 }}>
            <button
              className="flex items-center gap-1"
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#F5EDE0",
                textTransform: "uppercase",
              }}
            >
              EN
              <ChevronDownIcon size={12} className="text-cream/90" />
            </button>
            <button
              className="flex items-center gap-1"
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#F5EDE0",
                textTransform: "uppercase",
              }}
            >
              RUPEES
              <ChevronDownIcon size={12} className="text-cream/90" />
            </button>
          </div>

          {/* Center Section - Shipping Message */}
          <div className="text-center" style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#F5EDE0",
                textTransform: "uppercase",
              }}
            >
              FREE SHIPPING ON ORDERS ABOVE ₹1200
            </p>
          </div>

          {/* Right Section - Trust Badge */}
          <div className="hidden md:block" style={{ flex: 1, textAlign: "right" }}>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#F5EDE0",
                textTransform: "uppercase",
              }}
            >
              AYURVEDIC AND DOCTOR APPROVED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityBar;
