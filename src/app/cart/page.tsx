"use client";

import React, { useState, useEffect } from "react";
import { TopUtilityBar, MainHeader, Footer } from "@/components/layout";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ minutes: 7, seconds: 45 });
  const [selectedShipping, setSelectedShipping] = useState("free");
  const [couponCode, setCouponCode] = useState("");

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return `${timeLeft.minutes}:${timeLeft.seconds.toString().padStart(2, "0")}`;
  };

  const price = 400;
  const subtotal = price * quantity;
  const shippingCost = selectedShipping === "express" ? 400 : 0;
  const total = subtotal + shippingCost;

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <TopUtilityBar />
      <MainHeader />

      {/* Cart Content */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
          paddingTop: "60px",
          paddingBottom: "100px",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "42px",
            color: "#000000",
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          YOUR CART
        </h1>

        {/* Gift Progress Bar */}
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#000000",
              textAlign: "center",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            SHOP FOR ₹220 MORE FOR A GIFT
          </p>
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "8px",
              backgroundColor: "#E5E5E5",
              borderRadius: "4px",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "65%",
                height: "100%",
                backgroundColor: "#4A2B1F",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {/* Timer Banner */}
        <div
          style={{
            backgroundColor: "#FFE8E8",
            padding: "16px 32px",
            borderRadius: "8px",
            border: "1px solid #FF6B6B",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#FF6B6B",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            ITEMS RESERVED FOR {formatTime()}. COMPLETE CHECKOUT TO SECURE THIS BATCH
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: "flex", gap: "40px" }}>
          {/* Left Side - Cart Items */}
          <div style={{ flex: 1 }}>
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                paddingBottom: "16px",
                borderBottom: "1px solid #E5E5E5",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                PRODUCT
              </span>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                QUANTITY
              </span>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                PRICE
              </span>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                  textAlign: "right",
                }}
              >
                SUBTOTAL
              </span>
            </div>

            {/* Cart Item */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                alignItems: "center",
                paddingBottom: "24px",
                borderBottom: "1px solid #E5E5E5",
                marginBottom: "40px",
              }}
            >
              {/* Product Info */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#E5E5E5",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h3
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#000000",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    THIS IS THE PRODUCT NAME
                  </h3>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#666666",
                      marginBottom: "8px",
                    }}
                  >
                    Product Description
                  </p>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "#999999",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      padding: 0,
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "16px",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      width: "32px",
                      textAlign: "center",
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "16px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                ₹{price}
              </p>

              {/* Subtotal */}
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#000000",
                  textAlign: "right",
                }}
              >
                ₹{subtotal}
              </p>
            </div>

            {/* Coupon Section */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10L10 2L18 10"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12L10 6L16 12"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000000",
                    textTransform: "uppercase",
                  }}
                >
                  HAVE A COUPON?
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#999999",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                ADD YOUR CODE FOR AN INSTANT DISCOUNT
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    maxWidth: "300px",
                    height: "44px",
                    padding: "0 16px",
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    width: "100px",
                    height: "44px",
                    backgroundColor: "transparent",
                    border: "1px solid #000000",
                    borderRadius: "4px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#000000",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  APPLY
                </button>
              </div>
            </div>

            {/* Royalty Rewards */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                backgroundColor: "#F5F5F5",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h4
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#000000",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    ROYALTY REWARDS
                  </h4>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "#666666",
                    }}
                  >
                    Earn 400 points on this order
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#666666",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  BALANCE
                </p>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#000000",
                  }}
                >
                  1,240 pts
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Cart Summary */}
          <div style={{ width: "350px" }}>
            {/* Cart Summary Card */}
            <div
              style={{
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                CART SUMMARY
              </h3>

              {/* Shipping Options */}
              <div style={{ marginBottom: "24px" }}>
                {/* Free Shipping */}
                <label
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    border: selectedShipping === "free" ? "2px solid #000000" : "1px solid #E5E5E5",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: selectedShipping === "free" ? "6px solid #000000" : "2px solid #E5E5E5",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Lexend, sans-serif",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#000000",
                        textTransform: "uppercase",
                      }}
                    >
                      FREE SHIPPING
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#999999",
                    }}
                  >
                    ₹0
                  </span>
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedShipping === "free"}
                    onChange={() => setSelectedShipping("free")}
                    style={{ display: "none" }}
                  />
                </label>

                {/* Express Shipping */}
                <label
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    border: selectedShipping === "express" ? "2px solid #000000" : "1px solid #E5E5E5",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: selectedShipping === "express" ? "6px solid #000000" : "2px solid #E5E5E5",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Lexend, sans-serif",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#000000",
                        textTransform: "uppercase",
                      }}
                    >
                      EXPRESS SHIPPING
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#999999",
                    }}
                  >
                    +₹400
                  </span>
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedShipping === "express"}
                    onChange={() => setSelectedShipping("express")}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/* Subtotal */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid #E5E5E5",
                }}
              >
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#666666",
                    textTransform: "uppercase",
                  }}
                >
                  SUBTOTAL
                </span>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#000000",
                  }}
                >
                  ₹{subtotal}
                </span>
              </div>

              {/* Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#000000",
                    textTransform: "uppercase",
                  }}
                >
                  TOTAL
                </span>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#000000",
                  }}
                >
                  ₹{total}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                style={{
                  width: "100%",
                  height: "52px",
                  backgroundColor: "#E5E5E5",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#000000",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                CHECKOUT
              </button>
            </div>

            {/* Complete The Collection */}
            <div
              style={{
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#000000",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                COMPLETE THE COLLECTION
              </h3>

              {/* Suggestion Item 1 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#E5E5E5",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#000000",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    PRODUCT NAME
                  </p>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#666666",
                    }}
                  >
                    ₹220
                  </p>
                </div>
                <button
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3V13M3 8H13"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Suggestion Item 2 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#E5E5E5",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#000000",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    PRODUCT NAME
                  </p>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#666666",
                    }}
                  >
                    ₹220
                  </p>
                </div>
                <button
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3V13M3 8H13"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
