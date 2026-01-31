"use client";

import React, { useEffect, useState } from "react";
import { getReels } from "@/lib/api/cms";

const InstagramIcon: React.FC = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="26" height="26" rx="6" stroke="black" strokeWidth="2" />
    <circle cx="15" cy="15" r="6" stroke="black" strokeWidth="2" />
    <circle cx="22.5" cy="7.5" r="1.5" fill="black" />
  </svg>
);

interface ImageBoxProps {
  image: string;
  alt: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ image, alt }) => (
  <div
    style={{
      width: "208px",
      height: "208px",
      position: "relative",
    }}
  >
    {/* Dashed line on top */}
    <div
      style={{
        width: "174px",
        height: "0px",
        borderTop: "2px dashed #FFFFFF",
        position: "absolute",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
      }}
    />
    <img
      src={image}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export const InstagramSection: React.FC = () => {
  const [reels, setReels] = useState<Array<{ src: string; alt: string; videoUrl: string }>>([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await getReels(5);

        if (response.data && response.data.length > 0) {
          const reelsData = response.data.map((reel) => ({
            src: reel.thumbnail_url,
            alt: reel.title,
            videoUrl: reel.video_url,
          }));

          setReels(reelsData);
        }
      } catch (err) {
        console.error('Error fetching reels:', err);
      }
    };

    fetchReels();
  }, []);

  // Always render section to avoid hydration mismatch
  return (
    <section
      className="bg-off-white"
      style={{
        width: "100%",
        paddingTop: "0px",
        paddingBottom: "0px",
      }}
    >
      {/* Green Background Container */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#D5DCCE",
          display: "flex",
          justifyContent: "center",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
      {/* Center Container */}
      <div
        style={{
          width: "1512px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Instagram Handle */}
        <div
          style={{
            width: "242px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <InstagramIcon />
          <span
            style={{
              width: "204px",
              height: "20px",
              fontFamily: "Lexend Exa, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.05em",
              color: "#000000",
            }}
          >
            @CleanseAyurveda
          </span>
        </div>

        {/* Clean Living Title */}
        <h2
          style={{
            width: "678px",
            height: "45px",
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "100%",
            letterSpacing: "0",
            textAlign: "center",
            textTransform: "uppercase",
            color: "#000000",
            marginBottom: "40px",
          }}
        >
          CLEAN LIVING
        </h2>

        {/* Image Grid */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {reels.length > 0 ? (
            reels.map((reel, index) => (
              <ImageBox key={index} image={reel.src} alt={reel.alt} />
            ))
          ) : (
            // Loading skeleton
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{
                    width: "208px",
                    height: "208px",
                    backgroundColor: "#B8C5B4",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default InstagramSection;
