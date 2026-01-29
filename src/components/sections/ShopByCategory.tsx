"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories, Category } from "@/lib/api/cms";

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, slug }) => {
  // Special positioning for different categories
  const isSkinCare = name.toLowerCase().includes('skin');
  const isHairCare = name.toLowerCase().includes('hair');
  const isFaceCare = name.toLowerCase().includes('face');

  const imageBottom = isSkinCare ? "-90px" : isHairCare ? "-5px" : isFaceCare ? "-5px" : "-17px";
  const imageRight = isSkinCare ? "-5px" : "-40px";
  const imageWidth = isSkinCare ? "360px" : "280px";

  return (
    <Link href={`/categories/${slug}`}>
      <div
        className="relative flex items-center justify-center bg-muted-beige"
        style={{
          width: "446px",
          height: "183px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <span
          className="text-black"
          style={{
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "100%",
            textTransform: "uppercase",
            letterSpacing: "0",
            position: "absolute",
            left: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          {name}
        </span>
        <img
          src={image}
          alt={name}
          className="absolute"
          style={{
            width: imageWidth,
            height: imageWidth,
            objectFit: "contain",
            objectPosition: "bottom right",
            right: imageRight,
            bottom: imageBottom,
          }}
        />
      </div>
    </Link>
  );
};

export const ShopByCategory: React.FC = () => {
  const [categories, setCategories] = useState<Array<{ name: string; image: string; slug: string }>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        if (response.data?.categories && response.data.categories.length > 0) {
          const topLevelCategories = response.data.categories
            .filter((cat) => cat.level === 0)
            .sort((a, b) => a.sortOrder - b.sortOrder) // Sort by sortOrder
            .map((cat) => ({
              name: cat.name,
              image: cat.image.url,
              slug: cat.slug,
            }));

          setCategories(topLevelCategories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
        {/* Section Heading */}
        <h2
          className="mx-auto mb-16 text-center text-black"
          style={{
            width: "502px",
            height: "53px",
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "42px",
            lineHeight: "100%",
            letterSpacing: "0",
            textTransform: "uppercase",
          }}
        >
          SHOP BY CATEGORY
        </h2>

        {/* Category Cards */}
        <div className="flex justify-center gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
              slug={category.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
