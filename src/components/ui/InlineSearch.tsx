"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchIcon, CloseIcon } from "@/components/ui";
import {
  searchProducts,
  getSearchSuggestions,
  type SearchProduct,
  type SearchSuggestion
} from "@/lib/api";

interface InlineSearchProps {
  onClose: () => void;
}

export const InlineSearch: React.FC<InlineSearchProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Fetch suggestions as user types
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce the API call
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const response = await getSearchSuggestions(searchQuery, 5);
        if (response.data?.suggestions) {
          setSuggestions(response.data.suggestions);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Handle search submission
  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) return;

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      const response = await searchProducts({ q: query, limit: 10 });
      if (response.data?.products) {
        setSearchResults(response.data.products);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product') {
      window.location.href = `/product/${suggestion.slug}`;
    } else if (suggestion.type === 'category') {
      window.location.href = `/shop?category=${suggestion.slug}`;
    } else if (suggestion.type === 'brand') {
      window.location.href = `/shop?brand=${suggestion.slug}`;
    }
    onClose();
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div ref={containerRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
      {/* Search Input */}
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            padding: "8px 16px",
            minWidth: "300px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <SearchIcon size={20} style={{ color: "#4A2B1F", marginRight: "24px", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontFamily: "Lexend, sans-serif",
              fontSize: "16px",
              color: "#4A2B1F",
              backgroundColor: "transparent",
            }}
          />
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "8px",
            }}
          >
            <CloseIcon size={20} style={{ color: "#4A2B1F" }} />
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {(showSuggestions && suggestions.length > 0) || showResults ? (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "450px",
            maxHeight: "500px",
            overflowY: "auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F5F5")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <SearchIcon size={16} style={{ color: "#999" }} />
                  <div>
                    <span
                      style={{
                        fontFamily: "Lexend, sans-serif",
                        fontSize: "14px",
                        color: "#4A2B1F",
                      }}
                    >
                      {suggestion.text}
                    </span>
                    <span
                      style={{
                        fontFamily: "Lexend, sans-serif",
                        fontSize: "11px",
                        color: "#999",
                        marginLeft: "8px",
                        textTransform: "uppercase",
                      }}
                    >
                      {suggestion.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {showResults && (
            <div>
              {isSearching ? (
                <div
                  style={{
                    padding: "24px 20px",
                    textAlign: "center",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    color: "#999",
                  }}
                >
                  Searching...
                </div>
              ) : searchResults.length === 0 ? (
                <div
                  style={{
                    padding: "24px 20px",
                    textAlign: "center",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    color: "#999",
                  }}
                >
                  No products found for "{searchQuery}"
                </div>
              ) : (
                <>
                  <div
                    style={{
                      padding: "12px 20px 8px",
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "12px",
                      color: "#999",
                      borderBottom: "1px solid #E5E5E5",
                    }}
                  >
                    Found {searchResults.length} products
                  </div>
                  {searchResults.slice(0, 5).map((product) => (
                    <Link
                      key={product._id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      style={{
                        display: "flex",
                        padding: "12px 20px",
                        gap: "12px",
                        textDecoration: "none",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F5F5")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {/* Product Image */}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: "#F5F5F5",
                          borderRadius: "4px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        {product.primaryImage && (
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            fontFamily: "Lexend, sans-serif",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#4A2B1F",
                            marginBottom: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.name}
                        </h3>
                        {product.brand && (
                          <p
                            style={{
                              fontFamily: "Lexend, sans-serif",
                              fontSize: "12px",
                              color: "#999",
                              marginBottom: "4px",
                            }}
                          >
                            {product.brand.name}
                          </p>
                        )}
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <span
                            style={{
                              fontFamily: "Lexend, sans-serif",
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#4A2B1F",
                            }}
                          >
                            ₹{product.pricing.salePrice}
                          </span>
                          {product.pricing.mrp > product.pricing.salePrice && (
                            <span
                              style={{
                                fontFamily: "Lexend, sans-serif",
                                fontSize: "12px",
                                color: "#999",
                                textDecoration: "line-through",
                              }}
                            >
                              ₹{product.pricing.mrp}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* View All Results Link */}
                  <div
                    style={{
                      padding: "12px 20px",
                      borderTop: "1px solid #E5E5E5",
                      textAlign: "center",
                    }}
                  >
                    <Link
                      href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                      onClick={onClose}
                      style={{
                        fontFamily: "Lexend, sans-serif",
                        fontSize: "14px",
                        color: "#4A2B1F",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      View All Results →
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default InlineSearch;
