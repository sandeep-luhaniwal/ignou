"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/components/cart/types";
import { ALL_ASSIGNMENTS } from "@/components/assignments/data";

interface ToastState {
  show: boolean;
  title: string;
  message: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, title: "", message: "" });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ignou_cart_items");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        // Safe fallback
      }
    } else {
      // Prepopulate with 3 items if empty initially
      const defaultProducts: CartItem[] = ALL_ASSIGNMENTS.slice(0, 3).map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        price: item.price,
        oldPrice: item.oldPrice,
        image: item.image,
        code: item.code || item.id.split("-")[0].toUpperCase(),
        quantity: 1,
      }));
      setCartItems(defaultProducts);
      localStorage.setItem("ignou_cart_items", JSON.stringify(defaultProducts));
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("ignou_cart_items", JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  const showToastNotification = (title: string, message: string) => {
    setToast({ show: true, title, message });
  };

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        showToastNotification("Quantity Updated", `Increased quantity of ${item.code || "item"}`);
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + (item.quantity || 1) } : x
        );
      }
      showToastNotification("Added to Cart", `${item.title.substring(0, 30)}... added to your cart.`);
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) {
        showToastNotification("Removed from Cart", `${item.code || "Item"} has been removed.`);
      }
      return prev.filter((x) => x.id !== id);
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (isHydrated) {
      localStorage.removeItem("ignou_cart_items");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
      
      {/* Dynamic Floating Toast Component */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col gap-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange animate-ping" />
            <h5 className="font-bold text-sm text-main-black">{toast.title}</h5>
          </div>
          <p className="text-xs text-gray font-medium mt-0.5">{toast.message}</p>
        </div>
      )}
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
