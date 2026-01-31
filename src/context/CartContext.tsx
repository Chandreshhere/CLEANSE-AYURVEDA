"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image?: string;
  price: number;
  mrp?: number;
  quantity: number;
  variantId?: string;
  variantName?: string;
}

interface CartContextType {
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cookie configuration for cart persistence
const CART_COOKIE_OPTIONS = {
  expires: 30,        // 30 days expiration
  path: '/',          // Available site-wide
  sameSite: 'Lax' as const,    // CSRF protection
  secure: process.env.NODE_ENV === 'production', // HTTPS in production
};

const CART_COOKIE_NAME = 'cleanse_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from cookies on mount (with migration from localStorage)
  useEffect(() => {
    setIsMounted(true);

    // Try to load from cookies first
    let savedCart = Cookies.get(CART_COOKIE_NAME);

    // If no cookie exists, check localStorage for migration
    if (!savedCart) {
      const localStorageCart = localStorage.getItem('cart');
      if (localStorageCart) {
        savedCart = localStorageCart;
        // Migrate to cookies and clean up localStorage
        Cookies.set(CART_COOKIE_NAME, localStorageCart, CART_COOKIE_OPTIONS);
        localStorage.removeItem('cart');
      }
    }

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('[CartContext] Error loading cart from cookies:', error);
      }
    }
  }, []);

  // Save cart to cookies whenever it changes (only after mount)
  useEffect(() => {
    if (isMounted) {
      Cookies.set(CART_COOKIE_NAME, JSON.stringify(cartItems), CART_COOKIE_OPTIONS);
    }
  }, [cartItems, isMounted]);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart (same productId and variantId)
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.variantId === item.variantId
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity || 1;
        return updatedItems;
      } else {
        // New item, add to cart
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    Cookies.remove(CART_COOKIE_NAME, { path: '/' });
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total number of items in cart
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
