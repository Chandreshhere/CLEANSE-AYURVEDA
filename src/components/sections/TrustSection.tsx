import React from "react";

interface TrustFeatureProps {
  label: string;
}

const TrustFeature: React.FC<TrustFeatureProps> = ({ label }) => (
  <div
    className="flex flex-col items-center"
    style={{
      width: "253px",
      height: "225px",
      gap: "36px",
    }}
  >
    {/* Icon Placeholder */}
    <div
      className="bg-light-grey"
      style={{
        width: "177px",
        height: "140px",
        borderRadius: "22px",
      }}
    />
    {/* Label */}
    <span
      className="text-black"
      style={{
        width: "213px",
        height: "50px",
        fontFamily: "Lexend, sans-serif",
        fontWeight: 700,
        fontSize: "24px",
        lineHeight: "100%",
        letterSpacing: "0",
        textAlign: "center",
      }}
    >
      {label}
    </span>
  </div>
);

export const TrustSection: React.FC = () => {
  const trustFeatures = [
    "Zero Synthetics",
    "Doctor Formulated",
    "Sustainably Sourced",
  ];

  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
        {/* Top Row - Quote + Trust Badges */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
          {/* Left - Quote Card */}
          <div
            className="relative flex flex-col items-center justify-center bg-muted-beige"
            style={{
              width: "399px",
              height: "261px",
              borderRadius: "22px",
            }}
          >
            {/* Quote Icon */}
            <div
              className="absolute text-black"
              style={{
                width: "58px",
                height: "90px",
                top: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "Lexend, sans-serif",
                fontSize: "128px",
                fontWeight: 400,
                lineHeight: "50%",
                letterSpacing: "0",
                textAlign: "center",
              }}
            >
              &ldquo;
            </div>
            {/* Quote Text */}
            <p
              className="text-center text-black"
              style={{
                width: "352px",
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "0",
                marginTop: "60px",
              }}
            >
              We aren&apos;t merely selling bottles; we are delivering a
              clinically-backed path to purity.&rdquo;
            </p>
          </div>

          {/* Right - Trust Features */}
          <div
            className="flex items-center justify-center"
            style={{
              width: "879px",
              height: "225px",
              gap: "60px",
            }}
          >
            {trustFeatures.map((feature) => (
              <TrustFeature key={feature} label={feature} />
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <div
            className="border-t border-black"
            style={{
              width: "1372px",
              borderWidth: "1px",
              marginLeft: "-40px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
