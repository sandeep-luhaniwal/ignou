"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, CheckCircle2, FileText, Sparkles } from "lucide-react";
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

  const originalPrice = item.oldPrice || item.price * 2;

  return (
    <div className="relative group overflow-hidden rounded-lg bg-glass p-4 sm:p-5 ring-1 ring-glass-edge shadow-xs backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:ring-azure-deep/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Left: Thumbnail & Details */}
        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
          {/* Thumbnail / Code Visual */}
          <div className="relative size-16 sm:size-20 rounded-lg overflow-hidden bg-surface-strong ring-1 ring-border shrink-0 flex items-center justify-center group- transition-transform duration-300">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="size-full flex flex-col items-center justify-center p-1.5 bg-linear-to-br from-azure-soft/40 to-rose-soft/40 text-center">
                <FileText className="size-5 text-azure-deep mb-1" />
                <span className="text-[10px] font-black text-foreground tracking-tight line-clamp-1">
                  {displayCode || "IGNOU"}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              {displayCode && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-azure-deep bg-azure-soft/40 ring-1 ring-azure-deep/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  <Sparkles className="size-3" />
                  {displayCode}
                </span>
              )}
              <span className="text-[11px] font-bold text-ink/50 bg-surface-strong px-2 py-0.5 rounded-md ring-1 ring-border">
                {item.session || "2025-26 Session"}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-azure-deep transition-colors">
              {item.title}
            </h4>

            <div className="mt-1.5 flex items-center gap-3 text-xs text-ink/60 font-medium">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="size-3.5" />
                Verified Solutions
              </span>
              <span>•</span>
              <span>Instant PDF</span>
            </div>
          </div>
        </div>

        {/* Right: Quantity Stepper, Price & Delete */}
        <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t border-glass-edge sm:border-t-0 pt-3 sm:pt-0">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-surface-strong ring-1 ring-border rounded-lg p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => onQuantityChange(item.id, -1)}
              disabled={item.quantity <= 1}
              className="size-7.5 rounded-md flex items-center justify-center text-ink/70 hover:text-foreground hover:bg-glass disabled:opacity-25 transition-all cursor-pointer active:scale-90"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-foreground select-none">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(item.id, 1)}
              className="size-7.5 rounded-md flex items-center justify-center text-ink/70 hover:text-foreground hover:bg-glass transition-all cursor-pointer active:scale-90"
              aria-label="Increase quantity"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          {/* Pricing */}
          <div className="text-right flex flex-col justify-center min-w-20">
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="text-lg sm:text-xl font-black text-rose-deep tracking-tight">
                ₹{item.price * item.quantity}
              </span>
            </div>
            {originalPrice && (
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-xs text-ink/40 line-through">
                  ₹{originalPrice * item.quantity}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1 py-0.2 rounded">
                  50% OFF
                </span>
              </div>
            )}
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="size-8.5 rounded-lg flex items-center justify-center ring-1 ring-rose-deep/20 text-rose-deep bg-rose-soft/20 hover:bg-rose hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-90"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartItemRow;


