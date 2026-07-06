"use client";

import React, { useState, useMemo } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import ProductCard from "@/components/ui/ProductCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ALL_ASSIGNMENTS } from "@/components/assignments/data";
import { Info, HelpCircle } from "lucide-react";

interface StoreProductsProps {
  searchQuery: string;
  selectedCategory: string;
}

export default function StoreProducts({ searchQuery, selectedCategory }: StoreProductsProps) {
  const [activeYearFilter, setActiveYearFilter] = useState<"all" | "latest" | "old">("all");

  const filteredProducts = useMemo(() => {
    let list = [...ALL_ASSIGNMENTS];

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      list = list.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Filter by year (Latest vs Old)
    if (activeYearFilter === "latest") {
      list = list.filter((item) => item.year === "2025-26");
    } else if (activeYearFilter === "old") {
      list = list.filter((item) => item.year === "2024-25" || item.year === "2023-24");
    }

    return list;
  }, [searchQuery, selectedCategory, activeYearFilter]);

  return (
    <section className="py-12 bg-gray-50 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-white pb-6 mb-8">
          <div>
            <Heading level={2} bold mainblack className="text-xl md:text-2xl">
              Solved PDF Catalog
            </Heading>
            <Paragraph xs gray className="mt-1">
              Showing {filteredProducts.length} solved assignments based on filters
            </Paragraph>
          </div>

          {/* Year Filter Tabs */}
          <div className="flex items-center bg-white border border-border-white rounded-xl p-1 w-fit shadow-xs">
            <button
              onClick={() => setActiveYearFilter("all")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer
                ${activeYearFilter === "all"
                  ? "bg-cta text-white"
                  : "text-main-gray hover:text-main-black"
                }
              `}
            >
              All Assignments
            </button>
            <button
              onClick={() => setActiveYearFilter("latest")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer
                ${activeYearFilter === "latest"
                  ? "bg-cta text-white"
                  : "text-main-gray hover:text-main-black"
                }
              `}
            >
              Latest (2025-26)
            </button>
            <button
              onClick={() => setActiveYearFilter("old")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer
                ${activeYearFilter === "old"
                  ? "bg-cta text-white"
                  : "text-main-gray hover:text-main-black"
                }
              `}
            >
              Old Assignments
            </button>
          </div>
        </div>

        {/* Warning/Alert message about submissions */}
        <div className="mb-8 flex gap-3 p-4.5 bg-light-orange/15 border border-light-orange text-cta rounded-2xl">
          <Info size={20} className="shrink-0 text-cta" />
          <div className="text-xs leading-relaxed font-semibold">
            Please check your assignment code and session (e.g. 2025-26 vs. previous years) before purchase. 
            All solved assignment files are verified and updated as per latest IGNOU guidelines.
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  rating={product.rating}
                  reviews={product.reviews}
                />
                
                {/* Standard Badge for session year */}
                <span className="absolute bottom-[88px] right-6 z-10">
                  <Badge
                    gray
                    className="font-bold border border-border-white shadow-xs"
                  >
                    Session {product.year}
                  </Badge>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center w-full flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-light-orange text-cta rounded-full flex items-center justify-center mb-6 shadow-xs animate-pulse">
              <HelpCircle size={36} />
            </div>
            <Heading level={3} bold mainblack className="mb-3 text-2xl tracking-tight">
              No Solved Assignments Found
            </Heading>
            <Paragraph sm gray className="max-w-md mx-auto mb-8 leading-relaxed text-center">
              We couldn't find any results matching your filters or search term. Try adjusting search words or program streams.
            </Paragraph>
            <button
              onClick={() => {
                setActiveYearFilter("all");
              }}
              className="px-6 py-3 bg-cta text-white font-bold rounded-xl shadow-md shadow-cta/15 hover:shadow-lg transition-all text-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
