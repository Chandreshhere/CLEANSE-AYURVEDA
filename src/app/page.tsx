"use client";

import { TopUtilityBar, MainHeader, Footer } from "@/components/layout";
import {
  HeroSection,
  TrustSection,
  FeaturedProducts,
  WhyBestSection,
  ShopByCategory,
  BlogSection,
  InstagramSection,
  TestimonialsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <TopUtilityBar />
      <MainHeader />
      <HeroSection />
      <TrustSection />
      <FeaturedProducts />
      <WhyBestSection />
      <ShopByCategory />
      <TestimonialsSection />
      <BlogSection />
      <InstagramSection />
      <Footer />
    </main>
  );
}
