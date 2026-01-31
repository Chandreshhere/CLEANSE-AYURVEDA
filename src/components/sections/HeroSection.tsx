"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBanners, type Banner } from "@/lib/api";

export const HeroSection: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        console.log('[HeroSection] Fetching hero banners from API...');

        const response = await getBanners('hero', 'home');

        if (response.data && response.data.length > 0) {
          setBanners(response.data);
          console.log('[HeroSection] ✅ Successfully fetched hero banners:', {
            count: response.data.length,
            banners: response.data.map(b => ({
              id: b._id,
              title: b.title,
              hasImages: !!(b.image_desktop_url || b.image_mobile_url),
            })),
          });
        }
      } catch (error) {
        console.error('[HeroSection] ❌ Failed to fetch hero banners:', error);
      }
    };

    fetchHeroBanners();
  }, []);

  // Always render section to avoid hydration mismatch
  const activeBanner = banners.length > 0 ? banners[0] : null;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "982px", backgroundColor: "#FCF6EB" }}>
      {activeBanner ? (
        <>
          {/* Background Image */}
          <div
            className="absolute left-0 w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${activeBanner.image_desktop_url}')`,
              width: "100%",
              height: "1103px",
              top: "-152px",
            }}
          />

          {/* Mobile Background Image (if different) */}
          {activeBanner.image_mobile_url && (
            <div
              className="absolute left-0 w-full bg-cover bg-center bg-no-repeat lg:hidden"
              style={{
                backgroundImage: `url('${activeBanner.image_mobile_url}')`,
                width: "100%",
                height: "1103px",
                top: "-152px",
              }}
            />
          )}

          {/* Content Overlay */}
          <div className="relative z-10 mx-auto flex h-full max-w-[1920px] flex-col items-center justify-center px-4 min-[480px]:px-6 sm:px-10 md:px-12 lg:flex-row lg:items-center lg:justify-end lg:px-20 xl:px-32">
            {/* Text Content - Right Side on Desktop, Stacked on Mobile */}
            <div className="flex w-full flex-col items-center text-center lg:items-end lg:text-right">
              {/* Main Heading */}
              <h1
                className="whitespace-nowrap text-4xl font-semibold text-white sm:text-5xl lg:text-[60px]"
                style={{
                  fontFamily: "Lexend, sans-serif",
                  lineHeight: "100%",
                  letterSpacing: "-0.05em",
                }}
              >
                {activeBanner.title}
              </h1>

              {/* Subheading */}
              {activeBanner.subtitle && (
                <p
                  className="mt-4 text-lg font-medium text-white sm:text-xl lg:mt-4 lg:text-[24px]"
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    lineHeight: "100%",
                    letterSpacing: "0",
                  }}
                >
                  {activeBanner.subtitle}
                </p>
              )}

              {/* CTA Button */}
              <div className="mt-8 lg:mt-10">
                <Link
                  href={activeBanner.cta_url}
                  className="inline-flex items-center justify-center bg-white text-dark-brown transition-opacity hover:opacity-90"
                  style={{
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    paddingLeft: "46px",
                    paddingRight: "46px",
                    minWidth: "293px",
                    height: "65px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {activeBanner.cta_text}
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Loading skeleton - maintains same height to avoid layout shift
        <div className="relative z-10 mx-auto flex h-full max-w-[1920px] items-center justify-center">
          <div className="h-16 w-64 animate-pulse rounded bg-white/20" />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
