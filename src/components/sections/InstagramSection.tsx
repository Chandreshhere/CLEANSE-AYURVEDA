import React from "react";

const InstagramIcon: React.FC = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="26" height="26" rx="6" stroke="black" strokeWidth="2" />
    <circle cx="15" cy="15" r="6" stroke="black" strokeWidth="2" />
    <circle cx="22.5" cy="7.5" r="1.5" fill="black" />
  </svg>
);

interface ImageBoxProps {
  image: string;
  alt: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ image, alt }) => (
  <div className="relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-52 xl:w-52">
    {/* Dashed line on top */}
    <div className="absolute left-1/2 top-3 z-10 w-3/4 -translate-x-1/2 border-t-2 border-dashed border-white" />
    <img
      src={image}
      alt={alt}
      className="h-full w-full object-cover"
    />
  </div>
);

export const InstagramSection: React.FC = () => {
  const images = [
    { src: "/c1.png", alt: "Instagram post 1" },
    { src: "/c2.png", alt: "Instagram post 2" },
    { src: "/c3.png", alt: "Instagram post 3" },
    { src: "/c4.png", alt: "Instagram post 4" },
    { src: "/c5.png", alt: "Instagram post 5" },
  ];

  return (
    <section className="w-full bg-off-white py-20 lg:py-28 xl:py-32">
      {/* Green Background Container */}
      <div className="flex w-full justify-center bg-[#D5DCCE] px-8 py-12 md:px-12 lg:px-16 lg:py-16 xl:px-20 2xl:px-24">
        {/* Center Container */}
        <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center justify-center">
          {/* Instagram Handle */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <InstagramIcon />
            <span className="font-lexend-exa text-sm font-bold tracking-wide text-black lg:text-base">
              @CleanseAyurveda
            </span>
          </div>

          {/* Clean Living Title */}
          <h2 className="mb-8 text-center font-lexend-exa text-2xl font-normal uppercase text-black md:text-3xl lg:mb-10 lg:text-4xl">
            CLEAN LIVING
          </h2>

          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4 lg:gap-6">
            {images.map((img, index) => (
              <ImageBox key={index} image={img.src} alt={img.alt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
