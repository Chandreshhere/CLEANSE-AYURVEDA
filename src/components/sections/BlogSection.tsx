import React from "react";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  category,
  title,
  description,
}) => (
  <div className="w-full max-w-[600px] lg:max-w-[650px] xl:max-w-[679px]">
    {/* Image Container */}
    <div className="aspect-[679/469] w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="mt-4">
      {/* Category Tag */}
      <div className="inline-flex items-center justify-center bg-[#C38C65] px-3.5 py-1">
        <span className="font-inter text-sm font-medium uppercase text-white lg:text-base">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-3 font-lexend text-xl font-normal text-black lg:text-2xl xl:text-[26px]">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 font-lexend text-base font-normal text-black lg:text-lg xl:text-xl" style={{ lineHeight: "130%" }}>
        {description}
      </p>

      {/* Read More Link */}
      <a
        href="#"
        className="mt-4 inline-flex items-center gap-2 font-lexend text-sm font-semibold uppercase text-black"
      >
        READ MORE
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8H13M13 8L9 4M13 8L9 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  </div>
);

export const BlogSection: React.FC = () => {
  const blogs = [
    {
      image: "/jar.png",
      category: "Rituals",
      title: "THE ART OF EVENING WIND DOWN",
      description:
        "Explore the ancient Ayurvedic Techniques to prepare your body for deep restorative sleep.",
    },
    {
      image: "/shot.png",
      category: "Rituals",
      title: "THE ART OF EVENING WIND DOWN",
      description:
        "Explore the ancient Ayurvedic Techniques to prepare your body for deep restorative sleep.",
    },
  ];

  return (
    <section className="w-full bg-off-white">
      <div className="mx-auto max-w-[1920px] px-8 py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-24">
        {/* Section Header */}
        <div className="mb-10 text-center lg:mb-12">
          <p className="mx-auto font-lexend text-lg font-normal text-black/60 lg:text-xl">
            The Journal
          </p>
          <h2 className="mx-auto mt-2 font-lexend-exa text-2xl font-normal uppercase text-black md:text-3xl lg:text-4xl xl:text-[42px]">
            WISDOM SHARED
          </h2>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:gap-10 xl:gap-12">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>

        {/* View All Blogs Link */}
        <div className="mt-12 text-center lg:mt-16">
          <a
            href="#"
            className="inline-block font-lexend-exa text-base font-normal uppercase tracking-wider text-black lg:text-lg"
          >
            VIEW ALL BLOGS
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
