"use client";

import React, { useState } from "react";

interface TestimonialCardProps {
  name: string;
  review: string;
  bgColor: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, review, bgColor }) => (
  <div
    style={{
      width: "440px",
      height: "430px",
      backgroundColor: bgColor,
      borderRadius: "20px",
      padding: "36px",
      flexShrink: 0,
    }}
  >
    {/* Avatar and Name Row */}
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
      {/* Avatar Circle */}
      <div
        style={{
          width: "89px",
          height: "89px",
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
        }}
      />
      <div>
        {/* Name */}
        <p
          style={{
            width: "192px",
            height: "30px",
            fontFamily: "Lexend, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0",
            color: "#000000",
            marginBottom: "8px",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </p>
        {/* Rectangle below name */}
        <div
          style={{
            width: "143px",
            height: "18px",
            backgroundColor: "#FFFFFF",
          }}
        />
      </div>
    </div>

    {/* Review Text */}
    <p
      style={{
        width: "352px",
        height: "213px",
        fontFamily: "Lexend, sans-serif",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "100%",
        letterSpacing: "0",
        color: "#000000",
        opacity: 0.8,
      }}
    >
      {review}
    </p>
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

  const testimonials = [
    {
      name: "Akshat Jain",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#F5EDE0",
    },
    {
      name: "Bhavya Kothari",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#D5DCCE",
    },
    {
      name: "Attharv Shrivastav",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#F5EDE0",
    },
    {
      name: "Priya Sharma",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#D5DCCE",
    },
    {
      name: "Rahul Verma",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#F5EDE0",
    },
    {
      name: "Ananya Gupta",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#D5DCCE",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 3 ? prev + 1 : 0));
  };

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
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ancient Secrets Banner */}
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
            src="/product.png"
            alt="Cleanse Ayurveda Products"
            style={{
              width: "1200px",
              height: "1000px",
              objectFit: "contain",
              position: "absolute",
              left: "-200px",
              bottom: "-240px",
              transform: "rotate(5deg)",
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
            {/* Ancient Secrets Title */}
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
              Ancient Secrets,
              <br />
              Modern Radiance
            </h3>

            {/* Infused Text */}
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
              Infused with Turmeric and Rose Petals.
            </p>

            {/* Shop Now Button */}
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
                SHOP NOW
              </span>
            </button>
          </div>
        </div>

        {/* Features/Badges Section */}
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
              gap: "137px",
            }}
          >
            {/* Badge 1 - Express Shipping */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "213px",
                  height: "213px",
                  borderRadius: "22px",
                  backgroundColor: "#D9D9D9",
                }}
              />
              <p
                style={{
                  width: "213px",
                  height: "50px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "center",
                  color: "#000000",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Express Shipping
              </p>
            </div>

            {/* Badge 2 - Cruelty Free */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "213px",
                  height: "213px",
                  borderRadius: "22px",
                  backgroundColor: "#D9D9D9",
                }}
              />
              <p
                style={{
                  width: "213px",
                  height: "50px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "center",
                  color: "#000000",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Cruelty Free
              </p>
            </div>

            {/* Badge 3 - 100% Ayurvedic */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "213px",
                  height: "213px",
                  borderRadius: "22px",
                  backgroundColor: "#D9D9D9",
                }}
              />
              <p
                style={{
                  width: "213px",
                  height: "50px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "center",
                  color: "#000000",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                100% Ayurvedic
              </p>
            </div>

            {/* Badge 4 - Made In India */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "213px",
                  height: "213px",
                  borderRadius: "22px",
                  backgroundColor: "#D9D9D9",
                }}
              />
              <p
                style={{
                  width: "213px",
                  height: "50px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "center",
                  color: "#000000",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Made In India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
