"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  const { openCartDrawer } = useCart();

  const handleQuickAdd = () => {
    // Add item to cart logic would go here
    openCartDrawer();
  };

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
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
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

        {/* Price and CTA */}
        <div className="flex items-center gap-4">
          {/* Price */}
          <span
            className="text-black"
            style={{
              width: "97px",
              height: "43px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: "0",
              verticalAlign: "middle",
              display: "flex",
              alignItems: "center",
            }}
          >
            ₹{price}
          </span>

          {/* Quick Add Button */}
          <button
            className="bg-dark-brown text-white"
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
    </div>
  );
};

export default ProductCard;
