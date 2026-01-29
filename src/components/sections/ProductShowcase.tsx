"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getHomepageSections, type HomepageSection } from "@/lib/api";

export const ProductShowcase: React.FC = () => {
  const [sectionData, setSectionData] = useState<HomepageSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProductShowcase = async () => {
      try {
        setIsLoading(true);
        console.log('[ProductShowcase] Fetching product_showcase section from API...');

        const sectionResponse = await getHomepageSections('product_showcase');
        if (sectionResponse.data?.sections && sectionResponse.data.sections.length > 0) {
          setSectionData(sectionResponse.data.sections[0]);
          console.log('[ProductShowcase] ✅ Successfully fetched product showcase section:', {
            id: sectionResponse.data.sections[0]._id,
            name: sectionResponse.data.sections[0].name,
          });
        } else {
          console.warn('[ProductShowcase] ⚠️ No product showcase section found');
        }
      } catch (error) {
        console.error('[ProductShowcase] ❌ Failed to fetch product showcase:', error);
      } finally {
        setIsLoading(false);
        console.log('[ProductShowcase] Loading complete');
      }
    };

    fetchProductShowcase();
  }, []);

  const handleImageError = () => {
    console.error('[ProductShowcase] ❌ Failed to load product image');
    setImageError(true);
  };

  // Don't render if no data
  if (!sectionData?.showcase_product) {
    return null;
  }

  const { showcase_product } = sectionData;
  const backgroundColor = sectionData.background_color || "#FFFFFF";
  const textColor = sectionData.text_color || "#000000";
  const isImageLeft = showcase_product.layout === "image_left";

  return (
    <section className="w-full" style={{ backgroundColor }}>
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${isImageLeft ? '' : 'lg:flex-row-reverse'}`}>
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            {showcase_product.image_url && !imageError ? (
              <img
                src={showcase_product.image_url}
                alt={showcase_product.heading || "Product"}
                className="w-full h-auto object-cover rounded-lg"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-400">Product Image</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            {sectionData.heading && (
              <h2
                style={{
                  fontFamily: "Lexend Exa, sans-serif",
                  fontWeight: 400,
                  fontSize: "42px",
                  lineHeight: "110%",
                  letterSpacing: "0",
                  textTransform: "uppercase",
                  color: textColor,
                  marginBottom: "16px",
                }}
              >
                {sectionData.heading}
              </h2>
            )}

            {showcase_product.heading && (
              <h3
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "32px",
                  lineHeight: "120%",
                  color: textColor,
                  marginBottom: "16px",
                }}
              >
                {showcase_product.heading}
              </h3>
            )}

            {showcase_product.description && (
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "160%",
                  color: textColor,
                  opacity: 0.8,
                  marginBottom: "32px",
                }}
              >
                {showcase_product.description}
              </p>
            )}

            {showcase_product.cta_text && showcase_product.product_id && (
              <Link
                href={`/product/${showcase_product.product_id}`}
                className="inline-flex items-center justify-center bg-dark-brown text-white transition-opacity hover:opacity-90"
                style={{
                  padding: "16px 48px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  borderRadius: "4px",
                }}
              >
                {showcase_product.cta_text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
