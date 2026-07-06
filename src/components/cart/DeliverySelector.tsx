"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Card from "@/components/ui/Card";

interface SelectorProps {
  deliveryType: "PDF" | "Handwritten";
  onChange: (type: "PDF" | "Handwritten") => void;
}

export const DeliverySelector: React.FC<SelectorProps> = ({ deliveryType, onChange }) => {
  return (
    <Card border className=" !border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] text-left flex flex-col gap-4">
      <Heading small mainblack bold>
        Delivery Options
      </Heading>

      {/* Segmented slider tabs */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 border border-gray-100 rounded-2xl select-none">
        <button
          type="button"
          onClick={() => onChange("PDF")}
          className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${deliveryType === "PDF"
              ? "bg-white text-orange shadow-sm border border-gray-150 font-extrabold"
              : "text-gray hover:text-main-black"
            }`}
        >
          Instant PDF (FREE)
        </button>

        <button
          type="button"
          onClick={() => onChange("Handwritten")}
          className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${deliveryType === "Handwritten"
              ? "bg-white text-orange shadow-sm border border-gray-150 font-extrabold"
              : "text-gray hover:text-main-black"
            }`}
        >
          Handwritten (+₹60)
        </button>
      </div>

      {/* Option details */}
      <div className="mt-1">
        <Paragraph gray sm className="leading-relaxed">
          {deliveryType === "PDF"
            ? "⚡ Get digital solved assignments downloaded instantly in PDF format immediately after payment. Perfect for quick references."
            : "✍️ Professional writers write cleanly on high-quality A4 sheets matching IGNOU guidelines. Couriered securely to your address in 4-6 days."}
        </Paragraph>
      </div>
    </Card>
  );
};

export default DeliverySelector;
