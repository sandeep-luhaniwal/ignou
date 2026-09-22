"use client";

import React, { useState } from "react";
import { ArrowRight, Check, AlertCircle, Sparkles, ShieldCheck, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SummaryProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  grandTotal: number;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
  onCheckout: () => void;
}

export const OrderSummary: React.FC<SummaryProps> = ({
  subtotal,
  shippingFee,
  discount,
  grandTotal,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  onCheckout,
}) => {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  const applyCode = (codeToApply: string) => {
    setPromoError(null);
    setPromoSuccess(null);

    const code = codeToApply.trim().toUpperCase();
    if (code === "") {
      setPromoError("Please enter a promo code.");
      return;
    }

    if (onApplyPromo(code)) {
      const desc = code === "IGNOU10" ? "10% discount applied!" : "Flat ₹50 discount applied!";
      setPromoSuccess(`Promo '${code}' active — ${desc}`);
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try 'IGNOU10' or 'WELCOME50'.");
    }
  };

  const handleSubmitPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyCode(promoInput);
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-glass p-6 ring-1 ring-glass-edge shadow-xs backdrop-blur-xl text-left flex flex-col gap-5">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-rose-soft/30 blur-2xl"
      />

      <div className="flex items-center justify-between pb-3 border-b border-glass-edge">
        <h3 className="text-lg font-bold text-foreground">
          Order Summary
        </h3>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
          <Lock className="size-3" />
          SSL Secure
        </span>
      </div>

      {/* Breakdown Details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center text-ink/70">
          <span>Subtotal</span>
          <span className="font-bold text-foreground">₹{subtotal}</span>
        </div>

        <div className="flex justify-between items-center text-ink/70">
          <span>Delivery Charge</span>
          <span className="font-bold text-emerald-600">
            {shippingFee > 0 ? `₹${shippingFee}` : "FREE"}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-rose-deep font-semibold bg-rose-soft/25 p-2.5 rounded-lg ring-1 ring-rose-deep/20">
            <span className="flex items-center gap-1.5 text-xs font-bold">
              <Sparkles className="size-3.5" />
              Promo Discount
            </span>
            <span className="font-black">-₹{discount}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="pt-3 border-t border-glass-edge flex justify-between items-baseline">
        <div>
          <span className="text-base font-bold text-foreground block">Total Payable</span>
          <span className="text-[11px] text-ink/50 uppercase font-semibold tracking-wider">Inclusive of all taxes</span>
        </div>
        <span className="text-3xl font-black text-rose-deep tracking-tight">₹{grandTotal}</span>
      </div>

      {/* Promo Code Section */}
      <div className="pt-2">
        {appliedPromo ? (
          <div className="p-3 bg-azure-soft/25 ring-1 ring-azure-deep/25 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-full bg-azure-soft text-azure-deep flex items-center justify-center">
                <Check className="size-3 stroke-3" />
              </div>
              <span className="text-xs font-bold text-azure-deep uppercase tracking-wide">
                {appliedPromo} Applied
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onRemovePromo();
                setPromoSuccess(null);
              }}
              className="text-xs text-rose-deep hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <form onSubmit={handleSubmitPromo} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="PROMO CODE"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="h-9.5 grow px-3.5 rounded-lg ring-1 ring-border text-xs font-bold uppercase tracking-wider bg-surface-strong focus:outline-none focus:ring-2 focus:ring-azure-deep/50 text-foreground transition-all placeholder:text-ink/35"
              />
              <Button
                type="submit"
                variant="gradient"
                className="h-9.5 rounded-lg font-bold px-5 text-xs  hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
              >
                Apply
              </Button>
            </form>

            {/* Quick Promo Chips */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-ink/45 font-medium">Offers:</span>
              <button
                type="button"
                onClick={() => applyCode("IGNOU10")}
                className="px-2 py-0.5 rounded bg-surface-strong ring-1 ring-border hover:ring-azure-deep/40 text-azure-deep font-bold cursor-pointer transition-all hover:bg-glass"
              >
                IGNOU10 (10% OFF)
              </button>
              <button
                type="button"
                onClick={() => applyCode("WELCOME50")}
                className="px-2 py-0.5 rounded bg-surface-strong ring-1 ring-border hover:ring-rose-deep/40 text-rose-deep font-bold cursor-pointer transition-all hover:bg-glass"
              >
                WELCOME50 (₹50 OFF)
              </button>
            </div>
          </div>
        )}

        {/* Alerts */}
        {promoError && (
          <div className="mt-2.5 flex items-center gap-2 text-xs text-rose-deep font-semibold bg-rose-soft/20 p-2 rounded-lg ring-1 ring-rose-deep/20">
            <AlertCircle className="size-3.5 shrink-0" />
            <span>{promoError}</span>
          </div>
        )}

        {promoSuccess && (
          <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-500/10 p-2 rounded-lg ring-1 ring-emerald-500/20">
            <Check className="size-3.5 shrink-0 text-emerald-600" />
            <span>{promoSuccess}</span>
          </div>
        )}
      </div>

      {/* Action Order Button */}
      <Button
        type="button"
        variant="gradient"
        size="lg"
        onClick={onCheckout}
        className="w-full rounded-lg font-bold text-base shadow-md hover:shadow-xl gap-2 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
      >
        <span>Place Your Order</span>
        <ArrowRight className="size-4" />
      </Button>

      {/* Trust & Guarantee Indicators */}
      <div className="pt-2 border-t border-glass-edge flex flex-col gap-2 text-[11.5px] text-ink/60 font-medium">
        <div className="flex items-center gap-2">
          <Zap className="size-3.5 text-azure-deep shrink-0 fill-current" />
          <span>Instant PDF download link on screen & email</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
          <span>100% Passing guarantee & verified answers</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;


