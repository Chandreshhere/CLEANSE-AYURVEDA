"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context";

interface ProductCardProps {
  // Support both old format (id) and new format (slug)
  id?: number | string;
  slug?: string;
  name: string;
  description: string;
  // Support both old format (price) and new format (pricing object)
  price?: number;
  pricing?: {
    mrp: number;
    salePrice: number;
    discountPercent: number;
  };
  // Support both old format (image) and new format (primaryImage object)
  image?: string;
  primaryImage?: {
    url: string;
    altText: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  description,
  price,
  pricing,
  image,
  primaryImage,
}) => {
  const { openCartDrawer } = useCart();

  const handleQuickAdd = () => {
    // Add item to cart logic would go here
    openCartDrawer();
  };

  // Determine which link format to use (prioritize slug over id)
  const productLink = slug ? `/product/${slug}` : `/product/${id}`;

  // Determine which image to use (prioritize primaryImage over image)
  const imageUrl = primaryImage?.url || image;
  const imageAlt = primaryImage?.altText || name;

  // Determine which price to display (prioritize pricing.salePrice over price)
  const displayPrice = pricing?.salePrice || price;
  const originalPrice = pricing?.mrp;
  const discount = pricing?.discountPercent;

  return (
    <div className="flex w-full max-w-[329px] flex-col lg:max-w-[350px] xl:max-w-[380px] 2xl:max-w-[400px]">
      {/* Product Image - Clickable */}
      <Link href={productLink} className="group cursor-pointer">
        <div className="aspect-[329/367] w-full overflow-hidden rounded-xl bg-white">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
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
          className="font-lexend text-xl font-bold text-black lg:text-2xl"
          style={{ lineHeight: "100%" }}
        >
          {name}
        </h3>

        {/* Product Description */}
        <p
          className="mt-1 font-inter text-base text-black lg:text-lg xl:text-xl"
          style={{ lineHeight: "120%" }}
        >
          {description}
        </p>

        {/* Price and CTA */}
        <div className="mt-3 flex flex-wrap items-center gap-3 lg:gap-4">
          {/* Price with discount display */}
          <div className="flex items-center gap-2">
            <span className="font-inter text-xl font-normal text-black lg:text-2xl">
              ₹{displayPrice}
            </span>
            {originalPrice && originalPrice > displayPrice && (
              <>
                <span className="font-inter text-sm text-gray-500 line-through lg:text-base">
                  ₹{originalPrice}
                </span>
                {discount && (
                  <span className="font-inter text-sm font-medium text-green-600 lg:text-base">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            className="flex-1 bg-dark-brown px-6 py-2.5 font-lexend text-sm font-medium text-white transition-opacity hover:opacity-90 lg:px-8 lg:py-3"
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
