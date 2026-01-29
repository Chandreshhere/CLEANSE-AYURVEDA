"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/context";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Authentication check - COMMENTED OUT
  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, isLoading, router]);

  // Show loading state while checking auth - COMMENTED OUT
  // if (isLoading) {
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center" style={{ backgroundColor: "#F5F1EB" }}>
  //       <p
  //         style={{
  //           fontFamily: "Lexend, sans-serif",
  //           fontWeight: 400,
  //           fontSize: "16px",
  //           color: "#666666",
  //         }}
  //       >
  //         Loading...
  //       </p>
  //     </main>
  //   );
  // }

  // Don't render if not authenticated (will redirect) - COMMENTED OUT
  // if (!user) {
  //   return null;
  // }

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
