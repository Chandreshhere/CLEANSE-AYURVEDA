"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getHomepageSections, type HomepageSection, type Product } from "@/lib/api";
import { Skeleton, BentoImageSkeleton, ProductCardSkeleton } from "@/components/ui";

interface BentoImage {
  url: string;
  alt_text: string;
  link_url: string | null;
}

interface BentoProduct {
  product_id: string;
  custom_image_url: string | null;
  product?: Product;
  available?: boolean;
}

interface TextOverlay {
  heading: string;
  body: string;
  position: string;
}

interface BentoItems {
  images: BentoImage[];
  products: BentoProduct[];
  text_overlays: TextOverlay[];
}

interface BentoLayoutSection extends HomepageSection {
  bento_items?: BentoItems;
}

interface ProductWithCustomImage extends Product {
  custom_image_url?: string | null;
}

interface ProductSpotlightCardProps {
  title: string;
  price: string;
  image: string;
  slug: string;
}

interface SpotlightImageProps {
  width: string;
  height: string;
}

const ProductSpotlightCard: React.FC<ProductSpotlightCardProps & { imageSize: SpotlightImageProps }> = ({
  title,
  price,
  image,
  imageSize,
  slug,
}) => (
  <Link href={`/product/${slug}`}>
    <div
      className="relative overflow-hidden bg-muted-beige cursor-pointer hover:opacity-90 transition-opacity"
      style={{
        width: "330px",
        height: "335px",
        borderRadius: "20px",
      }}
    >
      {/* Text at top left */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "216px",
        }}
      >
        <p
          className="text-black"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "120%",
            letterSpacing: "0",
            marginBottom: "8px",
          }}
        >
          {title}
        </p>
        <p
          className="text-black"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0",
          }}
        >
          {price}
        </p>
      </div>
      {/* Image at bottom center */}
      <img
        src={image}
        alt={title}
        style={{
          width: imageSize.width,
          height: imageSize.height,
          objectFit: "contain",
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "90%",
          maxHeight: "230px",
        }}
      />
    </div>
  </Link>
);

interface FloatingProductCardProps {
  name: string;
  price: string;
  image: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  slug: string;
}

const FloatingProductCard: React.FC<FloatingProductCardProps> = ({
  name,
  price,
  image,
  position,
  slug,
}) => (
  <Link href={`/product/${slug}`}>
    <div
      className="absolute flex items-center bg-muted-beige cursor-pointer hover:opacity-90 transition-opacity"
      style={{
        width: "365px",
        height: "164px",
        borderRadius: "20px",
        padding: "16px",
        ...position,
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "96px",
          height: "131px",
          borderRadius: "8px",
          objectFit: "contain",
        }}
      />
      <div className="ml-4">
        <p
          className="text-black"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "100%",
            marginBottom: "8px",
          }}
        >
          {name}
        </p>
        <p
          className="text-black"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
          }}
        >
          {price}
        </p>
      </div>
    </div>
  </Link>
);

export const WhyBestSection: React.FC = () => {
  const [sectionData, setSectionData] = useState<BentoLayoutSection | null>(null);
  const [showcaseSection, setShowcaseSection] = useState<HomepageSection | null>(null);
  const [products, setProducts] = useState<ProductWithCustomImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBentoLayout = async () => {
      try {
        setIsLoading(true);
        console.log('[WhyBestSection] Fetching bento_layout section from API...');

        const response = await getHomepageSections('bento_layout');

        if (response.data?.sections && response.data.sections.length > 0) {
          const section = response.data.sections[0] as BentoLayoutSection;
          setSectionData(section);

          console.log('[WhyBestSection] ✅ Successfully fetched bento layout:', {
            id: section._id,
            name: section.name,
            hasImages: section.bento_items?.images?.length || 0,
            hasProducts: section.bento_items?.products?.length || 0,
            hasTextOverlays: section.bento_items?.text_overlays?.length || 0,
          });

          console.log('[WhyBestSection] 🔍 Raw bento_items.products:', section.bento_items?.products);

          // Extract products from the API response (they're already populated)
          if (section.bento_items?.products && section.bento_items.products.length > 0) {
            console.log('[WhyBestSection] 🔍 Processing products...');

            const extractedProducts = section.bento_items.products
              .filter((item: BentoProduct) => {
                console.log('[WhyBestSection] 🔍 Filtering item:', {
                  product_id: item.product_id,
                  has_product: !!item.product,
                  available: item.available,
                  product_name: item.product?.name,
                });
                return item.product && item.available !== false;
              })
              .map((item: BentoProduct) => {
                const mapped = {
                  ...item.product!,
                  custom_image_url: item.custom_image_url,
                };
                console.log('[WhyBestSection] 🔍 Mapped product:', {
                  name: mapped.name,
                  price: mapped.pricing?.salePrice,
                  custom_image_url: mapped.custom_image_url,
                });
                return mapped;
              });

            setProducts(extractedProducts as ProductWithCustomImage[]);
            console.log('[WhyBestSection] ✅ Extracted products:', extractedProducts.length, extractedProducts);
          } else {
            console.warn('[WhyBestSection] ⚠️ No products found in bento_items');
          }
        } else {
          console.warn('[WhyBestSection] ⚠️ No bento_layout sections found in response');
        }

        // Fetch product showcase section for the full-width display
        console.log('[WhyBestSection] Fetching product_showcase section from API...');
        const showcaseResponse = await getHomepageSections('product_showcase');
        if (showcaseResponse.data?.sections && showcaseResponse.data.sections.length > 0) {
          setShowcaseSection(showcaseResponse.data.sections[0]);
          console.log('[WhyBestSection] ✅ Successfully fetched product showcase section');
        }
      } catch (error) {
        console.error('[WhyBestSection] ❌ Failed to fetch bento layout:', error);
      } finally {
        setIsLoading(false);
        console.log('[WhyBestSection] Loading complete');
      }
    };

    fetchBentoLayout();
  }, []);

  // Use API data or fallback to defaults
  const heading = sectionData?.heading || "WHY YOUR SKIN\nDESERVES THE BEST?";
  const backgroundColor = "#FCF6EB";
  const textColor = sectionData?.text_color || "#000000";
  const bentoItems = sectionData?.bento_items;

  // Extract data from bento_items
  const mainImage = bentoItems?.images?.[0];
  const ecoImage = bentoItems?.images?.[1];
  const product1 = products[0];
  const product2 = products[1];
  const textOverlay1 = bentoItems?.text_overlays?.[0];
  const textOverlay2 = bentoItems?.text_overlays?.[1];

  console.log('[WhyBestSection] 🎨 Render - products state:', {
    productsLength: products.length,
    product1: product1 ? { name: product1.name, price: product1.pricing?.salePrice } : 'undefined',
    product2: product2 ? { name: product2.name, price: product2.pricing?.salePrice } : 'undefined',
  });

  // Fallback data
  const fallbackMainImage = { url: "/why-best-woman.png", alt_text: "Natural skincare", link_url: null };
  const fallbackEcoImage = { url: "/eco-packaging.png", alt_text: "Eco packaging", link_url: null };
  const fallbackProduct1 = { name: "Product 1", slug: "product-1", pricing: { salePrice: 700 }, primaryImage: { url: "/spotlight-jar.png" } };
  const fallbackProduct2 = { name: "Product 2", slug: "product-2", pricing: { salePrice: 700 }, primaryImage: { url: "/spotlight-tube.png" } };
  const fallbackTextOverlay1 = { heading: "Proven Effectiveness", body: "Some stat to prove the same", position: "bottom_left" };
  const fallbackTextOverlay2 = { heading: "ECO FRIENDLY PACKAGING", body: "Lorem sit officia sint esse veniam aliquip ullamco ea consequat aute consectetur exercitation quis do Lorem veniam mollit ut nostrud commodo aute", position: "top_right" };

  return (
    <section className="w-full" style={{ backgroundColor }}>
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
        {isLoading ? (
          <div className="space-y-12">
            {/* Header Skeleton */}
            <div className="flex items-start justify-between">
              <Skeleton height="106px" width="678px" />
              <div className="space-y-2">
                <Skeleton height="34px" width="308px" />
                <Skeleton height="28px" width="126px" className="ml-auto" />
              </div>
            </div>

            {/* Bento Grid Skeleton */}
            <div className="flex gap-6">
              {/* Left Column */}
              <Skeleton height="754px" width="679px" />

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                <Skeleton height="393px" width="679px" />
                <div className="flex gap-6">
                  <Skeleton height="335px" width="331px" />
                  <Skeleton height="335px" width="331px" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Section Header Row */}
        <div className="mb-12 flex items-start justify-between">
          {/* Left - Main Heading */}
          <h2
            className="text-black"
            style={{
              width: "678px",
              height: "106px",
              fontFamily: "Lexend Exa, sans-serif",
              fontWeight: 400,
              fontSize: "42px",
              lineHeight: "100%",
              letterSpacing: "0",
              textTransform: "uppercase",
              whiteSpace: "pre-line",
              color: textColor,
            }}
          >
            {heading}
          </h2>

          {/* Right - Rating Group */}
          <div className="flex items-start gap-4">
            <div className="text-right">
              <p
                className="text-black"
                style={{
                  width: "308px",
                  height: "34px",
                  fontFamily: "Lexend Exa, sans-serif",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "100%",
                  textTransform: "uppercase",
                }}
              >
                4+ STAR RATINGS
              </p>
              {/* Stars */}
              <div
                className="mt-2 flex justify-end"
                style={{
                  width: "126px",
                  height: "28px",
                  marginLeft: "auto",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="#D4A853"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
            </div>
            {/* Grey Overlapping Circles */}
            <div
              style={{
                width: "77px",
                height: "25px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: "#E5E5E5",
                  border: "1px solid #D0D0D0",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                }}
              />
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: "#C4C4C4",
                  border: "1px solid #B0B0B0",
                  position: "absolute",
                  left: "16px",
                  top: "0px",
                }}
              />
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: "#9E9E9E",
                  border: "1px solid #8A8A8A",
                  position: "absolute",
                  left: "32px",
                  top: "0px",
                }}
              />
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: "#6B6B6B",
                  border: "1px solid #5A5A5A",
                  position: "absolute",
                  left: "48px",
                  top: "0px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Card Grid - Top Row */}
        <div className="flex gap-6">
          {/* Card 1 - Large Image Card */}
          <div
            className="relative overflow-hidden"
            style={{
              width: "679px",
              height: "754px",
              borderRadius: "20px",
            }}
          >
            {(mainImage?.url || fallbackMainImage.url) ? (
              <img
                src={mainImage?.url || fallbackMainImage.url}
                alt={mainImage?.alt_text || fallbackMainImage.alt_text}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "center top",
                }}
              />
            ) : (
              <div className="h-full w-full bg-light-grey/50 flex items-center justify-center">
                <span className="text-muted-brown">Image</span>
              </div>
            )}
            {/* Overlay Content Card */}
            <div
              className="absolute bg-muted-beige"
              style={{
                width: "365px",
                height: "164px",
                borderRadius: "20px",
                bottom: "24px",
                right: "24px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <p
                className="text-black"
                style={{
                  width: "252px",
                  height: "30px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "right",
                  marginBottom: "12px",
                }}
              >
                {textOverlay1?.heading || fallbackTextOverlay1.heading}
              </p>
              <p
                className="text-black"
                style={{
                  width: "236px",
                  height: "50px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  textAlign: "right",
                }}
              >
                {textOverlay1?.body || fallbackTextOverlay1.body}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Card 2 - Eco Friendly Packaging */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "679px",
                height: "393px",
                borderRadius: "20px",
                backgroundColor: "#6B7B6E",
              }}
            >
              {/* Text Content - positioned with z-index to stay above image */}
              <div
                className="absolute z-10"
                style={{
                  top: "40px",
                  left: "32px",
                }}
              >
                <h3
                  className="text-cream"
                  style={{
                    width: "410px",
                    height: "30px",
                    fontFamily: "Lexend Exa, sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "100%",
                    letterSpacing: "0",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                >
                  {textOverlay2?.heading || fallbackTextOverlay2.heading}
                </h3>
                <p
                  style={{
                    width: "345px",
                    height: "115px",
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "100%",
                    letterSpacing: "0",
                    color: "rgba(245, 237, 224, 0.68)",
                  }}
                >
                  {textOverlay2?.body || fallbackTextOverlay2.body}
                </p>
              </div>
              {/* Product Image */}
              {(ecoImage?.url || fallbackEcoImage.url) ? (
                <img
                  src={ecoImage?.url || fallbackEcoImage.url}
                  alt={ecoImage?.alt_text || fallbackEcoImage.alt_text}
                  style={{
                    width: "748px",
                    height: "546px",
                    objectFit: "contain",
                    position: "absolute",
                    right: "0px",
                    top: "-80px",
                  }}
                />
              ) : (
                <div className="absolute right-0 top-0 h-full w-1/2 bg-light-grey/20" />
              )}
            </div>

            {/* Bottom Row - Product Spotlights */}
            <div className="flex gap-6">
              <ProductSpotlightCard
                title={(product1 || fallbackProduct1).name}
                price={`₹${(product1 || fallbackProduct1).pricing?.salePrice || 700}`}
                image={(product1?.custom_image_url || product1?.primaryImage?.url || fallbackProduct1.primaryImage.url)}
                imageSize={{ width: "305px", height: "305px" }}
                slug={(product1?.slug || fallbackProduct1.slug)}
              />
              <ProductSpotlightCard
                title={(product2 || fallbackProduct2).name}
                price={`₹${(product2 || fallbackProduct2).pricing?.salePrice || 700}`}
                image={(product2?.custom_image_url || product2?.primaryImage?.url || fallbackProduct2.primaryImage.url)}
                imageSize={{ width: "301px", height: "260px" }}
                slug={(product2?.slug || fallbackProduct2.slug)}
              />
            </div>
          </div>
        </div>

        {/* Full-Width Product Display */}
        <div
          className="relative mt-16"
          style={{
            width: "calc(100% + 256px)",
            marginLeft: "-128px",
            marginRight: "-128px",
            height: "859px",
            backgroundColor: "#ECECEC",
            overflow: "visible",
          }}
        >
          {/* Background Image - from product_showcase API */}
          <img
            src={showcaseSection?.showcase_product?.image_url || "/product-display.png"}
            alt="Product Display"
            style={{
              width: "80%",
              height: "100%",
              objectFit: "contain",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Floating Product Cards - using fetched products */}
          <FloatingProductCard
            name={(product1 || fallbackProduct1).name}
            price={`₹${(product1 || fallbackProduct1).pricing?.salePrice || 700}`}
            image={(product1?.custom_image_url || product1?.primaryImage?.url || "/serum-small.png")}
            position={{ top: "120px", right: "180px" }}
            slug={(product1?.slug || fallbackProduct1.slug)}
          />
          <FloatingProductCard
            name={(product2 || fallbackProduct2).name}
            price={`₹${(product2 || fallbackProduct2).pricing?.salePrice || 700}`}
            image={(product2?.custom_image_url || product2?.primaryImage?.url || "/cream-small.png")}
            position={{ bottom: "180px", left: "160px" }}
            slug={(product2?.slug || fallbackProduct2.slug)}
          />
        </div>
        </>
        )}
      </div>
    </section>
  );
};

export default WhyBestSection;
