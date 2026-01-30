"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProducts, type Product } from "@/lib/api";

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        console.log('[FeaturedProducts] Fetching featured products from API...');

        const response = await getProducts(true, undefined, 5);

        if (response.data?.products && response.data.products.length > 0) {
          setProducts(response.data.products);
          console.log('[FeaturedProducts] ✅ Successfully fetched featured products:', {
            count: response.data.products.length,
            products: response.data.products.map(p => ({
              id: p._id,
              name: p.name,
              price: p.pricing?.salePrice,
              mrp: p.pricing?.mrp,
              hasImage: !!p.primaryImage?.url,
            })),
          });
        }
      } catch (error) {
        console.error('[FeaturedProducts] ❌ Failed to fetch featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Always render section to avoid hydration mismatch
  return (
    <section className="w-full" style={{ backgroundColor: "#FCF6EB" }}>
      <div className="mx-auto max-w-[1920px] px-4 pb-20 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:pb-28 xl:px-32">
        {/* Section Title */}
        <h2
          className="mx-auto mb-12 text-black lg:mb-16"
          style={{
            width: "671px",
            height: "53px",
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "42px",
            lineHeight: "100%",
            letterSpacing: "0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          OUR FEATURED PRODUCTS
        </h2>

        {/* Product Grid */}
        <div className="flex justify-center gap-5 lg:gap-6">
          {products.length > 0 ? (
            products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                id={product.slug}
                name={product.name}
                description={product.shortDescription || product.description || ''}
                price={product.pricing?.salePrice || 0}
                mrp={product.pricing?.mrp}
                image={product.primaryImage?.url}
                rating={product.rating}
                reviewsCount={product.reviews_count}
              />
            ))
          ) : (
            // Loading skeleton
            <>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{
                    width: "340px",
                    height: "450px",
                    backgroundColor: "#E5E5E5",
                    borderRadius: "12px",
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
