"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ProfileIcon,
  SearchIcon,
  CartIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui";
import { getNavigation, type Navigation, type NavigationItem } from "@/lib/api";

export const MainHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [navigationData, setNavigationData] = useState<Navigation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setIsLoading(true);
        console.log('[MainHeader] Fetching main_header navigation from API...');

        const response = await getNavigation('main_header');

        if (response.data && response.data.length > 0) {
          setNavigationData(response.data[0]);
          console.log('[MainHeader] ✅ Successfully fetched navigation:', {
            id: response.data[0]._id,
            name: response.data[0].name,
            location: response.data[0].location,
            itemsCount: response.data[0].items.length,
          });
          console.log('[MainHeader] Navigation items:', response.data[0].items);
        } else {
          console.warn('[MainHeader] ⚠️ No navigation menus found in response');
        }
      } catch (error) {
        console.error('[MainHeader] ❌ Failed to fetch navigation:', error);
      } finally {
        setIsLoading(false);
        console.log('[MainHeader] Loading complete');
      }
    };

    fetchNavigation();
  }, []);

  // Fallback categories if API fails
  const fallbackCategories = [
    { id: "category1", title: "CATEGORY 1", url: "/shop?category=category1" },
    { id: "category2", title: "CATEGORY 2", url: "/shop?category=category2" },
    { id: "category3", title: "CATEGORY 3", url: "/shop?category=category3" },
    { id: "category4", title: "CATEGORY 4", url: "/shop?category=category4" },
  ];

  // Get navigation items or fallback
  const navigationItems = navigationData?.items || [];

  // Find category dropdown item (item with children)
  const categoryDropdownItem = navigationItems.find((item) => item.children && item.children.length > 0);
  const categories = categoryDropdownItem?.children || fallbackCategories;

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
            {navigationItems.map((item, index) => (
              item.children && item.children.length > 0 ? (
                // Render dropdown for items with children
                <div key={`nav-item-${index}`} style={{ position: "relative" }}>
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
                    {item.title}
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
                        minWidth: "235px",
                        backgroundColor: "#4A2B1F",
                        borderRadius: "0",
                        padding: "24px 32px",
                        zIndex: 50,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                      }}
                    >
                      <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={`child-${index}-${childIndex}`}
                            href={child.url || '#'}
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
                            {child.title}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  )}
                </div>
              ) : (
                // Render regular link for items without children
                <Link
                  key={`nav-item-${index}`}
                  href={item.url || '#'}
                  style={{
                    fontFamily: "Lexend, sans-serif",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0",
                    color: "#4A2B1F",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {item.title}
                </Link>
              )
            ))}

            {/* Fallback navigation if no data loaded */}
            {navigationItems.length === 0 && !isLoading && (
              <>
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

                  {isCategoryDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 20px)",
                        left: "0",
                        width: "235px",
                        backgroundColor: "#4A2B1F",
                        borderRadius: "0",
                        padding: "24px 32px",
                        zIndex: 50,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                      }}
                    >
                      <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {fallbackCategories.map((category) => (
                          <Link
                            key={category.id}
                            href={category.url}
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
                            {category.title}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  )}
                </div>
              </>
            )}
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
              {navigationItems.length > 0 ? (
                navigationItems.map((item, index) => (
                  item.children && item.children.length > 0 ? (
                    <div key={`mobile-nav-${index}`}>
                      <button className="flex items-center gap-1.5 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-dark-brown">
                        {item.title}
                        <ChevronDownIcon size={20} className="text-dark-brown" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      key={`mobile-nav-${index}`}
                      href={item.url || '#'}
                      className="text-[13px] font-medium uppercase tracking-[0.1em] text-dark-brown"
                    >
                      {item.title}
                    </Link>
                  )
                ))
              ) : (
                <>
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
                </>
              )}
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
