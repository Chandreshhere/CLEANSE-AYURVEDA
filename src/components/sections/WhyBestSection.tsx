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
  imageSize,
}) => (
  <div
    className="relative overflow-hidden bg-muted-beige"
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
      }}
    >
      <p
        className="text-black"
        style={{
          width: "216px",
          height: "30px",
          fontFamily: "Lexend, sans-serif",
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "100%",
          letterSpacing: "0",
          marginBottom: "2px",
        }}
      >
        {title}
      </p>
      <p
        className="text-black"
        style={{
          width: "56px",
          height: "30px",
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
    className="absolute flex items-center bg-muted-beige"
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
);

export const WhyBestSection: React.FC = () => {
  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
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
            }}
          >
            WHY YOUR SKIN
            <br />
            DESERVES THE BEST?
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
            <img
              src="/why-best-woman.png"
              alt="Woman holding Cleanse Ayurveda serum"
              className="h-full w-full object-cover"
              style={{
                objectPosition: "center top",
              }}
            />
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
                Proven Effectiveness
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
                Some stat to prove the same
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
                  ECO FRIENDLY PACKAGING
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
                  Lorem sit officia sint esse veniam aliquip ullamco ea consequat
                  aute consectetur exercitation quis do Lorem veniam mollit ut
                  nostrud commodo aute
                </p>
              </div>
              {/* Product Image */}
              <img
                src="/eco-packaging.png"
                alt="Eco friendly packaging"
                style={{
                  width: "748px",
                  height: "546px",
                  objectFit: "contain",
                  position: "absolute",
                  right: "0px",
                  top: "-80px",
                }}
              />
            </div>

            {/* Bottom Row - Product Spotlights */}
            <div className="flex gap-6">
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
        <div
          className="relative mt-16"
          style={{
            width: "calc(100% + 256px)",
            marginLeft: "-128px",
            marginRight: "-128px",
            height: "859px",
            backgroundColor: "#ECECEC",
            overflow: "hidden",
          }}
        >
          <img
            src="/product-display.png"
            alt="Product arrangement with serum and cream"
            style={{
              width: "1367px",
              height: "855px",
              objectFit: "contain",
              position: "absolute",
              left: "0",
              top: "0",
            }}
          />

          {/* Floating Product Cards */}
          <FloatingProductCard
            name="The Face Serum"
            price="₹700-800"
            image="/serum-small.png"
            position={{ top: "80px", right: "200px" }}
          />
          <FloatingProductCard
            name="The Hydrating Cream"
            price="₹700-800"
            image="/cream-small.png"
            position={{ bottom: "200px", left: "100px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyBestSection;
