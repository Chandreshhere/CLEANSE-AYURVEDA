"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context";

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  mrp?: number;
  image?: string;
  rating?: number;
  reviewsCount?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  mrp,
  image,
  rating,
  reviewsCount,
}) => {
  const { openCartDrawer } = useCart();
  const [imageError, setImageError] = React.useState(false);

  const handleQuickAdd = () => {
    // Add item to cart logic would go here
    openCartDrawer();
  };

  const handleImageError = () => {
    console.warn(`[ProductCard] ⚠️ Failed to load image for product: ${name}`, image);
    setImageError(true);
  };

  const hasDiscount = mrp && mrp > price && price > 0;
  const discountPercentage = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const hasValidPrice = price > 0;

  return (
    <div className="flex flex-col">
      {/* Product Image - Clickable */}
      <Link href={`/product/${id}`} className="group cursor-pointer">
        <div
          className="overflow-hidden bg-white"
          style={{
            width: "329px",
            height: "367px",
            borderRadius: "12px",
          }}
        >
          {image && !imageError ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-light-grey/50 transition-transform duration-300 ease-out group-hover:scale-105">
              <span className="text-sm text-muted-brown">Product Image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info - Not clickable */}
      <div className="mt-4 flex flex-col">
        {/* Product Name */}
        <h3
          className="text-black"
          style={{
            width: "213px",
            height: "45px",
            fontFamily: "Lexend, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0",
          }}
        >
          {name}
        </h3>

        {/* Product Description */}
        <p
          className="text-black"
          style={{
            width: "305px",
            height: "43px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0",
          }}
        >
          {description}
        </p>

        {/* Rating (if available) */}
        {rating !== undefined && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span
                className="ml-1 text-black"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                }}
              >
                {rating.toFixed(1)}
              </span>
            </div>
            {reviewsCount !== undefined && reviewsCount > 0 && (
              <span
                className="text-gray-500"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                ({reviewsCount} reviews)
              </span>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="mt-2 flex items-center gap-4">
          {/* Price */}
          <div className="flex items-center gap-2">
            {hasValidPrice ? (
              <>
                <span
                  className="text-black"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "24px",
                    lineHeight: "100%",
                    letterSpacing: "0",
                  }}
                >
                  ₹{price}
                </span>
                {hasDiscount && (
                  <>
                    <span
                      className="text-gray-400 line-through"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "18px",
                      }}
                    >
                      ₹{mrp}
                    </span>
                    <span
                      className="text-green-600"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </>
            ) : (
              <span
                className="text-gray-600"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                }}
              >
                Contact for Price
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Button */}
        <button
          className="mt-3 bg-dark-brown text-white"
          style={{
            width: "213px",
            height: "43px",
            paddingTop: "6px",
            paddingRight: "46px",
            paddingBottom: "6px",
            paddingLeft: "46px",
            fontFamily: "Lexend, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={handleQuickAdd}
        >
          Quick Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
