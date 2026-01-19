"use client";

import React, { useState } from "react";
import { TopUtilityBar, MainHeader, Footer } from "@/components/layout";
import { useCart } from "@/context";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("100 ML");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [activeTab, setActiveTab] = useState("our-values");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDetails, setReviewDetails] = useState("");
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const { openCartDrawer } = useCart();

  const handleAddToCart = () => {
    // Add item to cart logic would go here
    openCartDrawer();
  };

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#F5F1EB" }}>
      {/* Header */}
      <TopUtilityBar />
      <MainHeader />

      {/* Product Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "50px",
          paddingRight: "67px",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div style={{ display: "flex", gap: "32px", justifyContent: "flex-start" }}>
          {/* Left Side - Product Images */}
          <div>
            {/* Main Product Image Placeholder */}
            <div
              style={{
                width: "679px",
                height: "820px",
                backgroundColor: "#D9D9D9",
                marginBottom: "31px",
              }}
            />

            {/* Thumbnail Images */}
            <div style={{ display: "flex", gap: "13px", width: "679px" }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "160px",
                    height: "123px",
                    backgroundColor: "#D9D9D9",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div style={{ flex: 1 }}>
            {/* Stock Alert Box */}
            <div
              style={{
                width: "643px",
                height: "60px",
                borderRadius: "13px",
                border: "1px solid #E8D4D4",
                backgroundColor: "#FDF8F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="#C9A86C" strokeWidth="2" />
                <path
                  d="M12 8V12M12 16H12.01"
                  stroke="#C9A86C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#C25050",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                ONLY 3 UNITS REMAINING IN THIS BATCH
              </span>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#C9A86C"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z" />
                  </svg>
                ))}
              </div>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#4A2B1F",
                }}
              >
                4.9 (20 REVIEWS)
              </span>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "48px",
                lineHeight: "110%",
                letterSpacing: "0.05em",
                color: "#4A2B1F",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              VERY LOVELY FACE CREAM
            </h1>

            {/* Price */}
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                color: "#4A2B1F",
                marginBottom: "20px",
              }}
            >
              ₹800
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "160%",
                color: "#4A2B1F",
                opacity: 0.8,
                marginBottom: "32px",
                maxWidth: "500px",
              }}
            >
              Some desctiption about the very lovely face cream. labore tempor ullamco deserunt sint aliquip incididunt duis aliquip velit officia exercitation
            </p>

            {/* Select Size */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "#4A2B1F",
                  opacity: 0.6,
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                SELECT SIZE
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setSelectedSize("100 ML")}
                  style={{
                    padding: "16px 32px",
                    backgroundColor: selectedSize === "100 ML" ? "#D5DCCE" : "transparent",
                    border: "1px solid #D5DCCE",
                    borderRadius: "4px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#4A2B1F",
                    cursor: "pointer",
                  }}
                >
                  100 ML
                </button>
                <button
                  onClick={() => setSelectedSize("100 ML + 30 ML")}
                  style={{
                    padding: "16px 32px",
                    backgroundColor: selectedSize === "100 ML + 30 ML" ? "#D5DCCE" : "transparent",
                    border: "1px solid #D5DCCE",
                    borderRadius: "4px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#4A2B1F",
                    cursor: "pointer",
                  }}
                >
                  100 ML + 30 ML
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div style={{ marginBottom: "16px" }}>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "#4A2B1F",
                  opacity: 0.6,
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                QUANTITY
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                {/* Quantity Selector */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #D5DCCE",
                    borderRadius: "4px",
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: "48px",
                      height: "56px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "20px",
                      color: "#4A2B1F",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      width: "48px",
                      textAlign: "center",
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      color: "#4A2B1F",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: "48px",
                      height: "56px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "20px",
                      color: "#4A2B1F",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  style={{
                    flex: 1,
                    height: "56px",
                    backgroundColor: "#ECCFA0",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "0.1em",
                    color: "#4A2B1F",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              style={{
                width: "100%",
                height: "56px",
                backgroundColor: "#3D2B27",
                border: "none",
                borderRadius: "4px",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.1em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                cursor: "pointer",
                marginBottom: "24px",
              }}
            >
              BUY NOW
            </button>

            {/* Check Delivery */}
            <div
              style={{
                backgroundColor: "#3D2B27",
                padding: "24px 32px",
                marginBottom: "24px",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  color: "#C9A86C",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                CHECK DELIVERY
              </p>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ flex: 1, borderBottom: "1px solid rgba(255, 255, 255, 0.3)" }}>
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 0",
                      border: "none",
                      backgroundColor: "transparent",
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "16px",
                      color: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>
                <button
                  style={{
                    padding: "16px 40px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                    color: "rgba(255, 255, 255, 0.7)",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  CHECK
                </button>
              </div>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#C9A86C",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                EST. DELIVERY: 13TH - 15TH JANUARY 2025
              </p>
            </div>

            {/* Divider Line */}
            <div style={{ borderTop: "1px solid #E5E5E5", marginBottom: "24px" }} />

            {/* Policies */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#C25050",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                    color: "#4A2B1F",
                    textTransform: "uppercase",
                  }}
                >
                  7 DAY RETURN POLICY
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#C9A86C",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                    color: "#4A2B1F",
                    textTransform: "uppercase",
                  }}
                >
                  SHIPS WORLDWIDE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Your Basket Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
          paddingTop: "40px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            width: "1146px",
            height: "552px",
            backgroundColor: "#ECCFA0",
            borderRadius: "24px",
            padding: "48px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {/* Left Side */}
            <div style={{ width: "571px" }}>
              <h2
                style={{
                  fontFamily: "Lexend Exa, sans-serif",
                  fontWeight: 400,
                  fontSize: "36px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#4A2B1F",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                CREATE YOUR BASKET
              </h2>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "22px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#4A2B1F",
                  opacity: 0.6,
                  width: "534px",
                  height: "97px",
                }}
              >
                Select items to bundle and save 15% on your entire bundle.
              </p>
            </div>

            {/* Right Side - Bundle Total */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <p
                style={{
                  fontFamily: "Lexend Exa, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#AB522E",
                  textTransform: "uppercase",
                }}
              >
                BUNDLE TOTAL
              </p>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#4F2C22",
                  opacity: 0.6,
                }}
              >
                ₹1020
              </p>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#4F2C22",
                  opacity: 0.6,
                }}
              >
                15% Savings applied
              </p>
            </div>
          </div>

          {/* Bundle Items */}
          <div style={{ display: "flex", gap: "24px", marginTop: "32px", marginBottom: "32px" }}>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  width: "329px",
                  height: "196px",
                  backgroundColor: "#3D2B27",
                  padding: "20px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Left Side - Text Content */}
                <div>
                  <p
                    style={{
                      width: "240px",
                      fontFamily: "Lexend Exa, sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#FFFFFF",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    DEEP REST MAGNESIUM BALM
                  </p>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#FFFFFF",
                      opacity: 0.6,
                    }}
                  >
                    ₹400
                  </p>
                </div>

                {/* Right Side - Product Image Placeholder */}
                <div
                  style={{
                    width: "152px",
                    height: "114px",
                    backgroundColor: "#FFFFFF",
                    position: "absolute",
                    bottom: "0",
                    right: "20px",
                  }}
                />

                {/* Checkbox */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L4.5 8.5L11 1.5"
                      stroke="#4A2B1F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Add Bundle to Cart Button */}
          <button
            style={{
              width: "100%",
              height: "56px",
              backgroundColor: "#3D2B27",
              border: "none",
              borderRadius: "4px",
              fontFamily: "Lexend Exa, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "100%",
              letterSpacing: "0",
              color: "#FCF6EB",
              textTransform: "uppercase",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            ADD BUNDLE TO CART
          </button>
        </div>
      </div>

      {/* Product Info Tabs Section */}
      <div
        style={{
          width: "1512px",
          height: "607px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#D5DCCE",
            padding: "48px 60px",
          }}
        >
          {/* Tabs Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid #B0B0B0",
              marginBottom: "48px",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "16px 0",
                textAlign: "center",
                border: activeTab === "ingredients" ? "1px solid #FFFFFF" : "none",
                backgroundColor: activeTab === "ingredients" ? "#D5DCCE" : "transparent",
                position: "relative",
                marginBottom: activeTab === "ingredients" ? "-2px" : "0",
                zIndex: activeTab === "ingredients" ? 1 : 0,
              }}
            >
              <span
                onClick={() => setActiveTab("ingredients")}
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  color: "#4A2B1F",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                INGREDIENTS
              </span>
            </div>
            <div
              style={{
                flex: 1,
                padding: "16px 0",
                textAlign: "center",
                border: activeTab === "our-values" ? "1px solid #FFFFFF" : "none",
                backgroundColor: activeTab === "our-values" ? "#D5DCCE" : "transparent",
                position: "relative",
                marginBottom: activeTab === "our-values" ? "-2px" : "0",
                zIndex: activeTab === "our-values" ? 1 : 0,
              }}
            >
              <span
                onClick={() => setActiveTab("our-values")}
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  color: "#4A2B1F",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                OUR VALUES
              </span>
            </div>
            <div
              style={{
                flex: 1,
                padding: "16px 0",
                textAlign: "center",
                border: activeTab === "how-to-use" ? "1px solid #FFFFFF" : "none",
                backgroundColor: activeTab === "how-to-use" ? "#D5DCCE" : "transparent",
                position: "relative",
                marginBottom: activeTab === "how-to-use" ? "-2px" : "0",
                zIndex: activeTab === "how-to-use" ? 1 : 0,
              }}
            >
              <span
                onClick={() => setActiveTab("how-to-use")}
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  color: "#4A2B1F",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                HOW TO USE
              </span>
            </div>
            <div
              style={{
                flex: 1,
                padding: "16px 0",
                textAlign: "center",
                border: activeTab === "shipping" ? "1px solid #FFFFFF" : "none",
                backgroundColor: activeTab === "shipping" ? "#D5DCCE" : "transparent",
                position: "relative",
                marginBottom: activeTab === "shipping" ? "-2px" : "0",
                zIndex: activeTab === "shipping" ? 1 : 0,
              }}
            >
              <span
                onClick={() => setActiveTab("shipping")}
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  color: "#4A2B1F",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                SHIPPING AND RETURNS
              </span>
            </div>
            <div
              style={{
                flex: 1,
                padding: "16px 0",
                textAlign: "center",
                border: activeTab === "policies" ? "1px solid #FFFFFF" : "none",
                backgroundColor: activeTab === "policies" ? "#D5DCCE" : "transparent",
                position: "relative",
                marginBottom: activeTab === "policies" ? "-2px" : "0",
                zIndex: activeTab === "policies" ? 1 : 0,
              }}
            >
              <span
                onClick={() => setActiveTab("policies")}
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  color: "#4A2B1F",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                POLICIES
              </span>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "ingredients" && (
            <div style={{ maxWidth: "800px", marginLeft: "60px" }}>
              <h3
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "#4A2B1F",
                  marginBottom: "24px",
                  textTransform: "uppercase",
                }}
              >
                Key Ingredients
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Aloe Vera Extract", "Shea Butter", "Vitamin E", "Coconut Oil", "Turmeric Extract", "Sandalwood Oil"].map((ingredient) => (
                  <li
                    key={ingredient}
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "200%",
                      color: "#4A2B1F",
                      borderBottom: "1px solid rgba(74, 43, 31, 0.2)",
                      padding: "8px 0",
                    }}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "our-values" && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Left Side - Description */}
              <div style={{ maxWidth: "527px", marginTop: "140px", marginLeft: "60px" }}>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "22px",
                    lineHeight: "100%",
                    letterSpacing: "0",
                    color: "#000000",
                    opacity: 0.7,
                  }}
                >
                  All our products are natural, plant-based and toxic-free. Our formulations help you take care of your body without harming yourself or the environment.
                </p>
              </div>

              {/* Right Side - Values Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "32px",
                  marginTop: "48px",
                  marginRight: "100px",
                }}
              >
                {/* Row 1 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "92px",
                      height: "92px",
                      borderRadius: "50%",
                      border: "2px solid #B0B0B0",
                      marginBottom: "12px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Lexend Exa, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#000000",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    PLANT BASED
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "92px",
                      height: "92px",
                      borderRadius: "50%",
                      border: "2px solid #B0B0B0",
                      marginBottom: "12px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Lexend Exa, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#000000",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    NO ARTIFICIAL COLOR
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "92px",
                      height: "92px",
                      borderRadius: "50%",
                      border: "2px solid #B0B0B0",
                      marginBottom: "12px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Lexend Exa, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#000000",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    PLANT BASED
                  </span>
                </div>

                {/* Row 2 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "92px",
                      height: "92px",
                      borderRadius: "50%",
                      border: "2px solid #B0B0B0",
                      marginBottom: "12px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Lexend Exa, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#000000",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    CRUELTY FREE
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "92px",
                      height: "92px",
                      borderRadius: "50%",
                      border: "2px solid #B0B0B0",
                      marginBottom: "12px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Lexend Exa, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#000000",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    NO SYNTHETIC CHEMICALS
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "92px",
                      height: "92px",
                      borderRadius: "50%",
                      border: "2px solid #B0B0B0",
                      marginBottom: "12px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Lexend Exa, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                      color: "#000000",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    100% AYURVEDIC
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "how-to-use" && (
            <div style={{ maxWidth: "800px", marginLeft: "60px" }}>
              <h3
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "#4A2B1F",
                  marginBottom: "24px",
                  textTransform: "uppercase",
                }}
              >
                How To Use
              </h3>
              <ol style={{ paddingLeft: "20px" }}>
                {[
                  "Cleanse your face thoroughly and pat dry.",
                  "Take a small amount of cream on your fingertips.",
                  "Apply gently on face and neck in upward circular motions.",
                  "Use twice daily - morning and night for best results.",
                  "For external use only. Avoid contact with eyes.",
                ].map((step, index) => (
                  <li
                    key={index}
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "200%",
                      color: "#4A2B1F",
                      marginBottom: "12px",
                    }}
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "shipping" && (
            <div style={{ display: "flex", gap: "120px", paddingLeft: "60px", paddingRight: "60px", paddingTop: "40px" }}>
              {/* Shipping Column */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                  {/* Truck Icon */}
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="10" width="24" height="18" rx="2" stroke="#4A2B1F" strokeWidth="2" />
                    <path d="M26 16H32L38 22V28H26V16Z" stroke="#4A2B1F" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="10" cy="30" r="4" stroke="#4A2B1F" strokeWidth="2" />
                    <circle cx="32" cy="30" r="4" stroke="#4A2B1F" strokeWidth="2" />
                  </svg>
                  <h3
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      letterSpacing: "0.1em",
                      color: "#4A2B1F",
                      textTransform: "uppercase",
                    }}
                  >
                    SHIPPING
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "160%",
                    color: "#4A2B1F",
                    maxWidth: "450px",
                  }}
                >
                  Complementary carbon-neutral shipping on all orders over ₹700. Orders are processed within 24-48 hours and typically arrive within 3-5 business days.
                </p>
              </div>

              {/* Returns Column */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                  {/* Return Icon */}
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20"
                      stroke="#4A2B1F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M32 20C32 26.627 26.627 32 20 32C13.373 32 8 26.627 8 20"
                      stroke="#4A2B1F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 14V20H14"
                      stroke="#4A2B1F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      letterSpacing: "0.1em",
                      color: "#4A2B1F",
                      textTransform: "uppercase",
                    }}
                  >
                    RETURNS
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "160%",
                    color: "#4A2B1F",
                    maxWidth: "450px",
                  }}
                >
                  Due to the artisanal nature of our formulations, we accept returns on unopened products within 7 days of delivery. Sample sizes are final sale.
                </p>
              </div>
            </div>
          )}

          {activeTab === "policies" && (
            <div style={{ maxWidth: "800px", marginLeft: "60px" }}>
              <h3
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "#4A2B1F",
                  marginBottom: "24px",
                  textTransform: "uppercase",
                }}
              >
                Our Policies
              </h3>
              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#4A2B1F",
                    marginBottom: "8px",
                  }}
                >
                  Privacy Policy
                </h4>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "160%",
                    color: "#4A2B1F",
                  }}
                >
                  We respect your privacy and are committed to protecting your personal data. Your information is never shared with third parties without your consent.
                </p>
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#4A2B1F",
                    marginBottom: "8px",
                  }}
                >
                  Terms of Service
                </h4>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "160%",
                    color: "#4A2B1F",
                  }}
                >
                  By using our website and purchasing our products, you agree to our terms of service. All products are subject to availability.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Client Reviews Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
          paddingTop: "80px",
          paddingBottom: "80px",
          backgroundColor: "#F5F1EB",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Side - Rating Summary */}
          <div>
            <h2
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "32px",
                letterSpacing: "0.05em",
                color: "#000000",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              CLIENT REVIEWS
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "48px",
                  color: "#000000",
                }}
              >
                4.9
              </span>
              <div>
                <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z" />
                    </svg>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#000000",
                    textTransform: "uppercase",
                  }}
                >
                  BASED ON 20 REVIEWS
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              style={{
                width: "280px",
                height: "48px",
                backgroundColor: "transparent",
                border: "1px solid #000000",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                letterSpacing: "0.05em",
                color: "#000000",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              WRITE A REVIEW
            </button>
          </div>

          {/* Right Side - Reviews List */}
          <div style={{ maxWidth: "600px" }}>
            {/* Review 1 */}
            <div style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "32px", marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z" />
                    </svg>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#000000",
                  }}
                >
                  NOV 12, 2025
                </span>
              </div>
              <h4
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  letterSpacing: "0.05em",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                LIFE CHANGING CLARITY
              </h4>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "160%",
                  color: "#000000",
                  marginBottom: "16px",
                }}
              >
                "I've tried many adaptogens, but the purity of Cleanse's is evident. The anxiety reduction was noticeable within the first week. Highly recommend the product.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#000000",
                    textTransform: "uppercase",
                  }}
                >
                  VERIFIED USER - AKSHAT JAIN
                </span>
              </div>
            </div>

            {/* Review 2 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z" />
                    </svg>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#000000",
                  }}
                >
                  NOV 12, 2025
                </span>
              </div>
              <h4
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  letterSpacing: "0.05em",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                LIFE CHANGING CLARITY
              </h4>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "160%",
                  color: "#000000",
                  marginBottom: "16px",
                }}
              >
                "I've tried many adaptogens, but the purity of Cleanse's is evident. The anxiety reduction was noticeable within the first week. Highly recommend the product.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#000000",
                    textTransform: "uppercase",
                  }}
                >
                  VERIFIED USER - AKSHAT JAIN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
          paddingTop: "60px",
          paddingBottom: "100px",
          backgroundColor: "#F5F1EB",
        }}
      >
        <h2
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "32px",
            letterSpacing: "0.1em",
            color: "#000000",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          RECOMMENDED FOR YOU
        </h2>

        {/* Product Cards Grid */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={{ display: "flex", flexDirection: "column" }}>
              {/* Product Image */}
              <div
                style={{
                  width: "329px",
                  height: "367px",
                  backgroundColor: "#D9D9D9",
                  borderRadius: "13px",
                  marginBottom: "16px",
                }}
              />
              {/* Product Name */}
              <h3
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#000000",
                  marginBottom: "4px",
                }}
              >
                Product {item}
              </h3>
              {/* Product Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#000000",
                  marginBottom: "12px",
                }}
              >
                Description of the product
              </p>
              {/* Price and Quick Add */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "#000000",
                  }}
                >
                  ₹400
                </span>
                <button
                  style={{
                    flex: 1,
                    height: "40px",
                    backgroundColor: "#D9D9D9",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#000000",
                    cursor: "pointer",
                  }}
                  onClick={handleAddToCart}
                >
                  Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with rounded top */}
      <div
        style={{
          width: "1512px",
          maxWidth: "100%",
          margin: "0 auto",
          borderTopLeftRadius: "80px",
          borderTopRightRadius: "80px",
          overflow: "hidden",
        }}
      >
        <Footer />
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setShowReviewModal(false)}
        >
          <div
            style={{
              width: "600px",
              backgroundColor: "#FFFFFF",
              padding: "48px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowReviewModal(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Modal Title */}
            <h2
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                letterSpacing: "0.1em",
                color: "#000000",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              SHARE YOUR REVIEW
            </h2>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                letterSpacing: "0.05em",
                color: "#666666",
                textTransform: "uppercase",
                marginBottom: "32px",
              }}
            >
              YOUR FEEDBACK HELPS THE COMMUNITY GROW.
            </p>

            {/* Overall Rating */}
            <div style={{ marginBottom: "32px" }}>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                OVERALL RATING
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill={reviewRating >= star ? "#C9A86C" : "none"}
                      stroke={reviewRating >= star ? "#C9A86C" : "#CCCCCC"}
                      strokeWidth="1.5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Name and Email Row */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    color: "#000000",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  YOUR NAME
                </p>
                <input
                  type="text"
                  placeholder="e.g. Elena R"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "1px solid #E5E5E5",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    color: "#000000",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    color: "#000000",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  EMAIL ADDRESS
                </p>
                <input
                  type="email"
                  placeholder="Only for verification purposes"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "1px solid #E5E5E5",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    color: "#000000",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Review Title */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                REVIEW TITLE
              </p>
              <input
                type="text"
                placeholder="Summarize your experience in one line"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "1px solid #E5E5E5",
                  fontFamily: "Lexend, sans-serif",
                  fontSize: "14px",
                  color: "#000000",
                  outline: "none",
                }}
              />
            </div>

            {/* Review Details */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                REVIEW DETAILS
              </p>
              <textarea
                placeholder="How did you feel after using our product"
                value={reviewDetails}
                onChange={(e) => setReviewDetails(e.target.value)}
                style={{
                  width: "100%",
                  height: "120px",
                  padding: "16px",
                  border: "1px solid #E5E5E5",
                  fontFamily: "Lexend, sans-serif",
                  fontSize: "14px",
                  color: "#000000",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>

            {/* Confirmation Checkbox */}
            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={() => setReviewConfirmed(!reviewConfirmed)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: reviewConfirmed ? "none" : "2px solid #CCCCCC",
                    backgroundColor: reviewConfirmed ? "#C9A86C" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {reviewConfirmed && (
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L4.5 8.5L11 1.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                    color: "#666666",
                    textTransform: "uppercase",
                  }}
                >
                  I CONFIRM THIS IS A GENUINE EXPERIENCE.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              style={{
                width: "100%",
                height: "56px",
                backgroundColor: "#D9D9D9",
                border: "none",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.1em",
                color: "#000000",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              onClick={() => {
                // Handle submit logic here
                setShowReviewModal(false);
                // Reset form
                setReviewRating(0);
                setReviewName("");
                setReviewEmail("");
                setReviewTitle("");
                setReviewDetails("");
                setReviewConfirmed(false);
              }}
            >
              POST REVIEW
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
