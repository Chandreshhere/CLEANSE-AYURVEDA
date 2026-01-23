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
      <div className="mx-auto w-full max-w-[1920px] px-6 py-10 md:px-8 lg:px-12 lg:py-12 xl:px-16 xl:py-14 2xl:px-20 2xl:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8 xl:gap-10">
          {/* Left Side - Product Images */}
          <div className="w-full lg:w-1/2 xl:w-[55%]">
            {/* Main Product Image Placeholder */}
            <div className="mb-6 aspect-[679/820] w-full bg-[#D9D9D9] lg:mb-8" />

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 lg:gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[160/123] w-full bg-[#D9D9D9]"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="w-full lg:w-1/2 xl:w-[45%]">
            {/* Stock Alert Box */}
            <div className="mb-6 flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#E8D4D4] bg-[#FDF8F8] lg:h-[60px]">
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
              <span className="font-lexend text-xs font-medium uppercase tracking-wide text-[#C25050] lg:text-sm">
                ONLY 3 UNITS REMAINING IN THIS BATCH
              </span>
            </div>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex gap-0.5">
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
              <span className="font-lexend text-sm font-normal text-[#4A2B1F]">
                4.9 (20 REVIEWS)
              </span>
            </div>

            {/* Product Title */}
            <h1 className="mb-4 font-lexend text-3xl font-semibold uppercase leading-tight tracking-wide text-[#4A2B1F] lg:text-4xl xl:text-[48px]">
              VERY LOVELY FACE CREAM
            </h1>

            {/* Price */}
            <p className="mb-5 font-lexend text-2xl font-semibold text-[#4A2B1F] lg:text-[28px]">
              ₹800
            </p>

            {/* Description */}
            <p className="mb-8 max-w-[500px] font-lexend text-sm font-normal leading-relaxed text-[#4A2B1F]/80 lg:text-base">
              Some desctiption about the very lovely face cream. labore tempor ullamco deserunt sint aliquip incididunt duis aliquip velit officia exercitation
            </p>

            {/* Select Size */}
            <div className="mb-6">
              <p className="mb-3 font-lexend text-xs font-medium uppercase tracking-widest text-[#4A2B1F]/60">
                SELECT SIZE
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedSize("100 ML")}
                  className={`rounded px-6 py-3 font-lexend text-sm font-medium text-[#4A2B1F] lg:px-8 lg:py-4 ${
                    selectedSize === "100 ML" ? "bg-[#D5DCCE]" : "border border-[#D5DCCE] bg-transparent"
                  }`}
                >
                  100 ML
                </button>
                <button
                  onClick={() => setSelectedSize("100 ML + 30 ML")}
                  className={`rounded px-6 py-3 font-lexend text-sm font-medium text-[#4A2B1F] lg:px-8 lg:py-4 ${
                    selectedSize === "100 ML + 30 ML" ? "bg-[#D5DCCE]" : "border border-[#D5DCCE] bg-transparent"
                  }`}
                >
                  100 ML + 30 ML
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-4">
              <p className="mb-3 font-lexend text-xs font-medium uppercase tracking-widest text-[#4A2B1F]/60">
                QUANTITY
              </p>
              <div className="flex gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center rounded border border-[#D5DCCE]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 bg-transparent font-lexend text-xl text-[#4A2B1F] lg:h-14"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-lexend text-base font-medium text-[#4A2B1F]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 bg-transparent font-lexend text-xl text-[#4A2B1F] lg:h-14"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="h-12 flex-1 rounded bg-[#ECCFA0] font-lexend text-sm font-semibold uppercase tracking-widest text-[#4A2B1F] lg:h-14"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Buy Now Button */}
            <button className="mb-6 h-12 w-full rounded bg-[#3D2B27] font-lexend text-sm font-semibold uppercase tracking-widest text-white lg:h-14">
              BUY NOW
            </button>

            {/* Check Delivery */}
            <div className="mb-6 rounded-lg bg-[#3D2B27] px-6 py-5 lg:px-8 lg:py-6">
              <p className="mb-5 font-lexend text-sm font-semibold uppercase tracking-widest text-[#C9A86C]">
                CHECK DELIVERY
              </p>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex-1 border-b border-white/30">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-transparent py-3 font-lexend text-base text-white outline-none placeholder:text-white/50"
                  />
                </div>
                <button className="rounded border border-white/30 bg-white/20 px-8 py-3 font-lexend text-sm font-medium uppercase tracking-wide text-white/70 lg:px-10 lg:py-4">
                  CHECK
                </button>
              </div>
              <p className="font-lexend text-xs uppercase tracking-wide text-[#C9A86C]">
                EST. DELIVERY: 13TH - 15TH JANUARY 2025
              </p>
            </div>

            {/* Divider Line */}
            <div className="mb-6 border-t border-[#E5E5E5]" />

            {/* Policies */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#C25050]" />
                <span className="font-lexend text-xs font-medium uppercase tracking-wide text-[#4A2B1F]">
                  7 DAY RETURN POLICY
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#C9A86C]" />
                <span className="font-lexend text-xs font-medium uppercase tracking-wide text-[#4A2B1F]">
                  SHIPS WORLDWIDE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Your Basket Section */}
      <div className="mx-auto w-full max-w-[1920px] px-6 pb-16 pt-8 md:px-8 lg:px-12 lg:pb-20 xl:px-16 2xl:px-20">
        <div className="mx-auto w-full max-w-[1200px] rounded-3xl bg-[#ECCFA0] p-6 lg:p-10 xl:p-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            {/* Left Side */}
            <div className="max-w-[571px]">
              <h2 className="mb-4 font-lexend-exa text-2xl font-normal uppercase text-[#4A2B1F] lg:mb-6 lg:text-3xl xl:text-4xl">
                CREATE YOUR BASKET
              </h2>
              <p className="font-lexend text-lg font-normal text-[#4A2B1F]/60 lg:text-xl xl:text-[22px]">
                Select items to bundle and save 15% on your entire bundle.
              </p>
            </div>

            {/* Right Side - Bundle Total */}
            <div className="flex flex-col items-start gap-3">
              <p className="font-lexend-exa text-sm font-normal uppercase text-[#AB522E] lg:text-base">
                BUNDLE TOTAL
              </p>
              <p className="font-lexend text-xl font-normal text-[#4F2C22]/60 lg:text-2xl">
                ₹1020
              </p>
              <p className="font-lexend text-sm font-normal text-[#4F2C22]/60 lg:text-base">
                15% Savings applied
              </p>
            </div>
          </div>

          {/* Bundle Items */}
          <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:my-8 lg:grid-cols-3 lg:gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="relative flex h-[180px] justify-between bg-[#3D2B27] p-5 lg:h-[196px]"
              >
                {/* Left Side - Text Content */}
                <div>
                  <p className="mb-2 max-w-[200px] font-lexend-exa text-base font-normal uppercase text-white lg:max-w-[240px] lg:text-lg">
                    DEEP REST MAGNESIUM BALM
                  </p>
                  <p className="font-lexend text-base font-normal text-white/60 lg:text-lg">
                    ₹400
                  </p>
                </div>

                {/* Right Side - Product Image Placeholder */}
                <div className="absolute bottom-0 right-5 h-[100px] w-[130px] bg-white lg:h-[114px] lg:w-[152px]" />

                {/* Checkbox */}
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white">
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
          <button className="h-12 w-full rounded bg-[#3D2B27] font-lexend-exa text-base font-normal uppercase text-[#FCF6EB] lg:h-14 lg:text-lg">
            ADD BUNDLE TO CART
          </button>
        </div>
      </div>

      {/* Product Info Tabs Section */}
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="w-full bg-[#D5DCCE] px-6 py-10 md:px-8 lg:px-12 lg:py-12 xl:px-16 2xl:px-20">
          {/* Tabs Navigation */}
          <div className="relative mb-8 flex flex-wrap justify-center gap-2 border-b-2 border-[#B0B0B0] lg:mb-12 lg:justify-between lg:gap-0">
            {[
              { id: "ingredients", label: "INGREDIENTS" },
              { id: "our-values", label: "OUR VALUES" },
              { id: "how-to-use", label: "HOW TO USE" },
              { id: "shipping", label: "SHIPPING AND RETURNS" },
              { id: "policies", label: "POLICIES" },
            ].map((tab) => (
              <div
                key={tab.id}
                className={`relative px-3 py-3 text-center lg:flex-1 lg:px-4 lg:py-4 ${
                  activeTab === tab.id
                    ? "-mb-[2px] border border-white bg-[#D5DCCE] z-10"
                    : ""
                }`}
              >
                <span
                  onClick={() => setActiveTab(tab.id)}
                  className="cursor-pointer font-lexend text-xs font-medium uppercase tracking-widest text-[#4A2B1F] lg:text-sm"
                >
                  {tab.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "ingredients" && (
            <div className="max-w-[800px] px-4 lg:ml-12 lg:px-0">
              <h3 className="mb-6 font-lexend text-base font-semibold uppercase text-[#4A2B1F] lg:text-lg">
                Key Ingredients
              </h3>
              <ul className="list-none p-0">
                {["Aloe Vera Extract", "Shea Butter", "Vitamin E", "Coconut Oil", "Turmeric Extract", "Sandalwood Oil"].map((ingredient) => (
                  <li
                    key={ingredient}
                    className="border-b border-[#4A2B1F]/20 py-2 font-lexend text-sm font-normal leading-loose text-[#4A2B1F] lg:text-base"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "our-values" && (
            <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
              {/* Left Side - Description */}
              <div className="max-w-[527px] px-4 lg:ml-12 lg:mt-20 lg:px-0 xl:mt-32">
                <p className="font-lexend text-lg font-normal text-black/70 lg:text-xl xl:text-[22px]">
                  All our products are natural, plant-based and toxic-free. Our formulations help you take care of your body without harming yourself or the environment.
                </p>
              </div>

              {/* Right Side - Values Grid */}
              <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 lg:mr-16 lg:mt-10 lg:gap-8 lg:px-0 xl:mr-24">
                {[
                  "PLANT BASED",
                  "NO ARTIFICIAL COLOR",
                  "PLANT BASED",
                  "CRUELTY FREE",
                  "NO SYNTHETIC CHEMICALS",
                  "100% AYURVEDIC",
                ].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <div className="mb-3 h-16 w-16 rounded-full border-2 border-[#B0B0B0] lg:h-20 lg:w-20 xl:h-[92px] xl:w-[92px]" />
                    <span className="text-center font-lexend-exa text-xs font-normal uppercase text-black lg:text-sm">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "how-to-use" && (
            <div className="max-w-[800px] px-4 lg:ml-12 lg:px-0">
              <h3 className="mb-6 font-lexend text-base font-semibold uppercase text-[#4A2B1F] lg:text-lg">
                How To Use
              </h3>
              <ol className="list-decimal pl-5">
                {[
                  "Cleanse your face thoroughly and pat dry.",
                  "Take a small amount of cream on your fingertips.",
                  "Apply gently on face and neck in upward circular motions.",
                  "Use twice daily - morning and night for best results.",
                  "For external use only. Avoid contact with eyes.",
                ].map((step, index) => (
                  <li
                    key={index}
                    className="mb-3 font-lexend text-sm font-normal leading-loose text-[#4A2B1F] lg:text-base"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="flex flex-col gap-10 px-4 pt-6 lg:flex-row lg:gap-16 lg:px-12 xl:gap-24 xl:px-16">
              {/* Shipping Column */}
              <div className="flex-1">
                <div className="mb-6 flex items-center gap-4 lg:mb-8">
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
                  <h3 className="font-lexend text-xl font-semibold uppercase tracking-widest text-[#4A2B1F] lg:text-2xl">
                    SHIPPING
                  </h3>
                </div>
                <p className="max-w-[450px] font-lexend text-base font-normal leading-relaxed text-[#4A2B1F] lg:text-lg">
                  Complementary carbon-neutral shipping on all orders over ₹700. Orders are processed within 24-48 hours and typically arrive within 3-5 business days.
                </p>
              </div>

              {/* Returns Column */}
              <div className="flex-1">
                <div className="mb-6 flex items-center gap-4 lg:mb-8">
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
                  <h3 className="font-lexend text-xl font-semibold uppercase tracking-widest text-[#4A2B1F] lg:text-2xl">
                    RETURNS
                  </h3>
                </div>
                <p className="max-w-[450px] font-lexend text-base font-normal leading-relaxed text-[#4A2B1F] lg:text-lg">
                  Due to the artisanal nature of our formulations, we accept returns on unopened products within 7 days of delivery. Sample sizes are final sale.
                </p>
              </div>
            </div>
          )}

          {activeTab === "policies" && (
            <div className="max-w-[800px] px-4 lg:ml-12 lg:px-0">
              <h3 className="mb-6 font-lexend text-base font-semibold uppercase text-[#4A2B1F] lg:text-lg">
                Our Policies
              </h3>
              <div className="mb-6">
                <h4 className="mb-2 font-lexend text-sm font-semibold text-[#4A2B1F]">
                  Privacy Policy
                </h4>
                <p className="font-lexend text-sm font-normal leading-relaxed text-[#4A2B1F] lg:text-base">
                  We respect your privacy and are committed to protecting your personal data. Your information is never shared with third parties without your consent.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-lexend text-sm font-semibold text-[#4A2B1F]">
                  Terms of Service
                </h4>
                <p className="font-lexend text-sm font-normal leading-relaxed text-[#4A2B1F] lg:text-base">
                  By using our website and purchasing our products, you agree to our terms of service. All products are subject to availability.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Client Reviews Section */}
      <div className="mx-auto w-full max-w-[1920px] bg-[#F5F1EB] px-6 py-16 md:px-8 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Left Side - Rating Summary */}
          <div>
            <h2 className="mb-6 font-lexend text-2xl font-semibold uppercase tracking-wide text-black lg:text-3xl xl:text-[32px]">
              CLIENT REVIEWS
            </h2>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-lexend text-4xl font-semibold text-black lg:text-5xl">
                4.9
              </span>
              <div>
                <div className="mb-1 flex gap-0.5">
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
                <span className="font-lexend text-xs font-normal uppercase text-black">
                  BASED ON 20 REVIEWS
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="h-12 w-full border border-black bg-transparent font-lexend text-sm font-medium uppercase tracking-wide text-black sm:w-[280px]"
            >
              WRITE A REVIEW
            </button>
          </div>

          {/* Right Side - Reviews List */}
          <div className="max-w-full lg:max-w-[600px]">
            {/* Review 1 */}
            <div className="mb-8 border-b border-[#E0E0E0] pb-8">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex gap-0.5">
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
                <span className="font-lexend text-xs font-normal text-black">
                  NOV 12, 2025
                </span>
              </div>
              <h4 className="mb-3 font-lexend text-sm font-semibold uppercase tracking-wide text-black lg:text-base">
                LIFE CHANGING CLARITY
              </h4>
              <p className="mb-4 font-lexend text-sm font-normal leading-relaxed text-black">
                "I've tried many adaptogens, but the purity of Cleanse's is evident. The anxiety reduction was noticeable within the first week. Highly recommend the product.
              </p>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-lexend text-xs font-normal uppercase text-black">
                  VERIFIED USER - AKSHAT JAIN
                </span>
              </div>
            </div>

            {/* Review 2 */}
            <div>
              <div className="mb-3 flex items-start justify-between">
                <div className="flex gap-0.5">
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
                <span className="font-lexend text-xs font-normal text-black">
                  NOV 12, 2025
                </span>
              </div>
              <h4 className="mb-3 font-lexend text-sm font-semibold uppercase tracking-wide text-black lg:text-base">
                LIFE CHANGING CLARITY
              </h4>
              <p className="mb-4 font-lexend text-sm font-normal leading-relaxed text-black">
                "I've tried many adaptogens, but the purity of Cleanse's is evident. The anxiety reduction was noticeable within the first week. Highly recommend the product.
              </p>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-lexend text-xs font-normal uppercase text-black">
                  VERIFIED USER - AKSHAT JAIN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="mx-auto w-full max-w-[1920px] bg-[#F5F1EB] px-6 pb-20 pt-12 md:px-8 lg:px-12 lg:pb-24 xl:px-16 2xl:px-20">
        <h2 className="mb-10 text-center font-lexend text-2xl font-normal uppercase tracking-widest text-black lg:mb-12 lg:text-3xl xl:text-[32px]">
          RECOMMENDED FOR YOU
        </h2>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex w-full max-w-[329px] flex-col">
              {/* Product Image */}
              <div className="mb-4 aspect-[329/367] w-full rounded-xl bg-[#D9D9D9]" />
              {/* Product Name */}
              <h3 className="mb-1 font-lexend text-lg font-bold text-black lg:text-xl">
                Product {item}
              </h3>
              {/* Product Description */}
              <p className="mb-3 font-inter text-sm font-normal text-black lg:text-base">
                Description of the product
              </p>
              {/* Price and Quick Add */}
              <div className="flex items-center gap-4">
                <span className="font-inter text-lg font-normal text-black lg:text-xl">
                  ₹400
                </span>
                <button
                  className="h-10 flex-1 rounded bg-[#D9D9D9] font-lexend text-sm font-medium text-black"
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
      <div className="mx-auto w-full max-w-[1920px] overflow-hidden rounded-t-[40px] lg:rounded-t-[60px] xl:rounded-t-[80px]">
        <Footer />
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[600px] overflow-y-auto bg-white p-6 lg:p-10 xl:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute right-4 top-4 bg-transparent p-2 lg:right-6 lg:top-6"
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
            <h2 className="mb-2 font-lexend text-xl font-semibold uppercase tracking-widest text-black lg:text-2xl xl:text-[28px]">
              SHARE YOUR REVIEW
            </h2>
            <p className="mb-6 font-lexend text-xs font-normal uppercase tracking-wide text-[#666666] lg:mb-8 lg:text-sm">
              YOUR FEEDBACK HELPS THE COMMUNITY GROW.
            </p>

            {/* Overall Rating */}
            <div className="mb-6 lg:mb-8">
              <p className="mb-3 font-lexend text-xs font-medium uppercase tracking-widest text-black">
                OVERALL RATING
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="bg-transparent p-0"
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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <div className="flex-1">
                <p className="mb-3 font-lexend text-xs font-medium uppercase tracking-widest text-black">
                  YOUR NAME
                </p>
                <input
                  type="text"
                  placeholder="e.g. Elena R"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full border border-[#E5E5E5] p-3 font-lexend text-sm text-black outline-none lg:p-4"
                />
              </div>
              <div className="flex-1">
                <p className="mb-3 font-lexend text-xs font-medium uppercase tracking-widest text-black">
                  EMAIL ADDRESS
                </p>
                <input
                  type="email"
                  placeholder="Only for verification purposes"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  className="w-full border border-[#E5E5E5] p-3 font-lexend text-sm text-black outline-none lg:p-4"
                />
              </div>
            </div>

            {/* Review Title */}
            <div className="mb-6">
              <p className="mb-3 font-lexend text-xs font-medium uppercase tracking-widest text-black">
                REVIEW TITLE
              </p>
              <input
                type="text"
                placeholder="Summarize your experience in one line"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full border border-[#E5E5E5] p-3 font-lexend text-sm text-black outline-none lg:p-4"
              />
            </div>

            {/* Review Details */}
            <div className="mb-6">
              <p className="mb-3 font-lexend text-xs font-medium uppercase tracking-widest text-black">
                REVIEW DETAILS
              </p>
              <textarea
                placeholder="How did you feel after using our product"
                value={reviewDetails}
                onChange={(e) => setReviewDetails(e.target.value)}
                className="h-[120px] w-full resize-none border border-[#E5E5E5] p-3 font-lexend text-sm text-black outline-none lg:p-4"
              />
            </div>

            {/* Confirmation Checkbox */}
            <div className="mb-6 lg:mb-8">
              <label className="flex cursor-pointer items-center gap-3">
                <div
                  onClick={() => setReviewConfirmed(!reviewConfirmed)}
                  className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full ${
                    reviewConfirmed ? "bg-[#C9A86C]" : "border-2 border-[#CCCCCC] bg-transparent"
                  }`}
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
                <span className="font-lexend text-xs font-normal uppercase tracking-wide text-[#666666]">
                  I CONFIRM THIS IS A GENUINE EXPERIENCE.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="h-12 w-full bg-[#D9D9D9] font-lexend text-sm font-semibold uppercase tracking-widest text-black lg:h-14"
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
