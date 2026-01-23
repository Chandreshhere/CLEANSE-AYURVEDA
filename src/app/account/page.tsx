"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopUtilityBar, MainHeader, Footer } from "@/components/layout";
import { useAuth } from "@/context";
import { useRequireAuth } from "@/hooks";

type TabType = "dashboard" | "orders" | "wishlist" | "rewards" | "addresses" | "payment";

// Dashboard Content Component
const DashboardContent: React.FC<{ userName: string }> = ({ userName }) => (
  <>
    {/* Header Row */}
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between lg:mb-8">
      <h1 className="font-lexend-exa text-2xl font-normal uppercase text-black lg:text-3xl xl:text-4xl">
        DASHBOARD
      </h1>
      <p className="font-lexend text-sm font-normal uppercase text-[#666666]">
        WELCOME BACK, {userName.toUpperCase()}
      </p>
    </div>

    {/* Stats Cards */}
    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-12 lg:grid-cols-3 lg:gap-6">
      {/* Royalty Points Card */}
      <div className="rounded-lg border border-[#E5E5E5] p-5 lg:p-6">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mb-2 font-lexend text-2xl font-bold text-black lg:text-[32px]">
          1240
        </p>
        <p className="font-lexend text-xs font-normal uppercase text-[#999999]">
          AVAILABLE ROYALTY POINTS
        </p>
      </div>

      {/* Orders Pending Card */}
      <div className="rounded-lg border border-[#E5E5E5] p-5 lg:p-6">
        <p className="mb-2 mt-8 font-lexend text-2xl font-bold text-black lg:mt-10 lg:text-[32px]">
          2
        </p>
        <p className="font-lexend text-xs font-normal uppercase text-[#999999]">
          ORDERS PENDING
        </p>
      </div>

      {/* Orders Completed Card */}
      <div className="rounded-lg border border-[#E5E5E5] p-5 lg:p-6">
        <p className="mb-2 mt-8 font-lexend text-2xl font-bold text-black lg:mt-10 lg:text-[32px]">
          12
        </p>
        <p className="font-lexend text-xs font-normal uppercase text-[#999999]">
          ORDERS COMPLETED
        </p>
      </div>
    </div>

    {/* Recent Orders Section */}
    <div>
      <h2 className="mb-4 border-b border-black pb-4 font-lexend text-sm font-semibold uppercase text-black">
        RECENT ORDERS
      </h2>

      {/* Order Item */}
      <div className="flex items-center gap-4 rounded-lg border border-[#E5E5E5] p-4">
        {/* Order Image */}
        <div className="h-[60px] w-[60px] shrink-0 rounded bg-[#E5E5E5]" />
        {/* Order Details */}
        <div>
          <p className="mb-1 font-lexend text-sm font-semibold uppercase text-black">
            ORDER CLE-9941
          </p>
          <p className="font-lexend text-xs font-normal text-[#666666]">
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
      <h1 className="mb-6 font-lexend-exa text-2xl font-normal uppercase text-black lg:mb-8 lg:text-3xl xl:text-4xl">
        ORDER HISTORY
      </h1>

      {/* Orders List */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {orders.map((order, orderIndex) => (
          <div
            key={orderIndex}
            className="overflow-hidden rounded-lg border border-[#E5E5E5]"
          >
            {/* Order Header */}
            <div className="flex flex-col gap-4 border-b border-[#E5E5E5] bg-[#FAFAFA] px-4 py-4 sm:flex-row sm:justify-between lg:px-6">
              <div className="flex flex-wrap gap-6 lg:gap-12">
                <div>
                  <p className="mb-1 font-lexend text-[10px] font-normal uppercase text-[#999999]">
                    DATE ORDERED
                  </p>
                  <p className="font-lexend text-xs font-semibold uppercase text-black">
                    {order.date}
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-lexend text-[10px] font-normal uppercase text-[#999999]">
                    TOTAL VALUE
                  </p>
                  <p className="font-lexend text-xs font-semibold text-black">
                    {order.total}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="mb-1 font-lexend text-[10px] font-normal uppercase text-[#999999]">
                  ORDER REFERENCE
                </p>
                <p className="font-lexend text-xs font-semibold text-black">
                  {order.id}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-4 py-4 lg:px-6">
              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between ${
                    itemIndex < order.items.length - 1 ? "border-b border-[#E5E5E5]" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="h-[60px] w-[60px] shrink-0 rounded bg-[#E5E5E5]" />
                    <div>
                      <p className="mb-1 font-lexend text-sm font-semibold uppercase text-black">
                        {item.name}
                      </p>
                      <p className="font-lexend text-xs font-normal uppercase text-[#999999]">
                        PRODUCT ID : {item.productId}
                      </p>
                    </div>
                  </div>
                  <button className="w-fit cursor-pointer rounded border border-black bg-transparent px-4 py-2.5 font-lexend text-xs font-medium uppercase text-black lg:px-6 lg:py-3">
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
      <h1 className="mb-6 font-lexend-exa text-2xl font-normal uppercase text-black lg:mb-8 lg:text-3xl xl:text-4xl">
        WISHLIST
      </h1>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-[#E5E5E5]"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <p className="font-lexend text-[10px] font-normal uppercase text-[#999999]">
                {item.category}
              </p>
              <div className="flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 0L7.76393 3.52786L11.7063 4.1459L8.85317 6.92214L9.52786 10.8541L6 9L2.47214 10.8541L3.14683 6.92214L0.293661 4.1459L4.23607 3.52786L6 0Z" />
                </svg>
                <span className="font-lexend text-xs font-medium text-black">
                  {item.rating}
                </span>
              </div>
            </div>

            {/* Product Image */}
            <div className="flex h-[180px] w-full items-center justify-center bg-[#F5F5F5] lg:h-[200px]">
              <div className="h-[140px] w-[100px] rounded bg-[#E5E5E5] lg:h-[160px] lg:w-[120px]" />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="max-w-[160px] font-lexend text-sm font-semibold uppercase text-black">
                  {item.name}
                </h3>
                <span className="font-lexend text-base font-semibold text-black">
                  ₹{item.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-lexend text-xs font-normal text-[#666666]">
                  &quot;{item.description}&quot;
                </p>
                <button className="cursor-pointer border-none bg-transparent font-lexend text-[10px] font-medium uppercase text-black underline">
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
      <h1 className="mb-6 font-lexend-exa text-2xl font-normal uppercase text-black lg:mb-8 lg:text-3xl xl:text-4xl">
        REWARDS & REFERALS
      </h1>

      {/* Reward Balance Card */}
      <div className="mb-6 rounded-xl bg-[#F5F5F0] p-5 lg:mb-8 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left - Points Balance */}
          <div>
            <p className="mb-2 font-lexend text-xs font-normal uppercase text-[#666666]">
              REWARD BALANCE
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-lexend text-4xl font-bold text-black lg:text-5xl">
                1240
              </span>
              <span className="font-lexend text-xl font-medium text-black lg:text-2xl">
                PTS
              </span>
            </div>
            <p className="mt-2 font-lexend text-xs font-normal text-[#999999]">
              PENDING : 140 PTS
            </p>
          </div>

          {/* Right - Redeemable Value */}
          <div className="text-left sm:text-right">
            <p className="mb-2 font-lexend text-xs font-normal uppercase text-[#666666]">
              REDEEMABLE VALUE
            </p>
            <p className="font-lexend text-2xl font-bold text-black lg:text-[32px]">
              ₹200
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:mb-12 lg:grid-cols-4 lg:gap-6">
        {/* Total Orders */}
        <div className="rounded-lg border border-[#E5E5E5] p-4 text-center lg:p-6">
          <p className="mb-2 font-lexend text-2xl font-bold text-black lg:text-[32px]">
            24
          </p>
          <p className="font-lexend text-[10px] font-normal uppercase text-[#999999]">
            TOTAL ORDERS
          </p>
        </div>

        {/* Total Saved */}
        <div className="rounded-lg border border-[#E5E5E5] p-4 text-center lg:p-6">
          <p className="mb-2 font-lexend text-2xl font-bold text-black lg:text-[32px]">
            ₹4,000
          </p>
          <p className="font-lexend text-[10px] font-normal uppercase text-[#999999]">
            TOTAL SAVED
          </p>
        </div>

        {/* Lifetime Points */}
        <div className="rounded-lg border border-[#E5E5E5] p-4 text-center lg:p-6">
          <p className="mb-2 font-lexend text-2xl font-bold text-black lg:text-[32px]">
            3,200
          </p>
          <p className="font-lexend text-[10px] font-normal uppercase text-[#999999]">
            LIFETIME POINTS
          </p>
        </div>

        {/* Frequency */}
        <div className="rounded-lg border border-[#E5E5E5] p-4 text-center lg:p-6">
          <p className="mb-2 font-lexend text-2xl font-bold text-black lg:text-[32px]">
            24
          </p>
          <p className="font-lexend text-[10px] font-normal uppercase text-[#999999]">
            DAYS
          </p>
          <p className="mt-1 font-lexend text-[8px] font-normal uppercase text-[#CCCCCC]">
            FREQUENCY
          </p>
        </div>
      </div>

      {/* Coupons Section */}
      <div>
        <h2 className="mb-4 border-b border-black pb-4 font-lexend text-sm font-semibold uppercase text-black">
          COUPONS
        </h2>

        <div className="flex flex-col gap-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`flex flex-col gap-4 rounded-lg border border-[#E5E5E5] px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:py-5 ${
                coupon.status === "redeemed" ? "bg-[#FAFAFA]" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Coupon Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    coupon.status === "redeemed" ? "bg-[#E5E5E5]" : "bg-[#F5F5F0]"
                  }`}
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
                    className={`mb-1 font-lexend text-sm font-semibold uppercase ${
                      coupon.status === "redeemed" ? "text-[#999999]" : "text-black"
                    }`}
                  >
                    {coupon.title}
                  </p>
                  <p className="font-lexend text-xs font-normal uppercase text-[#999999]">
                    CODE : {coupon.code}
                  </p>
                </div>
              </div>

              {/* Status/Action */}
              {coupon.status === "redeemed" ? (
                <span className="w-fit rounded bg-[#E5E5E5] px-4 py-2 font-lexend text-xs font-medium uppercase text-[#999999]">
                  REDEEMED
                </span>
              ) : (
                <button className="w-fit cursor-pointer rounded border-none bg-black px-4 py-2.5 font-lexend text-xs font-medium uppercase text-white lg:px-6 lg:py-3">
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
    <h1 className="mb-6 font-lexend-exa text-2xl font-normal uppercase text-black lg:mb-8 lg:text-3xl xl:text-4xl">
      {title}
    </h1>
    <p className="font-lexend text-base font-normal text-[#666666]">
      Content coming soon...
    </p>
  </>
);

export default function AccountPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { user, isLoading } = useRequireAuth();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const handleLogout = () => {
    logout();
    router.push("/");
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
      <main className="flex min-h-screen flex-col bg-white">
        <TopUtilityBar />
        <MainHeader />
        <div className="flex flex-1 items-center justify-center">
          <p className="font-lexend text-base font-normal text-[#666666]">
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
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <TopUtilityBar />
      <MainHeader />

      {/* Account Content */}
      <div className="mx-auto min-h-[600px] w-full max-w-[1920px] px-6 pb-20 pt-12 md:px-8 lg:px-12 lg:pb-24 lg:pt-14 xl:px-16 2xl:px-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16 2xl:gap-20">
          {/* Left Sidebar */}
          <div className="w-full shrink-0 lg:w-[220px] xl:w-[250px]">
            {/* User Info */}
            <div className="mb-6 flex items-center gap-4 border-b border-[#E5E5E5] pb-6">
              {/* Avatar */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4A2B1F]">
                <span className="font-lexend text-lg font-semibold uppercase text-[#FCF6EB]">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="mb-1 font-lexend text-base font-semibold uppercase text-black">
                  {user.name}
                </h3>
                <p className="font-lexend text-xs font-normal text-[#999999]">
                  1240 PTS
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`bg-transparent px-3 py-2 text-left font-lexend text-sm uppercase text-black lg:px-0 lg:py-3 ${
                    activeTab === item.id ? "border-b-2 border-black font-semibold" : "font-normal"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-2 bg-transparent px-3 py-2 text-left font-lexend text-sm font-normal uppercase text-[#C9746C] lg:mt-4 lg:px-0 lg:py-3"
              >
                LOGOUT
              </button>
            </nav>
          </div>

          {/* Right Content */}
          <div className="flex-1">
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
