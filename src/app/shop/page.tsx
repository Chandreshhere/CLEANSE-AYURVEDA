"use client";

import React, { useState, useEffect, Suspense } from "react";
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
    <Link href={`/product/${product.id}`} className="block">
      <div
        style={{
          width: "679px",
          height: "628px",
          backgroundColor: "#F5F5F0",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "#666666",
              textTransform: "uppercase",
            }}
          >
            CATEGORY NAME
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="16"
              height="16"
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
                fontSize: "16px",
                color: "#000000",
              }}
            >
              {product.rating}
            </span>
          </div>
        </div>

        {/* Product Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F5F5F0",
          }}
        >
          <div
            style={{
              width: "180px",
              height: "280px",
              backgroundColor: "#E5E5E5",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Product Info */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
            }}
          >
            <h3
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#000000",
                textTransform: "uppercase",
                maxWidth: "400px",
                lineHeight: "1.3",
              }}
            >
              {product.name}
            </h3>
            <span
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              ₹{product.price}
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
                fontSize: "14px",
                color: "#666666",
              }}
            >
              "{product.description}"
            </p>
            <span
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#000000",
                textTransform: "uppercase",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              VIEW CLINICALS
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

function ShopContent() {
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
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <TopUtilityBar />
      <MainHeader />

      {/* Hero Banner - 667px total height including header */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          height: "507px",
          backgroundColor: "#C5C5B8",
          margin: "0 auto",
        }}
      />

      {/* Category Navigation & Filters */}
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            paddingBottom: "24px",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: "flex", gap: "32px" }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: activeCategory === category.id ? 600 : 400,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  paddingBottom: "8px",
                  borderBottom: activeCategory === category.id ? "2px solid #000000" : "2px solid transparent",
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort & Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 679px)",
            gap: "20px",
            paddingTop: "32px",
            paddingBottom: "100px",
            justifyContent: "center",
          }}
        >
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
