"use client";

import React, { useState } from "react";

interface TestimonialCardProps {
  name: string;
  review: string;
  bgColor: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, review, bgColor }) => (
  <div
    className="h-[380px] w-[340px] flex-shrink-0 rounded-2xl p-6 lg:h-[400px] lg:w-[380px] lg:p-8 xl:h-[430px] xl:w-[440px] xl:p-9"
    style={{ backgroundColor: bgColor }}
  >
    {/* Avatar and Name Row */}
    <div className="mb-8 flex items-center gap-4 lg:mb-10 lg:gap-5">
      {/* Avatar Circle */}
      <div className="h-16 w-16 flex-shrink-0 rounded-full bg-white lg:h-20 lg:w-20 xl:h-[89px] xl:w-[89px]" />
      <div>
        {/* Name */}
        <p className="mb-2 whitespace-nowrap font-lexend text-lg font-bold text-black lg:text-xl xl:text-2xl">
          {name}
        </p>
        {/* Rectangle below name */}
        <div className="h-4 w-28 bg-white lg:w-36" />
      </div>
    </div>

    {/* Review Text */}
    <p className="font-lexend text-sm font-normal text-black/80 lg:text-base xl:text-lg" style={{ lineHeight: "140%" }}>
      {review}
    </p>
  </div>
);

const ArrowButton: React.FC<{ direction: "left" | "right"; onClick: () => void }> = ({
  direction,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex h-12 w-12 items-center justify-center rounded-full lg:h-14 lg:w-14 xl:h-16 xl:w-16 ${
      direction === "left" ? "bg-dark-brown" : "border-2 border-dark-brown bg-white"
    }`}
  >
    <svg
      width="24"
      height="10"
      viewBox="0 0 46 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "right" ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM46 7H1V9H46V7Z"
        fill={direction === "left" ? "#FFFFFF" : "#4A2B1F"}
      />
    </svg>
  </button>
);

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Akshat Jain",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#F5EDE0",
    },
    {
      name: "Bhavya Kothari",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#D5DCCE",
    },
    {
      name: "Attharv Shrivastav",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#F5EDE0",
    },
    {
      name: "Priya Sharma",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#D5DCCE",
    },
    {
      name: "Rahul Verma",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#F5EDE0",
    },
    {
      name: "Ananya Gupta",
      review: `"qui irure laborum labore voluptate mollit reprehenderit laborum enim minim voluptate ad ipsum labore nulla ad cupidatat id enim id aute ad sint do excepteur quis ut consectetur qui Lorem adipisicing ipsum sit sit magna ipsum excepteur elit exercitation id veniam ex adipisicing voluptate adipisicing nostrud labore duis quis eiusmod aute enim pariatur incididunt"`,
      bgColor: "#D5DCCE",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 3 ? prev + 1 : 0));
  };

  return (
    <section className="w-full overflow-hidden bg-off-white">
      <div className="px-8 pb-0 pt-12 md:px-12 lg:px-16 lg:pt-16 xl:px-20 2xl:px-24">
        {/* Testimonials Container */}
        <div className="mx-auto max-w-[1920px]">
          {/* Header Row */}
          <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between xl:mb-16">
            {/* Title */}
            <h2 className="font-lexend-exa text-2xl font-normal uppercase text-black md:text-3xl lg:text-4xl xl:text-[42px]" style={{ lineHeight: "120%" }}>
              LISTEN TO WHAT OUR
              <br />
              CLIENTS SAY ABOUT US?
            </h2>

            {/* Arrow Buttons */}
            <div className="flex gap-4">
              <ArrowButton direction="left" onClick={handlePrev} />
              <ArrowButton direction="right" onClick={handleNext} />
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="overflow-visible">
            <div
              className="flex gap-4 transition-transform duration-300 ease-in-out lg:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (340 + 16)}px)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  review={testimonial.review}
                  bgColor={testimonial.bgColor}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ancient Secrets Banner */}
        <div className="relative mt-24 h-[350px] w-full max-w-[1378px] overflow-visible rounded-2xl lg:mt-32 lg:h-[400px] xl:mt-36 xl:h-[463px]" style={{ background: "linear-gradient(90deg, #6F4B46 0%, #442824 100%)" }}>
          {/* Product Image */}
          <img
            src="/product.png"
            alt="Cleanse Ayurveda Products"
            className="absolute -bottom-32 -left-20 h-[600px] w-auto rotate-[5deg] object-contain lg:-bottom-48 lg:-left-40 lg:h-[800px] xl:-bottom-60 xl:h-[1000px]"
          />

          {/* Text Content */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-right lg:right-16 xl:right-24">
            {/* Ancient Secrets Title */}
            <h3 className="mb-4 font-lexend text-2xl font-semibold text-white lg:mb-5 lg:text-4xl xl:text-5xl" style={{ lineHeight: "110%" }}>
              Ancient Secrets,
              <br />
              Modern Radiance
            </h3>

            {/* Infused Text */}
            <p className="mb-6 ml-auto font-lexend text-base font-normal text-white lg:mb-8 lg:text-xl xl:mb-10 xl:text-2xl">
              Infused with Turmeric and Rose Petals.
            </p>

            {/* Shop Now Button */}
            <button className="ml-auto block rounded-full bg-white px-6 py-2.5 lg:px-8 lg:py-3">
              <span className="font-lexend text-lg font-normal text-black lg:text-xl xl:text-2xl">
                SHOP NOW
              </span>
            </button>
          </div>
        </div>

        {/* Features/Badges Section */}
        <div className="-mx-8 mt-32 flex h-[350px] items-center justify-center bg-[#C4C4C4] md:-mx-12 lg:-mx-16 lg:mt-48 lg:h-[400px] xl:-mx-20 xl:h-[460px] 2xl:-mx-24">
          {/* Badges Container */}
          <div className="grid grid-cols-2 gap-8 px-8 lg:flex lg:gap-16 xl:gap-24 2xl:gap-32">
            {/* Badge 1 - Express Shipping */}
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-2xl bg-[#D9D9D9] lg:h-40 lg:w-40 xl:h-[213px] xl:w-[213px]" />
              <p className="mt-4 text-center font-lexend text-base font-bold text-black lg:text-xl xl:text-2xl">
                Express Shipping
              </p>
            </div>

            {/* Badge 2 - Cruelty Free */}
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-2xl bg-[#D9D9D9] lg:h-40 lg:w-40 xl:h-[213px] xl:w-[213px]" />
              <p className="mt-4 text-center font-lexend text-base font-bold text-black lg:text-xl xl:text-2xl">
                Cruelty Free
              </p>
            </div>

            {/* Badge 3 - 100% Ayurvedic */}
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-2xl bg-[#D9D9D9] lg:h-40 lg:w-40 xl:h-[213px] xl:w-[213px]" />
              <p className="mt-4 text-center font-lexend text-base font-bold text-black lg:text-xl xl:text-2xl">
                100% Ayurvedic
              </p>
            </div>

            {/* Badge 4 - Made In India */}
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-2xl bg-[#D9D9D9] lg:h-40 lg:w-40 xl:h-[213px] xl:w-[213px]" />
              <p className="mt-4 text-center font-lexend text-base font-bold text-black lg:text-xl xl:text-2xl">
                Made In India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
