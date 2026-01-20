"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopUtilityBar, MainHeader, Footer } from "@/components/layout";
import { useAuth } from "@/context";

type TabType = "dashboard" | "orders" | "wishlist" | "rewards" | "addresses" | "payment";

// Dashboard Content Component
const DashboardContent: React.FC<{ userName: string }> = ({ userName }) => (
  <>
    {/* Header Row */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "32px",
      }}
    >
      <h1
        style={{
          fontFamily: "Lexend Exa, sans-serif",
          fontWeight: 400,
          fontSize: "36px",
          color: "#000000",
          textTransform: "uppercase",
        }}
      >
        DASHBOARD
      </h1>
      <p
        style={{
          fontFamily: "Lexend, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          color: "#666666",
          textTransform: "uppercase",
        }}
      >
        WELCOME BACK, {userName.toUpperCase()}
      </p>
    </div>

    {/* Stats Cards */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        marginBottom: "48px",
      }}
    >
      {/* Royalty Points Card */}
      <div
        style={{
          border: "1px solid #E5E5E5",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: "16px" }}
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            color: "#000000",
            marginBottom: "8px",
          }}
        >
          1240
        </p>
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "#999999",
            textTransform: "uppercase",
          }}
        >
          AVAILABLE ROYALTY POINTS
        </p>
      </div>

      {/* Orders Pending Card */}
      <div
        style={{
          border: "1px solid #E5E5E5",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            color: "#000000",
            marginBottom: "8px",
            marginTop: "40px",
          }}
        >
          2
        </p>
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "#999999",
            textTransform: "uppercase",
          }}
        >
          ORDERS PENDING
        </p>
      </div>

      {/* Orders Completed Card */}
      <div
        style={{
          border: "1px solid #E5E5E5",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            color: "#000000",
            marginBottom: "8px",
            marginTop: "40px",
          }}
        >
          12
        </p>
        <p
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "#999999",
            textTransform: "uppercase",
          }}
        >
          ORDERS COMPLETED
        </p>
      </div>
    </div>

    {/* Recent Orders Section */}
    <div>
      <h2
        style={{
          fontFamily: "Lexend, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          color: "#000000",
          textTransform: "uppercase",
          marginBottom: "16px",
          paddingBottom: "16px",
          borderBottom: "1px solid #000000",
        }}
      >
        RECENT ORDERS
      </h2>

      {/* Order Item */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "16px",
          border: "1px solid #E5E5E5",
          borderRadius: "8px",
        }}
      >
        {/* Order Image */}
        <div
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#E5E5E5",
            borderRadius: "4px",
            flexShrink: 0,
          }}
        />
        {/* Order Details */}
        <div>
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
            ORDER CLE-9941
          </p>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "#666666",
            }}
          >
            Jan 12,2025 &nbsp;&nbsp;In-Transit
          </p>
        </div>
      </div>
    </div>
  </>
);

// Order History Content Component
const OrderHistoryContent: React.FC = () => {
  const orders = [
    {
      id: "12873691",
      date: "JAN 08, 2025",
      total: "₹970",
      items: [
        { name: "FACE CREAM", productId: "1208371" },
        { name: "BODY LOTION", productId: "1208371" },
      ],
    },
    {
      id: "12873691",
      date: "JAN 08, 2025",
      total: "₹970",
      items: [{ name: "FACE CREAM", productId: "1208371" }],
    },
  ];

  return (
    <>
      <h1
        style={{
          fontFamily: "Lexend Exa, sans-serif",
          fontWeight: 400,
          fontSize: "36px",
          color: "#000000",
          textTransform: "uppercase",
          marginBottom: "32px",
        }}
      >
        ORDER HISTORY
      </h1>

      {/* Orders List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {orders.map((order, orderIndex) => (
          <div
            key={orderIndex}
            style={{
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Order Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 24px",
                backgroundColor: "#FAFAFA",
                borderBottom: "1px solid #E5E5E5",
              }}
            >
              <div style={{ display: "flex", gap: "48px" }}>
                <div>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "10px",
                      color: "#999999",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    DATE ORDERED
                  </p>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#000000",
                      textTransform: "uppercase",
                    }}
                  >
                    {order.date}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "10px",
                      color: "#999999",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    TOTAL VALUE
                  </p>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#000000",
                    }}
                  >
                    {order.total}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "10px",
                    color: "#999999",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  ORDER REFERENCE
                </p>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#000000",
                  }}
                >
                  {order.id}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ padding: "16px 24px" }}>
              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    borderBottom:
                      itemIndex < order.items.length - 1 ? "1px solid #E5E5E5" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {/* Product Image */}
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#E5E5E5",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    />
                    <div>
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
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "Lexend, sans-serif",
                          fontWeight: 400,
                          fontSize: "12px",
                          color: "#999999",
                          textTransform: "uppercase",
                        }}
                      >
                        PRODUCT ID : {item.productId}
                      </p>
                    </div>
                  </div>
                  <button
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "transparent",
                      border: "1px solid #000000",
                      borderRadius: "4px",
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#000000",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    ORDER AGAIN
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// Wishlist Content Component
const WishlistContent: React.FC = () => {
  const wishlistItems = [
    {
      id: 1,
      category: "CATEGORY NAME",
      rating: 4.9,
      name: "NAME OF THE PRODUCT",
      description: "This is some text",
      price: 400,
    },
    {
      id: 2,
      category: "CATEGORY NAME",
      rating: 4.9,
      name: "NAME OF THE PRODUCT",
      description: "This is some text",
      price: 400,
    },
  ];

  return (
    <>
      <h1
        style={{
          fontFamily: "Lexend Exa, sans-serif",
          fontWeight: 400,
          fontSize: "36px",
          color: "#000000",
          textTransform: "uppercase",
          marginBottom: "32px",
        }}
      >
        WISHLIST
      </h1>

      {/* Wishlist Grid */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            style={{
              width: "280px",
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#999999",
                  textTransform: "uppercase",
                }}
              >
                {item.category}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 0L7.76393 3.52786L11.7063 4.1459L8.85317 6.92214L9.52786 10.8541L6 9L2.47214 10.8541L3.14683 6.92214L0.293661 4.1459L4.23607 3.52786L6 0Z" />
                </svg>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#000000",
                  }}
                >
                  {item.rating}
                </span>
              </div>
            </div>

            {/* Product Image */}
            <div
              style={{
                width: "100%",
                height: "200px",
                backgroundColor: "#F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "160px",
                  backgroundColor: "#E5E5E5",
                  borderRadius: "4px",
                }}
              />
            </div>

            {/* Product Info */}
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000000",
                    textTransform: "uppercase",
                    maxWidth: "160px",
                  }}
                >
                  {item.name}
                </h3>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#000000",
                  }}
                >
                  ₹{item.price}
                </span>
              </div>
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
                    fontSize: "12px",
                    color: "#666666",
                  }}
                >
                  "{item.description}"
                </p>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "10px",
                    color: "#000000",
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  VIEW CLINICALS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// Rewards & Referrals Content Component
const RewardsContent: React.FC = () => {
  const coupons = [
    {
      id: 1,
      title: "20% OFF NEXT FACE CREAM ORDER",
      code: "CTA45681",
      status: "active",
    },
    {
      id: 2,
      title: "10% OFF FIRST ORDER 10% OFF",
      code: "CTA45681",
      status: "redeemed",
    },
  ];

  return (
    <>
      <h1
        style={{
          fontFamily: "Lexend Exa, sans-serif",
          fontWeight: 400,
          fontSize: "36px",
          color: "#000000",
          textTransform: "uppercase",
          marginBottom: "32px",
        }}
      >
        REWARDS & REFERALS
      </h1>

      {/* Reward Balance Card */}
      <div
        style={{
          backgroundColor: "#F5F5F0",
          borderRadius: "12px",
          padding: "32px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left - Points Balance */}
          <div>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "#666666",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              REWARD BALANCE
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  fontSize: "48px",
                  color: "#000000",
                }}
              >
                1240
              </span>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 500,
                  fontSize: "24px",
                  color: "#000000",
                }}
              >
                PTS
              </span>
            </div>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "#999999",
                marginTop: "8px",
              }}
            >
              PENDING : 140 PTS
            </p>
          </div>

          {/* Right - Redeemable Value */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "#666666",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              REDEEMABLE VALUE
            </p>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 700,
                fontSize: "32px",
                color: "#000000",
              }}
            >
              ₹200
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "48px",
        }}
      >
        {/* Total Orders */}
        <div
          style={{
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 700,
              fontSize: "32px",
              color: "#000000",
              marginBottom: "8px",
            }}
          >
            24
          </p>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              color: "#999999",
              textTransform: "uppercase",
            }}
          >
            TOTAL ORDERS
          </p>
        </div>

        {/* Total Saved */}
        <div
          style={{
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 700,
              fontSize: "32px",
              color: "#000000",
              marginBottom: "8px",
            }}
          >
            ₹4,000
          </p>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              color: "#999999",
              textTransform: "uppercase",
            }}
          >
            TOTAL SAVED
          </p>
        </div>

        {/* Lifetime Points */}
        <div
          style={{
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 700,
              fontSize: "32px",
              color: "#000000",
              marginBottom: "8px",
            }}
          >
            3,200
          </p>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              color: "#999999",
              textTransform: "uppercase",
            }}
          >
            LIFETIME POINTS
          </p>
        </div>

        {/* Frequency */}
        <div
          style={{
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 700,
              fontSize: "32px",
              color: "#000000",
              marginBottom: "8px",
            }}
          >
            24
          </p>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              color: "#999999",
              textTransform: "uppercase",
            }}
          >
            DAYS
          </p>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "8px",
              color: "#CCCCCC",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            FREQUENCY
          </p>
        </div>
      </div>

      {/* Coupons Section */}
      <div>
        <h2
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#000000",
            textTransform: "uppercase",
            marginBottom: "16px",
            paddingBottom: "16px",
            borderBottom: "1px solid #000000",
          }}
        >
          COUPONS
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                backgroundColor: coupon.status === "redeemed" ? "#FAFAFA" : "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Coupon Icon */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: coupon.status === "redeemed" ? "#E5E5E5" : "#F5F5F0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 5H3C2.44772 5 2 5.44772 2 6V10C3.10457 10 4 10.8954 4 12C4 13.1046 3.10457 14 2 14V18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18V14C20.8954 14 20 13.1046 20 12C20 10.8954 20.8954 10 22 10V6C22 5.44772 21.5523 5 21 5Z"
                      stroke={coupon.status === "redeemed" ? "#999999" : "#000000"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 5V19"
                      stroke={coupon.status === "redeemed" ? "#999999" : "#000000"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: coupon.status === "redeemed" ? "#999999" : "#000000",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {coupon.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "#999999",
                      textTransform: "uppercase",
                    }}
                  >
                    CODE : {coupon.code}
                  </p>
                </div>
              </div>

              {/* Status/Action */}
              {coupon.status === "redeemed" ? (
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#999999",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    backgroundColor: "#E5E5E5",
                    borderRadius: "4px",
                  }}
                >
                  REDEEMED
                </span>
              ) : (
                <button
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#000000",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  COPY CODE
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Placeholder Content Component for other tabs
const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
  <>
    <h1
      style={{
        fontFamily: "Lexend Exa, sans-serif",
        fontWeight: 400,
        fontSize: "36px",
        color: "#000000",
        textTransform: "uppercase",
        marginBottom: "32px",
      }}
    >
      {title}
    </h1>
    <p
      style={{
        fontFamily: "Lexend, sans-serif",
        fontWeight: 400,
        fontSize: "16px",
        color: "#666666",
      }}
    >
      Content coming soon...
    </p>
  </>
);

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems: { id: TabType; label: string }[] = [
    { id: "dashboard", label: "DASHBOARD" },
    { id: "orders", label: "ORDER HISTORY" },
    { id: "wishlist", label: "WISHLIST" },
    { id: "rewards", label: "REWARDS & REFERALS" },
    { id: "addresses", label: "SAVED ADDRESSES" },
    { id: "payment", label: "PAYMENT METHODS" },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#FFFFFF" }}>
        <TopUtilityBar />
        <MainHeader />
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#666666",
            }}
          >
            Loading...
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <TopUtilityBar />
      <MainHeader />

      {/* Account Content */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
          paddingTop: "60px",
          paddingBottom: "100px",
          minHeight: "600px",
        }}
      >
        <div style={{ display: "flex", gap: "80px" }}>
          {/* Left Sidebar */}
          <div style={{ width: "220px", flexShrink: 0 }}>
            {/* User Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                paddingBottom: "24px",
                borderBottom: "1px solid #E5E5E5",
                marginBottom: "24px",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#4A2B1F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#FCF6EB",
                    textTransform: "uppercase",
                  }}
                >
                  {user.name.charAt(0)}
                </span>
              </div>
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
                  {user.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#999999",
                  }}
                >
                  1240 PTS
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    textAlign: "left",
                    padding: "12px 0",
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === item.id ? "2px solid #000000" : "none",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: activeTab === item.id ? 600 : 400,
                    fontSize: "14px",
                    color: "#000000",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </button>
              ))}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  textAlign: "left",
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#C9746C",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  marginTop: "16px",
                }}
              >
                LOGOUT
              </button>
            </nav>
          </div>

          {/* Right Content */}
          <div style={{ flex: 1 }}>
            {activeTab === "dashboard" && <DashboardContent userName={user.name} />}
            {activeTab === "orders" && <OrderHistoryContent />}
            {activeTab === "wishlist" && <WishlistContent />}
            {activeTab === "rewards" && <RewardsContent />}
            {activeTab === "addresses" && <PlaceholderContent title="SAVED ADDRESSES" />}
            {activeTab === "payment" && <PlaceholderContent title="PAYMENT METHODS" />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
