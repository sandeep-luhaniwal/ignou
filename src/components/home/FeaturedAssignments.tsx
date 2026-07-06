"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import MainButton from "@/components/ui/MainButton";
import ProductCard from "@/components/ui/ProductCard";
import Badge from "@/components/ui/Badge";
import { ALL_ASSIGNMENTS } from "@/components/assignments/data";
import { ArrowRight } from "lucide-react";

const FeaturedAssignments = () => {
  // Get top 3 or 4 assignments to feature on home page
  const featuredList = ALL_ASSIGNMENTS.slice(0, 3);

  return (
    <section className="py-20 bg-white relative">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-4 xl:px-0 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl text-left">
            <Badge orange sm className="mb-3 w-fit uppercase tracking-wider">
              Premium Solutions
            </Badge>
            <Heading mainblack bold className="mb-4">
              Popular IGNOU Solved Assignments
            </Heading>
            <Paragraph gray base className="max-w-xl">
              Download instant, 100% accurate PDFs prepared by top subject-matter experts. Designed to meet latest IGNOU guidelines and help you secure maximum marks.
            </Paragraph>
          </div>
          
          <div className="mt-6 md:mt-0 flex">
            <MainButton url="/assignments" className="flex items-center gap-2">
              <span>View All Assignments</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MainButton>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredList.map((product) => (
            <div key={product.id} className="relative group">
              {/* Year Badge */}
              <div className="absolute top-4 left-4 z-20 bg-yellow text-main-black font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-md">
                Session {product.year}
              </div>
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedAssignments;
