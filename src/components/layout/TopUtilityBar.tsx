"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/ui";
import { getBanners, type Banner } from "@/lib/api";

export const TopUtilityBar: React.FC = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setIsLoading(true);
        console.log('[TopUtilityBar] Fetching top_strip banner from API...');

        const response = await getBanners('top_strip');

        if (response.data && response.data.length > 0) {
          setBanner(response.data[0]);
          console.log('[TopUtilityBar] ✅ Successfully fetched banner:', {
            id: response.data[0]._id,
            title: response.data[0].title,
            placement: response.data[0].placement,
          });
        } else {
          console.warn('[TopUtilityBar] ⚠️ No banners found in response');
        }
      } catch (error) {
        console.error('[TopUtilityBar] ❌ Failed to fetch top strip banner:', error);
      } finally {
        setIsLoading(false);
        console.log('[TopUtilityBar] Loading complete');
      }
    };

    fetchBanner();
  }, []);

  // Fallback message if no banner is loaded
  const defaultMessage = "FREE SHIPPING ON ORDERS ABOVE ₹1200";

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

          {/* Center Section - Banner Message */}
          <div className="text-center" style={{ flex: 1 }}>
            {isLoading ? (
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
                {defaultMessage}
              </p>
            ) : banner?.cta_url ? (
              <Link
                href={banner.cta_url}
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#F5EDE0",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {banner.title || defaultMessage}
                {banner.cta_text && ` - ${banner.cta_text}`}
              </Link>
            ) : (
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
                {banner?.title || defaultMessage}
              </p>
            )}
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
