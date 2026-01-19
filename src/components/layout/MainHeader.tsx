"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ProfileIcon,
  SearchIcon,
  CartIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui";

export const MainHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const categories = [
    { id: "category1", label: "CATEGORY 1", href: "/shop?category=category1" },
    { id: "category2", label: "CATEGORY 2", href: "/shop?category=category2" },
    { id: "category3", label: "CATEGORY 3", href: "/shop?category=category3" },
    { id: "category4", label: "CATEGORY 4", href: "/shop?category=category4" },
  ];

  return (
    <header className="w-full" style={{ backgroundColor: "#ECCFA0" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          paddingLeft: "67px",
          paddingRight: "67px",
        }}
      >
        <div className="flex items-center justify-between" style={{ height: "120px" }}>
          {/* Left Navigation */}
          <nav className="hidden items-center lg:flex" style={{ gap: "48px", flex: 1 }}>
            <a
              href="/shop"
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#4A2B1F",
                textTransform: "uppercase",
              }}
            >
              SHOP ALL
            </a>
            <div style={{ position: "relative" }}>
              <button
                className="flex items-center gap-2"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#4A2B1F",
                  textTransform: "uppercase",
                }}
              >
                BY CATEGORY
                <span
                  style={{
                    display: "inline-flex",
                    transform: isCategoryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <ChevronDownIcon size={20} className="text-dark-brown" />
                </span>
              </button>

              {/* Category Dropdown */}
              {isCategoryDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 20px)",
                    left: "0",
                    width: "235px",
                    height: "204px",
                    backgroundColor: "#4A2B1F",
                    borderRadius: "0",
                    padding: "24px 32px",
                    zIndex: 50,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  }}
                >
                  <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        style={{
                          fontFamily: "Lexend, sans-serif",
                          fontWeight: 400,
                          fontSize: "18px",
                          color: "#ECCFA0",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          transition: "opacity 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        {category.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="text-dark-brown lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <CloseIcon size={24} />
            ) : (
              <MenuIcon size={24} />
            )}
          </button>

          {/* Center Logo */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <a href="/" className="block">
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontSize: "40px",
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0",
                  color: "#4A2B1F",
                }}
              >
                LOGO
              </span>
            </a>
          </div>

          {/* Right Navigation Icons */}
          <div className="flex items-center" style={{ gap: "70px", flex: 1, justifyContent: "flex-end" }}>
            <Link
              href="/account"
              className="hidden text-dark-brown lg:block"
              aria-label="Account"
            >
              <ProfileIcon size={24} />
            </Link>
            <button className="text-dark-brown" aria-label="Search">
              <SearchIcon size={24} />
            </button>
            <Link href="/cart" className="text-dark-brown" aria-label="Cart">
              <CartIcon size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-dark-brown/10 py-6 lg:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="/shop"
                className="text-[13px] font-medium uppercase tracking-[0.1em] text-dark-brown"
              >
                SHOP ALL
              </a>
              <button className="flex items-center gap-1.5 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-dark-brown">
                BY CATEGORY
                <ChevronDownIcon size={20} className="text-dark-brown" />
              </button>
              <a
                href="/account"
                className="text-[13px] font-medium uppercase tracking-[0.1em] text-dark-brown"
              >
                ACCOUNT
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
