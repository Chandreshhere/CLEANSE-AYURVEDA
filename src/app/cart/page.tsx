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
      <div className="mx-auto w-full max-w-[1920px] px-6 pb-20 pt-12 md:px-8 lg:px-12 lg:pb-24 lg:pt-14 xl:px-16 2xl:px-20">
        {/* Page Title */}
        <h1 className="mb-8 text-center font-lexend-exa text-3xl font-normal uppercase text-black lg:mb-10 lg:text-4xl xl:text-[42px]">
          YOUR CART
        </h1>

        {/* Gift Progress Bar */}
        <div className="mb-6">
          <p className="mb-3 text-center font-lexend text-sm font-medium uppercase text-black">
            SHOP FOR ₹220 MORE FOR A GIFT
          </p>
          <div className="mx-auto h-2 w-full max-w-[600px] overflow-hidden rounded bg-[#E5E5E5]">
            <div className="h-full w-[65%] rounded bg-[#4A2B1F]" />
          </div>
        </div>

        {/* Timer Banner */}
        <div className="mb-8 rounded-lg border border-[#FF6B6B] bg-[#FFE8E8] px-4 py-4 text-center lg:mb-10 lg:px-8">
          <p className="font-lexend text-xs font-medium uppercase tracking-wide text-[#FF6B6B] lg:text-sm">
            ITEMS RESERVED FOR {formatTime()}. COMPLETE CHECKOUT TO SECURE THIS BATCH
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10 xl:gap-12">
          {/* Left Side - Cart Items */}
          <div className="flex-1">
            {/* Table Header - Hidden on mobile */}
            <div className="mb-6 hidden border-b border-[#E5E5E5] pb-4 lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr]">
              <span className="font-lexend text-xs font-medium uppercase text-black">
                PRODUCT
              </span>
              <span className="text-center font-lexend text-xs font-medium uppercase text-black">
                QUANTITY
              </span>
              <span className="text-center font-lexend text-xs font-medium uppercase text-black">
                PRICE
              </span>
              <span className="text-right font-lexend text-xs font-medium uppercase text-black">
                SUBTOTAL
              </span>
            </div>

            {/* Cart Item */}
            <div className="mb-8 flex flex-col gap-4 border-b border-[#E5E5E5] pb-6 lg:mb-10 lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr] lg:items-center">
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-[#E5E5E5] lg:h-[100px] lg:w-[100px]" />
                <div>
                  <h3 className="mb-1 font-lexend text-sm font-semibold uppercase text-black lg:text-base">
                    THIS IS THE PRODUCT NAME
                  </h3>
                  <p className="mb-2 font-lexend text-sm font-normal text-[#666666]">
                    Product Description
                  </p>
                  <button className="bg-transparent p-0 font-lexend text-xs font-normal uppercase text-[#999999]">
                    REMOVE
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex lg:justify-center">
                <div className="flex items-center rounded border border-[#E5E5E5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 bg-transparent font-lexend text-base"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-lexend text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 bg-transparent font-lexend text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <p className="font-lexend text-base font-normal text-black lg:text-center">
                ₹{price}
              </p>

              {/* Subtotal */}
              <p className="font-lexend text-base font-semibold text-black lg:text-right">
                ₹{subtotal}
              </p>
            </div>

            {/* Coupon Section */}
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
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
                <h3 className="font-lexend text-sm font-semibold uppercase text-black">
                  HAVE A COUPON?
                </h3>
              </div>
              <p className="mb-3 font-lexend text-xs font-normal uppercase text-[#999999]">
                ADD YOUR CODE FOR AN INSTANT DISCOUNT
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="h-11 max-w-[300px] flex-1 rounded border border-[#E5E5E5] px-4 font-lexend text-sm outline-none"
                />
                <button className="h-11 w-24 rounded border border-black bg-transparent font-lexend text-sm font-medium uppercase text-black">
                  APPLY
                </button>
              </div>
            </div>

            {/* Royalty Rewards */}
            <div className="flex flex-col gap-4 rounded-lg bg-[#F5F5F5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:py-5">
              <div className="flex items-center gap-3">
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
                  <h4 className="mb-1 font-lexend text-sm font-semibold uppercase text-black">
                    ROYALTY REWARDS
                  </h4>
                  <p className="font-lexend text-xs font-normal text-[#666666]">
                    Earn 400 points on this order
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="mb-1 font-lexend text-xs font-normal uppercase text-[#666666]">
                  BALANCE
                </p>
                <p className="font-lexend text-base font-semibold text-black">
                  1,240 pts
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Cart Summary */}
          <div className="w-full lg:w-[350px] xl:w-[380px]">
            {/* Cart Summary Card */}
            <div className="mb-6 rounded-lg border border-[#E5E5E5] p-5 lg:p-6">
              <h3 className="mb-6 font-lexend text-base font-semibold uppercase text-black">
                CART SUMMARY
              </h3>

              {/* Shipping Options */}
              <div className="mb-6">
                {/* Free Shipping */}
                <label
                  className={`mb-3 flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 ${
                    selectedShipping === "free" ? "border-2 border-black" : "border border-[#E5E5E5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded-full bg-white ${
                        selectedShipping === "free" ? "border-[6px] border-black" : "border-2 border-[#E5E5E5]"
                      }`}
                    />
                    <span className="font-lexend text-sm font-medium uppercase text-black">
                      FREE SHIPPING
                    </span>
                  </div>
                  <span className="font-lexend text-sm font-normal text-[#999999]">
                    ₹0
                  </span>
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedShipping === "free"}
                    onChange={() => setSelectedShipping("free")}
                    className="hidden"
                  />
                </label>

                {/* Express Shipping */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 ${
                    selectedShipping === "express" ? "border-2 border-black" : "border border-[#E5E5E5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded-full bg-white ${
                        selectedShipping === "express" ? "border-[6px] border-black" : "border-2 border-[#E5E5E5]"
                      }`}
                    />
                    <span className="font-lexend text-sm font-medium uppercase text-black">
                      EXPRESS SHIPPING
                    </span>
                  </div>
                  <span className="font-lexend text-sm font-normal text-[#999999]">
                    +₹400
                  </span>
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedShipping === "express"}
                    onChange={() => setSelectedShipping("express")}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Subtotal */}
              <div className="mb-4 flex justify-between border-t border-[#E5E5E5] pt-4">
                <span className="font-lexend text-sm font-normal uppercase text-[#666666]">
                  SUBTOTAL
                </span>
                <span className="font-lexend text-sm font-medium text-black">
                  ₹{subtotal}
                </span>
              </div>

              {/* Total */}
              <div className="mb-6 flex justify-between">
                <span className="font-lexend text-base font-semibold uppercase text-black">
                  TOTAL
                </span>
                <span className="font-lexend text-xl font-bold text-black">
                  ₹{total}
                </span>
              </div>

              {/* Checkout Button */}
              <button className="h-[52px] w-full rounded-lg bg-[#E5E5E5] font-lexend text-sm font-semibold uppercase text-black">
                CHECKOUT
              </button>
            </div>

            {/* Complete The Collection */}
            <div className="rounded-lg border border-[#E5E5E5] p-5 lg:p-6">
              <h3 className="mb-5 font-lexend text-base font-semibold uppercase text-black">
                COMPLETE THE COLLECTION
              </h3>

              {/* Suggestion Item 1 */}
              <div className="mb-3 flex items-center gap-3 rounded-lg border border-[#E5E5E5] p-3">
                <div className="h-[60px] w-[60px] shrink-0 rounded bg-[#E5E5E5]" />
                <div className="flex-1">
                  <p className="mb-1 font-lexend text-sm font-semibold uppercase text-black">
                    PRODUCT NAME
                  </p>
                  <p className="font-lexend text-sm font-normal text-[#666666]">
                    ₹220
                  </p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-[#E5E5E5] bg-transparent">
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
              <div className="flex items-center gap-3 rounded-lg border border-[#E5E5E5] p-3">
                <div className="h-[60px] w-[60px] shrink-0 rounded bg-[#E5E5E5]" />
                <div className="flex-1">
                  <p className="mb-1 font-lexend text-sm font-semibold uppercase text-black">
                    PRODUCT NAME
                  </p>
                  <p className="font-lexend text-sm font-normal text-[#666666]">
                    ₹220
                  </p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-[#E5E5E5] bg-transparent">
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
