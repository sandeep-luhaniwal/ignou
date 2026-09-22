"use client";

import React from "react";
import { Zap, BookOpen, Check, Truck, ShieldCheck, Sparkles } from "lucide-react";

interface SelectorProps {
  deliveryType: "PDF" | "Handwritten";
  onChange: (type: "PDF" | "Handwritten") => void;
}

export const DeliverySelector: React.FC<SelectorProps> = ({ deliveryType, onChange }) => {
  return (
    <div className="rounded-lg bg-glass p-5 sm:p-6 ring-1 ring-glass-edge shadow-xs backdrop-blur-xl text-left flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            Choose Delivery Method
          </h3>
          <p className="text-xs text-ink/60 mt-0.5 font-medium">
            Select how you would like to receive your solved assignments
          </p>
        </div>
        <span className="text-[11px] font-bold text-azure-deep bg-azure-soft/40 px-2.5 py-1 rounded-full ring-1 ring-azure-deep/20 hidden sm:inline-flex items-center gap-1">
          <Sparkles className="size-3" />
          Official IGNOU Formats
        </span>
      </div>

      {/* Dual Interactive Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">

        {/* Option 1: Instant Digital PDF */}
        <div
          onClick={() => onChange("PDF")}
          className={`relative p-4.5 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between ${deliveryType === "PDF"
            ? "bg-linear-to-br from-azure-soft/30 via-paper to-azure-soft/15 border-azure-deep shadow-md ring-1 ring-azure-deep/40"
            : "bg-surface-strong/60 border-glass-edge hover:border-azure-deep/40 hover:bg-surface-strong"
            }`}
        >
          {/* Top Row: Radio + Header */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${deliveryType === "PDF"
                    ? "border-azure-deep bg-azure-deep text-white"
                    : "border-ink/30 bg-transparent"
                    }`}
                >
                  {deliveryType === "PDF" && <Check className="size-3 stroke-3" />}
                </div>
                <div className="flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-md bg-azure-soft text-azure-deep">
                    <Zap className="size-4 fill-current" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">
                    Instant Digital PDF
                  </h4>
                </div>
              </div>

              <span className="text-xs font-black text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                FREE
              </span>
            </div>

            <p className="mt-3 text-xs text-ink/70 leading-relaxed">
              Instant download link available on your student dashboard and delivered directly to your email.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-glass-edge flex items-center gap-3 text-[11px] font-semibold text-azure-deep">
            <span>⚡ Zero Waiting</span>
            <span>•</span>
            <span>📱 Mobile & PC Print Ready</span>
          </div>
        </div>

        {/* Option 2: Handwritten Hardcopy */}
        <div
          onClick={() => onChange("Handwritten")}
          className={`relative p-4.5 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between ${deliveryType === "Handwritten"
            ? "bg-linear-to-br from-rose-soft/30 via-paper to-rose-soft/15 border-rose-deep shadow-md ring-1 ring-rose-deep/40"
            : "bg-surface-strong/60 border-glass-edge hover:border-rose-deep/40 hover:bg-surface-strong"
            }`}
        >
          {/* Top Row: Radio + Header */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${deliveryType === "Handwritten"
                    ? "border-rose-deep bg-rose-deep text-white"
                    : "border-ink/30 bg-transparent"
                    }`}
                >
                  {deliveryType === "Handwritten" && <Check className="size-3 stroke-3" />}
                </div>
                <div className="flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-md bg-rose-soft text-rose-deep">
                    <BookOpen className="size-4" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">
                    Handwritten Hardcopy
                  </h4>
                </div>
              </div>

              <span className="text-xs font-black text-rose-deep bg-rose-soft/30 px-2 py-0.5 rounded-md ring-1 ring-rose-deep/20">
                +₹60 / item
              </span>
            </div>

            <p className="mt-3 text-xs text-ink/70 leading-relaxed">
              Neatly hand-written by academic experts on official A4 ruled sheets. Securely dispatched to your doorstep.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-glass-edge flex items-center gap-3 text-[11px] font-semibold text-rose-deep">
            <span className="flex items-center gap-1">
              <Truck className="size-3" /> 4-6 Days Delivery
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3" /> Copy-Ready
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeliverySelector;


