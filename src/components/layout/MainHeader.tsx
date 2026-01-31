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
  InlineSearch,
  NavigationSkeleton,
} from "@/components/ui";
import { getNavigation, getCategories, type Navigation, type NavigationItem, type Category } from "@/lib/api";
import { useCart } from "@/context";

export const MainHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [navigationData, setNavigationData] = useState<Navigation | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('[MainHeader] Fetching navigation and categories from API...');

        // Fetch both navigation and categories in parallel
        const [navigationResponse, categoriesResponse] = await Promise.all([
          getNavigation('main_header'),
          getCategories(),
        ]);

        if (navigationResponse.data && navigationResponse.data.length > 0) {
          setNavigationData(navigationResponse.data[0]);
          console.log('[MainHeader] ✅ Successfully fetched navigation:', {
            id: navigationResponse.data[0]._id,
            name: navigationResponse.data[0].name,
            location: navigationResponse.data[0].location,
            itemsCount: navigationResponse.data[0].items.length,
          });
        } else {
          console.warn('[MainHeader] ⚠️ No navigation menus found in response');
        }

        if (categoriesResponse.data && categoriesResponse.data.categories) {
          setCategories(categoriesResponse.data.categories);
          console.log('[MainHeader] ✅ Successfully fetched categories:', {
            count: categoriesResponse.data.categories.length,
          });
        }
      } catch (error) {
        console.error('[MainHeader] ❌ Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
        console.log('[MainHeader] Loading complete');
      }
    };

    fetchData();
  }, []);

  // Helper function to get shop URL for a category navigation item
  const getCategoryShopUrl = (navItem: NavigationItem): string => {
    // Flatten all categories including subcategories
    const allCategories: Category[] = [];
    categories.forEach((cat) => {
      allCategories.push(cat);
      if (cat.children) {
        allCategories.push(...cat.children);
      }
    });

    // Try to find a matching category by title (case-insensitive)
    const matchedCategory = allCategories.find(
      (cat) => cat.name.toLowerCase() === navItem.title.toLowerCase()
    );

    // If we found a match, return the shop URL with category slug
    if (matchedCategory) {
      return `/shop?category=${matchedCategory.slug}`;
    }

    // Fallback: if the URL already contains a category parameter, use it
    if (navItem.url && navItem.url.includes('category=')) {
      return navItem.url;
    }

    // Fallback: try to extract slug from URL path (e.g., /category/hair-care -> hair-care)
    if (navItem.url) {
      const urlParts = navItem.url.split('/').filter(Boolean);
      if (urlParts.length > 0) {
        const slug = urlParts[urlParts.length - 1];
        return `/shop?category=${slug}`;
      }
    }

    // Last fallback: use the URL as-is or default to shop
    return navItem.url || '/shop';
  };

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
  const categoryMenuItems = categoryDropdownItem?.children || fallbackCategories;

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
            {isLoading ? (
              <NavigationSkeleton />
            ) : (
            navigationItems.map((item, index) => (
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
                            href={getCategoryShopUrl(child)}
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
            ))
            )}

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
                        minWidth: "235px",
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
            {isSearchOpen ? (
              <InlineSearch onClose={() => setIsSearchOpen(false)} />
            ) : (
              <button
                className="text-dark-brown"
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <SearchIcon size={24} />
              </button>
            )}
            <Link href="/cart" className="text-dark-brown relative" aria-label="Cart">
              <CartIcon size={24} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#4A2B1F",
                    color: "#FFFFFF",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "Lexend, sans-serif",
                  }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
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
