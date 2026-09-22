"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

import Link from "next/link";

function formatCleanTitle(code: string, rawTitle: string) {
  if (!rawTitle) return code;
  let clean = rawTitle.trim();
  const escapedCode = (code || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (escapedCode) {
    const regex = new RegExp(`^${escapedCode}[:\\s\\-—]+`, "i");
    if (regex.test(clean)) {
      clean = clean.replace(regex, "").trim();
    }
  }
  return clean || code;
}

export interface AssignmentItemProps {
  id: string;
  code: string;
  title: string;
  degreeType: "MASTER DEGREE" | "BACHELOR DEGREE" | "DIPLOMA";
  category: string;
  categoryLabel: string;
  session: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
}

export function AssignmentCard({ item }: { item: AssignmentItemProps }) {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  const isInCart = cartItems.some((x) => x.id === item.id || x.code === item.code);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      code: item.code,
      title: item.title,
      price: item.price,
      image: item.image,
      session: item.session,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: item.id,
      code: item.code,
      title: item.title,
      price: item.price,
      image: item.image,
      session: item.session,
    });
    router.push("/cart");
  };

  const productUrl = `/assignments/${item.id}`;

  return (
    <article className="group flex flex-col justify-between h-full rounded-lg bg-glass ring-1 ring-glass-edge shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-azure-deep/30 overflow-hidden">
      {/* Card Thumbnail / Header with Badges */}
      <Link href={productUrl} className="relative block h-40 w-full bg-surface-strong overflow-hidden cursor-pointer">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Left Badges matching Screenshot */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10">
          <span className="rounded-md bg-ink text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 shadow-md">
            {item.degreeType}
          </span>
          <span className="rounded-md bg-[#FFBB00] text-black font-extrabold text-xs px-2.5 py-0.5 shadow-md">
            {item.session}
          </span>
        </div>

        {/* Bottom overlay code */}
        <div className="absolute bottom-2.5 left-3 z-10">
          <span className="text-white font-extrabold text-lg tracking-tight drop-shadow-md">
            {item.code}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>

          {/* Title */}
          <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-azure-deep transition-colors line-clamp-2">
            <Link href={productUrl} className="hover:text-azure-deep transition-colors">
              {formatCleanTitle(item.code, item.title)}
            </Link>
          </h3>

          {/* Pricing matching screenshot */}
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-deep">
              ₹{item.price}
            </span>
            <span className="text-sm text-ink/40 line-through">
              ₹{item.oldPrice}
            </span>
            <span className="rounded-md bg-green/10 text-green text-xs font-bold px-1.5 py-0.5">
              50% OFF
            </span>
          </div>
        </div>

        {/* Delivery Tags & Dual Buttons: Add to Cart & Buy Now */}
        <div className="mt-3 pt-2.5 border-t border-border/80">
          <div className="text-[11.5px] text-ink/60 font-medium mb-2 flex items-center justify-between">
            <span>⚡ Instant PDF</span>
            <span>✍️ Handwritten option</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className="w-full rounded-lg font-bold border-azure-deep/30 bg-glass/80 hover:bg-surface-strong hover:border-azure-deep/60 text-azure-deep gap-1.5 text-xs py-2 shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              {isInCart ? (
                <>
                  <Check className="size-3.5 text-green" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="size-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="gradient"
              size="sm"
              onClick={handleBuyNow}
              className="w-full rounded-lg font-bold shadow-md  gap-1.5 text-xs py-2 transition-all duration-300 hover:scale-[1.02] hover:opacity-95 cursor-pointer active:scale-95"
            >
              <Zap className="size-3.5 fill-current" />
              <span>Buy Now</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
