"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { TopUtilityBar, MainHeader, Footer } from "@/components/layout";
import { Skeleton } from "@/components/ui";
import { getProducts, getCategories, getCategoryProducts, type Product as APIProduct, type Category } from "@/lib/api";

// Product Card Component for Shop Page
const ShopProductCard: React.FC<{ product: APIProduct }> = ({ product }) => {
  const rating = product.ratingSummary?.average || 0;
  const displayPrice = product.pricing?.salePrice || product.pricing?.mrp || 0;

  return (
    <Link href={`/product/${product.slug}`} className="block">
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
        {/* Product Image */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#F5F5F0",
            minHeight: 0,
            overflow: "hidden",
            position: "relative",
            borderRadius: "20px",
          }}
        >
          {product.primaryImage?.url ? (
            <img
              src={product.primaryImage.url}
              alt={product.primaryImage.altText || product.name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#E5E5E5",
                borderRadius: "8px",
              }}
            />
          )}

          {/* Header Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#666666",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {product.brand?.name || "CLEANSE AYURVEDA"}
            </p>
            {rating > 0 && (
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
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#FFFFFF",
            flexShrink: 0,
            minHeight: "140px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
              gap: "16px",
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
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                wordBreak: "break-word",
                margin: 0,
                minWidth: 0,
              }}
            >
              {product.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0, minWidth: "fit-content" }}>
              {product.pricing?.discountPercent && product.pricing.discountPercent > 0 ? (
                <>
                  <span
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: "20px",
                      color: "#000000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹{displayPrice}
                  </span>
                  <span
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#666666",
                      textDecoration: "line-through",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹{product.pricing.mrp}
                  </span>
                </>
              ) : (
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    color: "#000000",
                    whiteSpace: "nowrap",
                  }}
                >
                  ₹{displayPrice}
                </span>
              )}
            </div>
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
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              {product.shortDescription && `"${product.shortDescription}"`}
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
                marginLeft: "12px",
                flexShrink: 0,
                whiteSpace: "nowrap",
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

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Set active category from URL param
  useEffect(() => {
    setActiveCategory(categoryParam || "all");
  }, [categoryParam]);

  // Fetch products when category or sort changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (activeCategory === "all") {
          // Fetch all products with standard format for ratings
          const params = new URLSearchParams({
            page: page.toString(),
            limit: '20',
            format: 'standard'
          });
          const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://192.168.29.105:3000'}/api/catalog/products?${params.toString()}`;

          const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
          });

          const response = await res.json();
          if (response.data && response.data.products) {
            setProducts(response.data.products);
            setPagination({
              total: response.data.pagination.total,
              totalPages: response.data.pagination.pages,
              hasNextPage: response.data.pagination.page < response.data.pagination.pages,
              hasPrevPage: response.data.pagination.page > 1,
            });
          }
        } else {
          // Fetch products by category with standard format for ratings
          const params = new URLSearchParams({
            page: page.toString(),
            limit: '20',
            sortBy: sortBy,
            order: sortOrder,
            includeSubcategories: 'true',
            format: 'standard'
          });
          const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://192.168.29.105:3000'}/api/catalog/categories/${activeCategory}/products?${params.toString()}`;

          const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
          });

          const response = await res.json();
          if (response.data && response.data.products) {
            setProducts(response.data.products);
            setPagination({
              total: response.data.pagination.total,
              totalPages: response.data.pagination.totalPages,
              hasNextPage: response.data.pagination.hasNextPage,
              hasPrevPage: response.data.pagination.hasPrevPage,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, sortBy, sortOrder, page]);

  // Update URL when category changes
  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setPage(1); // Reset to first page
    if (categorySlug === "all") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${categorySlug}`, { scroll: false });
    }
  };

  const sortOptions = [
    { value: "createdAt", order: "desc" as "desc", label: "NEWEST" },
    { value: "name", order: "asc" as "asc", label: "NAME: A-Z" },
    { value: "name", order: "desc" as "desc", label: "NAME: Z-A" },
  ];

  // Flatten categories for display
  const flatCategories: { slug: string; name: string }[] = [
    { slug: "all", name: "ALL" },
    ...categories.flatMap((cat) => [
      { slug: cat.slug, name: cat.name },
      ...(cat.children || []).map((child) => ({ slug: child.slug, name: child.name })),
    ]),
  ];

  const currentSortLabel = sortOptions.find(
    (o) => o.value === sortBy && o.order === sortOrder
  )?.label || "NEWEST";

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
          <div style={{ display: "flex", gap: "32px", overflowX: "auto" }}>
            {flatCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: activeCategory === category.slug ? 600 : 400,
                  fontSize: "12px",
                  color: "#000000",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  paddingBottom: "8px",
                  borderBottom:
                    activeCategory === category.slug
                      ? "2px solid #000000"
                      : "2px solid transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {category.name}
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
                SORT BY: {currentSortLabel}
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
                  {sortOptions.map((option, idx) => (
                    <button
                      key={`${option.value}-${option.order}-${idx}`}
                      onClick={() => {
                        setSortBy(option.value);
                        setSortOrder(option.order);
                        setShowSortDropdown(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "12px 16px",
                        background:
                          sortBy === option.value && sortOrder === option.order
                            ? "#F5F5F5"
                            : "none",
                        border: "none",
                        fontFamily: "Lexend, sans-serif",
                        fontWeight:
                          sortBy === option.value && sortOrder === option.order ? 600 : 400,
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
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <Skeleton height="628px" width="100%" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              fontFamily: "Lexend, sans-serif",
              fontSize: "16px",
              color: "#666666",
            }}
          >
            No products found.
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 679px)",
                gap: "20px",
                paddingTop: "32px",
                paddingBottom: "40px",
                justifyContent: "center",
              }}
            >
              {products.map((product) => (
                <ShopProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                  paddingBottom: "60px",
                }}
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrevPage}
                  style={{
                    padding: "12px 24px",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: pagination.hasPrevPage ? "#000000" : "#CCCCCC",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                    cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
                  }}
                >
                  PREVIOUS
                </button>
                <span
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    color: "#666666",
                  }}
                >
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!pagination.hasNextPage}
                  style={{
                    padding: "12px 24px",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: pagination.hasNextPage ? "#000000" : "#CCCCCC",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                    cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
                  }}
                >
                  NEXT
                </button>
              </div>
            )}
          </>
        )}
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
