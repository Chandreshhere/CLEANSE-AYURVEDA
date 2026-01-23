import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden md:h-[750px] lg:h-[850px] xl:h-[900px] 2xl:h-[982px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/herobanner.png')",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1920px] flex-col items-center justify-center px-8 md:px-12 lg:flex-row lg:items-center lg:justify-end lg:px-16 xl:px-20 2xl:px-24">
        {/* Text Content - Right Side on Desktop, Stacked on Mobile */}
        <div className="flex w-full flex-col items-center text-center lg:items-end lg:text-right">
          {/* Main Heading */}
          <h1
            className="whitespace-nowrap text-4xl font-semibold text-white sm:text-5xl lg:text-[60px]"
            style={{
              fontFamily: "Lexend, sans-serif",
              lineHeight: "100%",
              letterSpacing: "-0.05em",
            }}
          >
            CLEANSE AYURVEDA
          </h1>

          {/* Subheading */}
          <p
            className="mt-4 text-lg font-medium text-white sm:text-xl lg:mt-4 lg:text-[24px]"
            style={{
              fontFamily: "Lexend, sans-serif",
              lineHeight: "100%",
              letterSpacing: "0",
            }}
          >
            Natural Skin Care for Mindful Living
          </p>

          {/* CTA Button */}
          <div className="mt-8 lg:mt-10">
            <a
              href="/shop"
              className="inline-flex items-center justify-center bg-white text-dark-brown"
              style={{
                paddingTop: "6px",
                paddingBottom: "6px",
                paddingLeft: "46px",
                paddingRight: "46px",
                minWidth: "293px",
                height: "65px",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
