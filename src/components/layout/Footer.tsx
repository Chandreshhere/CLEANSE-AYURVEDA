"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="mx-auto w-full max-w-[1920px] bg-[#3D2B27] px-8 py-16 md:px-12 md:py-20 lg:px-16 xl:px-20 2xl:px-24">
      {/* Top Section */}
      <div className="mb-16 flex flex-col justify-between gap-10 lg:mb-20 lg:flex-row lg:gap-20">
        {/* Left Column - Brand Info */}
        <div className="max-w-xl flex-1">
          <h2
            style={{
              fontFamily: "Lexend Exa, sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "100%",
              letterSpacing: "0",
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            CLEANSE AYURVEDA
          </h2>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "150%",
              letterSpacing: "0",
              color: "#FFFFFF",
              opacity: 0.8,
            }}
          >
            Merging ancient Indian heritage with modern molecular validation. We provide the 7 core rituals every modern soul requires for systemic harmony.
          </p>
        </div>

        {/* Right Column - Blog Enrollment */}
        <div className="w-full max-w-md lg:w-auto lg:min-w-[350px] xl:min-w-[400px]">
          <h3
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.1em",
              color: "#C9A86C",
              marginBottom: "24px",
            }}
          >
            BLOG ENROLLMENT
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "#FFFFFF",
                opacity: 0.6,
              }}
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
            >
              <path
                d="M5 15L15 5M15 5H8M15 5V12"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0",
              color: "#C9A86C",
            }}
          >
            Enroll for 10% off on your first purchase
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          marginBottom: "40px",
        }}
      />

      {/* Middle Section - Links */}
      <div className="mb-16 flex flex-wrap justify-between gap-8 lg:mb-20 lg:gap-12">
        {/* Categories */}
        <div>
          <h4
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0.1em",
              color: "#C9A86C",
              marginBottom: "24px",
            }}
          >
            CATEGORIES
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["CATEGORY1", "CATEGORY2", "CATEGORY3"].map((item) => (
              <li key={item} style={{ marginBottom: "16px" }}>
                <a
                  href="#"
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0.05em",
                    color: "#FFFFFF",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h4
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0.1em",
              color: "#C9A86C",
              marginBottom: "24px",
            }}
          >
            PAGES
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["ABOUT US", "PAGE 1", "PAGE 2", "PAGE 3"].map((item) => (
              <li key={item} style={{ marginBottom: "16px" }}>
                <a
                  href="#"
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0.05em",
                    color: "#FFFFFF",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Socials */}
        <div style={{ textAlign: "right" }}>
          <h4
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0.1em",
              color: "#C9A86C",
              marginBottom: "24px",
            }}
          >
            SOCIALS
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["INSTAGRAM", "TWITTER", "FACEBOOK", "YOUTUBE"].map((item) => (
              <li key={item} style={{ marginBottom: "16px" }}>
                <a
                  href="#"
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0.05em",
                    color: "#FFFFFF",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          marginBottom: "24px",
        }}
      />

      {/* Bottom Section - Copyright */}
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0.05em",
            color: "#FFFFFF",
            opacity: 0.6,
          }}
        >
          @2026 CLEANSE AYURVEDA . ALL RIGHTS RESERVED
        </p>
        <div className="flex gap-6 lg:gap-10">
          <a
            href="#"
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0.05em",
              color: "#FFFFFF",
              opacity: 0.6,
              textDecoration: "none",
            }}
          >
            TERMS OF SERVICE
          </a>
          <a
            href="#"
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0.05em",
              color: "#FFFFFF",
              opacity: 0.6,
              textDecoration: "none",
            }}
          >
            PRIVACY POLICY
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
