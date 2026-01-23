"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { TopUtilityBar, MainHeader, Footer } from "@/components/layout";

type CategoryType = "all" | "category1" | "category2" | "category3" | "category4";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
}

// Sample products data
const products: Product[] = [
  {
    id: 1,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category1",
    rating: 4.9,
  },
  {
    id: 2,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category1",
    rating: 4.9,
  },
  {
    id: 3,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category2",
    rating: 4.9,
  },
  {
    id: 4,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category2",
    rating: 4.9,
  },
  {
    id: 5,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category3",
    rating: 4.9,
  },
  {
    id: 6,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category3",
    rating: 4.9,
  },
  {
    id: 7,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category4",
    rating: 4.9,
  },
  {
    id: 8,
    name: "THE SIGNATURE LOVELY FACE CREAM",
    description: "This is some text",
    price: 400,
    category: "category4",
    rating: 4.9,
  },
];

// Product Card Component for Shop Page
const ShopProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block w-full">
      <div className="flex h-[500px] w-full flex-col overflow-hidden rounded-2xl bg-[#F5F5F0] lg:h-[550px] xl:h-[600px] 2xl:h-[628px]">
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">
          <p className="font-lexend text-xs font-normal uppercase text-[#666666] lg:text-sm">
            CATEGORY NAME
          </p>
          <div className="flex items-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 12 12"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 0L7.76393 3.52786L11.7063 4.1459L8.85317 6.92214L9.52786 10.8541L6 9L2.47214 10.8541L3.14683 6.92214L0.293661 4.1459L4.23607 3.52786L6 0Z" />
            </svg>
            <span className="font-lexend text-sm font-medium text-black lg:text-base">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Product Image */}
        <div className="flex flex-1 items-center justify-center bg-[#F5F5F0]">
          <div className="h-[200px] w-[140px] rounded-lg bg-[#E5E5E5] lg:h-[240px] lg:w-[160px] xl:h-[280px] xl:w-[180px]" />
        </div>

        {/* Product Info */}
        <div className="bg-white p-4 lg:p-6">
          <div className="mb-2 flex items-start justify-between lg:mb-3">
            <h3 className="max-w-[70%] font-lexend text-sm font-bold uppercase leading-tight text-black lg:text-base xl:text-lg">
              {product.name}
            </h3>
            <span className="font-lexend text-base font-semibold text-black lg:text-lg xl:text-xl">
              ₹{product.price}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-lexend text-xs font-normal text-[#666666] lg:text-sm">
              &quot;{product.description}&quot;
            </p>
            <span className="font-lexend text-xs font-medium uppercase text-black underline lg:text-sm">
              VIEW CLINICALS
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Set active category from URL param on mount and when param changes
  useEffect(() => {
    if (categoryParam && ["category1", "category2", "category3", "category4"].includes(categoryParam)) {
      setActiveCategory(categoryParam as CategoryType);
    } else {
      setActiveCategory("all");
    }
  }, [categoryParam]);

  // Update URL when category changes
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    if (category === "all") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${category}`, { scroll: false });
    }
  };

  const categories: { id: CategoryType; label: string }[] = [
    { id: "all", label: "ALL" },
    { id: "category1", label: "CATEGORY 1" },
    { id: "category2", label: "CATEGORY 2" },
    { id: "category3", label: "CATEGORY 3" },
    { id: "category4", label: "CATEGORY 4" },
  ];

  const sortOptions = [
    { value: "featured", label: "FEATURED" },
    { value: "price-low", label: "PRICE: LOW TO HIGH" },
    { value: "price-high", label: "PRICE: HIGH TO LOW" },
    { value: "newest", label: "NEWEST" },
  ];

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <TopUtilityBar />
      <MainHeader />

      {/* Hero Banner */}
      <div className="mx-auto h-[300px] w-full max-w-[1920px] bg-[#C5C5B8] md:h-[400px] lg:h-[450px] xl:h-[507px]" />

      {/* Category Navigation & Filters */}
      <div className="mx-auto w-full max-w-[1920px] px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col gap-4 border-b border-[#E5E5E5] py-4 lg:flex-row lg:items-center lg:justify-between lg:py-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 lg:gap-6 xl:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`border-b-2 pb-2 font-lexend text-xs uppercase lg:text-sm ${
                  activeCategory === category.id
                    ? "border-black font-semibold"
                    : "border-transparent font-normal"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort & Filter */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Sort Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "none",
                  border: "none",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#000000",
                  cursor: "pointer",
                }}
              >
                SORT BY: {sortOptions.find((o) => o.value === sortBy)?.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: showSortDropdown ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {showSortDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    minWidth: "200px",
                  }}
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "12px 16px",
                        background: sortBy === option.value ? "#F5F5F5" : "none",
                        border: "none",
                        fontFamily: "Lexend, sans-serif",
                        fontWeight: sortBy === option.value ? 600 : 400,
                        fontSize: "12px",
                        color: "#000000",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "#000000",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 12H18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 18H16"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              FILTERS
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-5 pb-16 pt-8 md:grid-cols-2 lg:gap-6 lg:pb-20 xl:gap-8 xl:pb-24">
          {filteredProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
