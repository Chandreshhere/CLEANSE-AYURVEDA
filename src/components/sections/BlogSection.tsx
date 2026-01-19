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
  <div>
    {/* Image Container */}
    <div
      style={{
        width: "679px",
        height: "469px",
        overflow: "hidden",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>

    {/* Content */}
    <div style={{ marginTop: "16px" }}>
      {/* Category Tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "96px",
          height: "27px",
          paddingTop: "4px",
          paddingRight: "14px",
          paddingBottom: "4px",
          paddingLeft: "14px",
          gap: "10px",
          backgroundColor: "#C38C65",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          {category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-black"
        style={{
          width: "666px",
          height: "71px",
          fontFamily: "Lexend, sans-serif",
          fontWeight: 400,
          fontSize: "26px",
          lineHeight: "100%",
          letterSpacing: "0",
          marginTop: "12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-black"
        style={{
          width: "563px",
          height: "75px",
          fontFamily: "Lexend, sans-serif",
          fontWeight: 400,
          fontSize: "20px",
          lineHeight: "100%",
          letterSpacing: "0",
          marginTop: "8px",
        }}
      >
        {description}
      </p>

      {/* Read More Link */}
      <a
        href="#"
        className="text-black"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          width: "213px",
          height: "45px",
          fontFamily: "Lexend, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          textTransform: "uppercase",
          textDecoration: "none",
          marginTop: "16px",
        }}
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
      <div className="mx-auto max-w-[1920px] px-4 py-16 min-[480px]:px-6 sm:px-10 md:px-12 lg:px-20 lg:py-24 xl:px-32">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p
            style={{
              width: "236px",
              height: "50px",
              fontFamily: "Lexend, sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "0",
              textAlign: "center",
              opacity: 0.6,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            The Journal
          </p>
          <h2
            className="text-black"
            style={{
              width: "441px",
              height: "53px",
              fontFamily: "Lexend Exa, sans-serif",
              fontWeight: 400,
              fontSize: "42px",
              lineHeight: "100%",
              letterSpacing: "0",
              textTransform: "uppercase",
              margin: "0 auto",
            }}
          >
            WISDOM SHARED
          </h2>
        </div>

        {/* Blog Cards */}
        <div className="flex justify-center gap-6">
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
        <div className="mt-16 text-center">
          <a
            href="#"
            className="text-black"
            style={{
              display: "inline-block",
              width: "289px",
              height: "35px",
              fontFamily: "Lexend Exa, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            VIEW ALL BLOGS
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
