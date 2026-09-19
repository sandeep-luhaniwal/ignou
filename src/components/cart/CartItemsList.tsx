"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";
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
      <Card border className="w-full max-w-xl border-gray-100! p-8 sm:p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-orange/10 text-orange rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={28} />
        </div>
        <Heading small mainblack bold center className="mb-2">
          Your Cart is Empty
        </Heading>
        <Paragraph gray sm center className="max-w-xs mb-8 leading-relaxed">
          Looks like you haven't added any solved assignments to your cart yet. Let's find some study materials!
        </Paragraph>
        <MainButton url="/assignments" className="w-full justify-center">
          Browse Assignments
        </MainButton>
      </Card>
    );
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-5 gap-2">
        <div>
          <Heading small mainblack bold>
            Shopping Cart
          </Heading>
          <Paragraph gray xs className="mt-1 font-semibold uppercase tracking-wider">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </Paragraph>
        </div>
        <Link
          href="/assignments"
          className="flex items-center gap-1.5 text-xs font-bold text-orange hover:underline self-start sm:self-center"
        >
          <ArrowLeft size={14} />
          Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col gap-4">
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
