import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: "1512px",
        maxWidth: "100%",
        height: "727px",
        margin: "0 auto",
        backgroundColor: "#3D2B27",
        paddingTop: "80px",
        paddingBottom: "40px",
        paddingLeft: "67px",
        paddingRight: "67px",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "80px",
        }}
      >
        {/* Left Column - Brand Info */}
        <div style={{ maxWidth: "520px" }}>
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
        <div style={{ width: "400px" }}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "80px",
        }}
      >
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
        <div style={{ marginLeft: "120px" }}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        <div style={{ display: "flex", gap: "40px" }}>
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
