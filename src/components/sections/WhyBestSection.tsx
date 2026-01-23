import React from "react";

interface ProductSpotlightCardProps {
  title: string;
  price: string;
  image: string;
}

interface SpotlightImageProps {
  width: string;
  height: string;
}

const ProductSpotlightCard: React.FC<ProductSpotlightCardProps & { imageSize: SpotlightImageProps }> = ({
  title,
  price,
  image,
}) => (
  <div className="relative h-[280px] w-full max-w-[300px] overflow-hidden rounded-2xl bg-muted-beige lg:h-[320px] lg:max-w-[330px] xl:h-[335px]">
    {/* Text at top left */}
    <div className="absolute left-5 top-5">
      <p className="font-lexend text-xl font-bold text-black lg:text-2xl">
        {title}
      </p>
      <p className="font-lexend text-xl font-normal text-black lg:text-2xl">
        {price}
      </p>
    </div>
    {/* Image at bottom center */}
    <img
      src={image}
      alt={title}
      className="absolute bottom-2 left-1/2 h-auto max-h-[200px] w-auto max-w-[90%] -translate-x-1/2 object-contain lg:max-h-[230px]"
    />
  </div>
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
}

const FloatingProductCard: React.FC<FloatingProductCardProps> = ({
  name,
  price,
  image,
  position,
}) => (
  <div
    className="absolute hidden items-center rounded-2xl bg-muted-beige p-4 lg:flex"
    style={{
      width: "clamp(280px, 25vw, 365px)",
      height: "clamp(140px, 12vw, 164px)",
      ...position,
    }}
  >
    <img
      src={image}
      alt={name}
      className="h-[100px] w-[80px] rounded-lg object-contain lg:h-[131px] lg:w-[96px]"
    />
    <div className="ml-4">
      <p className="mb-2 font-lexend text-base font-semibold text-black lg:text-lg">
        {name}
      </p>
      <p className="font-inter text-sm font-normal text-black lg:text-base">
        {price}
      </p>
    </div>
  </div>
);

export const WhyBestSection: React.FC = () => {
  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-8 py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-24">
        {/* Section Header Row */}
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left - Main Heading */}
          <h2 className="font-lexend-exa text-2xl font-normal uppercase text-black md:text-3xl lg:text-4xl xl:text-[42px]" style={{ lineHeight: "120%" }}>
            WHY YOUR SKIN
            <br />
            DESERVES THE BEST?
          </h2>

          {/* Right - Rating Group */}
          <div className="flex items-start gap-4">
            <div className="text-right">
              <p className="font-lexend-exa text-lg font-normal uppercase text-black lg:text-xl xl:text-2xl">
                4+ STAR RATINGS
              </p>
              {/* Stars */}
              <div className="ml-auto mt-2 flex justify-end">
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
            <div className="relative hidden h-6 w-20 lg:block">
              <div className="absolute left-0 top-0 h-6 w-6 rounded-full border border-[#D0D0D0] bg-[#E5E5E5]" />
              <div className="absolute left-4 top-0 h-6 w-6 rounded-full border border-[#B0B0B0] bg-[#C4C4C4]" />
              <div className="absolute left-8 top-0 h-6 w-6 rounded-full border border-[#8A8A8A] bg-[#9E9E9E]" />
              <div className="absolute left-12 top-0 h-6 w-6 rounded-full border border-[#5A5A5A] bg-[#6B6B6B]" />
            </div>
          </div>
        </div>

        {/* Card Grid - Top Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-8">
          {/* Card 1 - Large Image Card */}
          <div className="relative aspect-[679/754] w-full overflow-hidden rounded-2xl">
            <img
              src="/why-best-woman.png"
              alt="Woman holding Cleanse Ayurveda serum"
              className="h-full w-full object-cover object-top"
            />
            {/* Overlay Content Card */}
            <div className="absolute bottom-4 right-4 flex flex-col items-end justify-center rounded-2xl bg-muted-beige p-4 lg:bottom-6 lg:right-6 lg:p-6">
              <p className="mb-2 text-right font-lexend text-lg font-bold text-black lg:text-xl xl:text-2xl">
                Proven Effectiveness
              </p>
              <p className="text-right font-lexend text-base font-normal text-black lg:text-lg xl:text-xl">
                Some stat to prove the same
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 xl:gap-8">
            {/* Card 2 - Eco Friendly Packaging */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-[#6B7B6E] lg:h-[350px] xl:h-[393px]">
              {/* Text Content - positioned with z-index to stay above image */}
              <div className="absolute left-6 top-6 z-10 lg:left-8 lg:top-10">
                <h3 className="mb-4 font-lexend-exa text-lg font-bold uppercase text-cream lg:mb-5 lg:text-xl xl:text-2xl">
                  ECO FRIENDLY PACKAGING
                </h3>
                <p className="max-w-[300px] font-lexend text-sm font-normal text-cream/70 lg:max-w-[345px] lg:text-base xl:text-lg" style={{ lineHeight: "140%" }}>
                  Lorem sit officia sint esse veniam aliquip ullamco ea consequat
                  aute consectetur exercitation quis do Lorem veniam mollit ut
                  nostrud commodo aute
                </p>
              </div>
              {/* Product Image */}
              <img
                src="/eco-packaging.png"
                alt="Eco friendly packaging"
                className="absolute -top-10 right-0 h-auto w-[500px] object-contain lg:-top-20 lg:w-[600px] xl:w-[748px]"
              />
            </div>

            {/* Bottom Row - Product Spotlights */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <ProductSpotlightCard
                title="Product Spotlight"
                price="₹700"
                image="/spotlight-jar.png"
                imageSize={{ width: "305px", height: "305px" }}
              />
              <ProductSpotlightCard
                title="Product Spotlight"
                price="₹700"
                image="/spotlight-tube.png"
                imageSize={{ width: "301px", height: "260px" }}
              />
            </div>
          </div>
        </div>

        {/* Full-Width Product Display */}
        <div className="relative -mx-8 mt-12 h-[400px] overflow-hidden bg-[#ECECEC] md:-mx-12 md:h-[500px] lg:-mx-16 lg:mt-16 lg:h-[600px] xl:-mx-20 xl:h-[750px] 2xl:-mx-24 2xl:h-[859px]">
          <img
            src="/product-display.png"
            alt="Product arrangement with serum and cream"
            className="absolute left-0 top-0 h-full w-auto max-w-none object-contain"
          />

          {/* Floating Product Cards */}
          <FloatingProductCard
            name="The Face Serum"
            price="₹700-800"
            image="/serum-small.png"
            position={{ top: "10%", right: "10%" }}
          />
          <FloatingProductCard
            name="The Hydrating Cream"
            price="₹700-800"
            image="/cream-small.png"
            position={{ bottom: "20%", left: "5%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyBestSection;
