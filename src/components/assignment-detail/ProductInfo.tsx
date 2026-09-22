"use client";

import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";

interface ProductInfoProps {
  code: string;
  title: string;
  rating?: number;
  reviews?: number;
  price: number;
  oldPrice?: number;
  onBuyNow: () => void;
  onAddToCart: () => void;
}

const isHexId = (str?: string) => Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));

export const ProductInfo: React.FC<ProductInfoProps> = ({
  code,
  title,
  rating = 5,
  reviews = 10,
  price,
  oldPrice,
  onBuyNow,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<"description" | "guidelines" | "faqs">("description");
  const saveAmt = oldPrice ? oldPrice - price : 0;

  const cleanCode =
    code && !isHexId(code)
      ? code
      : title?.match(/^([A-Za-z]{2,8}[-\s]?[0-9]{2,4}[A-Za-z]?)/)?.[1]?.replace(/\s+/, "-")?.toUpperCase() || "";

  return (
    <div className="flex flex-col gap-6">
      {/* Header info card */}
      <Card border className="flex flex-col gap-5 ">
        <div>
          <span className="bg-orange/10 text-orange text-sm font-black px-2.5 py-1 rounded-lg border border-orange/10 uppercase tracking-wider">
            {cleanCode ? `Course Code: ${cleanCode}` : "IGNOU Solved Assignment"}
          </span>
          <Heading level={1} mainblack bold small className="mt-3.5 leading-snug">
            {title}
          </Heading>
        </div>

        {/* Rating stars & reviews */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < rating ? "#FFBB00" : "transparent"}
                color={i < rating ? "#FFBB00" : "#E2E8F0"}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-main-black">
            {rating.toFixed(1)} / 5.0
          </span>
          <span className="text-xs text-gray font-medium">
            ({reviews} verified reviews)
          </span>
        </div>

        {/* Price section */}
        <div className="flex items-baseline gap-3 border-t border-b border-gray-100 py-4 my-1">
          <span className="text-3xl font-black text-orange tracking-tight">₹{price}</span>
          {oldPrice && (
            <span className="text-sm line-through text-gray font-medium">₹{oldPrice}</span>
          )}
          {saveAmt > 0 && (
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Save ₹{saveAmt} instantly
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBuyNow}
            className="flex-1 py-3.5 bg-linear-to-r from-rose to-rose-deep hover:opacity-95 text-white rounded-lg text-sm font-bold shadow-md shadow-rose/20 transition-transform active:scale-95 duration-200 text-center cursor-pointer"
          >
            Buy Now Instantly
          </button>
          <button
            onClick={onAddToCart}
            className="flex-1 py-3.5 border border-rose text-rose-deep hover:bg-rose-soft/30 rounded-lg text-sm font-bold transition-transform active:scale-95 duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingCart size={16} />
            Add to Shopping Cart
          </button>
        </div>
      </Card>

      {/* Information Tabs */}
      <Card border className="flex flex-col gap-6">

        {/* Tab headers */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3.5 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-0.5 cursor-pointer ${activeTab === "description"
              ? "border-rose text-rose-deep"
              : "border-transparent text-ink/60 hover:text-foreground"
              }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("guidelines")}
            className={`pb-3.5 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-0.5 cursor-pointer ${activeTab === "guidelines"
              ? "border-rose text-rose-deep"
              : "border-transparent text-ink/60 hover:text-foreground"
              }`}
          >
            Submission Guidelines
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`pb-3.5 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-0.5 cursor-pointer ${activeTab === "faqs"
              ? "border-rose text-rose-deep"
              : "border-transparent text-ink/60 hover:text-foreground"
              }`}
          >
            FAQs
          </button>
        </div>

        {/* Tab content renders */}
        <div className="text-xs font-medium text-ink/70 leading-relaxed text-left">
          {activeTab === "description" && (
            <div className="flex flex-col gap-4">
              <Paragraph mainblack sm className="leading-relaxed">
                This reference solved assignment contains complete, clear, and stepwise solved solutions to all the questions in the official IGNOU assignment booklet for <strong className="text-foreground">{code}</strong>.
              </Paragraph>
              <ul className="list-disc pl-4 space-y-2 text-ink/70 font-medium">
                <li>Drafted cleanly in plain, easy-to-understand English language.</li>
                <li>Includes algorithm designs, diagrams, and programming source code wherever applicable.</li>
                <li>Formatted in accordance with the official word limits and guidelines provided by Indira Gandhi National Open University.</li>
                <li>Easy-to-print format or reference for copy-writing cleanly onto assignment sheets.</li>
              </ul>
            </div>
          )}

          {activeTab === "guidelines" && (
            <div className="flex flex-col gap-4">
              <Paragraph mainblack sm className="leading-relaxed">
                Please ensure to strictly follow the IGNOU assignment submission protocol:
              </Paragraph>
              <ul className="list-decimal pl-4 space-y-2 text-ink/70 font-medium">
                <li>The first page must contain your details (Name, Enrolment Number, Address, Program Code, Course Code, Study Center Code, and Date).</li>
                <li>Use high-quality A4 ruled paper sheets for handwritten copies.</li>
                <li>Do not copy answers verbatim; use this solved sheet as reference guidelines to draft your answers.</li>
                <li>Submit the finished assignment files to your respective Study Center coordinator before the deadline.</li>
              </ul>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 p-3.5 rounded-lg border border-glass-edge bg-glass text-left">
                <Paragraph mainblack bold xs>
                  Q: Will I get the solved PDF file immediately?
                </Paragraph>
                <Paragraph gray sm className="mt-1">
                  A: Yes! Directly after completing online payment, you will get instant download options from your User Account Dashboard & your email inbox.
                </Paragraph>
              </div>
              <div className="flex flex-col gap-1 p-3.5 rounded-lg border border-glass-edge bg-glass text-left">
                <Paragraph mainblack bold xs>
                  Q: Are these questions checked by educators?
                </Paragraph>
                <Paragraph gray sm className="mt-1">
                  A: Absolutely. Our subject specialist academic team double-checks every programming block, algorithm design, and answer draft for accuracy.
                </Paragraph>
              </div>
            </div>
          )}
        </div>

      </Card>
    </div>
  );
};

export default ProductInfo;
