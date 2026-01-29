"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTestimonials, getBanners, getHomepageSections } from "@/lib/api/cms";

interface TestimonialCardProps {
  name: string;
  review: string;
  bgColor: string;
  rating: number;
  customerPhoto: string | null;
  beforePhoto: string | null;
  afterPhoto: string | null;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  review,
  bgColor,
  rating,
  customerPhoto,
  beforePhoto,
  afterPhoto
}) => (
  <div
    style={{
      width: "440px",
      minHeight: "430px",
      backgroundColor: bgColor,
      borderRadius: "20px",
      padding: "36px",
      flexShrink: 0,
    }}
  >
    {/* Avatar and Name Row */}
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
      {/* Avatar Circle */}
      <div
        style={{
          width: "89px",
          height: "89px",
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {customerPhoto && (
          <img
            src={customerPhoto}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
      <div>
        {/* Name */}
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0",
            color: "#000000",
            marginBottom: "8px",
          }}
        >
          {name}
        </p>
        {/* Rating Stars */}
        <div style={{ display: "flex", gap: "4px" }}>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill={i < rating ? "#FFD700" : "#CCCCCC"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" />
            </svg>
          ))}
        </div>
      </div>
    </div>

    {/* Review Text */}
    <p
      style={{
        fontFamily: "Lexend, sans-serif",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "140%",
        letterSpacing: "0",
        color: "#000000",
        opacity: 0.8,
        marginBottom: "20px",
      }}
    >
      {review}
    </p>

    {/* Before/After Photos */}
    {(beforePhoto || afterPhoto) && (
      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        {beforePhoto && (
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                marginBottom: "8px",
                color: "#000000",
              }}
            >
              BEFORE
            </p>
            <img
              src={beforePhoto}
              alt="Before"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        )}
        {afterPhoto && (
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                marginBottom: "8px",
                color: "#000000",
              }}
            >
              AFTER
            </p>
            <img
              src={afterPhoto}
              alt="After"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        )}
      </div>
    )}
  </div>
);

const ArrowButton: React.FC<{ direction: "left" | "right"; onClick: () => void }> = ({
  direction,
  onClick,
}) => (
  <button
    onClick={onClick}
    style={{
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      backgroundColor: direction === "left" ? "#4A2B1F" : "#FFFFFF",
      border: direction === "right" ? "2px solid #4A2B1F" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    <svg
      width="32"
      height="12"
      viewBox="0 0 46 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "right" ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM46 7H1V9H46V7Z"
        fill={direction === "left" ? "#FFFFFF" : "#4A2B1F"}
      />
    </svg>
  </button>
);

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<
    Array<{
      name: string;
      review: string;
      bgColor: string;
      rating: number;
      customerPhoto: string | null;
      beforePhoto: string | null;
      afterPhoto: string | null;
    }>
  >([]);
  const [banner, setBanner] = useState<{
    title: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
    imageUrl: string;
  } | null>(null);
  const [featuresSection, setFeaturesSection] = useState<{
    heading: string;
    subheading: string;
    backgroundColor: string;
    textColor: string;
    features: Array<{ icon: string; heading: string; description: string }>;
  } | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials(10);

        if (response.data && response.data.length > 0) {
          const testimonialsData = response.data.map((testimonial, index) => ({
            name: testimonial.customer_name,
            review: testimonial.testimonial_text,
            bgColor: index % 2 === 0 ? "#F5EDE0" : "#D5DCCE",
            rating: testimonial.rating,
            customerPhoto: testimonial.customer_photo_url,
            beforePhoto: testimonial.before_photo_url,
            afterPhoto: testimonial.after_photo_url,
          }));

          setTestimonials(testimonialsData);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await getBanners('mid_page');

        if (response.data && response.data.length > 0) {
          const bannerData = response.data[0];
          setBanner({
            title: bannerData.title || "Ancient Secrets, Modern Radiance",
            subtitle: bannerData.subtitle || "Infused with Turmeric and Rose Petals.",
            ctaText: bannerData.cta_text || "SHOP NOW",
            ctaUrl: bannerData.cta_url || "/collections/spring-2026",
            imageUrl: bannerData.image_desktop_url || "/product.png",
          });
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    const fetchFeaturesSection = async () => {
      try {
        const response = await getHomepageSections('features_grid', true);

        if (response.data?.sections && response.data.sections.length > 0) {
          const section = response.data.sections[0];
          setFeaturesSection({
            heading: section.heading || '',
            subheading: section.subheading || '',
            backgroundColor: section.background_color || '#C4C4C4',
            textColor: section.text_color || '#000000',
            features: (section.features || []).map((feature) => ({
              icon: feature.icon_url || '',
              heading: feature.heading,
              description: feature.description,
            })),
          });
        }
      } catch (err) {
        console.error('Error fetching features section:', err);
      }
    };

    fetchFeaturesSection();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 3 ? prev + 1 : 0));
  };

  if (testimonials.length === 0 && !banner && !featuresSection) {
    return null;
  }

  return (
    <section className="w-full bg-off-white" style={{ overflow: "hidden" }}>
      <div
        style={{
          paddingTop: "64px",
          paddingLeft: "67px",
          paddingRight: "67px",
          paddingBottom: "0",
        }}
      >
        {/* Testimonials Container - 1445x630 */}
        {testimonials.length > 0 && (
          <div
            style={{
              width: "1445px",
              height: "630px",
              opacity: 1,
            }}
          >
            {/* Header Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "60px",
              }}
            >
              {/* Title */}
              <h2
                style={{
                  width: "678px",
                  height: "106px",
                  fontFamily: "Lexend Exa, sans-serif",
                  fontWeight: 400,
                  fontSize: "42px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textTransform: "uppercase",
                  color: "#000000",
                }}
              >
                LISTEN TO WHAT OUR
                <br />
                CLIENTS SAY ABOUT US?
              </h2>

              {/* Arrow Buttons */}
              <div style={{ display: "flex", gap: "16px", marginRight: "150px", marginTop: "20px" }}>
                <ArrowButton direction="left" onClick={handlePrev} />
                <ArrowButton direction="right" onClick={handleNext} />
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  transform: `translateX(-${currentIndex * (440 + 24)}px)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    review={testimonial.review}
                    bgColor={testimonial.bgColor}
                    rating={testimonial.rating}
                    customerPhoto={testimonial.customerPhoto}
                    beforePhoto={testimonial.beforePhoto}
                    afterPhoto={testimonial.afterPhoto}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ancient Secrets Banner */}
        {banner && (
          <div
            style={{
              width: "100%",
              maxWidth: "1378px",
              height: "463px",
              borderRadius: "20px",
              background: "linear-gradient(90deg, #6F4B46 0%, #442824 100%)",
              position: "relative",
              overflow: "visible",
              marginTop: "150px",
            }}
          >
            {/* Product Image */}
            <img
              src={banner.imageUrl}
              alt="Cleanse Ayurveda Products"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                left: "0",
                bottom: "0",
                borderRadius: "20px",
              }}
            />

            {/* Text Content */}
            <div
              style={{
                position: "absolute",
                right: "100px",
                top: "50%",
                transform: "translateY(-50%)",
                textAlign: "right",
              }}
            >
              {/* Title */}
              <h3
                style={{
                  width: "549px",
                  height: "134px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "48px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "right",
                  color: "#FFFFFF",
                  marginBottom: "20px",
                }}
              >
                {banner.title.split(',').map((line, index) => (
                  <React.Fragment key={index}>
                    {line.trim()}
                    {index < banner.title.split(',').length - 1 && ','}
                    {index < banner.title.split(',').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>

              {/* Subtitle */}
              <p
                style={{
                  width: "459px",
                  height: "30px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "right",
                  color: "#FFFFFF",
                  marginBottom: "40px",
                  marginLeft: "auto",
                }}
              >
                {banner.subtitle}
              </p>

              {/* CTA Button */}
              <Link href={banner.ctaUrl}>
                <button
                  style={{
                    width: "182px",
                    height: "50px",
                    borderRadius: "35px",
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    paddingTop: "10px",
                    paddingRight: "23px",
                    paddingBottom: "10px",
                    paddingLeft: "23px",
                    cursor: "pointer",
                    marginLeft: "auto",
                    display: "block",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      textAlign: "right",
                      color: "#000000",
                    }}
                  >
                    {banner.ctaText}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Features/Badges Section */}
        {featuresSection && (
          <div
            style={{
              width: "1512px",
              height: "460px",
              backgroundColor: "#C4C4C4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "200px",
              marginLeft: "-67px",
            }}
          >
            {/* Badges Container */}
            <div
              style={{
                width: "1265px",
                height: "298px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "50px",
              }}
            >
              {featuresSection.features.map((feature, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "140px",
                      height: "140px",
                      borderRadius: "22px",
                      backgroundColor: "#D9D9D9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {feature.icon && (
                      <img
                        src={feature.icon}
                        alt={feature.heading}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      width: "140px",
                      height: "50px",
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      textAlign: "center",
                      color: featuresSection.textColor,
                      marginTop: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {feature.heading}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
