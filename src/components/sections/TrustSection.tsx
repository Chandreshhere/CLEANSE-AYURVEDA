"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getHomepageSections, type HomepageSection, type HomepageFeature } from "@/lib/api";

interface TrustFeatureProps {
  feature: HomepageFeature;
  textColor?: string;
}

const TrustFeature: React.FC<TrustFeatureProps> = ({ feature, textColor = "#000000" }) => (
  <div
    className="flex flex-col items-center"
    style={{
      width: "253px",
      height: "225px",
      gap: "36px",
    }}
  >
    {/* Icon */}
    <div
      className="flex items-center justify-center overflow-hidden bg-light-grey"
      style={{
        width: "177px",
        height: "140px",
        borderRadius: "22px",
      }}
    >
      {feature.icon_url ? (
        <img
          src={feature.icon_url}
          alt={feature.heading}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <div className="bg-light-grey w-full h-full" />
      )}
    </div>
    {/* Label */}
    <span
      style={{
        width: "213px",
        height: "50px",
        fontFamily: "Lexend, sans-serif",
        fontWeight: 700,
        fontSize: "24px",
        lineHeight: "100%",
        letterSpacing: "0",
        textAlign: "center",
        color: textColor,
      }}
    >
      {feature.heading}
    </span>
  </div>
);

export const TrustSection: React.FC = () => {
  const [sectionData, setSectionData] = useState<HomepageSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrustSection = async () => {
      try {
        setIsLoading(true);
        console.log('[TrustSection] Fetching features_grid section from API...');

        const response = await getHomepageSections('features_grid');

        if (response.data?.sections && response.data.sections.length > 0) {
          setSectionData(response.data.sections[0]);
          console.log('[TrustSection] ✅ Successfully fetched features section:', {
            id: response.data.sections[0]._id,
            name: response.data.sections[0].name,
            featuresCount: response.data.sections[0].features?.length || 0,
          });
        } else {
          console.warn('[TrustSection] ⚠️ No features_grid sections found in response');
        }
      } catch (error) {
        console.error('[TrustSection] ❌ Failed to fetch features section:', error);
      } finally {
        setIsLoading(false);
        console.log('[TrustSection] Loading complete');
      }
    };

    fetchTrustSection();
  }, []);

  // Fallback features
  const defaultFeatures: HomepageFeature[] = [
    { heading: "Zero Synthetics", description: "100% Natural Ingredients" },
    { heading: "Doctor Formulated", description: "Clinically Approved" },
    { heading: "Sustainably Sourced", description: "Eco-Friendly" },
  ];

  const features = sectionData?.features || defaultFeatures;
  const backgroundColor = sectionData?.background_color || "#F5F1EB";
  const textColor = sectionData?.text_color || "#000000";

  return (
    <section className="w-full" style={{ backgroundColor }}>
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
        {/* Optional Heading */}
        {sectionData?.heading && (
          <div className="mb-12 text-center">
            <h2
              style={{
                fontFamily: "Lexend, sans-serif",
                fontSize: "48px",
                fontWeight: 600,
                lineHeight: "100%",
                color: textColor,
              }}
            >
              {sectionData.heading}
            </h2>
            {sectionData.subheading && (
              <p
                className="mt-4"
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontSize: "20px",
                  fontWeight: 400,
                  color: textColor,
                }}
              >
                {sectionData.subheading}
              </p>
            )}
          </div>
        )}

        {/* Top Row - Quote + Trust Badges */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
          {/* Left - Quote Card */}
          <div
            className="relative flex flex-col items-center justify-center bg-muted-beige"
            style={{
              width: "399px",
              height: "261px",
              borderRadius: "22px",
            }}
          >
            {/* Quote Icon */}
            <div
              className="absolute text-black"
              style={{
                width: "58px",
                height: "90px",
                top: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "Lexend, sans-serif",
                fontSize: "128px",
                fontWeight: 400,
                lineHeight: "50%",
                letterSpacing: "0",
                textAlign: "center",
              }}
            >
              &ldquo;
            </div>
            {/* Quote Text */}
            <p
              className="text-center text-black"
              style={{
                width: "352px",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "0",
                marginTop: "60px",
              }}
            >
              We aren&apos;t merely selling bottles; we are delivering a
              clinically-backed path to purity.&rdquo;
            </p>
          </div>

          {/* Right - Trust Features */}
          <div
            className="flex items-center justify-center"
            style={{
              width: "879px",
              height: "225px",
              gap: "60px",
            }}
          >
            {features.slice(0, 3).map((feature, index) => (
              <TrustFeature
                key={`feature-${index}`}
                feature={feature}
                textColor={textColor}
              />
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <div
            className="border-t"
            style={{
              width: "1372px",
              borderWidth: "1px",
              borderColor: textColor,
              marginLeft: "-40px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
