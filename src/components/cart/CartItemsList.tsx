"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItemRow from "./CartItemRow";
import { CartItem } from "./types";

interface CartItemsListProps {
  items: CartItem[];
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onQuantityChange,
  onRemove,
}) => {
  if (items.length === 0) {
    return (
      <div className="w-full max-w-lg mx-auto rounded-lg bg-glass p-8 sm:p-12 text-center ring-1 ring-glass-edge shadow-xs backdrop-blur-xl flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-rose-soft/30 text-rose-deep rounded-full flex items-center justify-center mb-6 ring-1 ring-rose-deep/20 shadow-xs">
          <ShoppingBag className="size-7" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-ink/65 max-w-sm mb-8 leading-relaxed">
          Looks like you haven't added any solved assignments to your cart yet. Let's find your study materials!
        </p>
        <Button asChild variant="gradient" size="lg" className="w-full max-w-xs font-bold rounded-lg shadow-md  transition-all duration-300 hover:scale-[1.02] active:scale-95">
          <Link href="/assignments">Browse Assignments</Link>
        </Button>
      </div>
    );
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-glass-edge pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="size-2 rounded-full bg-rose animate-pulse" />
            <span className="text-xs font-bold text-azure-deep uppercase tracking-wider">
              Step 1 of 2: Cart & Delivery
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Shopping Cart
          </h2>
          <p className="text-xs font-semibold text-ink/50 mt-1">
            {totalItems} {totalItems === 1 ? "solved assignment" : "solved assignments"} selected for checkout
          </p>
        </div>

        <Link
          href="/assignments"
          className="inline-flex items-center gap-2 text-xs font-bold text-azure-deep bg-surface-strong hover:bg-glass px-3.5 py-2 rounded-lg ring-1 ring-border self-start sm:self-center transition-all  active:scale-95"
        >
          <ArrowLeft className="size-3.5" />
          <span>Add More Assignments</span>
        </Link>
      </div>

      <div className="flex flex-col gap-3.5">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;

