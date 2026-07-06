"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

import Heading from "@/components/ui/Heading";

interface RecommendationItem {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
}

interface RecommendedSectionProps {
  recommendations: RecommendationItem[];
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({ recommendations }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 xl:px-0 border-t border-gray-200 pt-16 mt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="text-left">
          <span className="text-[10px] text-orange uppercase font-bold tracking-wider">Top Study Reference Guides</span>
          <Heading level={2} mainblack bold small className="mt-1">
            Recommended Assignments
          </Heading>
        </div>
        <Link 
          href="/assignments" 
          className="text-xs font-bold text-orange hover:underline flex items-center gap-1 self-start md:self-auto"
        >
          View All Solved Materials
          <ArrowLeft size={12} className="rotate-180" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            category={item.category}
            price={item.price}
            oldPrice={item.oldPrice}
            image={item.image}
            rating={item.rating}
            reviews={item.reviews}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;
