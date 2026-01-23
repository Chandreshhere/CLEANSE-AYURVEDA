import React from "react";

interface TrustFeatureProps {
  label: string;
}

const TrustFeature: React.FC<TrustFeatureProps> = ({ label }) => (
  <div className="flex flex-col items-center gap-6 lg:gap-8">
    {/* Icon Placeholder */}
    <div className="h-[120px] w-[150px] rounded-2xl bg-light-grey lg:h-[140px] lg:w-[177px]" />
    {/* Label */}
    <span className="text-center font-lexend text-lg font-bold text-black lg:text-xl xl:text-2xl">
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
      <div className="mx-auto max-w-[1920px] px-8 py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-24">
        {/* Top Row - Quote + Trust Badges */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16 xl:gap-20">
          {/* Left - Quote Card */}
          <div className="relative flex h-[220px] w-full max-w-[360px] flex-col items-center justify-center rounded-2xl bg-muted-beige px-6 lg:h-[261px] lg:max-w-[399px]">
            {/* Quote Icon */}
            <div className="absolute left-1/2 top-8 -translate-x-1/2 font-lexend text-7xl font-normal text-black lg:top-12 lg:text-9xl">
              &ldquo;
            </div>
            {/* Quote Text */}
            <p className="mt-12 max-w-[320px] text-center font-lexend text-lg font-normal text-black lg:mt-14 lg:max-w-[352px] lg:text-xl xl:text-2xl">
              We aren&apos;t merely selling bottles; we are delivering a
              clinically-backed path to purity.&rdquo;
            </p>
          </div>

          {/* Right - Trust Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 xl:gap-16">
            {trustFeatures.map((feature) => (
              <TrustFeature key={feature} label={feature} />
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <div className="w-full max-w-[1372px] border-t border-black" />
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
