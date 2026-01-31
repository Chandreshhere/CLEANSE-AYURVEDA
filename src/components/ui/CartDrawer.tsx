"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context";
import { getProductBySlug, getProductsByCategory, type Product } from "@/lib/api";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount, addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({ minutes: 7, seconds: 45 });
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  // Fetch products from same category when cart items change
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (cartItems.length === 0) {
        setRelatedProducts([]);
        return;
      }

      try {
        // Get the first item's slug to fetch product details
        const firstItemSlug = cartItems[0].slug;

        // Fetch full product details to get the category
        const productResponse = await getProductBySlug(firstItemSlug);
        const product = productResponse.data.product;

        // Get the primary category
        const primaryCategory = product.categories?.find((cat) => cat.isPrimary);

        if (!primaryCategory) {
          console.warn('[CartDrawer] No primary category found for product');
          setRelatedProducts([]);
          return;
        }

        // Fetch products from the same category
        const categoryResponse = await getProductsByCategory(
          primaryCategory.slug,
          1,
          10
        );

        console.log('[CartDrawer] 🔍 Raw API Response:', categoryResponse);

        // Filter out products already in cart
        const filteredProducts = categoryResponse.data.products.filter(
          (product) => !cartItems.some((item) => item.slug === product.slug)
        );

        // Take first 3 products
        const recommendedProducts = filteredProducts.slice(0, 3);
        setRelatedProducts(recommendedProducts);

        console.log('[CartDrawer] ✅ Fetched category products:', {
          category: primaryCategory.name,
          count: recommendedProducts.length,
          products: recommendedProducts.map(p => ({
            name: p.name,
            pricing: p.pricing,
            primaryImage: p.primaryImage,
            fullProduct: p
          }))
        });
      } catch (error) {
        console.error('[CartDrawer] Error fetching category products:', error);
        setRelatedProducts([]);
      }
    };

    fetchCategoryProducts();
  }, [cartItems]);

  const formatTime = () => {
    return `${timeLeft.minutes}:${timeLeft.seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-513px",
          width: "513px",
          height: "100vh",
          maxHeight: "1033px",
          backgroundColor: "#FFFFFF",
          zIndex: 999,
          transition: "right 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 32px",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Basket Icon */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12H32L30 32H10L8 12Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 12V8C14 5.79086 15.7909 4 18 4H22C24.2091 4 26 5.79086 26 8V12"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#000000",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              YOUR BASKET ({cartCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
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
        </div>

        {/* Loyalty Points Banner */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            padding: "12px 32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            YOU HAVE 738 LOYALTY POINTS
          </p>
        </div>

        {/* Timer Banner */}
        <div
          style={{
            backgroundColor: "#FFE8E8",
            padding: "12px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "1px solid #FF6B6B",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9" stroke="#FF6B6B" strokeWidth="2" />
            <path
              d="M10 5V10L13 13"
              stroke="#FF6B6B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
            ITEMS RESERVED FOR {formatTime()}
          </p>
        </div>

        {/* Gift Progress */}
        <div style={{ padding: "24px 32px", borderBottom: "1px solid #E5E5E5" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              SPEND ₹220 MORE FOR A GIFT
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="8"
                width="18"
                height="13"
                rx="2"
                stroke="#000000"
                strokeWidth="1.5"
              />
              <path d="M3 12H21" stroke="#000000" strokeWidth="1.5" />
              <path d="M12 8V21" stroke="#000000" strokeWidth="1.5" />
              <path
                d="M12 8C12 8 12 5 9 5C6 5 6 8 9 8"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 8C12 8 12 5 15 5C18 5 18 8 15 8"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#E5E5E5",
              borderRadius: "4px",
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

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div style={{ padding: "48px 32px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "#999999",
                marginBottom: "16px",
              }}
            >
              Your cart is empty
            </p>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "#4A2B1F",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={`${item.productId}-${item.variantId || ''}`} style={{ padding: "24px 32px", borderBottom: "1px solid #E5E5E5" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                {/* Product Image */}
                <Link href={`/product/${item.slug}`} onClick={onClose}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#E5E5E5",
                      borderRadius: "8px",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </Link>
                {/* Product Details */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <Link href={`/product/${item.slug}`} onClick={onClose} style={{ textDecoration: "none" }}>
                      <h3
                        style={{
                          fontFamily: "Lexend, sans-serif",
                          fontWeight: 600,
                          fontSize: "16px",
                          color: "#000000",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.name}
                      </h3>
                    </Link>
                    <span
                      style={{
                        fontFamily: "Lexend, sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      ₹{item.price}
                    </span>
                  </div>
                  {item.variantName && (
                    <p
                      style={{
                        fontFamily: "Lexend, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#999999",
                        marginBottom: "16px",
                      }}
                    >
                      {item.variantName}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #E5E5E5",
                        borderRadius: "4px",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.variantId)}
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
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
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
                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      style={{
                        background: "none",
                        border: "none",
                        fontFamily: "Lexend, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#999999",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Add A Companion Section */}
        {relatedProducts.length > 0 && (
          <div style={{ padding: "24px 32px", borderBottom: "1px solid #E5E5E5" }}>
            <h3
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              ADD A COMPANION
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {relatedProducts.map((product) => (
                <div
                  key={product._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                  }}
                >
                  <Link href={`/product/${product.slug}`} onClick={onClose}>
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#E5E5E5",
                        borderRadius: "4px",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      {product.primaryImage?.url && (
                        <img
                          src={product.primaryImage.url}
                          alt={product.primaryImage.altText || product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link href={`/product/${product.slug}`} onClick={onClose} style={{ textDecoration: "none" }}>
                      <p
                        style={{
                          fontFamily: "Lexend, sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#000000",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.name}
                      </p>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <p
                        style={{
                          fontFamily: "Lexend, sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#000000",
                        }}
                      >
                        ₹{(product.pricing && product.pricing.salePrice) || (product.pricing && product.pricing.mrp) || 0}
                      </p>
                      {product.pricing && product.pricing.mrp && product.pricing.salePrice && product.pricing.mrp > product.pricing.salePrice && (
                        <p
                          style={{
                            fontFamily: "Lexend, sans-serif",
                            fontWeight: 400,
                            fontSize: "12px",
                            color: "#999999",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{product.pricing.mrp}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const price = (product.pricing && product.pricing.salePrice) || (product.pricing && product.pricing.mrp) || 0;
                      const mrp = product.pricing && product.pricing.mrp;
                      addToCart({
                        productId: product._id,
                        slug: product.slug,
                        name: product.name,
                        image: product.primaryImage?.url,
                        price: price,
                        mrp: mrp,
                      });
                    }}
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
              ))}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div style={{ padding: "24px 32px", borderTop: "1px solid #E5E5E5" }}>
          {/* Estimated Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              ESTIMATED TOTAL
            </p>
            <span
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              ₹{cartTotal.toFixed(0)}
            </span>
          </div>
          <p
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "#999999",
              textAlign: "center",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            TAXES AND SHIPPING CALCULATED AT CHECKOUT
          </p>

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
              marginBottom: "12px",
            }}
          >
            PROCEED TO CHECKOUT
          </button>

          {/* Continue Shopping Button */}
          <button
            style={{
              width: "100%",
              height: "52px",
              backgroundColor: "#F5F5F5",
              border: "none",
              borderRadius: "8px",
              fontFamily: "Lexend, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#000000",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
