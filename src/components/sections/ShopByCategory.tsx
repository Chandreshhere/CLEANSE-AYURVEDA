import React from "react";

interface CategoryCardProps {
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image }) => (
  <div className="relative flex h-[160px] w-full max-w-[400px] items-center justify-center overflow-visible rounded-2xl bg-muted-beige lg:h-[180px] lg:max-w-[440px] xl:max-w-[480px] 2xl:h-[200px] 2xl:max-w-[520px]">
    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-lexend-exa text-xs font-normal uppercase text-black lg:left-8 lg:text-sm">
      {name}
    </span>
    <img
      src={image}
      alt={name}
      className="absolute -bottom-4 -right-8 h-[220px] w-[220px] object-contain object-bottom lg:-right-10 lg:h-[260px] lg:w-[260px] xl:h-[280px] xl:w-[280px]"
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
      <div className="mx-auto max-w-[1920px] px-8 py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-24">
        {/* Section Heading */}
        <h2 className="mx-auto mb-12 text-center font-lexend-exa text-2xl font-normal uppercase text-black md:text-3xl lg:mb-16 lg:text-4xl xl:text-[42px]">
          SHOP BY CATEGORY
        </h2>

        {/* Category Cards */}
        <div className="grid grid-cols-1 justify-items-center gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10 2xl:gap-12">
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
