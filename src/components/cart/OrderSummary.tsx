"use client";

import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { ArrowRight, Check, AlertCircle, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";

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

  const handleSubmitPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccess(null);

    const code = promoInput.trim().toUpperCase();
    if (code === "") {
      setPromoError("Please enter a promo code.");
      return;
    }

    if (onApplyPromo(code)) {
      const desc = code === "IGNOU10" ? "10% off applied!" : "Flat ₹50 discount applied!";
      setPromoSuccess(`Code '${code}' applied successfully! ${desc}`);
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Use 'IGNOU10' or 'WELCOME50'.");
    }
  };

  return (
    <Card border className=" !border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] text-left flex flex-col gap-6">
      <Heading small mainblack bold>
        Order Summary
      </Heading>

      {/* Breakdown Details */}
      <div className="space-y-4 border-b border-gray-100 pb-5 text-sm">
        <div className="flex justify-between items-center text-gray">
          <span>Subtotal</span>
          <span className="font-bold text-main-black">₹{subtotal}</span>
        </div>

        <div className="flex justify-between items-center text-gray">
          <span>Delivery Charge</span>
          <span className="font-bold text-main-black">
            {shippingFee > 0 ? `₹${shippingFee}` : "FREE"}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-green font-semibold bg-green/5 p-2 rounded-xl border border-green/10">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} />
              Promo Discount
            </span>
            <span className="font-bold">-₹{discount}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-base font-bold text-main-black block">Total Amount</span>
          <span className="text-[10px] text-gray uppercase font-bold tracking-wider">Inclusive of taxes</span>
        </div>
        <span className="text-2xl font-black text-orange tracking-tight">₹{grandTotal}</span>
      </div>

      {/* Coupon Application Container */}
      <div className="border-t border-gray-100 pt-5">
        {appliedPromo ? (
          <div className="p-3 bg-green/5 border border-green/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green/15 text-green flex items-center justify-center">
                <Check size={11} className="stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-green uppercase tracking-wide">
                {appliedPromo} Active
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onRemovePromo();
                setPromoSuccess(null);
              }}
              className="text-[10px] text-red hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitPromo} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Code (e.g. IGNOU10)"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="flex-grow px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wide bg-[#F8FAFC] focus:outline-none focus:border-orange focus:bg-white text-main-black transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-main-black text-white text-xs font-bold hover:bg-orange hover:shadow-md hover:shadow-orange/10 transition-all cursor-pointer"
            >
              Apply
            </button>
          </form>
        )}

        {/* Alerts */}
        {promoError && (
          <div className="mt-2.5 flex items-center gap-2 text-xs text-red font-semibold bg-red/5 p-2 rounded-xl border border-red/10">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{promoError}</span>
          </div>
        )}

        {promoSuccess && (
          <div className="mt-2.5 flex items-center gap-2 text-xs text-green font-semibold bg-green/5 p-2 rounded-xl border border-green/10">
            <Check size={14} className="flex-shrink-0" />
            <span>{promoSuccess}</span>
          </div>
        )}
      </div>

      {/* Action Order Button */}
      <button
        type="button"
        onClick={onCheckout}
        className="w-full py-4 rounded-2xl bg-custom-orange-gradient text-white font-bold text-sm shadow-md shadow-orange/15 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer active:scale-[0.99] duration-200"
      >
        <span>Place Your Order</span>
        <ArrowRight size={16} />
      </button>
    </Card>
  );
};

export default OrderSummary;
