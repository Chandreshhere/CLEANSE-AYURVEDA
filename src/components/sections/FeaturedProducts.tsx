"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { catalogService, Product } from "@/services";

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await catalogService.getFeaturedProducts(1, 10);

        if (response.success && response.data) {
          setProducts(response.data.products);
        } else {
          setError(response.error || "Failed to load products");
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-8 pb-16 md:px-12 lg:px-16 lg:pb-24 xl:px-20 xl:pb-28 2xl:px-24">
        {/* Section Title */}
        <h2 className="mx-auto mb-10 text-center font-lexend-exa text-2xl font-normal uppercase text-black md:text-3xl lg:mb-16 lg:text-4xl xl:text-[42px]">
          OUR FEATURED PRODUCTS
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-dark-brown border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-lg bg-red-50 p-6 text-center">
            <p className="font-inter text-base text-red-800 lg:text-lg">
              {error}
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 justify-items-center gap-6 lg:grid-cols-4 lg:gap-8 xl:gap-10 2xl:gap-12">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                slug={product.slug}
                name={product.name}
                description={product.shortDescription}
                pricing={product.pricing}
                primaryImage={product.primaryImage}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="rounded-lg bg-gray-50 p-6 text-center">
            <p className="font-inter text-base text-gray-600 lg:text-lg">
              No featured products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
