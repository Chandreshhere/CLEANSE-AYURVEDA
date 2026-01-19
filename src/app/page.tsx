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
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <TopUtilityBar />
      <MainHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Section with Quote and Badges */}
      <TrustSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Why Your Skin Deserves the Best */}
      <WhyBestSection />

      {/* Shop By Category */}
      <ShopByCategory />

      {/* Blog Section - Wisdom Shared */}
      <BlogSection />

      {/* Instagram Section - Clean Living */}
      <InstagramSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
