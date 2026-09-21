"use client";

import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "./types";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const isHexId = (str?: string) => Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const displayCode =
    item.code && !isHexId(item.code)
      ? item.code
      : item.title?.match(/^([A-Za-z]{2,8}[-\s]?[0-9]{2,4}[A-Za-z]?)/)?.[1]?.replace(/\s+/, "-")?.toUpperCase() || "";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-xs hover:border-gray-150 transition-all gap-4">
      {/* Product Image & Details */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
          <img
            src={item.image || "/next.svg"}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 text-left">
          {displayCode && (
            <span className="inline-block text-sm font-bold text-orange bg-orange/5 px-2 py-0.5 rounded-md uppercase tracking-wider mb-1.5">
              {displayCode}
            </span>
          )}
          <h4 className="text-sm sm:text-base font-bold text-main-black line-clamp-2 leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-gray mt-1 font-semibold uppercase tracking-wide">
            {item.category}
          </p>
        </div>
      </div>

      {/* Pricing, Quantity & Delete */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
        {/* Quantity Controls */}
        <div className="flex items-center bg-gray-50 border border-gray-150 rounded-xl p-1">
          <button
            type="button"
            onClick={() => onQuantityChange(item.id, -1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray hover:text-main-black hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all cursor-pointer"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-xs font-black text-main-black select-none">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.id, 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray hover:text-main-black hover:bg-white hover:shadow-sm transition-all cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Price & Delete */}
        <div className="flex items-center gap-4">
          <div className="text-right flex flex-col justify-center min-w-18">
            <span className="text-base font-black text-orange">
              ₹{item.price * item.quantity}
            </span>
            {item.oldPrice && (
              <span className="text-xs text-gray line-through">
                ₹{item.oldPrice * item.quantity}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-red/10 text-red bg-red/5 hover:bg-red hover:text-white transition-all cursor-pointer"
            title="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
