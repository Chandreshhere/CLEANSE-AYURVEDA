"use client";

import React, { ReactNode } from "react";
import { CartProvider, useCart } from "@/context";
import { CartDrawer } from "@/components/ui";

const CartDrawerWrapper: React.FC = () => {
  const { isCartDrawerOpen, closeCartDrawer } = useCart();
  return <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />;
};

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      {children}
      <CartDrawerWrapper />
    </CartProvider>
  );
};

export default Providers;
