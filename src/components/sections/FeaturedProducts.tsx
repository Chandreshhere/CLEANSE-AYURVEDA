import React from "react";
import { ProductCard } from "@/components/ui/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const FeaturedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of the product",
      price: 400,
      image: "/p1.png",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of the product",
      price: 400,
      image: "/p2.png",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of the product",
      price: 400,
      image: "/p3.png",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description of the product",
      price: 400,
      image: "/p4.png",
    },
  ];

  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-4 pb-20 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:pb-28 xl:px-32">
        {/* Section Title */}
        <h2
          className="mx-auto mb-12 text-black lg:mb-16"
          style={{
            width: "671px",
            height: "53px",
            fontFamily: "Lexend Exa, sans-serif",
            fontWeight: 400,
            fontSize: "42px",
            lineHeight: "100%",
            letterSpacing: "0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          OUR FEATURED PRODUCTS
        </h2>

        {/* Product Grid */}
        <div className="flex justify-center gap-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
