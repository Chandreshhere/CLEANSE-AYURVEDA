import React from "react";

interface CategoryCardProps {
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image }) => (
  <div
    className="relative flex items-center justify-center bg-muted-beige"
    style={{
      width: "446px",
      height: "183px",
      borderRadius: "20px",
    }}
  >
    <span
      className="text-black"
      style={{
        fontFamily: "Lexend Exa, sans-serif",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "100%",
        textTransform: "uppercase",
        letterSpacing: "0",
        position: "absolute",
        left: "30px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {name}
    </span>
    <img
      src={image}
      alt={name}
      className="absolute"
      style={{
        width: "280px",
        height: "280px",
        objectFit: "contain",
        objectPosition: "bottom",
        right: "-40px",
        bottom: "-17px",
      }}
    />
  </div>
);

export const ShopByCategory: React.FC = () => {
  const categories = [
    { name: "Hair Care", image: "/category-hair.png" },
    { name: "Skin Care", image: "/category-skin.png" },
    { name: "Face Care", image: "/category-face.png" },
  ];

  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
        {/* Section Heading */}
        <h2
          className="mx-auto mb-16 text-center text-black"
          style={{
            width: "502px",
            height: "53px",
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "42px",
            lineHeight: "100%",
            letterSpacing: "0",
            textTransform: "uppercase",
          }}
        >
          SHOP BY CATEGORY
        </h2>

        {/* Category Cards */}
        <div className="flex justify-center gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
