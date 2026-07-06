"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import { useCart } from "@/context/CartContext";

interface ProductCardProps { id: string; title: string; category: string; price: number; oldPrice?: number; image: string; rating?: number; reviews?: number; }

const ProductCard: React.FC<ProductCardProps> = ({ id, title, category, price, oldPrice, image, rating = 5, reviews = 0 }) => {
  const { addToCart } = useCart();
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      title,
      category,
      price,
      oldPrice,
      image,
      code: id.split("-")[0].toUpperCase(),
    });
  };

  return (
    <div 
      className="group relative rounded-lg overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      style={{ backgroundColor: "var(--card-bg, #ffffff)", borderColor: "var(--border-color, #EEF2F6)" }}
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        <span 
          className="absolute top-4 left-4 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider"
          style={{ backgroundColor: "rgba(20, 27, 44, 0.8)", color: "#ffffff" }}
        >
          {category}
        </span>
        {/* Discount Badge */}
        {discount > 0 && (
          <span 
            className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider"
            style={{ backgroundColor: "var(--red, #FF0000)", color: "#ffffff" }}
          >
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-1">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < rating ? "var(--yellow, #FFBB00)" : "transparent"}
                color={i < rating ? "var(--yellow, #FFBB00)" : "#E2E8F0"}
              />
            ))}
          </div>
          {reviews > 0 && (
            <span className="text-xs font-medium" style={{ color: "var(--gray, #64748B)" }}>({reviews} reviews)</span>
          )}
        </div>

        {/* Title */}
        <Link href={`/assignments/${id}`} className="block flex-1 transition-colors hover:opacity-80">
          <h4 
            className="text-base font-bold line-clamp-2 mb-4 min-h-[44px]"
            style={{ color: "var(--main-black, #141B2C)" }}
          >
            {title}
          </h4>
        </Link>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: "rgba(0,0,0,0.03)" }}>
          <div className="flex flex-col">
            <span className="text-lg font-bold" style={{ color: "var(--orange, #FF6A00)" }}>₹{price}</span>
            {oldPrice && (
              <span className="text-xs line-through" style={{ color: "var(--gray, #64748B)" }}>₹{oldPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border hover:bg-orange hover:text-white cursor-pointer"
            style={{ 
              backgroundColor: "var(--light-white, #F9FAFB)", 
              borderColor: "var(--border-color, #EEF2F6)", 
              color: "var(--orange, #FF6A00)" 
            }}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
