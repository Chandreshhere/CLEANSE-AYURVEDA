"use client";

import React, { ReactNode } from "react";
import { CartProvider, useCart, AuthProvider } from "@/context";
import { CartDrawer } from "@/components/ui";

const CartDrawerWrapper: React.FC = () => {
  const { isCartDrawerOpen, closeCartDrawer } = useCart();
  return <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />;
};

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartDrawerWrapper />
      </CartProvider>
    </AuthProvider>
  );
};

export default Providers;
