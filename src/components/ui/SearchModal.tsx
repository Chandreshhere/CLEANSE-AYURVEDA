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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "80px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          margin: "0 20px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid #E5E5E5",
            }}
          >
            <SearchIcon size={24} style={{ color: "#4A2B1F", marginRight: "12px" }} />
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
                fontSize: "18px",
                color: "#4A2B1F",
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
              }}
            >
              <CloseIcon size={24} style={{ color: "#4A2B1F" }} />
            </button>
          </div>
        </form>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              borderBottom: "1px solid #E5E5E5",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  width: "100%",
                  padding: "16px 24px",
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
                <SearchIcon size={18} style={{ color: "#999" }} />
                <div>
                  <span
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "16px",
                      color: "#4A2B1F",
                    }}
                  >
                    {suggestion.text}
                  </span>
                  <span
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "12px",
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
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              padding: "16px 0",
            }}
          >
            {isSearching ? (
              <div
                style={{
                  padding: "40px 24px",
                  textAlign: "center",
                  fontFamily: "Lexend, sans-serif",
                  color: "#999",
                }}
              >
                Searching...
              </div>
            ) : searchResults.length === 0 ? (
              <div
                style={{
                  padding: "40px 24px",
                  textAlign: "center",
                  fontFamily: "Lexend, sans-serif",
                  color: "#999",
                }}
              >
                No products found for "{searchQuery}"
              </div>
            ) : (
              <>
                <div
                  style={{
                    padding: "0 24px 12px",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "14px",
                    color: "#999",
                  }}
                >
                  Found {searchResults.length} products
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      padding: "16px 24px",
                      gap: "16px",
                      textDecoration: "none",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F5F5")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {/* Product Image */}
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
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
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "Lexend, sans-serif",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#4A2B1F",
                          marginBottom: "4px",
                        }}
                      >
                        {product.name}
                      </h3>
                      {product.brand && (
                        <p
                          style={{
                            fontFamily: "Lexend, sans-serif",
                            fontSize: "14px",
                            color: "#999",
                            marginBottom: "8px",
                          }}
                        >
                          {product.brand.name}
                        </p>
                      )}
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span
                          style={{
                            fontFamily: "Lexend, sans-serif",
                            fontSize: "16px",
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
                              fontSize: "14px",
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E5E5E5",
                    textAlign: "center",
                  }}
                >
                  <Link
                    href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    onClick={onClose}
                    style={{
                      fontFamily: "Lexend, sans-serif",
                      fontSize: "16px",
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

        {/* Empty State */}
        {!showSuggestions && !showResults && searchQuery.trim().length === 0 && (
          <div
            style={{
              padding: "40px 24px",
              textAlign: "center",
              fontFamily: "Lexend, sans-serif",
              color: "#999",
            }}
          >
            Start typing to search for products...
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
